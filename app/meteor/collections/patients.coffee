@Patients = new Mongo.Collection('patients')
Ground.Collection(Patients)

Schema.Patients = new SimpleSchema
  externalId:
    type: String
    optional: true
    index: 1

  insuranceId:
    type: String
    optional: true
    index: 1

  profile:
    type: Schema.Profile
    optional: true

  importedAt:
    type: Date
    optional: true

  importedBy:
    type: SimpleSchema.RegEx.Id
    optional: true

  createdAt:
    type: Date
    autoValue: Util.autoCreatedAt
    optional: true

  createdBy:
    type: SimpleSchema.RegEx.Id
    autoValue: Util.autoCreatedBy
    optional: true

TabularTables.Patients = new Tabular.Table
  name: 'Patients'
  collection: Patients
  pub: 'patients'
  columns: [
    { data: 'profile.lastName', title: 'Name', render: (val) -> Helpers.getFullNameWithTitle(val) }
    { title: '<i class="fa fa-commenting-o"></i>', tmpl: Meteor.isClient and Template.commentCount }
  ]
  order: [[0, 'desc']]
  sub: new SubsManager()
  extraFields: Schema.Patients._firstLevelSchemaKeys
  responsive: true
  autoWidth: false
  stateSave: true
  changeSelector: (selector) ->
    selector.removed = true
    selector


Meteor.startup ->
  Patients.attachSchema(Schema.Patients)
  Patients.attachBehaviour('softRemovable')
