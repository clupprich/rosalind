map = require 'lodash/map'
{ Users } = require 'api/users'
{ Groups } = require 'api/groups'
{ UpdatePassword, UpdateRoles } = require 'api/users/schema/actions'
schema = require 'api/users/schema/users'

Template.editUser.helpers
  user: ->
    Users.findOne(FlowRouter.current().params._id)

  collection: ->
    Users

  schema: ->
    schema

  updatePassword: ->
    UpdatePassword

  updateRoles: ->
    UpdateRoles

  groups: ->
    map(Groups.methods.all(), (g) -> { label: g.name, value: g._id })

AutoForm.hooks
  editUserForm:
    onSuccess: -> FlowRouter.go('/users/')

  updatePasswordUserForm:
    onSuccess: -> FlowRouter.go('/users/')

  updateRolesUserForm:
    onSuccess: -> FlowRouter.go('/users/')
