import { requestBackend } from '../../utils/backend-api'

export default defineEventHandler(async (event) => {
  return requestBackend(event, '/auth/login', {
    method: 'POST',
    body: await readBody(event)
  })
})
