electron = require 'app'
updater = require './updater'
window = require './window'
logger = require './logger'
settings = require './settings'
cli = require './cli'
bdt = require './bdt'
authentication = require './authentication'

mainWindow = null
bdtWatcher = null

start = ->
  logger.start()

  return electron.quit() if updater.handleStartupEvent()
  return electron.quit() if cli.handleStartupEvent(focus)

  electron.on 'ready', ->
    setTimeout(updater.check, 15 * 1000)
    mainWindow = window.open()
    bdtWatcher = bdt.watch(ipcReceiver: mainWindow)

    authentication.initialize(ipcReceiver: mainWindow)

  electron.on 'window-all-closed', ->
    bdtWatcher.close()
    electron.quit()

focus = ->
  return unless mainWindow
  mainWindow.restore() if mainWindow.isMinimized()
  mainWindow.focus()

start()
