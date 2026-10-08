import { requestBackend } from '../../utils/backend-api'

export default defineEventHandler(async (event) => {
  return requestBackend(event, '/auth/password', {
    method: 'POST',
    body: await readBody(event)
  })
})
