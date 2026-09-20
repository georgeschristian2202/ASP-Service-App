<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Backdrop mobile -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isSidebarOpen && isMobile"
        @click="closeSidebar"
        class="fixed inset-0 bg-black/50 z-40"
      ></div>
    </Transition>

    <!-- Sidebar -->
    <aside
      :class="[
        'fixed left-0 top-0 bottom-0 bg-white border-r border-gray-200 z-50 transition-all duration-300',
        isSidebarOpen ? (isCollapsed ? 'w-20' : 'w-72') : (isMobile ? '-translate-x-full w-72' : 'w-20'),
        isCollapsed ? 'lg:w-20' : 'lg:w-72'
      ]"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <!-- Header -->
      <div class="h-16 border-b border-gray-200 flex items-center px-4 gap-3">
        <div class="w-10 h-10 bg-gradient-to-br from-asp-blue-700 to-asp-blue-900 rounded-lg flex items-center justify-center shrink-0">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <div v-show="!isCollapsed || isHovering">
          <h1 class="text-base font-bold text-gray-900">ASP Services</h1>
          <p class="text-xs text-gray-500">Administration</p>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="p-3 space-y-1 overflow-y-auto" style="height: calc(100vh - 128px)">
        <!-- Dashboard -->
        <NuxtLink
          to="/admin"
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group relative"
          :class="$route.path === '/admin' ? 'bg-asp-blue-50 text-asp-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-100'"
        >
          <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span v-show="!isCollapsed || isHovering" class="text-sm">Dashboard</span>
          <div v-if="isCollapsed && !isHovering" class="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10">
            Dashboard
          </div>
        </NuxtLink>

        <!-- Section -->
        <div class="pt-4 pb-2">
          <p v-show="!isCollapsed || isHovering" class="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Contenu</p>
          <div v-show="isCollapsed && !isHovering" class="h-px bg-gray-200 mx-3"></div>
        </div>

        <!-- Réalisations -->
        <NuxtLink
          to="/admin/realisations"
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group relative"
          :class="$route.path.startsWith('/admin/realisations') ? 'bg-asp-blue-50 text-asp-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-100'"
        >
          <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span v-show="!isCollapsed || isHovering" class="text-sm">Réalisations</span>
          <div v-if="isCollapsed && !isHovering" class="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10">
            Réalisations
          </div>
        </NuxtLink>

        <!-- Pages Menu avec sous-menu -->
        <div>
          <button
            @click="togglePagesMenu"
            class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group relative"
            :class="$route.path.startsWith('/admin/pages') ? 'bg-asp-blue-50 text-asp-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-100'"
          >
            <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span v-show="!isCollapsed || isHovering" class="text-sm flex-1 text-left">Pages</span>
            <svg
              v-show="!isCollapsed || isHovering"
              class="w-4 h-4 transition-transform"
              :class="{ 'rotate-180': isPagesMenuOpen }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
            <div v-if="isCollapsed && !isHovering" class="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10">
              Pages
            </div>
          </button>
          
          <!-- Sous-menu Pages -->
          <Transition
            enter-active-class="transition-all duration-200"
            enter-from-class="opacity-0 max-h-0"
            enter-to-class="opacity-100 max-h-96"
            leave-active-class="transition-all duration-200"
            leave-from-class="opacity-100 max-h-96"
            leave-to-class="opacity-0 max-h-0"
          >
            <div v-show="isPagesMenuOpen && (!isCollapsed || isHovering)" class="ml-3 mt-1 space-y-1 border-l-2 border-gray-200 pl-3 overflow-hidden">
              <NuxtLink
                to="/admin/pages/accueil"
                class="flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm"
                :class="$route.path === '/admin/pages/accueil' ? 'bg-asp-blue-50 text-asp-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'"
              >
                <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Accueil
              </NuxtLink>
              
              <NuxtLink
                to="/admin/pages/services"
                class="flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm"
                :class="$route.path === '/admin/pages/services' ? 'bg-asp-blue-50 text-asp-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'"
              >
                <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Services
              </NuxtLink>
              
              <NuxtLink
                to="/admin/pages/a-propos"
                class="flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm"
                :class="$route.path === '/admin/pages/a-propos' ? 'bg-asp-blue-50 text-asp-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'"
              >
                <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                À propos
              </NuxtLink>
              
              <NuxtLink
                to="/admin/pages/contact"
                class="flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm"
                :class="$route.path === '/admin/pages/contact' ? 'bg-asp-blue-50 text-asp-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'"
              >
                <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact
              </NuxtLink>
            </div>
          </Transition>
        </div>

        <!-- Section -->
        <div class="pt-4 pb-2">
          <p v-show="!isCollapsed || isHovering" class="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Paramètres</p>
          <div v-show="isCollapsed && !isHovering" class="h-px bg-gray-200 mx-3"></div>
        </div>

        <!-- Configuration -->
        <NuxtLink
          to="/admin/config"
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group relative"
          :class="$route.path === '/admin/config' ? 'bg-asp-blue-50 text-asp-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-100'"
        >
          <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span v-show="!isCollapsed || isHovering" class="text-sm">Configuration</span>
          <div v-if="isCollapsed && !isHovering" class="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10">
            Configuration
          </div>
        </NuxtLink>
      </nav>

      <!-- Footer -->
      <div class="absolute bottom-0 left-0 right-0 h-16 border-t border-gray-200 flex items-center px-3 bg-white">
        <div class="flex items-center gap-3 flex-1 min-w-0">
          <div class="w-9 h-9 shrink-0 rounded-full bg-gradient-to-br from-asp-blue-600 to-asp-blue-800 flex items-center justify-center text-white font-bold text-sm">
            {{ user?.username?.charAt(0).toUpperCase() }}
          </div>
          <div v-show="!isCollapsed || isHovering" class="flex-1 min-w-0">
            <p class="font-medium text-gray-900 text-sm truncate">{{ user?.username }}</p>
            <p class="text-xs text-gray-500">Administrateur</p>
          </div>
          <button
            v-show="!isCollapsed || isHovering"
            @click="handleLogout"
            class="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
          >
            <svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </aside>

    <!-- Main -->
    <main :class="['transition-all duration-300', isSidebarOpen || !isMobile ? (isCollapsed ? 'ml-20' : 'ml-72') : 'ml-0']">
      <!-- Top Bar -->
      <div class="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div class="px-6 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <button @click="toggleSidebar" class="p-2 hover:bg-gray-100 rounded-lg lg:hidden">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <button @click="toggleCollapse" class="hidden lg:flex p-2 hover:bg-gray-100 rounded-lg">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div>
                <h2 class="text-xl font-bold text-gray-900">{{ pageTitle }}</h2>
                <p class="text-sm text-gray-600">{{ pageSubtitle }}</p>
              </div>
            </div>
            <NuxtLink to="/accueil" target="_blank" class="hidden sm:flex items-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span class="text-sm font-medium">Voir le site</span>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="p-6 lg:p-8">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const { user, logout } = useAuth()
