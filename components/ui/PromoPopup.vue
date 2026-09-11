<template>
  <Transition name="promo">
    <div
      v-if="isVisible"
      class="fixed bottom-28 left-4 sm:left-6 z-50 w-[calc(100%-2rem)] max-w-sm sm:w-80"
    >
      <div class="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        <!-- Header -->
        <div class="bg-gradient-to-r from-asp-blue-900 to-asp-blue-700 px-4 py-3 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <!-- Icône éclair SVG -->
            <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"/>
            </svg>
            <span class="text-white font-bold text-sm">Offre Spéciale</span>
            <span class="bg-yellow-400 text-asp-blue-900 text-xs font-bold px-2 py-0.5 rounded-full">GRATUIT</span>
          </div>
          <button
            @click="close"
            class="text-white/70 hover:text-white transition-colors cursor-pointer p-1 rounded-full hover:bg-white/10"
            aria-label="Fermer"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Body -->
        <div class="px-4 py-4">
          <p class="text-asp-black font-semibold text-sm mb-1">
            Votre devis en moins de 24h !
          </p>
          <p class="text-asp-gray-600 text-xs leading-relaxed mb-4">
            Signalétique, impression grand format, marquage au sol — contactez-nous maintenant sur WhatsApp et recevez votre devis personnalisé.
          </p>

          <div class="flex gap-2">
            <a
              href="whatsapp://send?phone=24177863198&text=Bonjour%20ASP%20Services%2C%20je%20souhaite%20un%20devis%20gratuit."
              target="_blank"
              rel="noopener noreferrer"
              @click="close"
              class="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-white text-xs font-semibold transition-all duration-200 hover:opacity-90 active:scale-95 cursor-pointer"
              style="background-color: #25D366;"
            >
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Devis WhatsApp
            </a>
            <button
              @click="close"
              class="px-3 py-2.5 rounded-xl text-asp-gray-500 text-xs font-medium border border-asp-gray-200 hover:bg-asp-gray-50 transition-colors cursor-pointer"
            >
              Plus tard
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const STORAGE_KEY = 'asp_promo_dismissed'
const isVisible = ref(false)

const close = () => {
  isVisible.value = false
  sessionStorage.setItem(STORAGE_KEY, 'true')
}

onMounted(() => {
  if (sessionStorage.getItem(STORAGE_KEY)) return
  setTimeout(() => {
    isVisible.value = true
  }, 5000)
})
</script>

<style scoped>
.promo-enter-active {
  animation: promoIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.promo-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.promo-leave-to {
  opacity: 0;
  transform: translateY(16px) scale(0.95);
}

@keyframes promoIn {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
