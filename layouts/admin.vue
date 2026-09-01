<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
    <!-- Sidebar Moderne -->
    <aside class="fixed left-0 top-0 bottom-0 w-72 bg-gradient-to-b from-asp-blue-900 via-asp-blue-800 to-asp-blue-900 text-white shadow-2xl z-50">
      <!-- Logo et titre -->
      <div class="p-6 border-b border-white/10">
        <NuxtLink to="/admin" class="flex items-center gap-4 group">
          <div class="relative">
            <div class="w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <svg class="w-8 h-8 text-asp-blue-900" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div class="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-asp-blue-900"></div>
          </div>
          <div>
            <h1 class="text-xl font-bold text-white">ASP Services</h1>
            <p class="text-xs text-blue-200">Back-Office Pro</p>
          </div>
        </NuxtLink>
      </div>

      <!-- Navigation -->
      <nav class="p-4 space-y-2">
        <!-- Dashboard -->
        <NuxtLink
          to="/admin"
          class="flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all group"
          :class="$route.path === '/admin' 
            ? 'bg-white/15 text-white shadow-lg backdrop-blur-sm border border-white/20' 
            : 'text-blue-100 hover:bg-white/10 hover:text-white'"
        >
          <div class="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
            :class="$route.path === '/admin' ? 'bg-yellow-400 text-asp-blue-900' : 'bg-white/10 text-blue-200 group-hover:bg-white/20'">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <div class="flex-1">
            <p class="font-semibold">Dashboard</p>
            <p class="text-xs opacity-75">Vue d'ensemble</p>
          </div>
        </NuxtLink>

        <!-- Section Contenu -->
        <div class="pt-6 pb-2">
          <p class="px-4 text-xs font-semibold text-blue-300 uppercase tracking-wider">Contenu du Site</p>
        </div>

        <!-- Réalisations -->
        <NuxtLink
          to="/admin/portfolio"
          class="flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all group"
          :class="$route.path.startsWith('/admin/portfolio')
            ? 'bg-white/15 text-white shadow-lg backdrop-blur-sm border border-white/20' 
            : 'text-blue-100 hover:bg-white/10 hover:text-white'"
        >
          <div class="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
            :class="$route.path.startsWith('/admin/portfolio') ? 'bg-yellow-400 text-asp-blue-900' : 'bg-white/10 text-blue-200 group-hover:bg-white/20'">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div class="flex-1">
            <p class="font-semibold">Réalisations</p>
            <p class="text-xs opacity-75">Portfolio projets</p>
          </div>
        </NuxtLink>

        <!-- Page d'accueil -->
        <div class="flex items-center gap-3 px-4 py-3.5 rounded-xl opacity-50 cursor-not-allowed">
          <div class="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
            <svg class="w-5 h-5 text-blue-200" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <div class="flex-1">
            <p class="font-semibold text-blue-100">Page d'accueil</p>
            <p class="text-xs text-blue-300">Bientôt disponible</p>
          </div>
        </div>

        <!-- À Propos -->
        <div class="flex items-center gap-3 px-4 py-3.5 rounded-xl opacity-50 cursor-not-allowed">
          <div class="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
            <svg class="w-5 h-5 text-blue-200" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="flex-1">
            <p class="font-semibold text-blue-100">À Propos</p>
            <p class="text-xs text-blue-300">Bientôt disponible</p>
          </div>
        </div>

        <!-- Services -->
        <div class="flex items-center gap-3 px-4 py-3.5 rounded-xl opacity-50 cursor-not-allowed">
          <div class="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
            <svg class="w-5 h-5 text-blue-200" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div class="flex-1">
            <p class="font-semibold text-blue-100">Services</p>
            <p class="text-xs text-blue-300">Bientôt disponible</p>
          </div>
        </div>

        <!-- Section Paramètres -->
        <div class="pt-6 pb-2">
          <p class="px-4 text-xs font-semibold text-blue-300 uppercase tracking-wider">Paramètres</p>
        </div>

        <!-- Configuration -->
        <NuxtLink
          to="/admin/config"
          class="flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all group"
          :class="$route.path === '/admin/config'
            ? 'bg-white/15 text-white shadow-lg backdrop-blur-sm border border-white/20' 
            : 'text-blue-100 hover:bg-white/10 hover:text-white'"
        >
          <div class="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
            :class="$route.path === '/admin/config' ? 'bg-yellow-400 text-asp-blue-900' : 'bg-white/10 text-blue-200 group-hover:bg-white/20'">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div class="flex-1">
            <p class="font-semibold">Configuration</p>
            <p class="text-xs opacity-75">Infos entreprise</p>
          </div>
        </NuxtLink>
      </nav>

      <!-- Footer sidebar -->
      <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 bg-black/20">
        <div class="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center text-asp-blue-900 font-bold">
            {{ user?.username?.charAt(0).toUpperCase() }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-medium text-white text-sm truncate">{{ user?.username }}</p>
            <p class="text-xs text-blue-200">Administrateur</p>
          </div>
          <button
            @click="handleLogout"
            class="p-2 hover:bg-white/10 rounded-lg transition-colors"
            title="Se déconnecter"
          >
            <svg class="w-5 h-5 text-red-300 hover:text-red-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </aside>

    <!-- Contenu principal -->
    <main class="ml-72">
      <!-- Top Bar -->
      <div class="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div class="px-8 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div>
                <h2 class="text-2xl font-bold text-asp-blue-900">{{ pageTitle }}</h2>
                <p class="text-sm text-gray-600">{{ pageSubtitle }}</p>
              </div>
            </div>
            
            <div class="flex items-center gap-3">
              <!-- Lien vers le site -->
              <NuxtLink
                to="/"
                target="_blank"
                class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 hover:border-asp-blue-700 hover:bg-asp-blue-50 text-asp-blue-700 rounded-lg transition-colors shadow-sm"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span class="font-medium">Voir le site</span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Contenu de la page -->
      <div class="p-8">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const { user, logout } = useAuth()
const route = useRoute()

const pageTitle = computed(() => {
  if (route.path === '/admin') return 'Dashboard'
  if (route.path.startsWith('/admin/portfolio')) return 'Réalisations'
  if (route.path === '/admin/config') return 'Configuration'
  return 'Back-Office'
})

const pageSubtitle = computed(() => {
  if (route.path === '/admin') return 'Vue d\'ensemble de votre site web'
  if (route.path.startsWith('/admin/portfolio')) return 'Gérez votre portfolio de projets'
  if (route.path === '/admin/config') return 'Paramètres de l\'entreprise'
  return 'Gestion de contenu'
})

const handleLogout = async () => {
  if (confirm('Voulez-vous vraiment vous déconnecter ?')) {
    await logout()
  }
}

// Vérifier l'authentification au montage
onMounted(async () => {
  const { fetchUser } = useAuth()
  await fetchUser()
})
</script>
