<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navbar -->
    <nav class="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <!-- Logo et titre -->
          <div class="flex items-center">
            <NuxtLink to="/admin" class="flex items-center gap-3">
              <div class="w-10 h-10 bg-asp-blue-700 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h1 class="text-lg font-bold text-asp-black">ASP Services</h1>
                <p class="text-xs text-asp-gray-500">Back-Office</p>
              </div>
            </NuxtLink>
          </div>

          <!-- Actions utilisateur -->
          <div class="flex items-center gap-4">
            <!-- Lien vers le site -->
            <NuxtLink 
              to="/" 
              target="_blank"
              class="hidden sm:flex items-center gap-2 text-sm text-asp-gray-600 hover:text-asp-blue-700 transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Voir le site
            </NuxtLink>

            <!-- Menu utilisateur -->
            <div class="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div class="hidden sm:block text-right">
                <p class="text-sm font-medium text-asp-black">{{ user?.username }}</p>
                <p class="text-xs text-asp-gray-500">{{ user?.role }}</p>
              </div>
              
              <button
                @click="handleLogout"
                class="p-2 text-asp-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Se déconnecter"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Layout principal -->
    <div class="pt-16 flex">
      <!-- Sidebar -->
      <aside class="w-64 bg-white border-r border-gray-200 fixed left-0 top-16 bottom-0 overflow-y-auto">
        <nav class="p-4 space-y-1">
          <!-- Dashboard -->
          <NuxtLink
            to="/admin"
            class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
            :class="$route.path === '/admin' ? 'bg-asp-blue-50 text-asp-blue-700' : 'text-asp-gray-700 hover:bg-gray-50'"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span class="font-medium">Dashboard</span>
          </NuxtLink>

          <!-- Divider -->
          <div class="border-t border-gray-200 my-3"></div>

          <!-- Réalisations -->
          <NuxtLink
            to="/admin/portfolio"
            class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
            :class="$route.path.startsWith('/admin/portfolio') ? 'bg-asp-blue-50 text-asp-blue-700' : 'text-asp-gray-700 hover:bg-gray-50'"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span class="font-medium">Réalisations</span>
          </NuxtLink>

          <!-- Configuration -->
          <NuxtLink
            to="/admin/config"
            class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
            :class="$route.path === '/admin/config' ? 'bg-asp-blue-50 text-asp-blue-700' : 'text-asp-gray-700 hover:bg-gray-50'"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span class="font-medium">Configuration</span>
          </NuxtLink>

          <!-- Divider -->
          <div class="border-t border-gray-200 my-3"></div>

          <!-- Sections à venir (grisées) -->
          <div class="space-y-1 opacity-50 pointer-events-none">
            <div class="flex items-center gap-3 px-4 py-3 text-asp-gray-500">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span class="text-sm">Page d'accueil</span>
              <span class="ml-auto text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">Bientôt</span>
            </div>
            <div class="flex items-center gap-3 px-4 py-3 text-asp-gray-500">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-sm">À Propos</span>
              <span class="ml-auto text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">Bientôt</span>
            </div>
            <div class="flex items-center gap-3 px-4 py-3 text-asp-gray-500">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span class="text-sm">Services</span>
              <span class="ml-auto text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">Bientôt</span>
            </div>
          </div>
        </nav>
      </aside>

      <!-- Contenu principal -->
      <main class="flex-1 ml-64 p-8">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const { user, logout } = useAuth()

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
