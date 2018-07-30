import events from './events'
import clientKey from './clientKey'
import update from './update'
import peripherals from './peripherals'

export default () => {
  events()
  clientKey()
  update()
  peripherals()
}