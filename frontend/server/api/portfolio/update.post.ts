import { requestBackend } from '../../utils/backend-api'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body?.id) {
    throw createError({ statusCode: 400, statusMessage: 'ID requis.' })
  }

  const id = body.id
  const data = {
    title: body.title,
    category: body.category,
    service: body.service,
    description: body.description,
    imageUrl: body.imageUrl,
    imagePath: body.imagePath,
    tags: body.tags,
    featured: body.featured,
    orderIndex: body.orderIndex
  }

  return requestBackend(event, `/portfolio/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: data
  })
})
