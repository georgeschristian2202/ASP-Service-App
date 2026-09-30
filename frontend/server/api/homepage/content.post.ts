import { requestBackend } from '../../utils/backend-api'

export default defineEventHandler(async (event) => {
  return requestBackend(event, '/pages/homepage', {
    method: 'POST',
    body: await readBody(event)
  })
})
