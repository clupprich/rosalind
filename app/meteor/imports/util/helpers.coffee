import moment from 'moment-timezone'
import { Mongo } from 'meteor/mongo'
import { Spacebars } from 'meteor/spacebars'
import { TAPi18n } from 'meteor/tap:i18n'
import Time from './time'
import { Users } from '../api/users'
import { Comments } from '../api/comments'

module.exports =
  person: (idOrUsername, collection) ->
    if idOrUsername and typeof idOrUsername.collection is 'function'
      idOrUsername

    else if collection
      collection = Mongo.Collection.get(collection)
      collection.findOne(_id: idOrUsername)

    else
      Users.methods.findOneByIdOrUsername(idOrUsername)

  findOneByIdAndCollection: (id, collection) ->
    return id if typeof id is 'object'
    collection = Mongo.Collection.get(collection) if typeof collection is 'string'
    collection.findOne(id)

  floor: (number) ->
    return unless number
    Math.floor(number)

  roundToTwo: (number) ->
    return unless number
    parseFloat(parseFloat(number).toFixed(2))

  roundToOne: (number) ->
    return unless number
    parseFloat(parseFloat(number).toFixed(1))

  calendar: (date) ->
    moment(date).calendar()

  calendarDay: (day) ->
    date = moment(Time.dayToDate(day))
    Time.date(date, weekday: true)

  birthday: (date) ->
    return unless date

    date = Time.zeroIndexMonth(date)

    date = moment(date)
    return if date < moment().subtract(150, 'years')

    age = moment().diff(date, 'years')
    formatted = Time.date(date, weekday: false)
    "#{formatted} (#{age} Jahre)"

  weekOfYear: (date) ->
    return unless date
    if date.year and date.month and date.day
      date = Time.dayToDate(date)

    weekOfYear = moment(date).format('W')
    [TAPi18n.__('ui.weekOfYear'), weekOfYear].join(' ')


  stringify: (blob, pretty = true) ->
    if blob
      try
        if pretty
          JSON.stringify(blob, null, 2)
        else
          JSON.stringify(blob)
      catch e
        blob

  formatInsuranceId: (str) ->
    return unless str
    return str.slice(0, 4) if str.length is 10
    return str

  noValue: ->
    noValue = TAPi18n.__('ui.noValue')
    noValue = '<span class="text-muted">' + noValue + '</span>'
    Spacebars.SafeString(noValue)
