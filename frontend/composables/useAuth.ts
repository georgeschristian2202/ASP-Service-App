export interface User {
  id: string
  username: string
  email: string
  role: string
}

export interface LoginCredentials {
  username: string
  password: string
}

export const useAuth = () => {
  const user = useState<User | null>('auth-user', () => null)
  const isAuthenticated = computed(() => !!user.value)
  const isLoading = useState('auth-loading', () => false)

  // Se connecter
  const login = async (credentials: LoginCredentials) => {
    isLoading.value = true
    
    try {
      const { data, error } = await useFetch('/api/auth/login', {
        method: 'POST',
        body: credentials
      })

      if (error.value) {
        throw new Error(error.value.statusMessage || 'Erreur de connexion')
      }

      if (data.value?.success && data.value.user) {
        user.value = data.value.user
        return { success: true }
      }

      throw new Error('Identifiants incorrects')
    } catch (error: any) {
      console.error('Login error:', error)
      return {
        success: false,
        error: error.message || 'Erreur lors de la connexion'
      }
    } finally {
      isLoading.value = false
    }
  }

  // Se déconnecter
  const logout = async () => {
    isLoading.value = true
    
    try {
      await useFetch('/api/auth/logout', {
        method: 'POST'
      })

      user.value = null
      
      // Rediriger vers la page de login
      await navigateTo('/admin/login')
      
      return { success: true }
    } catch (error: any) {
      console.error('Logout error:', error)
      return {
        success: false,
        error: error.message || 'Erreur lors de la déconnexion'
      }
    } finally {
      isLoading.value = false
    }
  }

  // Récupérer l'utilisateur actuel
  const fetchUser = async () => {
    isLoading.value = true
    
    try {
      const { data, error } = await useFetch('/api/auth/me')

      if (error.value || !data.value?.success) {
        user.value = null
        return { success: false }
      }

      user.value = data.value.user
      return { success: true }
    } catch (error) {
      console.error('Fetch user error:', error)
      user.value = null
      return { success: false }
    } finally {
      isLoading.value = false
    }
  }

  return {
    user: readonly(user),
    isAuthenticated,
    isLoading: readonly(isLoading),
    login,
    logout,
    fetchUser
  }
}
