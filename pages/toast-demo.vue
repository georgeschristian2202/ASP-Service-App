<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <Container>
      <div class="max-w-2xl mx-auto">
        <h1 class="text-3xl font-bold text-center mb-8">Toast Demo</h1>
        
        <div class="bg-white rounded-lg shadow-md p-8">
          <h2 class="text-xl font-semibold mb-6">Test Toast Notifications</h2>
          
          <div class="flex flex-wrap gap-4">
            <Button @click="showSuccessToast" variant="primary">
              Show Success
            </Button>
            
            <Button @click="showInfoToast" variant="secondary">
              Show Info
            </Button>
            
            <Button @click="showWarnToast" variant="outline">
              Show Warning
            </Button>
            
            <Button @click="showErrorToast" variant="outline">
              Show Error
            </Button>
            
            <Button @click="showMultipleToasts" variant="primary">
              Show Multiple
            </Button>
          </div>
        </div>
      </div>
    </Container>
  </div>
</template>

<script setup lang="ts">
const toast = useToast()

const showSuccessToast = () => {
  toast.showSuccess(
    'Enregistré avec succès',
    'Vos modifications ont été enregistrées.',
    5000
  )
}

const showInfoToast = () => {
  toast.showInfo(
    'Information',
    'Il y a quelque chose que vous devriez vérifier.',
    5000
  )
}

const showWarnToast = () => {
  toast.showWarn(
    'Attention',
    'Cette action nécessite votre attention.',
    5000
  )
}

const showErrorToast = () => {
  toast.showError(
    'Erreur',
    'Une erreur est survenue lors du traitement.',
    5000
  )
}

const showMultipleToasts = () => {
  toast.showSuccess('Succès 1', 'Premier message de succès', 3000)
  setTimeout(() => {
    toast.showInfo('Info', 'Message d\'information', 3000)
  }, 500)
  setTimeout(() => {
    toast.showWarn('Attention', 'Message d\'avertissement', 3000)
  }, 1000)
}

useHead({
  title: 'Toast Demo - ASP Services'
})
</script>
