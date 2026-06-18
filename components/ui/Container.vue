<template>
  <div :class="containerClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  size?: 'default' | 'narrow' | 'wide' | 'full'
  padding?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'default',
  padding: true
})

const containerClasses = computed(() => {
  const classes: string[] = ['mx-auto']

  // Container max-width
  switch (props.size) {
    case 'narrow':
      classes.push('max-w-4xl')
      break
    case 'default':
      classes.push('max-w-7xl')
      break
    case 'wide':
      classes.push('max-w-8xl')
      break
    case 'full':
      classes.push('w-full')
      break
  }

  // Horizontal padding
  if (props.padding) {
    classes.push('px-6 lg:px-8')
  }

  return classes.join(' ')
})
</script>
