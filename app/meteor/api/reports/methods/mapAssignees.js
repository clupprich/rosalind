import mapValues from 'lodash/fp/mapValues'
import groupBy from 'lodash/fp/groupBy'
import { calculateScheduledHours } from '../../schedules/methods/getScheduledHours'

const mapWorkload = ({ hours, appointments }) => {
  const available = hours.planned * 12
  const planned = appointments.length

  return {
    available,
    planned
  }
}

const mapHours = ({ assigneeId, overrideSchedules }) => {
  return {
    planned: calculateScheduledHours({ overrideSchedules })
  }
}

const mapAppointments = ({ assigneeId, appointments, hours }) => {
  // Group by first tag
  // TOOD: Check if the first tag is also the one with the highest priority
  const appointmentsByTags = groupBy((a) => a.tags && a.tags[0] || null)(appointments)

  const byTags = mapValues((appointments) => {
    const planned = appointments.length
    const plannedPerHour = planned / hours.planned

    return {
      planned,
      plannedPerHour
    }
  })(appointmentsByTags)

  const planned = appointments.length
  const plannedPerHour = planned / hours.planned

  return {
    total: {
      planned,
      plannedPerHour
    },
    ...byTags
  }
}

const mapAssignee = ({ assigneeId, appointments, overrideSchedules }) => {
  const hours = mapHours({ assigneeId, overrideSchedules })
  const workload = mapWorkload({ hours, appointments })
  const patients = mapAppointments({ assigneeId, appointments, hours })

  return {
    assigneeId,
    patients,
    hours,
    workload
  }
}

export const mapAssignees = ({ appointments, overrideSchedules }) => {
  const appointmentsByAssignees = groupBy('assigneeId')(appointments)

  // Set id of unassigned appointments to the string 'null'
  if (appointmentsByAssignees['undefined']) {
    appointmentsByAssignees.null = appointmentsByAssignees['undefined']
    delete appointmentsByAssignees['undefined']
  }

  const overrideSchedulesByAssignees = groupBy('assigneeId')(overrideSchedules)

  return Object.keys(appointmentsByAssignees).map((assigneeId) => {
    return mapAssignee({
      assigneeId,
      appointments: appointmentsByAssignees[assigneeId],
      overrideSchedules: overrideSchedulesByAssignees[assigneeId]
    })
  })
}
