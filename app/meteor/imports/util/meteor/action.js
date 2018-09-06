import { Meteor } from 'meteor/meteor'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin'
import { Roles } from 'meteor/alanning:roles'
import { check, Match } from 'meteor/check'

export const action = ({ name, args = {}, roles, allowAnonymous, fn }) => {
  if (!name) {
    throw new Error('Action needs a name')
  }

  if ((!roles || roles.length === 0) && !allowAnonymous) {
    throw new Error(`Action ${name} needs an array of roles, or allowAnonymous: true`)
  }

  return new ValidatedMethod({
    name,
    mixins: [CallPromiseMixin],
    validate (unsafeArgs = {}) {
      check(unsafeArgs, args)
    },
    run: function (safeArgs) {
      if (!allowAnonymous) {
        if (!Roles.userIsInRole(this.userId, roles)) {
          throw new Meteor.Error(403, 'Not authorized')
        }
      }

      // Validate clientKey and permissions
      // if (this.connection && !this.userId) {
      //   throw new Meteor.Error(403, 'Not authorized')
      // }

      return fn.call(this, safeArgs)
    }
  })
}
