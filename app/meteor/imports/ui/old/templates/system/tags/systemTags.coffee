import './systemTags.tpl.jade'
import table from '../../../../../api/tags/table'

Template.systemTags.helpers
  table: ->
    table
