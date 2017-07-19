import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import Auto from '../../util/schema/auto'

module.exports = new SimpleSchema
  tag:
    type: String
    unique: true
    index: 1

  order:
    type: Number
    optional: true

  length:
    type: Number
    optional: true

  description:
    type: String
    optional: true

  color:
    type: String
    optional: true

  reportAs:
    type: String
    allowedValues: [ 'surgery', 'new', 'recall', 'cautery' ]
    optional: true

  external:
    type: [ String ]
    optional: true
    index: 1

  createdBy:
    type: String
    regEx: SimpleSchema.RegEx.Id
    autoValue: Auto.createdBy
    optional: true

  createdAt:
    type: Date
    autoValue: Auto.createdAt
    index: 1
    optional: true