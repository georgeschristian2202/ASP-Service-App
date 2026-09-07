<template>
  <section class="relative min-h-screen overflow-hidden">
    <!-- Animated Gradient Mesh Background -->
    <div class="absolute inset-0">
      <div class="gradient-mesh"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 min-h-screen flex items-center px-4 sm:px-6 lg:px-8 pt-24">
      <div class="max-w-7xl mx-auto w-full">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <!-- Text Content -->
          <div class="text-white space-y-8">
            <div class="inline-block">
              <span class="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium border border-white/20">
                🎉 Nouveauté : Location Imprimantes Xerox
              </span>
            </div>
            
            <h1 class="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
              Votre Expert en
              <span class="gradient-text">Signalétique</span>
            </h1>
            
            <p class="text-xl text-white/90 leading-relaxed max-w-xl">
              De la conception à la réalisation, ASP Services vous accompagne dans tous vos projets à Libreville
            </p>
            
            <div class="flex gap-4">
              <button class="bg-yellow-500 hover:bg-yellow-600 px-8 py-4 rounded-xl font-semibold transition-all hover:scale-105 hover:shadow-2xl">
                Obtenir un Devis
              </button>
              <button class="bg-white/10 hover:bg-white/20 backdrop-blur-md px-8 py-4 rounded-xl font-semibold border border-white/20 transition-all">
                Nos Réalisations
              </button>
            </div>
          </div>
          
          <!-- Glassmorphism Carousel Card -->
          <div class="relative">
            <div class="glass-card rounded-3xl p-6 backdrop-blur-2xl border border-white/20 shadow-2xl">
              <div class="mb-4">
                <h3 class="text-white text-xl font-bold">Projets Récents</h3>
                <p class="text-white/70 text-sm">Nos dernières réalisations</p>
              </div>
              
              <!-- Mini Carousel -->
              <div class="relative h-80 rounded-2xl overflow-hidden">
                <img 
                  :src="projects[currentSlide].image"
                  :alt="projects[currentSlide].title"
                  class="w-full h-full object-cover transition-all duration-500"
                >
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div class="absolute bottom-4 left-4 right-4 text-white">
                  <h4 class="font-bold text-lg mb-1">{{ projects[currentSlide].title }}</h4>
                  <p class="text-sm text-white/80">{{ projects[currentSlide].location }}</p>
                </div>
              </div>
              
              <!-- Navigation Dots -->
              <div class="flex justify-center gap-2 mt-4">
                <button
                  v-for="(_, index) in projects"
                  :key="index"
                  @click="currentSlide = index"
                  :class="[
                    'w-2 h-2 rounded-full transition-all',
                    currentSlide === index ? 'w-8 bg-yellow-400' : 'bg-white/30'
                  ]"
                ></button>
              </div>
            </div>
            
            <!-- Floating Elements -->
            <div class="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400/20 rounded-full blur-2xl animate-pulse"></div>
            <div class="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const currentSlide = ref(0)

const projects = [
  {
    title: 'Signalétique PK4',
    location: 'Libreville',
    image: '/images/portfolio/Panneau-publicitaire/Panneau-Pk4 apres sovog-1.jpg'
  },
  {
    title: 'Lanyards OMP',
    location: 'Libreville',
    image: '/images/portfolio/Panneau-publicitaire/IMG-20260709-WA0204.jpg'
  },
  {
    title: 'Machines Xerox',
    location: 'Libreville',
    image: '/images/portfolio/Machine xerox/xerox-3.jpg'
  }
]

// Auto-slide
onMounted(() => {
  setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % projects.length
  }, 4000)
})
</script>

<style scoped>
.gradient-mesh {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 25%, #3b82f6 50%, #eab308 75%, #f59e0b 100%);
  background-size: 400% 400%;
  animation: gradient-shift 15s ease infinite;
}

@keyframes gradient-shift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.gradient-text {
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #fbbf24 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient-text 3s linear infinite;
}

@keyframes gradient-text {
  to {
    background-position: 200% center;
  }
}

.glass-card {
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}
</style>
