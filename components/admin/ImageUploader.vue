<template>
  <div class="space-y-4">
    <!-- Prévisualisation -->
    <div class="aspect-video bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-gray-300">
      <img v-if="imageUrl"
        :src="imageUrl"
        :alt="alt"
        class="w-full h-full object-cover"
       loading="lazy" decoding="async" />
      <div v-else class="w-full h-full flex items-center justify-center">
        <div class="text-center">
          <svg class="w-12 h-12 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p class="text-sm text-gray-500">Aucune image</p>
        </div>
      </div>
    </div>

    <!-- Barre de progression -->
    <div v-if="isUploading" class="space-y-2">
      <div class="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div 
          class="bg-asp-blue-700 h-2 transition-all duration-300"
          :style="{ width: `${uploadProgress}%` }"
        ></div>
      </div>
      <p class="text-sm text-center text-asp-gray-600">
        Upload en cours... {{ uploadProgress }}%
      </p>
    </div>

    <!-- Onglets -->
    <div class="flex border-b border-gray-200">
      <button
        type="button"
        @click="activeTab = 'upload'"
        :class="[
          'px-4 py-2 text-sm font-medium transition-colors',
          activeTab === 'upload'
            ? 'border-b-2 border-asp-blue-700 text-asp-blue-700'
            : 'text-gray-500 hover:text-gray-700'
        ]"
      >
        📤 Upload
      </button>
      <button
        type="button"
        @click="activeTab = 'url'"
        :class="[
          'px-4 py-2 text-sm font-medium transition-colors',
          activeTab === 'url'
            ? 'border-b-2 border-asp-blue-700 text-asp-blue-700'
            : 'text-gray-500 hover:text-gray-700'
        ]"
      >
        🔗 URL
      </button>
    </div>

    <!-- Contenu des onglets -->
    <div>
      <!-- Upload de fichier -->
      <div v-show="activeTab === 'upload'" class="space-y-3">
        <input
          ref="fileInput"
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
          @change="handleFileSelect"
          class="hidden"
        />
        
        <button
          type="button"
          @click="triggerFileInput"
          :disabled="isUploading"
          class="w-full px-4 py-3 bg-asp-blue-700 hover:bg-asp-blue-800 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          Choisir un fichier
        </button>
        
        <p class="text-xs text-center text-asp-gray-500">
          JPG, PNG, WEBP ou GIF - Max 10MB
        </p>
      </div>

      <!-- URL -->
      <div v-show="activeTab === 'url'" class="space-y-3">
        <input
          v-model="urlInput"
          type="url"
          placeholder="https://ik.imagekit.io/..."
          class="w-full px-4 py-2 border border-asp-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
        />
        
        <button
          type="button"
          @click="handleUrlSubmit"
          :disabled="!urlInput || isUploading"
          class="w-full px-4 py-3 bg-asp-blue-700 hover:bg-asp-blue-800 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Utiliser cette URL
        </button>
        
        <p class="text-xs text-center text-asp-gray-500">
          Collez l'URL complète de l'image ImageKit
        </p>
      </div>
    </div>

    <!-- Message d'erreur -->
    <div v-if="errorMessage" class="p-3 bg-red-50 border border-red-200 rounded-lg">
      <p class="text-sm text-red-600">{{ errorMessage }}</p>
    </div>

    <!-- URL actuelle (pour copier) -->
    <div v-if="imageUrl" class="space-y-2">
      <label class="block text-xs font-medium text-asp-gray-700">
        URL de l'image
      </label>
      <div class="flex gap-2">
        <input
          :value="imageUrl"
          readonly
          class="flex-1 px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg"
        />
        <button
          type="button"
          @click="copyToClipboard"
          class="px-3 py-2 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors"
          title="Copier"
        >
          <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string
  alt?: string
  folder?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  alt: 'Image',
  folder: 'portfolio'
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'upload': [result: { url: string; path: string }]
}>()

const { uploadImage, uploadFromUrl, isUploading, uploadProgress } = useImageUpload()

const fileInput = ref<HTMLInputElement>()
const activeTab = ref<'upload' | 'url'>('upload')
const urlInput = ref('')
const errorMessage = ref('')
const imageUrl = computed(() => props.modelValue)

// Déclencher le sélecteur de fichier
const triggerFileInput = () => {
  fileInput.value?.click()
}

// Gérer la sélection de fichier
const handleFileSelect = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (!file) return

  errorMessage.value = ''
  
  const result = await uploadImage(file, props.folder)
  
  if (result.success && result.url) {
    emit('update:modelValue', result.url)
    emit('upload', { url: result.url, path: result.path || '' })
  } else {
    errorMessage.value = result.error || 'Erreur lors de l\'upload'
  }

  // Reset input
  if (target) {
    target.value = ''
  }
}

// Gérer la soumission d'URL
const handleUrlSubmit = async () => {
  if (!urlInput.value) return

  errorMessage.value = ''
  
  const result = await uploadFromUrl(urlInput.value, props.folder)
  
  if (result.success && result.url) {
    emit('update:modelValue', result.url)
    emit('upload', { url: result.url, path: result.path || '' })
    urlInput.value = ''
  } else {
    errorMessage.value = result.error || 'URL invalide'
  }
}

// Copier l'URL dans le presse-papier
const copyToClipboard = async () => {
  if (!imageUrl.value) return

  try {
    await navigator.clipboard.writeText(imageUrl.value)
    // TODO: Afficher un message de succès
    alert('URL copiée !')
  } catch (error) {
    console.error('Copy error:', error)
  }
}
</script>
