import React from 'react'
import map from 'lodash/map'
import uniqBy from 'lodash/uniqBy'
import identity from 'lodash/identity'
import { TAPi18n } from 'meteor/tap:i18n'
import { Birthday } from './Birthday'
import { zerofix } from 'util/zerofix'

export class PatientProfile extends React.Component {
  render () {
    const patient = this.props.patient
    if (!patient) {
      return <div>{TAPi18n.__('patients.patientNotFound')}</div>
    } else {
      return (
        <div>
          <h4>{patient.fullNameWithTitle()}</h4>
          {patient.contacts && uniqBy(patient.contacts, 'value').map((contact) => (
            <h4 key={contact.value}>{
              contact.channel === 'Phone'
              ? zerofix(contact.value)
              : contact.value
            }</h4>
          ))}
          <p><Birthday day={patient.birthday} /></p>
          {
            map(patient.address).filter(identity).map((l) => <span key={l}>{l}&emsp;</span>)
          }
          {
            patient.notes && patient.notes.length > 4 &&
              <blockquote>{patient.notes}</blockquote>
          }
        </div>
      )
    }
  }
}
