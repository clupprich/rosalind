import { normalizePhoneNumber } from '../../../messages/methods/normalizePhoneNumber'

const pattern = /(\d+.?)+/g

export const parseContact = (query) => {
  const match = query && query.match(pattern)

  if (!match) {
    return { result: false, remainingQuery: query }
  }

  const remainingQuery = query.replace(pattern, '').trim()

  const phone = normalizePhoneNumber(match[0].replace(/[^\d]/g, ''))

  if (phone) {
    const selector = {
      'contacts.valueNormalized': {
        $regex: '^' + phone
      }
    }
    return { result: selector, remainingQuery }
  } else {
    return { result: false, remainingQuery: query }
  }
}
