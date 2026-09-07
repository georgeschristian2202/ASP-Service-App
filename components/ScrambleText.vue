<template>
  <span ref="textElement" class="text-blue-300 whitespace-nowrap">
    {{ currentText }}
  </span>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  texts: string[]
  interval?: number
}>()

const textElement = ref<HTMLElement | null>(null)
const currentText = ref(props.texts[0])
let currentIndex = 0

const scrambleToText = async (targetText: string) => {
  if (!textElement.value) return
  
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*'
  const startText = currentText.value
  const maxLength = Math.max(startText.length, targetText.length)
  const duration = 1000 // 1 seconde
  const steps = 30
  const stepDuration = duration / steps
  
  for (let step = 0; step <= steps; step++) {
    const progress = step / steps
    let scrambled = ''
    
    for (let i = 0; i < maxLength; i++) {
      if (i < targetText.length) {
        if (Math.random() > progress) {
          // Phase de scramble
          scrambled += chars[Math.floor(Math.random() * chars.length)]
        } else {
          // Révélation progressive
          scrambled += targetText[i]
        }
      }
    }
    
    currentText.value = scrambled
    await new Promise(resolve => setTimeout(resolve, stepDuration))
  }
  
  currentText.value = targetText
}

const playAnimation = async () => {
  currentIndex = (currentIndex + 1) % props.texts.length
  await scrambleToText(props.texts[currentIndex])
}

onMounted(() => {
  // Démarrer l'animation après 2 secondes
  setTimeout(() => {
    playAnimation()
    // Continuer l'animation
    setInterval(() => {
      playAnimation()
    }, props.interval || 3500)
  }, 2000)
})
</script>
