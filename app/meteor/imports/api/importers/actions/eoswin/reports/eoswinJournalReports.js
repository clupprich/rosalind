import { Meteor } from 'meteor/meteor'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import { processJournal, mapUserIds } from '../../../../reports/methods/external/eoswin'
import { Reports } from '../../../../reports'
import { Users } from '../../../../users'

export const eoswinJournalReports = ({ Importers }) => {
  return new ValidatedMethod({
    name: 'importers/eoswinJournalReports',

    validate: new SimpleSchema({
      importer: { type: String, optional: true, allowedValues: [ 'eoswinJournalReports' ] },
      name: { type: String },
      content: { type: String }
    }).validator(),

    run ({ name, content }) {
      try {
        if (this.isSimulation) { return }
        if (!Meteor.userId()) { return }

        const mapIds = mapUserIds({ Users })

        const addendum = processJournal(mapIds)(content, name)
        Reports.actions.generate.call({ day: addendum.day, addendum })
      } catch (e) {
        console.error(e.message, e.stack)
        throw e
      }
    }
  })
}