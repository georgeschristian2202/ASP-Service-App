<template>
  <section class="relative min-h-screen overflow-hidden">
    <!-- Parallax Layers -->
    <div class="absolute inset-0">
      <!-- Layer 1 - Far Background -->
      <div 
        class="absolute inset-0 transition-transform duration-100 ease-out"
        :style="{ transform: `translateY(${scrollY * 0.5}px)` }"
      >
        <img 
          src="/images/portfolio/Panneau-publicitaire/IMG-20260709-WA0204.jpg"
          alt="Background layer 1"
          class="w-full h-full object-cover opacity-20 blur-sm"
        >
      </div>
      
      <!-- Layer 2 - Middle -->
      <div 
        class="absolute inset-0 transition-transform duration-100 ease-out"
        :style="{ transform: `translateY(${scrollY * 0.3}px)` }"
      >
        <img 
          src="/images/portfolio/Panneau-publicitaire/Panneau-Pk4 apres sovog-1.jpg"
          alt="Background layer 2"
          class="w-full h-full object-cover opacity-15 blur-[2px]"
        >
      </div>
      
      <!-- Overlay Gradient -->
      <div class="absolute inset-0 bg-gradient-to-br from-asp-blue-900/90 via-asp-blue-800/85 to-asp-blue-700/80"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 min-h-screen flex items-center px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto w-full">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <!-- Text -->
          <div class="text-white space-y-8">
            <h1 class="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
              Votre Expert en
              <span class="text-yellow-400 block">Signalétique</span>
            </h1>
            
            <p class="text-xl text-white/90 leading-relaxed">
              De la conception à la réalisation, ASP Services vous accompagne
            </p>
            
            <button class="bg-yellow-500 hover:bg-yellow-600 px-8 py-4 rounded-lg font-semibold transition-all hover:scale-105">
              Obtenir un Devis
            </button>
          </div>
          
          <!-- Floating Card -->
          <div 
            class="relative"
            :style="{ transform: `translateY(${scrollY * 0.1}px)` }"
          >
            <div class="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <img 
                src="/images/portfolio/Machine xerox/xerox-3.jpg"
                alt="Projet récent"
                class="rounded-lg shadow-2xl"
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const scrollY = ref(0)

const handleScroll = () => {
  scrollY.value = window.scrollY
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
