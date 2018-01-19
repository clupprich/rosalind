import { connect } from 'react-redux'
import { reduxForm, formValueSelector } from 'redux-form'
import { validate } from './newAppointmentValidators'
import { NewAppointmentFields } from './NewAppointmentFields'
import { fields as patientFields } from '../../patients/fields'
import { mapStateToProps as mapPatientStateToProps } from '../../patients/mapStateToProps'
import { translateObject } from '../../components/form/translateObject'

const formName = 'newAppointment'

let NewAppointmentForm = reduxForm({
  form: formName,
  enableReinitialize: true,
  updateUnregisteredFields: true,
  keepDirtyOnReinitialize: true,
  pure: false,
  fields: [
    'tags',
    'appointmentNote',
    ...patientFields
  ],
  validate: (values) => translateObject(validate(values))
})(NewAppointmentFields)

const selector = formValueSelector(formName)
NewAppointmentForm = connect(mapPatientStateToProps(selector))(NewAppointmentForm)

export { NewAppointmentForm }
