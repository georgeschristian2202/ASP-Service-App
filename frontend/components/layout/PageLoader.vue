<template>
  <Transition
    enter-active-class="transition-opacity duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-500"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isLoading"
      class="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
      style="backdrop-filter: blur(8px);"
    >
      <!-- Logo animé -->
      <div class="flex flex-col items-center gap-6">
        <!-- Logo ASP Services avec animation pulse -->
        <div class="relative">
          <!-- Cercles pulsants en arrière-plan -->
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-32 h-32 rounded-full bg-asp-blue-500/20 animate-ping" />
          </div>
          <div class="absolute inset-0 flex items-center justify-center animation-delay-150">
            <div class="w-28 h-28 rounded-full bg-yellow-400/20 animate-ping" />
          </div>
          
          <!-- Logo -->
          <div class="relative z-10 animate-float">
            <img src="/Logo-ASP-Service-sans fond.png"
              alt="ASP Services"
              class="w-24 h-24 object-contain"
             />
          </div>
        </div>

        <!-- Texte de chargement -->
        <div class="flex flex-col items-center gap-2">
          <p class="text-lg font-semibold text-asp-blue-700 animate-pulse">
            {{ loadingText }}
          </p>
          
          <!-- Barre de progression -->
          <div class="w-48 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              class="h-full bg-gradient-to-r from-asp-blue-500 to-yellow-400 rounded-full transition-all duration-500 ease-out"
              :style="{ width: progress + '%' }"
            />
          </div>
        </div>

        <!-- Points animés -->
        <div class="flex gap-2">
          <div
            v-for="i in 3"
            :key="i"
            class="w-2.5 h-2.5 rounded-full bg-asp-blue-500 animate-bounce"
            :style="{ animationDelay: `${i * 0.15}s` }"
          />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const isLoading = ref(true)
const progress = ref(0)
const loadingText = ref('Chargement...')

const loadingTexts = [
  'Chargement...',
  'Préparation...',
  'Bientôt prêt...',
  'Finalisation...'
]

let progressInterval: NodeJS.Timeout
let textInterval: NodeJS.Timeout

onMounted(() => {
  // Simuler la progression
  progressInterval = setInterval(() => {
    if (progress.value < 90) {
      progress.value += Math.random() * 15
    }
  }, 200)

  // Changer le texte de chargement
  let textIndex = 0
  textInterval = setInterval(() => {
    textIndex = (textIndex + 1) % loadingTexts.length
    loadingText.value = loadingTexts[textIndex]
  }, 800)

  // Cacher le loader après un délai
  setTimeout(() => {
    progress.value = 100
    setTimeout(() => {
      isLoading.value = false
      clearInterval(progressInterval)
      clearInterval(textInterval)
    }, 300)
  }, 1500)
})

onUnmounted(() => {
  if (progressInterval) clearInterval(progressInterval)
  if (textInterval) clearInterval(textInterval)
})
</script>

<style scoped>
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 2s ease-in-out infinite;
}

.animation-delay-150 {
  animation-delay: 0.15s;
}
</style>