const route = useRoute()

const isSidebarOpen = ref(true)
const isCollapsed = ref(true)
const isHovering = ref(false)
const isMobile = ref(false)
const isPagesMenuOpen = ref(false)

const checkMobile = () => {
  if (typeof window !== 'undefined') {
    isMobile.value = window.innerWidth < 1024
    if (!isMobile.value) {
      isSidebarOpen.value = true
    } else {
      isSidebarOpen.value = false
    }
  }
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
  const { fetchUser } = useAuth()
  fetchUser()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkMobile)
})

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const closeSidebar = () => {
  if (isMobile.value) {
    isSidebarOpen.value = false
  }
}

const toggleCollapse = () => {
  if (!isMobile.value) {
    isCollapsed.value = !isCollapsed.value
  }
}

const togglePagesMenu = () => {
  isPagesMenuOpen.value = !isPagesMenuOpen.value
}

const handleMouseEnter = () => {
  if (!isMobile.value && isCollapsed.value) {
    isHovering.value = true
  }
}

const handleMouseLeave = () => {
  if (!isMobile.value) {
    isHovering.value = false
  }
}

const pageTitle = computed(() => {
  if (route.path === '/admin') return 'Dashboard'
  if (route.path.startsWith('/admin/realisations')) return 'Réalisations'
  if (route.path.startsWith('/admin/pages')) return 'Gestion des Pages'
  if (route.path === '/admin/config') return 'Configuration'
  return 'Back-Office'
})

const pageSubtitle = computed(() => {
  if (route.path === '/admin') return 'Vue d\'ensemble de votre site web'
  if (route.path.startsWith('/admin/realisations')) return 'Gérez votre portfolio de projets'
  if (route.path.startsWith('/admin/pages')) return 'Modifiez le contenu de vos pages publiques'
  if (route.path === '/admin/config') return 'Paramètres de l\'entreprise'
  return 'Gestion de contenu'
})

const handleLogout = async () => {
  if (confirm('Voulez-vous vraiment vous déconnecter ?')) {
    await logout()
  }
}
</script>
