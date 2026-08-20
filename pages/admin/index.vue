<template>
  <div>
    <!-- En-tête -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-asp-black mb-2">Dashboard</h1>
      <p class="text-asp-gray-600">Bienvenue sur le back-office ASP Services</p>
    </div>

    <!-- Statistiques rapides -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- Total réalisations -->
      <Card class="hover:shadow-lg transition-shadow">
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <div>
            <p class="text-2xl font-bold text-asp-black mb-1">{{ stats.totalPortfolio }}</p>
            <p class="text-sm text-asp-gray-600">Réalisations</p>
          </div>
        </div>
      </Card>

      <!-- Total catégories -->
      <Card class="hover:shadow-lg transition-shadow">
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
          </div>
          <div>
            <p class="text-2xl font-bold text-asp-black mb-1">{{ stats.totalCategories }}</p>
            <p class="text-sm text-asp-gray-600">Catégories</p>
          </div>
        </div>
      </Card>

      <!-- Site visible -->
      <Card class="hover:shadow-lg transition-shadow">
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </div>
          <div>
            <p class="text-2xl font-bold text-green-600 mb-1">En ligne</p>
            <p class="text-sm text-asp-gray-600">Statut du site</p>
          </div>
        </div>
      </Card>

      <!-- Dernière connexion -->
      <Card class="hover:shadow-lg transition-shadow">
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div>
            <p class="text-2xl font-bold text-asp-black mb-1">{{ formattedTime }}</p>
            <p class="text-sm text-asp-gray-600">Dernière connexion</p>
          </div>
        </div>
      </Card>
    </div>

    <!-- Actions rapides -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Gestion des réalisations -->
      <Card>
        <div class="p-6">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-asp-blue-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-asp-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 class="text-xl font-bold text-asp-black">Réalisations</h2>
          </div>
          <p class="text-asp-gray-600 mb-6">
            Gérez vos réalisations : ajoutez, modifiez ou supprimez des projets de votre portfolio.
          </p>
          <div class="flex flex-wrap gap-3">
            <NuxtLink
              to="/admin/portfolio"
              class="inline-flex items-center gap-2 px-4 py-2 bg-asp-blue-700 hover:bg-asp-blue-800 text-white rounded-lg transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Voir tout
            </NuxtLink>
            <NuxtLink
              to="/admin/portfolio/create"
              class="inline-flex items-center gap-2 px-4 py-2 bg-white border border-asp-gray-300 hover:bg-gray-50 text-asp-black rounded-lg transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Ajouter
            </NuxtLink>
          </div>
        </div>
      </Card>

      <!-- Configuration -->
      <Card>
        <div class="p-6">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h2 class="text-xl font-bold text-asp-black">Configuration</h2>
          </div>
          <p class="text-asp-gray-600 mb-6">
            Modifiez les informations de l'entreprise : téléphone, email, adresse et coordonnées GPS.
          </p>
          <NuxtLink
            to="/admin/config"
            class="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Modifier
          </NuxtLink>
        </div>
      </Card>
    </div>

    <!-- Aide rapide -->
    <Card class="mt-6 bg-gradient-to-r from-asp-blue-50 to-blue-50 border-asp-blue-200">
      <div class="p-6">
        <div class="flex items-start gap-4">
          <div class="w-10 h-10 bg-asp-blue-700 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-bold text-asp-black mb-2">Besoin d'aide ?</h3>
            <p class="text-asp-gray-700 mb-4">
              Consultez le guide d'utilisation du back-office ou contactez le support technique.
            </p>
            <div class="flex flex-wrap gap-3">
              <a
                href="mailto:aspservicesgabon@gmail.com"
                class="inline-flex items-center gap-2 text-sm text-asp-blue-700 hover:text-asp-blue-800 font-medium"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contacter le support
              </a>
            </div>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

// Statistiques
const stats = ref({
  totalPortfolio: 0,
  totalCategories: 5,
})

// Heure actuelle
const currentTime = ref(new Date())
const formattedTime = computed(() => {
  return currentTime.value.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  })
})

// Mettre à jour l'heure toutes les minutes
let timeInterval: NodeJS.Timeout
onMounted(() => {
  timeInterval = setInterval(() => {
    currentTime.value = new Date()
  }, 60000)
  
  // Charger les statistiques
  loadStats()
})

onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval)
  }
})

// Charger les statistiques
const loadStats = async () => {
  const { fetchStats } = usePortfolio()
  const result = await fetchStats()
  
  if (result.success && result.stats) {
    stats.value.totalPortfolio = result.stats.total
    stats.value.totalCategories = result.stats.categories
  }
}
</script>
