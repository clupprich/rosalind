import React from 'react'
import moment from 'moment'
import { TAPi18n } from 'meteor/tap:i18n'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import { TagsList } from 'client/ui/tags/TagsList'
import { Stamps } from 'client/ui/helpers/Stamps'
import { Icon } from 'client/ui/components/Icon'
import { PatientProfileContainer } from 'client/ui/patients/PatientProfileContainer'
import { PastAppointmentsContainer } from 'client/ui/patients/PastAppointmentsContainer'
import { InlineEdit } from 'client/ui/components/form/InlineEdit'

export class AppointmentInfo extends React.Component {
  render () {
    const appointment = this.props.appointment

    return (
      <div>
        <div className="row">
          <div className="col-md-5">
            <div className="enable-select">
              <h4>
                {moment(appointment.start).format(TAPi18n.__('time.dateFormatWeekday'))}<br />
                {TAPi18n.__('time.at')} <b>{moment(appointment.start).format(TAPi18n.__('time.timeFormat'))}</b> - {moment(appointment.end).format(TAPi18n.__('time.timeFormat'))}
              </h4>
              <h4 className="text-muted">
                {
                  this.props.assignee
                  ? <span>{TAPi18n.__('appointments.assignedTo')} <b>{this.props.assignee.fullNameWithTitle()}</b></span>
                  : TAPi18n.__('appointments.unassigned')
                }
              </h4>
              <p><TagsList tags={appointment.tags} />&nbsp;</p>
              <blockquote>
                <InlineEdit
                  onChange={this.props.editNote}
                  value={appointment.notes()}
                  rows={3}
                  label={TAPi18n.__('appointments.form.note.label')}
                  />
              </blockquote>
            </div>

            <br />

            {
              appointment.admitted
              ? <RaisedButton
                label={<span><Icon name="check" />&emsp;{TAPi18n.__('appointments.admit')}</span>}
                backgroundColor={'#C5E1A5'}
                onClick={this.props.unsetAdmitted} />
              : <RaisedButton
                label={<span><Icon name="check" />&emsp;{TAPi18n.__('appointments.admit')}</span>}
                onClick={this.props.setAdmitted} />
            }
            {
              appointment.canceled
              ? <RaisedButton
                label={<span>{TAPi18n.__('appointments.cancel')}&emsp;<Icon name="times" /></span>}
                backgroundColor={'#e4e3e3'}
                onClick={this.props.unsetCanceled} />
              : <RaisedButton
                label={<span>{TAPi18n.__('appointments.cancel')}&emsp;<Icon name="times" /></span>}
                onClick={this.props.setCanceled} />
            }

            <br />
            <br />

            <FlatButton
              label={<span><Icon name="arrows" />&emsp;{TAPi18n.__('appointments.move')}</span>}
              onClick={this.props.startMove} />

            <br />
            <br />

            <FlatButton
              label={<span><Icon name="trash-o" />&emsp;{TAPi18n.__('appointments.softRemove')}</span>}
              onClick={this.props.softRemove} />

          </div>

          {
            appointment.patientId &&
              <div className="col-md-7 enable-select">
                <PatientProfileContainer patientId={appointment.patientId} />
                <PastAppointmentsContainer patientId={appointment.patientId} excludeAppointmentId={appointment._id} />
              </div>
          }
        </div>
        <div className="row">
          <div className="col-md-12">
            <br />
            <Stamps fields={['removed', 'created', 'admitted', 'canceled']} doc={appointment} />
          </div>
        </div>
      </div>
    )
  }
}
