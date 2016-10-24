console.log('[Electron Native] Enabling native bindings')
{ ipcRenderer } = require 'electron'
EventEmitter = require 'eventemitter3'

try
  window.native =
    electron: process.versions.electron
    settings: null
    editSettings: -> ipcRenderer.send('settings/edit')
    log: (options) -> ipcRenderer.send('log', options)
    print: (options) -> ipcRenderer.send('window/print', options)
    events: new EventEmitter()

  require './settings'

  allowedEvents = [
    'import/dataTransfer'
  ]

  allowedEvents.map (name) ->
    ipcRenderer.on name, (event, args) ->
      console.log('[Electron Native] Received event', name, event, args)
      window.native.events.emit(name, args)

catch e
  message = '[Electron Native] Failed to load native bindings'
  console.error(message, e)
  ipcRenderer.send 'log',
    level: 'error'
    message: message
    payload:
      name: e.name
      message: e.message
      stack: e.stack
