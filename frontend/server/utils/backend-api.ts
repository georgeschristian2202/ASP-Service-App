export function getBackendApiUrl(): string {
  return process.env.NUXT_BACKEND_API_URL ?? 'http://localhost:5001/api'
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
    const responseHeaders = response.headers as Headers & { getSetCookie?: () => string[] }
    const setCookies = typeof responseHeaders.getSetCookie === 'function'
      ? responseHeaders.getSetCookie()
      : [responseHeaders.get('set-cookie')].filter((value): value is string => Boolean(value))

    if (setCookies.length) {
      const forwardedProtocol = getRequestHeader(event, 'x-forwarded-proto')
        ?.split(',')[0]
        ?.trim()
        ?.toLowerCase()
      const isHttps = forwardedProtocol === 'https' || getRequestURL(event).protocol === 'https:'
      const browserCookies = isHttps
        ? setCookies.map(cookieValue => /;\s*secure(?:;|$)/i.test(cookieValue)
          ? cookieValue
          : `${cookieValue}; Secure`)
        : setCookies

      setResponseHeader(event, 'set-cookie', browserCookies)
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
