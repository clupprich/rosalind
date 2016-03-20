@Helpers ||= {}

Helpers.person = (idOrUsername, collection) ->
  if idOrUsername and typeof idOrUsername.collection is 'function'
    idOrUsername

  else if collection
    collection = Mongo.Collection.get(collection)
    collection.findOne(_id: idOrUsername)

  else
    Meteor.users.findOneByIdOrUsername(idOrUsername)

Helpers.findOneByIdAndCollection = (id, collection) ->
  return id if typeof id is 'object'
  collection = Mongo.Collection.get(collection) if typeof collection is 'string'
  collection.findOne(id)

Helpers.getFirstName = (user, collection) ->
  Helpers.person(user, collection)?.firstName()

Helpers.getFullName = (user, collection) ->
  Helpers.person(user, collection)?.fullName()

Helpers.getFullNameWithTitle = (user, collection) ->
  Helpers.person(user, collection)?.fullNameWithTitle()

Helpers.getShortname = (user, collection) ->
  Helpers.person(user, collection)?.shortname()

Helpers.floor = (number) ->
  return unless number
  Math.floor(number)

Helpers.roundToTwo = (number) ->
  return unless number
  parseFloat(parseFloat(number).toFixed(2))

Helpers.roundToOne = (number) ->
  return unless number
  parseFloat(parseFloat(number).toFixed(1))

Helpers.calendar = (date) ->
  moment(date).calendar()

Helpers.calendarDay = (day) ->
  date = moment(Time.dayToDate(day))
  Time.date(date, weekday: true)

Helpers.recent = (date) ->
  moment().range(date, moment()).diff('hours') < 4

Helpers.birthday = (date) ->
  return unless date

  date = Time.zeroIndexMonth(date)

  date = moment(date)
  return if date < moment().subtract(150, 'years')

  age = moment().diff(date, 'years')
  formatted = Time.date(date, weekday: false)
  "#{formatted} (#{age} Jahre)"

Helpers.weekOfYear = (date) ->
  return unless date
  if date.year and date.month and date.day
    date = Time.dayToDate(date)

  weekOfYear = moment(date).format('W')
  [TAPi18n.__('ui.weekOfYear'), weekOfYear].join(' ')

Helpers.parseNewlines = (text) ->
  return unless text and typeof text is 'string'
  text
    .split('\\r\\n').join('\n')
    .split('\\r').join('\n')
    .split('\\n').join('\n')

# Split phone number at whitespaces. If the word contains a number,
# replace all letters 'O' or 'o' with zeroes. Join back together.
Helpers.zerofix = (telephone) ->
  return unless telephone?
  telephone = _.map telephone.split(/\s/g), (word) ->
    if word.match(/\d/g)
      word.replace(/o/gi, '0')
    else word
  telephone = telephone.join(' ')

  # If it's just a long string of digits, split into groups of 4
  if (telephone.indexOf(' ') is -1 and telephone.match(/\d/g))
    telephone.match(/.{1,4}/g).join(' ')
  else
    telephone

Helpers.stringify = (blob, pretty = true) ->
  if blob
    try
      if pretty
        JSON.stringify(blob, null, 2)
      else
        JSON.stringify(blob)
    catch e
      blob

Helpers.formatInsuranceId = (str) ->
  return unless str
  return str.slice(0, 4) if str.length is 10
  return str

Helpers.noValue = ->
  noValue = TAPi18n.__('ui.noValue')
  noValue = '<span class="text-muted">' + noValue + '</span>'
  Spacebars.SafeString(noValue)


if Meteor.isClient
  UI.registerHelper('getFirstName', (context) -> Helpers.getFirstName(context))
  UI.registerHelper('getFullName', (context) -> Helpers.getFullName(context))
  UI.registerHelper('getFullNameWithTitle', (context) -> Helpers.getFullNameWithTitle(context))
  UI.registerHelper('getShortname', (context) -> Helpers.getShortname(context))
  UI.registerHelper('floor', (context) -> Helpers.floor(context))
  UI.registerHelper('roundToOne', (context) -> Helpers.roundToOne(context))
  UI.registerHelper('roundToTwo', (context) -> Helpers.roundToTwo(context))
  UI.registerHelper('calendar', (context) -> Helpers.calendar(context))
  UI.registerHelper('calendarDay', (context) -> Helpers.calendarDay(context))
  UI.registerHelper('weekOfYear', (context) -> Helpers.weekOfYear(context))
  UI.registerHelper('recent', (context) -> Helpers.recent(context))
  UI.registerHelper('birthday', (context) -> Helpers.birthday(context))
  UI.registerHelper('zerofix', (context) -> Helpers.zerofix(context))
  UI.registerHelper('stringify', (context) -> Helpers.stringify(context))
  UI.registerHelper('formatInsuranceId', (context) -> Helpers.formatInsuranceId(context))
  UI.registerHelper('customerName', -> Customer?.get('name'))
  UI.registerHelper('true', -> true)
  UI.registerHelper('false', -> false)
