<template>
  <Transition
    enter-active-class="transition-opacity duration-200"
    leave-active-class="transition-opacity duration-400"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isLoading"
      class="fixed inset-0 z-[9999] bg-white/95 backdrop-blur-sm"
    >
      <!-- Barre de progression en haut -->
      <div class="absolute top-0 left-0 right-0 h-1 bg-gray-200">
        <div
          class="h-full bg-gradient-to-r from-asp-blue-500 via-yellow-400 to-asp-blue-500 transition-all duration-300 ease-out"
          :style="{ width: progress + '%' }"
        />
      </div>

      <!-- Contenu centré -->
      <div class="flex items-center justify-center h-full">
        <div class="flex flex-col items-center gap-6">
          <!-- Logo avec animation -->
          <div class="relative">
            <!-- Cercles animés -->
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="w-28 h-28 border-4 border-asp-blue-200 border-t-asp-blue-600 rounded-full animate-spin" />
            </div>
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="w-20 h-20 border-4 border-yellow-200 border-b-yellow-400 rounded-full animate-spin-reverse" />
            </div>
            
            <!-- Logo -->
            <div class="relative flex items-center justify-center w-28 h-28">
              <img src="/Logo-ASP-Service-sans fond.png"
                alt="ASP Services"
                class="w-16 h-16 object-contain animate-pulse"
               />
            </div>
          </div>

          <!-- Texte dynamique selon le contexte -->
          <div class="flex flex-col items-center gap-2">
            <p class="text-sm font-medium text-asp-gray-600 animate-pulse">
              {{ loadingText }}
            </p>
            
            <!-- Pourcentage (seulement pour premier chargement) -->
            <p v-if="isFirstLoad" class="text-xs text-asp-gray-400 font-mono">
              {{ Math.round(progress) }}%
            </p>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const { $pageLoading } = useNuxtApp()
const isLoading = $pageLoading?.isLoading || ref(false)
const progress = $pageLoading?.progress || ref(0)
const isFirstLoad = $pageLoading?.isFirstLoad || ref(false)

// Texte dynamique selon le contexte
const loadingText = computed(() => {
  if (isFirstLoad.value) {
    if (progress.value < 30) return 'Initialisation...'
    if (progress.value < 60) return 'Chargement des ressources...'
    if (progress.value < 90) return 'Préparation de la page...'
    return 'Finalisation...'
  }
  return 'Chargement de la page...'
})
</script>

<style scoped>
@keyframes spin-reverse {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}

.animate-spin-reverse {
  animation: spin-reverse 1.5s linear infinite;
}
</style>
