{ InboundCalls } = require 'api/inboundCalls'

Template.inboundCalls.onCreated ->
  @autorun =>
    @subscribe('inboundCalls')

Template.inboundCalls.helpers
  inboundCalls: ->
    InboundCalls.find({})
