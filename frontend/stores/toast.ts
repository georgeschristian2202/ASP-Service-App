import { defineStore } from 'pinia'

export interface Toast {
  id: string
  severity: 'success' | 'info' | 'warn' | 'error'
  summary: string
  detail: string
  life?: number
}

export const useToastStore = defineStore('toast', {
  state: () => ({
    toasts: [] as Toast[]
  }),

  actions: {
    add(toast: Omit<Toast, 'id'>) {
      const id = Date.now().toString() + Math.random().toString(36).substr(2, 9)
      const newToast: Toast = {
        id,
        ...toast,
        life: toast.life || 5000
      }

      this.toasts.push(newToast)

      // Auto remove after life duration
      if (newToast.life) {
        setTimeout(() => {
          this.remove(id)
        }, newToast.life)
      }
    },

    remove(id: string) {
      const index = this.toasts.findIndex(t => t.id === id)
      if (index !== -1) {
        this.toasts.splice(index, 1)
      }
    },

    clear() {
      this.toasts = []
    }
  }
})
