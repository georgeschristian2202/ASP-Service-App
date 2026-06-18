<template>
  <div :class="cardClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'default' | 'service' | 'image' | 'flat'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hoverable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  padding: 'md',
  hoverable: false
})

const cardClasses = computed(() => {
  const classes: string[] = []

  // Base styles
  classes.push('rounded-xl')

  // Variant styles
  switch (props.variant) {
    case 'default':
      classes.push('bg-asp-white border border-asp-gray-200 shadow-asp-md')
      break
    case 'service':
      classes.push('bg-asp-white border border-asp-gray-200 shadow-asp-md')
      if (props.hoverable) {
        classes.push('transition-all duration-300 cursor-pointer hover:shadow-asp-xl hover:scale-[1.02]')
      }
      break
    case 'image':
      classes.push('bg-asp-white overflow-hidden shadow-asp-lg')
      if (props.hoverable) {
        classes.push('transition-all duration-300 cursor-pointer hover:shadow-asp-2xl')
      }
      break
    case 'flat':
      classes.push('bg-asp-gray-100')
      break
  }

  // Padding
  switch (props.padding) {
    case 'none':
      classes.push('p-0')
      break
    case 'sm':
      classes.push('p-4')
      break
    case 'md':
      classes.push('p-6 lg:p-8')
      break
    case 'lg':
      classes.push('p-8 lg:p-12')
      break
  }

  return classes.join(' ')
})
</script>
