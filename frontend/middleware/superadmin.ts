export default defineNuxtRouteMiddleware(async () => {
  if (import.meta.server) {
    return
  }

  const { user, fetchUser } = useAuth()

  if (!user.value) {
    await fetchUser()
  }

  if (user.value?.role !== 'superadmin') {
    return navigateTo('/admin')
  }
})
