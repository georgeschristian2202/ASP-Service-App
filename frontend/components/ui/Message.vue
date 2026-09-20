<template>
  <div
    v-if="modelValue"
    :class="[
      'rounded-lg p-4 flex items-start gap-3',
      variantClasses,
      sizeClasses
    ]"
    role="alert"
  >
    <!-- Icon -->
    <div class="flex-shrink-0">
      <slot name="icon">
        <component :is="iconComponent" :class="iconClasses" />
      </slot>
    </div>

    <!-- Content -->
    <div class="flex-1">
      <slot />
    </div>

    <!-- Close button (optional) -->
    <button
      v-if="closable"
      type="button"
      @click="close"
      class="flex-shrink-0 text-current opacity-70 hover:opacity-100 transition-opacity"
      aria-label="Fermer"
    >
      <X :size="16" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { 
  AlertCircle, 
  CheckCircle, 
  Info, 
  AlertTriangle,
  X 
} from 'lucide-vue-next'

interface Props {
  severity?: 'success' | 'info' | 'warn' | 'error'
  variant?: 'filled' | 'outlined' | 'simple'
  size?: 'small' | 'medium' | 'large'
  closable?: boolean
  modelValue?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  severity: 'info',
  variant: 'filled',
  size: 'medium',
  closable: false,
  modelValue: true
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const close = () => {
  emit('update:modelValue', false)
}

const iconComponent = computed(() => {
  switch (props.severity) {
    case 'success':
      return CheckCircle
    case 'error':
      return AlertCircle
    case 'warn':
      return AlertTriangle
    case 'info':
    default:
      return Info
  }
})

const variantClasses = computed(() => {
  const base = {
    success: {
      filled: 'bg-green-50 text-green-800 border border-green-200',
      outlined: 'bg-white text-green-800 border-2 border-green-500',
      simple: 'bg-transparent text-green-800'
    },
    error: {
      filled: 'bg-red-50 text-red-800 border border-red-200',
      outlined: 'bg-white text-red-800 border-2 border-red-500',
      simple: 'bg-transparent text-red-800'
    },
    warn: {
      filled: 'bg-yellow-50 text-yellow-800 border border-yellow-200',
      outlined: 'bg-white text-yellow-800 border-2 border-yellow-500',
      simple: 'bg-transparent text-yellow-800'
    },
    info: {
      filled: 'bg-blue-50 text-blue-800 border border-blue-200',
      outlined: 'bg-white text-blue-800 border-2 border-blue-500',
      simple: 'bg-transparent text-blue-800'
    }
  }

  return base[props.severity][props.variant]
})

const sizeClasses = computed(() => {
  const sizes = {
    small: 'text-sm py-2 px-3',
    medium: 'text-base py-3 px-4',
    large: 'text-lg py-4 px-5'
  }

  return sizes[props.size]
})

const iconClasses = computed(() => {
  const sizes = {
    small: 'w-4 h-4',
    medium: 'w-5 h-5',
    large: 'w-6 h-6'
  }

  return sizes[props.size]
})
</script>
