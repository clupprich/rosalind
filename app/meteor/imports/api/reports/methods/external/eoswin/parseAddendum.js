import moment from 'moment-timezone'
import { parse as csvToJson } from 'papaparse'
import fromPairs from 'lodash/fromPairs'
import cloneDeep from 'lodash/cloneDeep'
import set from 'lodash/set'
import flow from 'lodash/fp/flow'
import map from 'lodash/fp/map'
import find from 'lodash/find'
import filter from 'lodash/fp/filter'
import sortBy from 'lodash/fp/sortBy'
import reverse from 'lodash/fp/reverse'

export const parseReportDate = (name, timezone = 'Europe/Vienna') => {
  if (name.includes('bis')) {
    throw new Error('Report must not contain more than one day')
  }

  const matchDate = name.match(/vom (\d{2})\.(\d{2}).(\d{4})/)
  const matchTime = name.match(/Uhrzeit (\d{2})(\d{2})/)

  if (matchDate && matchTime) {
    const [day, month, year] = matchDate.splice(1)
    const [hour, minute] = matchTime.splice(1)
    const date = moment.tz({ day, month: month - 1, year, hour, minute }, timezone).toDate()
    return date
  } else {
    throw new Error('Report filename must contain date and time')
  }
}

export const insuranceCodes = {
  surgery: [502, 503, 506],
  cautery: [504, 520, 534],
  new: [540, 'E1', 'E12']
  // TODO: Handle code 25 (anesthesia)
  // if more anesthesia than surgery, add difference to surgery
}

export const getTagBilledCount = (rawLine, tag) => {
  if (rawLine && rawLine.length > 5) {
    const codes = insuranceCodes[tag]

    if (!codes) {
      return null
    }

    return find(codes.map((code) => {
      const regexp = new RegExp(`\\[${code}\\] \\* (\\d+)`)
      const count = rawLine.match(regexp)

      if (count) {
        return parseInt(count[1])
      }
    }))
  }
}

// field | label                  | meaning
// ----------------------------------------------------------------------
// KZ    | Kurzzeichen            | type, one of:
// - Ax  | - Arzt                 | - start of report for next assignee,
//       |                        |     where x is an ID
// - KS  | - Summe Krankenscheine | - total number of patients
// - E   | - Ergebnis             | - total revenue
// WERT  | Wert                   | revenue of one line item
// BEZ   | Bezeichnung            | assignee's name or insurance code
export const matchAssigneeId = ({ row, users }) => {
  const eoswinId = row.KZ
  const id = eoswinId && eoswinId.match(/^A\d+$/)
  if (!id) {
    return null
  }

  const external = {
    eoswin: {
      id: eoswinId
    }
  }

  if (users) {
    const assigneeMapping = mapAssigneeIds({ users })

    if (assigneeMapping[eoswinId]) {
      return {
        assigneeId: assigneeMapping[eoswinId],
        external
      }
    } else {
      console.error(`[Reports] external/eoswin/parseAddendum:
        Could not match assignee with EOSWIN id "${eoswinId}" "${row.BEZ}" to any user`)
      return {
        type: 'external',
        displayAs: row.BEZ,
        external
      }
    }
  } else {
    return {
      type: 'external',
      external
    }
  }
}

const initializeNewAssignee = () => {
  const assignee = {}
  set(assignee, 'patients.new.actual', 0)
  set(assignee, 'patients.surgery.actual', 0)
  set(assignee, 'patients.recall.actual', 0)
  set(assignee, 'patients.total.actual', 0)
  set(assignee, 'revenue.total.actual', 0)
  return assignee
}

export const parseAssignees = ({ rows, users }) => {
  let assignees = []
  let currentAssignee = null

  rows.map((row) => {
    const newAssignee = matchAssigneeId({ row, users })
    if (newAssignee) {
      if (currentAssignee) {
        assignees.push(cloneDeep(currentAssignee))
      }
      currentAssignee = {
        ...initializeNewAssignee(),
        ...newAssignee
      }
    }

    const newPatients = getTagBilledCount(row.BEZ, 'new')
    if (newPatients) {
      currentAssignee.patients.new.actual += newPatients
    }

    const surgery = getTagBilledCount(row.BEZ, 'surgery')
    if (surgery) {
      currentAssignee.patients.surgery.actual += surgery
    }

    // KS: Krankenscheine: total number of patients for assignee
    if (row.KZ === 'KS') {
      currentAssignee.patients.total.actual += parseInt(row.BEZ)
    }

    // E: Ergebnis: total revenue for assignee
    if (row.KZ === 'E') {
      currentAssignee.revenue.total.actual += parseFloat(row.WERT)
    }
  })

  // Push last assignee
  if (currentAssignee) {
    assignees.push(cloneDeep(currentAssignee))
  }

  const asArray = flow(
    filter(a => a.patients.total.actual > 0),
    map(a => {
      if (a.patients.total.actual < a.patients.new.actual) {
        a.patients.total.actual = a.patients.new.actual
      }

      a.patients.recall.actual = a.patients.total.actual - a.patients.new.actual
      return a
    }),
    sortBy('revenue.total.actual'),
    reverse
  )(assignees)

  return asArray
}

const mapAssigneeIds = ({ users }) => {
  if (users) {
    return fromPairs(users.map(user => {
      const eoswinId = (user.external && user.external.eoswin && user.external.eoswin.id)
      return [ eoswinId, user._id ]
    }))
  }
}

export const parseAddendum = ({ content, users, ...rest }) => {
  const rows = csvToJson(content, { header: true }).data
  const assignees = parseAssignees({ rows, users })

  const addendum = {
    ...rest,
    assignees
  }

  return addendum
}
