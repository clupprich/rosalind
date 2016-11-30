import map from 'lodash/fp/map'
import identity from 'lodash/identity'
import { startCase } from 'util/fuzzy/startCase'
import moment from 'moment'
import React from 'react'
import Select from 'react-select'
import { TAPi18n } from 'meteor/tap:i18n'
import { Search } from 'api/search'
import { Icon } from 'client/ui/components/Icon'
import { Indicator } from 'client/ui/appointments/appointment/Indicator'
import { PatientName } from './PatientName'
import { Birthday } from './Birthday'
import { getColor } from 'client/ui/tags/getColor'
import { UserHelper } from 'client/ui/users/UserHelper'
import style from './patientPickerStyle'
import { NewPatientFormFieldsContainer } from './NewPatientFormFieldsContainer'

const findPatients = (query) => {
  return Search.actions.patientsWithAppointments.callPromise({ query })
    .then(map((patient) => {
      return {
        label: `${patient.profile.lastName} ${patient.profile.firstName}`,
        value: patient._id,
        patient
      }
    })).then((options) => {
      return {
        options: [ {
          newPatient: true,
          value: 'newPatient',
          query
        }, ...options ]
      }
    })
}

class PatientSearchResult extends React.Component {
  constructor (props) {
    super(props)

    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
  }

  handleMouseDown (event) {
    event.preventDefault()
    event.stopPropagation()
    this.props.onSelect(this.props.option, event)
  }

  handleMouseEnter (event) {
    this.props.onFocus(this.props.option, event)
  }

  handleMouseMove (event) {
    if (this.props.isFocused) { return }
    this.props.onFocus(this.props.option, event)
  }

  render () {
    const { patient, newPatient, query } = this.props.option

    return (
      <div className={this.props.className}
        onMouseDown={this.handleMouseDown}
        onMouseEnter={this.handleMouseEnter}
        onMouseMove={this.handleMouseMove}
        title={this.props.option.title}>

        {
          patient && <span>
            <span className={style.name}>{patient && <PatientName patient={patient} />}&emsp;</span>
            <span className={style.birthday}>{patient && <Birthday day={patient.profile.birthday} veryShort />}</span>
            {
              patient.appointments &&
                <span className={style.appointments}>
                  {patient.appointments.map((appointment) => {
                    const start = moment(appointment.start)

                    return (
                      <span
                        key={appointment._id}
                        className={style.appointment}
                        style={{
                          borderColor: getColor(appointment.tags)
                        }}>
                        <span style={{
                          textDecoration: appointment.canceled && 'line-through'
                        }}>
                          {start.format(TAPi18n.__('time.dateFormatShort'))}
                          &nbsp;
                          {start.format(TAPi18n.__('time.timeFormat'))}
                        </span>
                        &emsp;
                        {
                          appointment.assigneeId &&
                            <span className={style.assigneeName}>
                              <UserHelper userId={appointment.assigneeId} helper="lastNameWithTitle" />
                              &emsp;
                              <Indicator appointment={appointment} />
                            </span>
                        }
                      </span>
                    )
                  })}
                </span>
            }
          </span>
        }
        {
          newPatient && <span>
            <Icon name="user-plus" />&nbsp;{TAPi18n.__('patients.thisInsert')}
            {
              query && <span>:&nbsp;{query}</span>
            }
          </span>
        }
      </div>
    )
  }
}

const PatientNameSelected = ({ value }) => (
  <div className="Select-value">
    <span className="Select-value-label">
      {value.patient && <PatientName patient={value.patient} />}
      {value.newPatient && <span><Icon name="user-plus" />&nbsp;{TAPi18n.__('patients.thisNew')}</span>}
    </span>
  </div>
)

export class PatientPicker extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      newPatient: false
    }
    this.handleQueryChange = this.handleQueryChange.bind(this)
    this.handleCloseNewPatient = this.handleCloseNewPatient.bind(this)
    this.handleOpenNewPatient = this.handleOpenNewPatient.bind(this)
  }

  // Fuzzy-parse query for pre-filling new patient form
  // TODO: Extract to method on Patients, merge with fuzzy birthday parsing
  parseQueryForAutofill (query = '') {
    const regexFemale = /^(fr\b|frau\b)/i
    const regexMale = /^(hr\b|herr\b)/i
    let autofill = {}
    let restQuery = ''

    if (query.match(regexFemale)) {
      autofill.gender = 'Female'
      restQuery = query.replace(regexFemale, '').trim()
    } else if (query.match(regexMale)) {
      autofill.gender = 'Male'
      restQuery = query.replace(regexMale, '').trim()
    } else {
      restQuery = query
    }

    const splitQuery = restQuery.split(' ')

    const possibleLastName = splitQuery[0]
    if (possibleLastName && possibleLastName.match(/[a-zA-Z]/)) {
      autofill.lastName = startCase(possibleLastName)
    }

    const possibleFirstName = splitQuery[1]
    if (possibleFirstName && possibleFirstName.match(/[a-zA-Z]/)) {
      autofill.firstName = startCase(possibleFirstName)
    }

    console.log('[PatientPicker] Autofill', { query, autofill })
    return autofill
  }

  handleQueryChange (query) {
    if (query) {
      if (query.newPatient) {
        const autofill = this.parseQueryForAutofill(query.query)
        this.handleOpenNewPatient()
        this.props.dispatch({ type: 'OPEN_NEW_PATIENT', autofill })
      } else {
        this.handleCloseNewPatient()
        this.props.dispatch({ type: 'CLOSE_NEW_PATIENT' })
      }

      if (this.props.input.onChange) {
        this.props.input.onChange(query.value ? query.value : '')
      }
    } else {
      if (this.props.input.onChange) {
        this.props.input.onChange('')
      }
      this.handleCloseNewPatient()
    }
  }

  handleOpenNewPatient () {
    this.setState({
      ...this.state,
      newPatient: true
    })
  }

  handleCloseNewPatient () {
    this.setState({
      ...this.state,
      newPatient: false
    })
  }

  render () {
    return (
      <div>
        <Select.Async
          name="patientPicker"
          value={this.props.value || this.props.input.value || ''}
          loadOptions={findPatients}
          onChange={this.handleQueryChange}
          onBlur={() => this.props.input.onBlur(this.props.input.value)}
          cache={false}
          ignoreCase={false}
          ignoreAccents={false}
          autofocus={this.props.autofocus && !this.props.value}
          placeholder={TAPi18n.__('patients.search')}
          loadingPlaceholder={TAPi18n.__('patients.searching')}
          clearValueText={TAPi18n.__('ui.clear')}
          filterOptions={identity}
          optionComponent={PatientSearchResult}
          valueComponent={PatientNameSelected} />
        {
          this.state.newPatient && <div>
            <NewPatientFormFieldsContainer />
          </div>
        }
      </div>
    )
  }
}
