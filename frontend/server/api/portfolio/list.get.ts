import { requestBackend } from '../../utils/backend-api'

export default defineEventHandler(async (event) => {
  return requestBackend(event, '/portfolio', { query: getQuery(event) })
})
