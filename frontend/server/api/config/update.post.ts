import { requestBackend } from '../../utils/backend-api'

export default defineEventHandler(async (event) => {
  return requestBackend(event, '/config', {
    method: 'POST',
    body: await readBody(event)
  })
})
