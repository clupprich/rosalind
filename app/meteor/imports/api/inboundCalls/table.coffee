import { Meteor } from 'meteor/meteor'
import Helpers from '../../util/helpers'
import { zerofix } from '../../util/zerofix'
import { firstName } from '../users/methods/name'
import InboundCalls from './collection'
import Schema from './schema'

if Meteor.isClient
  require('../../client/old/templates/comments/commentCount.tpl.jade')
  require('../../client/old/templates/inboundCalls/inboundCallsUnresolve.tpl.jade')

module.exports = new Tabular.Table
  name: 'ResolvedInboundCalls'
  collection: InboundCalls
  pub: 'inboundCalls'
  columns: [
    { data: 'firstName', title: 'Vorname' }
    { data: 'lastName', title: 'Nachname' }
    { data: 'telephone', title: 'Telefon', render: (val) -> zerofix(val) }
    { data: 'note', title: 'Notiz' }
    { data: 'privatePatient', title: 'Privat', render: (val, type, doc) -> doc.privatePatient }
    { data: 'createdAt', title: 'Angenommen', render: (val) -> moment(val).calendar() }
    { data: 'createdBy', title: 'von', render: firstName }
    { data: 'removedAt', title: 'Erledigt', render: (val) -> moment(val).calendar() }
    { data: 'removedBy', title: 'von', render: firstName }
    { title: '<i class="fa fa-commenting-o"></i>', tmpl: Meteor.isClient and Template.commentCount }
    { tmpl: Meteor.isClient and Template.inboundCallsUnresolve }
  ]
  order: [[5, 'desc'], [7, 'desc']]
  sub: new SubsManager()
  extraFields: Schema._firstLevelSchemaKeys
  responsive: true
  autoWidth: false
  stateSave: true
  changeSelector: (selector) ->
    selector.removed = true
    selector
