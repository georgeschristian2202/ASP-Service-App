export interface User {
  id: string
  username: string
  email: string
  role: 'superadmin' | 'admin' | 'editor'
}

export interface LoginCredentials {
  username: string
  password: string
}

export type LoginErrorType = 'credentials' | 'rate_limit' | 'server' | 'validation' | 'unknown'

interface LoginResponse {
  success: boolean
  user?: User
  message?: string
}

export const useAuth = () => {
  const user = useState<User | null>('auth-user', () => null)
  const isAuthenticated = computed(() => !!user.value)
  const isSuperAdmin = computed(() => user.value?.role === 'superadmin')
  const isLoading = useState('auth-loading', () => false)

  // Se connecter
  const login = async (credentials: LoginCredentials) => {
    isLoading.value = true

    try {
      const data = await $fetch<LoginResponse>('/api/auth/login', {
        method: 'POST',
        body: credentials,
        timeout: 15000
      })

      if (data.success && data.user) {
        user.value = data.user
        return { success: true }
      }

      return {
        success: false,
        error: 'La réponse du serveur est invalide.',
        errorType: 'server' as LoginErrorType
      }
    } catch (error: any) {
      console.error('Login error:', error)

      const status = Number(
        error?.statusCode ??
        error?.status ??
        error?.response?.status ??
        error?.data?.statusCode ??
        0
      )
      const backendMessage = error?.data?.message || error?.data?.statusMessage

      if (status === 401) {
        return {
          success: false,
          error: 'Nom d’utilisateur, adresse email ou mot de passe incorrect.',
          errorType: 'credentials' as LoginErrorType
        }
      }

      if (status === 400) {
        return {
          success: false,
          error: backendMessage || 'Veuillez vérifier les informations saisies.',
          errorType: 'validation' as LoginErrorType
        }
      }

      if (status === 429) {
        return {
          success: false,
          error: backendMessage || 'Trop de tentatives. Veuillez patienter avant de réessayer.',
          errorType: 'rate_limit' as LoginErrorType
        }
      }

      if (status >= 500 || status === 0) {
        return {
          success: false,
          error: 'Le serveur est momentanément indisponible. Veuillez réessayer dans quelques instants.',
          errorType: 'server' as LoginErrorType
        }
      }

      return {
        success: false,
        error: backendMessage || 'Une erreur inattendue empêche la connexion.',
        errorType: 'unknown' as LoginErrorType
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
    isSuperAdmin,
    isLoading: readonly(isLoading),
    login,
    logout,
    fetchUser
  }
}
