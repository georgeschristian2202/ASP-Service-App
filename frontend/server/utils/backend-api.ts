export function getBackendApiUrl(): string {
  return process.env.NUXT_BACKEND_API_URL ?? 'http://localhost:5000/api'
}

export async function requestBackend(
  event: Parameters<typeof getRequestHeader>[0],
  path: string,
  options: Record<string, any> = {}
) {
  const cookie = getRequestHeader(event, 'cookie')
  const headers = { ...(options.headers ?? {}) } as Record<string, string>

  if (cookie) {
    headers.cookie = cookie
  }

  try {
    const response = await $fetch.raw(`${getBackendApiUrl()}${path}`, {
      ...options,
      headers
    })
    const setCookie = response.headers.get('set-cookie')

    if (setCookie) {
      setResponseHeader(event, 'set-cookie', setCookie)
    }

    return response._data
  } catch (error: any) {
    const message = error.data?.message ?? 'Erreur de communication avec l’API.'

    throw createError({
      statusCode: error.response?.status ?? 502,
      message
    })
  }
}
