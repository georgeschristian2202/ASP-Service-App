<template>
  <div class="min-h-screen bg-gradient-to-br from-asp-blue-700 via-asp-blue-600 to-asp-blue-500 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Card de connexion -->
      <Card class="shadow-2xl">
        <div class="p-8">
          <!-- Logo et titre -->
          <div class="text-center mb-8">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-asp-blue-100 rounded-full mb-4">
              <svg class="w-8 h-8 text-asp-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 class="text-2xl font-bold text-asp-black mb-2">Back-Office</h1>
            <p class="text-asp-gray-600">ASP Services Gabon</p>
          </div>

          <!-- Formulaire de connexion -->
          <form @submit.prevent="handleLogin" class="space-y-6">
            <!-- Message d'erreur -->
            <div v-if="errorMessage" class="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p class="text-sm text-red-600 flex items-center gap-2">
                <svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
                {{ errorMessage }}
              </p>
            </div>

            <!-- Nom d'utilisateur -->
            <div>
              <label for="username" class="block text-sm font-medium text-asp-gray-700 mb-2">
                Nom d'utilisateur
              </label>
              <input
                id="username"
                v-model="credentials.username"
                type="text"
                required
                autocomplete="username"
                class="w-full px-4 py-3 border border-asp-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500 transition-colors"
                placeholder="admin"
              />
            </div>

            <!-- Mot de passe -->
            <div>
              <label for="password" class="block text-sm font-medium text-asp-gray-700 mb-2">
                Mot de passe
              </label>
              <input
                id="password"
                v-model="credentials.password"
                type="password"
                required
                autocomplete="current-password"
                class="w-full px-4 py-3 border border-asp-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500 transition-colors"
                placeholder="••••••••"
              />
            </div>

            <!-- Bouton de connexion -->
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full bg-asp-blue-700 hover:bg-asp-blue-800 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <svg v-if="isLoading" class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span v-if="isLoading">Connexion...</span>
              <span v-else>Se connecter</span>
            </button>
          </form>

          <!-- Info par défaut -->
          <div class="mt-6 p-4 bg-asp-blue-50 border border-asp-blue-100 rounded-lg">
            <p class="text-xs text-asp-blue-700 text-center">
              <strong>Par défaut :</strong> admin / admin123
            </p>
          </div>
        </div>
      </Card>

      <!-- Lien retour site -->
      <div class="mt-6 text-center">
        <NuxtLink 
          to="/accueil" 
          class="text-white hover:text-asp-blue-100 text-sm transition-colors inline-flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour au site
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false // Pas de layout pour la page de login
})

const { login, isLoading } = useAuth()

const credentials = ref({
  username: '',
  password: ''
})

const errorMessage = ref('')

const handleLogin = async () => {
  errorMessage.value = ''
  
  const result = await login(credentials.value)
  
  if (result.success) {
    // Redirection vers le dashboard
    await navigateTo('/admin')
  } else {
    errorMessage.value = result.error || 'Identifiants incorrects'
  }
}

// Si déjà connecté, rediriger vers le dashboard
onMounted(async () => {
  const { isAuthenticated } = useAuth()
  if (isAuthenticated.value) {
    await navigateTo('/admin')
  }
})
</script>
