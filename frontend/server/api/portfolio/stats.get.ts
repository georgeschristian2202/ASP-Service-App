import { requestBackend } from '../../utils/backend-api'

export default defineEventHandler(async (event) => {
  const response = await requestBackend(event, '/portfolio/stats')

  if (response?.success && response.stats) {
    response.stats.categories = Object.keys(response.stats.byCategory ?? {}).length
  }

  return response
})
