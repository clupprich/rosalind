import moment from 'moment-timezone'
import { dayToDate } from '../../../util/time/day'

// TODO: Get rid of the hard coded duration of 13.5 hours
const DAY_HOURS = 13.5

export const calculateScheduledHours = ({ overrideSchedules }) => {
  if (!overrideSchedules) {
    return DAY_HOURS
  }

  // Calculate the durations of each blocking override
  const blockedDurations = overrideSchedules.map((schedule) =>
    (schedule.end - schedule.start) / 1000 / 60
  )

  // Add them up
  const blockedMinutes = blockedDurations.reduce((prev, curr) => (prev + curr), 0)

  // Subtract the blocked minutes from the duration of the day
  const dayDuration = 60 * DAY_HOURS

  // Convert minutes to decimal hours
  const scheduledHours = (dayDuration - blockedMinutes) / 60

  return Math.round(100 * scheduledHours) / 100
}

export default ({ Schedules }) => {
  const getScheduledHours = ({ day, userId }) => {
    const date = moment(dayToDate(day))
    const overrideSchedules = Schedules.find({
      type: 'override',
      start: { $gt: date.startOf('day').toDate() },
      end: { $lt: date.endOf('day').toDate() },
      userId
    }).fetch()

    return calculateScheduledHours({ overrideSchedules })
  }

  return {
    getScheduledHours
  }
}