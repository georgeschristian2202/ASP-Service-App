import { requestBackend } from '../../utils/backend-api'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const search = new URLSearchParams()

  for (const [key, value] of Object.entries(query)) {
    if (typeof value === 'string') search.set(key, value)
  }

  return requestBackend(event, `/audit${search.size ? `?${search}` : ''}`)
})
