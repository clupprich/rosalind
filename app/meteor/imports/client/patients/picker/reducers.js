import { PATIENT_CHANGE_INPUT_VALUE } from './actions'

export default (state, action) => {
  if (typeof state === 'undefined') {
    return {
      inputValue: ''
    }
  }

  switch (action.type) {
    case PATIENT_CHANGE_INPUT_VALUE:
      // Keep inputValue untouched when dropdown is closed, blurred, or a selection is made
      if (action.fieldAction === 'input-change') {
        return {
          ...state,
          inputValue: action.inputValue
        }
      } else {
        return state
      }
    default:
      return state
  }
}
