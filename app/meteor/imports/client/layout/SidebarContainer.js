import identity from 'lodash/identity'
import { withTracker } from '../components/withTracker'
import { withRouter } from 'react-router-dom'
import { Meteor } from 'meteor/meteor'
import { Counts } from 'meteor/tmeasday:publish-counts'
import { Calendars } from '../../api/calendars'
import { InboundCallsTopics, InboundCalls } from '../../api/inboundCalls'
import { Sidebar } from './Sidebar'
import { hasRole } from '../../util/meteor/hasRole'

const sidebarItems = ({ history }) => {
  const calendars = Calendars.find({}, { sort: { order: 1 } }).fetch()
  const inboundCallsTopics = InboundCallsTopics.find({}, { sort: { order: 1 } }).fetch()

  return [
    {
      name: 'patients.thisNext',
      link: '/waitlist',
      icon: 'angle-double-right',
      roles: ['waitlist', 'waitlist-all', 'admin']
    },
    ...calendars.map((c, i) => ({
      shouldNavigateHereAfterLoad: (i === 0),
      label: c.name,
      color: c.color,
      icon: c.icon,
      link: '/appointments/' + c.slug,
      slug: c.slug,
      roles: [`calendar-${c.slug}`, 'calendars'],
      // replace calendar slug and keep selected date
      onClick: ({ item, location }) => {
        const [base, _calendar, date] = location.pathname // eslint-disable-line
          .split('/').filter(x => x.length > 0)

        const newPath =
          base === 'appointments'
            ? '/' + [base, item.slug, date].filter(identity).join('/')
            : item.link

        history.push(newPath)
      }
    })),
    {
      separator: true
    },
    {
      name: 'inboundCalls',
      icon: 'phone',
      roles: ['admin', 'inboundCalls'],
      countBadge: 'inboundCalls',
      subItems: [
        {
          name: 'thisOpen',
          badge: inboundCallsTopics.length > 0
            ? InboundCalls.find({ topicId: null }).count()
            : null
        },
        ...inboundCallsTopics.map(t => ({
          badge: InboundCalls.find({ topicId: t._id }).count(),
          label: t.labelShort || t.label,
          path: `/topic/${t.slug}`
        })),
        { name: 'thisResolved', path: '/resolved' },
        { name: 'thisNew', path: '/new' }
      ]
    },
    {
      name: 'schedules',
      icon: 'clock-o',
      roles: ['admin', 'schedules-edit'],
      subItems: [
        ...calendars.map(c => ({
          name: c.slug,
          label: c.name,
          path: '/default/' + c.slug,
          slug: c.slug
        })),
        { name: 'commonHolidays', path: '/holidays' },
        { name: 'constraints', path: '/constraints' }
      ]
    },
    {
      name: 'reports',
      icon: 'bar-chart',
      roles: ['admin', 'reports'],
      subItems: [
        { name: 'dashboard', path: '/day' },
        { name: 'assignees', path: '/assignee' },
        { name: 'referrals', path: '/referrals' }
      ]
    },
    {
      name: 'users',
      icon: 'unlock-alt',
      roles: ['admin', 'users-edit'],
      subItems: [
        { name: 'thisAll' },
        { name: 'thisNew', path: '/new' }
      ]
    },
    {
      name: 'patients',
      icon: 'user-plus',
      roles: ['admin', 'patients'],
      subItems: [
        { name: 'thisUpsert' }
      ]
    },
    {
      name: 'system',
      icon: 'server',
      roles: ['admin', 'system'],
      subItems: [
        { name: 'thisTags', path: '/tags' },
        { name: 'thisCalendars', path: '/calendars' },
        { name: 'missingConsents', path: '/consents' },
        { name: 'thisClients', path: '/clients' },
        { name: 'thisTemplates', path: '/templates' },
        { name: 'thisEvents', path: '/events' },
        { name: 'thisMediaTags', path: '/mediaTags' },
        { name: 'thisInboundCallsTopics', path: '/inboundCallsTopics' },
        { name: 'thisReferrables', path: '/referrables' },
        { name: 'thisMessages', path: '/messages' },
        { name: 'thisSettings', path: '/settings' },
      ]
    }
  ]
}

let didNavigationAfterLoad = false

const navigateAfterLoadToItem = (items) => {
  items.find()
}


const composer = (props) => {
  const items = sidebarItems(props).filter((item) => {
    return (!item.roles || (item.roles && hasRole(Meteor.userId(), item.roles)))
  }).map((item) => {
    if (item.countBadge) {
      const count = Counts.get(item.countBadge)
      return { ...item, count }
    } else {
      return item
    }
  })

  // Don't navigate away when custom url was loaded
  if (!didNavigationAfterLoad && window.location.pathname !== '/') {
    console.log('[Sidebar] Will not navigate away from', window.location.pathname)
    didNavigationAfterLoad = true
  }

  if (!didNavigationAfterLoad && items && (items.find(i => i.shouldNavigateHereAfterLoad && i.link) || (items.length >= 1 && items[0].link))) {
    const item = (items.find(i => i.shouldNavigateHereAfterLoad) || items[0])
    console.log('[Sidebar] Navigating to first item', item.link)
    didNavigationAfterLoad = true
    props.history.replace(item.link)
  }

  const customerName = Meteor.settings.public.CUSTOMER_NAME || 'Rosalind Development'

  return { ...props, items, customerName }
}

export const SidebarContainer = withRouter(withTracker(composer)(Sidebar))
