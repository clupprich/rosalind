import { InboundCalls } from '../'
import flatten from 'lodash/flatten'
import moment from 'moment'
import { Comments } from '../../comments'
import { publish, publishComposite, publishCompositeTable } from '../../../util/meteor/publish'
import { Counts } from 'meteor/tmeasday:publish-counts'

export default () => {
  publish({
    name: 'inboundCalls-counts',
    roles: ['inboundCalls'],
    fn: function () {
      Counts.publish(this, 'inboundCalls', InboundCalls.find({}))
      Counts.publish(this, 'inboundCalls-resolvedToday', InboundCalls.find({
        removed: true,
        removedAt: { $gte: moment().startOf('day').toDate() }
      }))
      return undefined
    }
  })

  publishComposite({
    name: 'inboundCalls',
    roles: ['inboundCalls'],
    fn: function () {
      this.unblock()
      return {
        find: function () {
          this.unblock()
          return InboundCalls.find({ removed: { $ne: true } })
        },
        children: [
          {
            find: function (inboundCall) {
              return Comments.find({ docId: inboundCall._id })
            }
          }
        ]
      }
    }
  })

  publishComposite({
    name: 'inboundCalls-resolved',
    roles: ['inboundCalls'],
    args: {
      query: String
    },
    fn: function ({ query }) {
      this.unblock()

      const selector =
        query && query.length > 3
        ? {
          $or: flatten(query.split(' ').map(word => [
            { lastName: { $regex: '^' + word, $options: 'i' } },
            { note: { $regex: word, $options: 'i' } },
            { telephone: { $regex: word, $options: 'i' } },
            { firstName: { $regex: '^' + word, $options: 'i' } }
          ]))
        } : {
          removed: true
        }

      return {
        find: function () {
          this.unblock()
          return InboundCalls.find(selector, {
            sort: {
              removedAt: -1
            },
            removed: true,
            limit: 20
          })
        },
        children: [
          {
            find: function (inboundCall) {
              return Comments.find({ docId: inboundCall._id })
            }
          }
        ]
      }
    }
  })

  publishCompositeTable({
    name: 'inboundCalls-table',
    roles: ['inboundCalls'],
    args: {
      ids: [String]
    },
    fn: function ({ ids }) {
      this.unblock()
      return {
        find: function () {
          this.unblock()
          return InboundCalls.find({ _id: { $in: ids } }, { removed: true })
        },
        children: [
          {
            find: function (inboundCall) {
              return Comments.find({ docId: inboundCall._id })
            }
          }
        ]
      }
    }

  })
}
