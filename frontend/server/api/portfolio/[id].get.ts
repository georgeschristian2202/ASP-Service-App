import { requestBackend } from '../../utils/backend-api'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID requis.' })
  }

  return requestBackend(event, `/portfolio/${encodeURIComponent(id)}`)
})
