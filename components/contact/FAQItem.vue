<template>
  <Card class="cursor-pointer" @click="isOpen = !isOpen">
    <div>
      <!-- Question -->
      <button
        class="w-full flex items-center justify-between gap-4 text-left focus:outline-none"
        :aria-expanded="isOpen"
      >
        <h3 class="text-lg font-semibold text-asp-black">
          {{ question }}
        </h3>
        <ChevronDownIcon 
          :class="[
            'w-5 h-5 text-asp-blue-700 flex-shrink-0 transition-transform duration-200',
            isOpen ? 'rotate-180' : ''
          ]"
        />
      </button>

      <!-- Answer -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="max-h-0 opacity-0"
        enter-to-class="max-h-96 opacity-100"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="max-h-96 opacity-100"
        leave-to-class="max-h-0 opacity-0"
      >
        <div v-if="isOpen" class="mt-4 overflow-hidden">
          <p class="text-asp-gray-600 leading-relaxed">
            {{ answer }}
          </p>
        </div>
      </Transition>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ChevronDownIcon } from '@heroicons/vue/24/outline'

interface Props {
  question: string
  answer: string
}

defineProps<Props>()

const isOpen = ref(false)
</script>
