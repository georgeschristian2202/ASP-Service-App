<template>
  <main class="relative h-[100dvh] overflow-hidden bg-[#0b1628] p-3 sm:p-6 lg:p-8">
    <Toast />
    <div class="pointer-events-none absolute -right-24 -top-40 h-96 w-96 rounded-full bg-asp-blue-500/20 blur-3xl"></div>
    <div class="pointer-events-none absolute -bottom-52 left-1/3 h-96 w-96 rounded-full bg-cyan-300/10 blur-3xl"></div>
    <div class="relative mx-auto grid h-full w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl shadow-black/30 lg:grid-cols-[1.08fr_0.92fr]">
      <aside class="relative hidden overflow-hidden bg-gradient-to-br from-[#123b70] via-[#0d2d56] to-[#081a31] p-10 text-white lg:flex lg:flex-col lg:justify-between">
        <div class="pointer-events-none absolute -left-20 bottom-10 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl"></div>
        <div class="relative">
          <div class="inline-flex rounded-2xl bg-white p-4 shadow-xl shadow-black/10">
            <img src="/Logo-ASP-Service-sans fond.png" alt="ASP Services" class="h-auto w-60" />
          </div>
          <div class="mt-16 max-w-md">
            <span class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wider text-blue-100">
              <span class="h-2 w-2 rounded-full bg-emerald-400"></span>
              ESPACE D'ADMINISTRATION
            </span>
            <h1 class="mt-6 text-4xl font-bold leading-tight tracking-tight">Gérez votre présence digitale avec efficacité.</h1>
            <p class="mt-5 text-base leading-7 text-blue-100/80">Contenus, services, réalisations et configuration réunis dans un espace sécurisé.</p>
          </div>
        </div>
        <div class="relative flex items-center gap-3 border-t border-white/10 pt-6 text-sm text-blue-100/70">
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
          Accès protégé — ASP Services Gabon
        </div>
      </aside>

      <!-- Card de connexion -->
      <Card class="flex h-full w-full items-center border-0 bg-white shadow-none">
        <div class="mx-auto w-full max-w-md p-6 sm:p-10">
          <NuxtLink
            to="/accueil"
            class="mb-8 inline-flex items-center gap-3 rounded-xl px-2 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-asp-blue-800 focus:outline-none focus:ring-4 focus:ring-asp-blue-100"
          >
            <span class="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white shadow-sm">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            </span>
            Retour au site
          </NuxtLink>

          <!-- Logo et titre -->
          <div class="mb-7 text-left">
            <img src="/Logo-ASP-Service-sans fond.png" alt="ASP Services" class="mb-6 h-auto w-52 max-w-full lg:hidden" />
            <div class="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-asp-blue-50 ring-1 ring-asp-blue-100">
              <svg class="w-8 h-8 text-asp-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 class="mb-2 text-3xl font-bold tracking-tight text-slate-900">Bienvenue</h2>
            <p class="text-sm leading-6 text-slate-500">Connectez-vous pour accéder au tableau de bord ASP Services.</p>
          </div>

          <!-- Formulaire de connexion -->
          <form @submit.prevent="handleLogin" class="space-y-4">
            <!-- Message d'erreur -->
            <div v-if="errorMessage" class="rounded-xl border border-red-200 bg-red-50 p-3" role="alert">
              <p class="flex items-center gap-2 text-sm text-red-700">
                <svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
                {{ errorMessage }}
              </p>
            </div>

            <!-- Nom d'utilisateur -->
            <div>
              <label for="username" class="mb-2 block text-sm font-semibold text-slate-700">
                Nom d'utilisateur
              </label>
              <input
                id="username"
                v-model="credentials.username"
                type="text"
                required
                autocomplete="username"
                class="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-asp-blue-600 focus:ring-4 focus:ring-asp-blue-100"
                placeholder="admin"
              />
            </div>

            <!-- Mot de passe -->
            <div>
              <label for="password" class="mb-2 block text-sm font-semibold text-slate-700">
                Mot de passe
              </label>
              <input
                id="password"
                v-model="credentials.password"
                type="password"
                required
                autocomplete="current-password"
                class="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-asp-blue-600 focus:ring-4 focus:ring-asp-blue-100"
                placeholder="••••••••"
              />
            </div>

            <!-- Bouton de connexion -->
            <button
              type="submit"
              :disabled="isLoading"
              class="flex w-full items-center justify-center gap-2 rounded-xl bg-asp-blue-700 px-4 py-3 font-semibold text-white shadow-lg shadow-asp-blue-700/20 transition hover:bg-asp-blue-800 focus:outline-none focus:ring-4 focus:ring-asp-blue-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg v-if="isLoading" class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span v-if="isLoading">Connexion...</span>
              <span v-else>Se connecter</span>
            </button>
          </form>

        </div>
      </Card>
    </div>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false // Pas de layout pour la page de login
})

const { login, isLoading } = useAuth()
const { showSuccess, showError } = useToast()

const credentials = ref({
  username: '',
  password: ''
})

const errorMessage = ref('')

const handleLogin = async () => {
  errorMessage.value = ''
  
  const result = await login(credentials.value)
  
  if (result.success) {
    showSuccess('Connexion réussie', 'Bienvenue dans votre espace d’administration.', 3500)
    await navigateTo('/admin')
  } else {
    errorMessage.value = result.error || 'Identifiants incorrects'
    showError('Connexion refusée', errorMessage.value, 5000)
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
