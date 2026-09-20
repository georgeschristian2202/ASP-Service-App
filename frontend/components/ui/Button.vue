<template>
  <component
    :is="componentTag"
    :to="to"
    :href="href"
    :type="nativeType"
    :disabled="disabled"
    :class="buttonClasses"
    class="inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  to?: string
  href?: string
  disabled?: boolean
  nativeType?: 'button' | 'submit' | 'reset'
  fullWidth?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  nativeType: 'button',
  fullWidth: false
})

const componentTag = computed(() => {
  if (props.to) return resolveComponent('NuxtLink')
  if (props.href) return 'a'
  return 'button'
})

const buttonClasses = computed(() => {
  const classes: string[] = []

  // Variant styles
  switch (props.variant) {
    case 'primary':
      classes.push(
        'bg-asp-blue-700 text-asp-white',
        'hover:bg-asp-blue-900',
        'focus:ring-asp-blue-500'
      )
      break
    case 'secondary':
      classes.push(
        'bg-asp-blue-500 text-asp-white',
        'hover:bg-asp-blue-700',
        'focus:ring-asp-blue-500'
      )
      break
    case 'ghost':
      classes.push(
        'bg-transparent text-asp-blue-700 border-2 border-asp-blue-700',
        'hover:bg-asp-blue-700 hover:text-asp-white',
        'focus:ring-asp-blue-500'
      )
      break
    case 'outline':
      classes.push(
        'bg-transparent text-asp-gray-800 border-2 border-asp-gray-400',
        'hover:border-asp-blue-700 hover:text-asp-blue-700',
        'focus:ring-asp-gray-400'
      )
      break
  }

  // Size styles
  switch (props.size) {
    case 'sm':
      classes.push('px-4 py-2 text-sm rounded-md')
      break
    case 'md':
      classes.push('px-8 py-3 text-base rounded-lg')
      break
    case 'lg':
      classes.push('px-10 py-4 text-lg rounded-lg')
      break
  }

  // Full width
  if (props.fullWidth) {
    classes.push('w-full')
  }

  return classes.join(' ')
})
</script>
