import { requestBackend } from '../../utils/backend-api'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body?.id) {
    throw createError({ statusCode: 400, statusMessage: 'ID requis.' })
  }

  return requestBackend(event, `/portfolio/${encodeURIComponent(body.id)}`, {
    method: 'DELETE'
  })
})
