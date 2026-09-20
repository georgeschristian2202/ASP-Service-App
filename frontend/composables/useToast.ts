import { useToastStore } from '@/stores/toast'

export const useToast = () => {
  const toastStore = useToastStore()

  const showSuccess = (summary: string, detail: string, life?: number) => {
    toastStore.add({
      severity: 'success',
      summary,
      detail,
      life
    })
  }

  const showInfo = (summary: string, detail: string, life?: number) => {
    toastStore.add({
      severity: 'info',
      summary,
      detail,
      life
    })
  }

  const showWarn = (summary: string, detail: string, life?: number) => {
    toastStore.add({
      severity: 'warn',
      summary,
      detail,
      life
    })
  }

  const showError = (summary: string, detail: string, life?: number) => {
    toastStore.add({
      severity: 'error',
      summary,
      detail,
      life
    })
  }

  const clear = () => {
    toastStore.clear()
  }

  return {
    showSuccess,
    showInfo,
    showWarn,
    showError,
    clear,
    add: toastStore.add
  }
}
