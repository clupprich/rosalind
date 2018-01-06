import { editNote } from './editNote'
import { upsert } from './upsert'
import { findOne } from './findOne'
import { setMessagePreferences } from './setMessagePreferences'
import { toggleGender } from './toggleGender'
import { setBirthday } from './setBirthday'

export default function ({ Patients }) {
  return {
    editNote: editNote({ Patients }),
    upsert: upsert({ Patients }),
    findOne: findOne({ Patients }),
    setMessagePreferences: setMessagePreferences({ Patients }),
    toggleGender: toggleGender({ Patients }),
    setBirthday: setBirthday({ Patients })
  }
}
