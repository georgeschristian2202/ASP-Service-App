import { requestBackend } from '../utils/backend-api'

export default defineEventHandler(async (event) => {
  return requestBackend(event, '/contact', {
    method: 'POST',
    body: await readBody(event)
  })
})
