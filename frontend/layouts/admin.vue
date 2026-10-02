<template>
  <div class="min-h-screen bg-gray-50">
    <Toast />
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
        isMobile
          ? (isSidebarOpen ? 'translate-x-0 w-72' : '-translate-x-full w-72')
          : (isCollapsed ? (isHovering ? 'w-72' : 'w-20') : 'w-72')
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
            <p class="text-xs text-gray-500">{{ roleLabel }}</p>
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
    <main :class="[
      'min-h-screen min-w-0 transition-all duration-300',
      isMobile ? 'ml-0' : (isCollapsed && !isHovering ? 'ml-20' : 'ml-72')
    ]">
      <!-- Top Bar -->
      <header class="sticky top-0 z-30 border-b border-slate-200 bg-white shadow-sm">
        <div class="flex h-16 items-center gap-3 px-4 sm:px-6">
          <button
            type="button"
            class="flex size-10 shrink-0 items-center justify-center rounded-lg text-slate-700 transition hover:bg-slate-100"
            aria-label="Afficher ou réduire le menu"
            @click="isMobile ? toggleSidebar() : toggleCollapse()"
          >
            <Menu class="size-5" aria-hidden="true" />
          </button>

          <div class="hidden min-w-0 md:block">
            <p class="truncate text-sm font-bold text-slate-900">{{ pageTitle }}</p>
            <p class="truncate text-xs text-slate-500">{{ pageSubtitle }}</p>
          </div>

          <div class="relative hidden min-w-0 max-w-md flex-1 lg:block">
            <Search class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              v-model="headerSearch"
              type="search"
              placeholder="Rechercher dans l’administration..."
              class="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <div class="ml-auto flex items-center gap-1.5 sm:gap-2">
            <UButton
              v-if="isSuperAdmin"
              to="/admin/utilisateurs/nouveau"
              color="success"
              size="md"
              class="hidden justify-center font-semibold sm:flex"
              label="Ajouter un utilisateur"
            >
              <template #leading><UserPlus class="size-4" aria-hidden="true" /></template>
            </UButton>

            <UButton
              v-if="isSuperAdmin"
              to="/admin/utilisateurs/nouveau"
              color="success"
              variant="soft"
              square
              class="sm:hidden"
              aria-label="Ajouter un utilisateur"
            >
              <UserPlus class="size-5" aria-hidden="true" />
            </UButton>

            <button type="button" class="header-icon-button flex" aria-label="Notifications">
              <Bell class="size-5" aria-hidden="true" />
            </button>
            <button type="button" class="header-icon-button hidden sm:flex" aria-label="Aide">
              <CircleHelp class="size-5" aria-hidden="true" />
            </button>
            <button type="button" class="header-icon-button hidden sm:flex" aria-label="Changer le thème" @click="toggleColorMode">
              <Moon v-if="colorMode.value !== 'dark'" class="size-5" aria-hidden="true" />
              <Sun v-else class="size-5" aria-hidden="true" />
            </button>

            <div class="mx-1 hidden h-8 w-px bg-slate-200 sm:block" />

            <NuxtLink
              to="/admin/profil-entreprise"
              class="flex items-center gap-2 rounded-full p-1.5 transition hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              title="Profil de l’entreprise"
            >
              <span class="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-900 text-sm font-bold text-white">
                {{ user?.username?.charAt(0).toUpperCase() || 'A' }}
              </span>
              <span class="hidden max-w-28 truncate text-sm font-semibold text-slate-700 xl:block">{{ user?.username }}</span>
            </NuxtLink>
          </div>
        </div>
      </header>

      <!-- Content -->
      <div class="p-4 sm:p-6 lg:p-8">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { Bell, CircleHelp, Menu, Moon, Search, Sun, UserPlus } from 'lucide-vue-next'

const { user, logout, isSuperAdmin } = useAuth()
const route = useRoute()
const colorMode = useColorMode()

const isSidebarOpen = ref(true)
const isCollapsed = ref(true)
const isHovering = ref(false)
const isMobile = ref(false)
const isPagesMenuOpen = ref(false)
const headerSearch = ref('')

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const roleLabel = computed(() => {
  if (user.value?.role === 'superadmin') return 'Super administrateur'
  if (user.value?.role === 'admin') return 'Administrateur'
  return 'Éditeur'
})

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

onMounted(async () => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
  const { fetchUser } = useAuth()
  if (!user.value) {
    await fetchUser()
  }
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
  if (route.path === '/admin/utilisateurs/nouveau') return 'Nouvel utilisateur'
  if (route.path === '/admin/profil-entreprise') return 'Profil de l’entreprise'
  return 'Back-Office'
})

const pageSubtitle = computed(() => {
  if (route.path === '/admin') return 'Vue d\'ensemble de votre site web'
  if (route.path.startsWith('/admin/realisations')) return 'Gérez votre portfolio de projets'
  if (route.path.startsWith('/admin/pages')) return 'Modifiez le contenu de vos pages publiques'
  if (route.path === '/admin/config') return 'Paramètres de l\'entreprise'
  if (route.path === '/admin/utilisateurs/nouveau') return 'Créer un accès administrateur sécurisé'
  if (route.path === '/admin/profil-entreprise') return 'Informations et identité de l’entreprise'
  return 'Gestion de contenu'
})

const handleLogout = async () => {
  if (confirm('Voulez-vous vraiment vous déconnecter ?')) {
    await logout()
  }
}
</script>

<style scoped>
.header-icon-button {
  width: 2.5rem;
  height: 2.5rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  color: #64748b;
  transition: color 150ms ease, background-color 150ms ease;
}

.header-icon-button:hover {
  background: #f1f5f9;
  color: #1d4ed8;
}

.header-icon-button:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
</style>
