import { compose } from 'recompose'
import { MainView } from './MainView'
import { withClientKey } from './withClientKey'
import { withPairing } from './withPairing'
import { withMedia } from './withMedia'
import { withOrientation } from './withOrientation'
import { withModeDocument } from './withModeDocument'

export const App = compose(
  withClientKey,
  withPairing,
  withMedia,
  withOrientation,
  withModeDocument
)(MainView)