import React from 'react'
import moment from 'moment'
import Alert from 'react-s-alert'
import { Box } from '../../components/Box'
import { Icon } from '../../components/Icon'
import { __ } from '../../../i18n'
import { withTracker } from '../../components/withTracker'
import { Calendars } from '../../../api/calendars'
import { Schedules } from '../../../api/schedules'
import { Users } from '../../../api/users'
import { isSame, dateToDay } from '../../../util/time/day'
import { DayPickerRangeController } from 'react-dates'
import { END_DATE, START_DATE } from 'react-dates/constants'
import Button from '@material-ui/core/Button'
import { UserPicker } from '../../users/UserPicker'

const composer = props => {
  const { calendarId } = props
  const calendar = Calendars.findOne({ _id: calendarId })

  const holidays = Schedules.find({
    type: 'holiday'
  }).fetch()

  const isHoliday = m => {
    if (m.isoWeekday() === 7) { return true }
    const day = dateToDay(m)
    return !!holidays.find(h => isSame(day, h.day))
  }

  // subscribe('schedules-latest-planned', { calendarId })

  // const latestSchedules = Schedules.find({
  //   type: 'override',
  //   calendarId
  // }, {
  //   sort: { end: -1 },
  //   limit: 1
  // }).fetch()

  // const lastPlannedDate = latestSchedules.length === 1
  // ? latestSchedules[0].start
  // : null

  return {
    ...props,
    calendar,
    isHoliday
  }
}

class ApplyDefaultScheduleComponent extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      startDate: null,
      endDate: null,
      focusedInput: START_DATE,
      applying: false,
      applied: false,
      assigneeId: null
    }

    this.handleDatesChange = this.handleDatesChange.bind(this)
    this.handleFocusChange = this.handleFocusChange.bind(this)
    this.handleAssigneeChange = this.handleAssigneeChange.bind(this)
    this.applyDefaultSchedule = this.applyDefaultSchedule.bind(this)
    this.isOutsideRange = this.isOutsideRange.bind(this)
  }

  applyDefaultSchedule () {
    this.setState({
      applying: true
    })

    return Schedules.actions.applyDefaultSchedule.callPromise({
      assigneeId: this.state.assigneeId,
      calendarId: this.props.calendarId,
      from: this.state.startDate.toDate(),
      to: this.state.endDate.toDate()
    }).then(res => {
      Alert.success('Erfolgreich geplant')
      this.setState({
        applying: false,
        applied: true
      })

      setTimeout(() =>
        this.setState({
          applied: false
        })
      , 10 * 1000)
    }).catch(e => {
      Alert.error(e.message)
      console.error(e)

      this.setState({
        applying: false
      })
    })
  }

  handleDatesChange ({ startDate, endDate }) {
    !this.state.applying && this.setState({
      startDate,
      endDate
    })
  }

  handleFocusChange (focusedInput) {
    // Force the focusedInput to always be truthy so that dates are always selectable
    this.setState({
      focusedInput: !focusedInput ? START_DATE : focusedInput
    })
  }

  handleAssigneeChange (assigneeId) {
    this.setState({
      assigneeId
    })
  }

  isOutsideRange (m) {
    return this.props.lastPlannedDate
      ? m.isBefore(this.props.lastPlannedDate)
      : m.isBefore(moment())
  }

  render () {
    const { startDate, endDate, focusedInput, applying, applied, assigneeId } = this.state
    const { calendar, lastPlannedDate, assignees, isHoliday } = this.props

    return (
      <Box title='Wochenplan anwenden' icon='magic' noPadding noBorder>
        <div style={userPickerStyle}>
          <UserPicker
            value={assigneeId}
            selector={{ _id: { $in: assignees.map(a => a._id) } }}
            onChange={this.handleAssigneeChange}
            placeholder={'Auf alle oben geplanten MitarbeiterInnen anwenden...'}
          />
        </div>
        <div style={containerStyle}>
          <DayPickerRangeController
            onDatesChange={this.handleDatesChange}
            onFocusChange={this.handleFocusChange}
            focusedInput={focusedInput}
            startDate={startDate}
            endDate={endDate}
            isDayBlocked={isHoliday}
            minimumNights={0}
            initialVisibleMonth={lastPlannedDate ? () => moment(lastPlannedDate) : null}
            isOutsideRange={this.isOutsideRange}
            hideKeyboardShortcutsPanel
            numberOfMonths={2}
          />
          <div style={summaryStyle}>
            {
              !applied && !startDate && !endDate &&
                <p>
                  Tage auswählen, für welche die oben geplanten Anwesenheiten gelten sollen.
                </p>
            }

            {
              applied &&
                <p>
                  <Icon name='check-circle' /> Die Arbeitszeiten sind jetzt festgelegt.
                </p>
            }

            <p>
              {
                assigneeId
                  ? <span>
                  Nur für <b>{Users.methods.fullNameWithTitle(assignees.find(a => a._id === assigneeId))}</b><br />
                    <Icon name='info-circle' /> Die Arbeitszeiten werden nur an den Tagen geändert, an welchen {Users.methods.fullNameWithTitle(assignees.find(a => a._id === assigneeId))} bereits anwesend ist.
                  </span>
                  : <span>Für alle oben geplanten MitarbeiterInnen</span>
              }
            </p>

            <p>
              {startDate && <span>
                Von <b>{formatDate(startDate)}</b><br />
              </span>}
              {endDate && <span>
                Bis <b>{formatDate(endDate)}</b><br />
              </span>}
            </p>

            {
              startDate && endDate &&
                <p>
                  <Icon name='exclamation-triangle' /> <b>Vorsicht</b> Diese Aktion kann nicht rückgängig gemacht werden.
                </p>
            }

            <div>
              <Button
                variant='contained'
                size='large'
                color='secondary'
                style={buttonStyle}
                onClick={this.applyDefaultSchedule}
                disabled={applying || !startDate || !endDate}
              >
                <Icon name='cog' spin={applying} /> Wochenplan auf die gewählten Tage im Kalender {calendar.name} anwenden
              </Button>
            </div>
          </div>
        </div>
      </Box>
    )
  }
}

const containerStyle = {
  display: 'flex'
}

const userPickerStyle = {
  padding: 10
}

const summaryStyle = {
  flex: 1,
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  padding: 25
}

const buttonStyle = {
  padding: 25,
  width: '100%'
}

const formatDate = d =>
  moment(d).format(__('time.dateFormatWeekday'))

export const ApplyDefaultSchedule = withTracker(composer)(ApplyDefaultScheduleComponent)
