<template>
  <div class="loading-page">
    <div class="loader-container">
      <!-- Spinner avec logo seulement -->
      <div class="loader-spinner">
        <div class="loader-circle-outer"></div>
        <div class="loader-circle-inner"></div>
        <div class="loader-logo">
          <img src="/Logo-ASP-Service-sans fond.png" alt="ASP Services" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Désactiver le layout
definePageMeta({
  layout: false
})

const router = useRouter()

onMounted(() => {
  // Attendre le chargement complet
  const loadTimeout = setTimeout(() => {
    // Marquer comme chargé
    sessionStorage.setItem('app-loaded', 'true')
    
    // Récupérer la destination ou aller à /accueil par défaut
    const intendedPath = sessionStorage.getItem('intended-path') || '/accueil'
    sessionStorage.removeItem('intended-path')
    
    // Rediriger
    router.push(intendedPath)
  }, 1500) // 1.5 secondes de loading
  
  // Cleanup
  onUnmounted(() => {
    clearTimeout(loadTimeout)
  })
})
</script>

<style scoped>
.loading-page {
  position: fixed;
  inset: 0;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loader-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.loader-spinner {
  position: relative;
  width: 112px;
  height: 112px;
}

.loader-circle-outer {
  position: absolute;
  inset: 0;
  border: 4px solid #cbd5e1;
  border-top-color: #1e3a5f;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loader-circle-inner {
  position: absolute;
  inset: 12px;
  border: 4px solid #fef3c7;
  border-bottom-color: #fbbf24;
  border-radius: 50%;
  animation: spin-reverse 1.5s linear infinite;
}

.loader-logo {
  position: absolute;
  inset: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader-logo img {
  width: 64px;
  height: 64px;
  object-fit: contain;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes spin-reverse {
  to { transform: rotate(-360deg); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
</style>
