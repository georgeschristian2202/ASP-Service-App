<template>
  <!-- Barre de chargement fine en haut de page (style YouTube/GitHub) -->
  <Transition
    enter-active-class="transition-opacity duration-100"
    leave-active-class="transition-opacity duration-300"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isLoading"
      class="fixed top-0 left-0 right-0 z-[9999] h-1"
    >
      <div
        class="h-full bg-gradient-to-r from-asp-blue-500 via-yellow-400 to-asp-blue-600 shadow-lg transition-all duration-300 ease-out"
        :style="{ width: progress + '%' }"
      >
        <!-- Effet de brillance -->
        <div class="h-full w-32 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const { $pageLoading } = useNuxtApp()
const isLoading = $pageLoading?.isLoading || ref(false)
const progress = $pageLoading?.progress || ref(0)
</script>

<style scoped>
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(400%);
  }
}

.animate-shimmer {
  animation: shimmer 1.5s infinite;
}
</style>
