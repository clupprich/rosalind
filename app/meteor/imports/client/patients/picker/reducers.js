import {
  PATIENT_CHANGE_INPUT_VALUE,
  PATIENT_CHANGE_VALUE
} from './actions'

export default (state, action) => {
  if (typeof state === 'undefined') {
    return {
      inputValue: '',
      patient: null,
      isUpserting: false
    }
  }

  switch (action.type) {
    case PATIENT_CHANGE_INPUT_VALUE:
      // Keep inputValue untouched when dropdown is closed, blurred, or a selection is made
      if (action.fieldAction === 'input-change') {
        return {
          ...state,
          patient: null,
          isUpserting: false,
          inputValue: action.inputValue
        }
      } else {
        return state
      }
    case PATIENT_CHANGE_VALUE:
      if (action.patient) {
        return {
          ...state,
          patient: action.patient,
          isUpserting: true
        }
      } else {
        return {
          ...state,
          patient: null,
          isUpserting: false
        }
      }
    default:
      return state
  }
}