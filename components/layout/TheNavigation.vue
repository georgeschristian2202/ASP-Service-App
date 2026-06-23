<template>
  <nav 
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled ? 'bg-asp-white/95 backdrop-blur-md shadow-lg' : 'bg-asp-white shadow-md'
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <!-- Logo -->
        <NuxtLink 
          to="/" 
          class="flex items-center focus:outline-none focus:ring-2 focus:ring-asp-blue-500 rounded-lg"
        >
          <img 
            src="/logo.png" 
            alt="ASP Services Gabon" 
            class="h-12 w-auto"
            @error="handleImageError"
          >
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center space-x-8">
          <NuxtLink 
            v-for="item in navigation" 
            :key="item.path"
            :to="item.path" 
            :class="[
              'nav-link relative px-3 py-2 text-sm font-medium transition-all duration-200',
              $route.path === item.path 
                ? 'text-asp-blue-700' 
                : 'text-asp-gray-700 hover:text-asp-blue-700'
            ]"
          >
            {{ item.name }}
            <!-- Active indicator -->
            <span 
              v-if="$route.path === item.path"
              class="absolute bottom-0 left-0 right-0 h-0.5 bg-asp-blue-700 rounded-full"
            />
          </NuxtLink>
        </div>

        <!-- CTA Button & Mobile Menu -->
        <div class="flex items-center gap-4">
          <!-- Phone CTA Button -->
          <a
            href="tel:+241778631098"
            class="hidden md:flex items-center gap-2 bg-asp-blue-700 hover:bg-asp-blue-800 text-white px-5 py-2.5 rounded-lg font-medium transition-all duration-200 hover:shadow-lg cursor-pointer"
          >
            <Phone class="w-5 h-5" />
            <span>07 86 31 98</span>
          </a>

          <!-- Mobile menu button -->
          <button
            @click="toggleMobileMenu"
            class="lg:hidden p-2 rounded-lg text-asp-gray-700 hover:text-asp-blue-700 hover:bg-asp-gray-100 transition-colors cursor-pointer"
            :aria-expanded="mobileMenuOpen"
            aria-label="Menu de navigation"
          >
            <Menu v-if="!mobileMenuOpen" class="w-6 h-6" />
            <X v-else class="w-6 h-6" />
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Menu -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 transform -translate-y-2"
        enter-to-class="opacity-100 transform translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 transform translate-y-0"
        leave-to-class="opacity-0 transform -translate-y-2"
      >
        <div 
          v-if="mobileMenuOpen" 
          class="lg:hidden absolute top-full left-0 right-0 bg-asp-white border-t border-asp-gray-200 shadow-asp-lg"
        >
          <div class="px-4 py-6 space-y-4">
            <NuxtLink 
              v-for="item in navigation" 
              :key="item.path"
              :to="item.path"
              @click="closeMobileMenu"
              :class="[
                'block px-3 py-2 text-base font-medium rounded-lg transition-colors',
                $route.path === item.path 
                  ? 'text-asp-blue-700 bg-asp-blue-50' 
                  : 'text-asp-gray-700 hover:text-asp-blue-700 hover:bg-asp-gray-50'
              ]"
            >
              {{ item.name }}
            </NuxtLink>
            
            <!-- Mobile Phone Button -->
            <a
              href="tel:+241778631098"
              class="flex items-center justify-center gap-2 bg-asp-blue-700 hover:bg-asp-blue-800 text-white px-4 py-3 rounded-lg font-medium transition-colors mt-4 cursor-pointer"
              @click="closeMobileMenu"
            >
              <Phone class="w-5 h-5" />
              <span>07 86 31 98</span>
            </a>
          </div>
        </div>
      </Transition>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { 
  Phone, 
  Menu, 
  X 
} from 'lucide-vue-next'

const config = useRuntimeConfig()
const route = useRoute()

// Navigation items
const navigation = [
  { name: 'Accueil', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'À Propos', path: '/a-propos' },
  { name: 'Réalisations', path: '/realisations' },
  { name: 'Contact', path: '/contact' }
]

// Mobile menu state
const mobileMenuOpen = ref(false)

// Scroll detection for navbar styling
const scrolled = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

// Handle scroll events
const handleScroll = () => {
  scrolled.value = window.scrollY > 20
}

// Handle image error
const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60"%3E%3Crect fill="%23ddd" width="200" height="60"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="%23999"%3EASP Services%3C/text%3E%3C/svg%3E'
}

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// Watch route changes to close mobile menu
watch(() => route.path, () => {
  closeMobileMenu()
})
</script>

<style scoped>
.nav-link {
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  width: 0;
  height: 2px;
  background-color: currentColor;
  transition: all 0.2s ease;
  transform: translateX(-50%);
}

.nav-link:hover::after {
  width: 100%;
}
</style>