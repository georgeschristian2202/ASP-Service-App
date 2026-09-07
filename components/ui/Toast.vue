<template>
  <Teleport to="body">
    <div class="fixed top-4 right-4 z-[9999] flex flex-col gap-3 max-w-md">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :class="[
            'rounded-lg shadow-lg border p-4 flex items-start gap-3 min-w-[320px] max-w-md',
            toastClasses[toast.severity]
          ]"
          role="alert"
        >
          <!-- Icon -->
          <div class="flex-shrink-0 mt-0.5">
            <component :is="toastIcons[toast.severity]" :class="iconClasses[toast.severity]" />
          </div>

          <!-- Content -->
          <div class="flex-1 min-w-0">
            <h4 class="font-semibold text-sm mb-1">
              {{ toast.summary }}
            </h4>
            <p class="text-sm opacity-90">
              {{ toast.detail }}
            </p>
          </div>

          <!-- Close button -->
          <button
            type="button"
            @click="removeToast(toast.id)"
            class="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Fermer"
          >
            <X :size="18" />
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useToastStore } from '@/stores/toast'
import { 
  CheckCircle, 
  Info, 
  AlertCircle, 
  AlertTriangle,
  X 
} from 'lucide-vue-next'

const toastStore = useToastStore()
const toasts = computed(() => toastStore.toasts)

const toastIcons = {
  success: CheckCircle,
  info: Info,
  error: AlertCircle,
  warn: AlertTriangle
}

const toastClasses = {
  success: 'bg-green-50 text-green-800 border-green-200',
  info: 'bg-blue-50 text-blue-800 border-blue-200',
  error: 'bg-red-50 text-red-800 border-red-200',
  warn: 'bg-yellow-50 text-yellow-800 border-yellow-200'
}

const iconClasses = {
  success: 'w-5 h-5 text-green-600',
  info: 'w-5 h-5 text-blue-600',
  error: 'w-5 h-5 text-red-600',
  warn: 'w-5 h-5 text-yellow-600'
}

const removeToast = (id: string) => {
  toastStore.remove(id)
}
</script>

<style scoped>
/* Toast animations */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.toast-move {
  transition: transform 0.3s ease;
}
</style>
