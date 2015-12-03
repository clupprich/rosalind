_ = require 'underscore'
electron = require 'app'
BrowserWindow = require 'browser-window'

DEV = _.contains(process.argv, '--dev')?

module.exports =
  open: ->
    screen = require 'screen'
    display = screen.getPrimaryDisplay().workAreaSize

    mainWindow = new BrowserWindow
      x: display.x,
      y: display.y,
      width: display.width,
      height: display.height,
      'min-width': 560,
      'min-height': 426,
      'disable-auto-hide-cursor': true,
      'node-integration': DEV,
      'preload': require.resolve('../renderer/native.js'),
      'web-preferences':
        'text-areas-are-resizable': false,
        'experimental-canvas-features': true,
        'subpixel-font-scaling': true,
        'overlay-scrollbars': false

    mainWindow.loadURL('http://127.0.0.1:3000')
    mainWindow.maximize()

    mainWindow.webContents.openDevTools() if DEV?

    mainWindow.on 'closed', ->
      electron.quit()
