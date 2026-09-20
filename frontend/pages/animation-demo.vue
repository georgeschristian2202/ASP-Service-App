<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <Container>
      <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl font-bold text-center mb-12">Animation de Texte Demo</h1>
        
        <div class="space-y-8">
          <!-- Demo 1: Character Animation -->
          <div class="bg-white rounded-lg shadow-md p-8">
            <h2 class="text-2xl font-semibold mb-4">Animation par Caractères</h2>
            <p ref="charText" class="text-lg text-gray-700 mb-4">
              Bienvenue chez ASP Services, expert en signalétique depuis 1998.
            </p>
            <Button @click="animateChars" variant="primary">
              Animer les caractères
            </Button>
          </div>

          <!-- Demo 2: Word Animation -->
          <div class="bg-white rounded-lg shadow-md p-8">
            <h2 class="text-2xl font-semibold mb-4">Animation par Mots</h2>
            <p ref="wordText" class="text-lg text-gray-700 mb-4">
              Notre mission est de concevoir et réaliser des solutions fiables et adaptées.
            </p>
            <Button @click="animateWordsDemo" variant="secondary">
              Animer les mots
            </Button>
          </div>

          <!-- Demo 3: Expandable Content -->
          <div class="bg-white rounded-lg shadow-md p-8">
            <h2 class="text-2xl font-semibold mb-4">Contenu Extensible Animé</h2>
            <p class="text-gray-700 mb-4">
              Cliquez sur "En savoir plus" pour voir l'animation.
            </p>
            
            <button
              @click="toggleContent"
              class="inline-flex items-center gap-2 text-blue-700 font-semibold hover:text-blue-600 transition-colors cursor-pointer mb-4"
            >
              <span>{{ showContent ? 'Masquer' : 'En savoir plus' }}</span>
              <svg 
                :class="['w-5 h-5 transition-transform duration-200', showContent ? 'rotate-90' : '']" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <Transition
              enter-active-class="transition-all duration-300"
              enter-from-class="opacity-0 max-h-0"
              enter-to-class="opacity-100 max-h-96"
              leave-active-class="transition-all duration-200"
              leave-from-class="opacity-100 max-h-96"
              leave-to-class="opacity-0 max-h-0"
            >
              <div v-if="showContent" class="overflow-hidden">
                <div class="pt-4 border-t border-gray-200">
                  <p class="expand-text text-gray-700 leading-relaxed mb-3">
                    Depuis sa création en 1998, ASP Services développe son savoir-faire dans la communication par objet, 
                    la signalisation, la signalétique, le management et l'imprimerie.
                  </p>
                  <p class="expand-text text-gray-700 leading-relaxed">
                    Notre expertise nous permet de proposer des solutions professionnelles et durables.
                  </p>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </Container>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'

const { animateTextReveal, animateWords } = useTextAnimation()

const charText = ref<HTMLElement | null>(null)
const wordText = ref<HTMLElement | null>(null)
const showContent = ref(false)

const animateChars = () => {
  if (charText.value) {
    const originalText = charText.value.textContent || ''
    animateTextReveal(charText.value, {
      duration: 800,
      stagger: 30
    })
    
    // Restaurer le texte original après 3 secondes
    setTimeout(() => {
      if (charText.value) {
        charText.value.textContent = originalText
      }
    }, 3000)
  }
}

const animateWordsDemo = () => {
  if (wordText.value) {
    const originalText = wordText.value.textContent || ''
    animateWords(wordText.value, {
      duration: 600,
      stagger: 50
    })
    
    // Restaurer le texte original après 3 secondes
    setTimeout(() => {
      if (wordText.value) {
        wordText.value.textContent = originalText
      }
    }, 3000)
  }
}

const toggleContent = async () => {
  showContent.value = !showContent.value
  
  if (showContent.value) {
    await nextTick()
    
    const expandTexts = document.querySelectorAll('.expand-text')
    expandTexts.forEach((text, index) => {
      animateWords(text as HTMLElement, {
        duration: 600,
        delay: index * 100,
        stagger: 35
      })
    })
  }
}

useHead({
  title: 'Animation Demo - ASP Services'
})
</script>
