import moment from 'moment-timezone'
import { Meteor } from 'meteor/meteor'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin'
import { Events } from '../../events'
import { Messages } from '../../messages'
import { getDefaultDuration } from '../methods/getDefaultDuration'

export const move = ({ Appointments }) => {
  return new ValidatedMethod({
    name: 'appointments/move',
    mixins: [CallPromiseMixin],
    validate: new SimpleSchema({
      appointmentId: { type: SimpleSchema.RegEx.Id },
      newAssigneeId: { type: SimpleSchema.RegEx.Id, optional: true },
      newStart: { type: Date }
    }).validator(),

    run ({ appointmentId, newStart, newAssigneeId }) {
      if (this.connection && !this.userId) {
        throw new Meteor.Error(403, 'Not authorized')
      }

      if (this.isSimulation) {
        return
      }

      const appointment = Appointments.findOne({ _id: appointmentId })

      if (appointment) {
        const duration = getDefaultDuration({
          calendarId: appointment.calendarId,
          assigneeId: newAssigneeId,
          date: moment(newStart),
          tags: appointment.tags
        })
        const oldStart = appointment.start
        const oldAssigneeId = appointment.assigneeId

        Appointments.update({ _id: appointmentId }, {
          $set: {
            start: newStart,
            end: moment(newStart).add(duration, 'minutes').toDate(),
            assigneeId: newAssigneeId
          },
          $push: {
            logs: {
              type: 'move',
              userId: this.userId,
              date: new Date(),
              payload: {
                oldStart,
                oldAssigneeId,
                newStart,
                newAssigneeId
              }
            }
          }
        })

        if (Meteor.isServer) {
          Messages.actions.removeReminder.call({ appointmentId })
        }

        Events.post('appointments/move', {
          appointmentId,
          oldStart,
          oldAssigneeId,
          newStart,
          newAssigneeId
        })
      } else {
        throw new Meteor.Error(404, 'Appointment not found')
      }

      return appointmentId
    }
  })
}
