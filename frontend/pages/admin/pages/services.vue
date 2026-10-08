<template>
  <div class="min-h-screen bg-gray-50">
    <ConfirmDialog ref="confirmDialog" />
    <!-- En-tête -->
    <div class="bg-white border-b border-gray-200 p-6 rounded-lg shadow-sm mb-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-semibold text-gray-900 mb-1">Édition de la Page Services</h1>
          <p class="text-sm text-gray-600">Modifiez le contenu détaillé de vos services</p>
        </div>
        <div class="flex gap-3">
          <NuxtLink
            to="/services"
            target="_blank"
            class="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors text-sm font-medium"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Prévisualiser
          </NuxtLink>
          <button
            @click="handleSave"
            :disabled="isSaving"
            class="inline-flex items-center gap-2 px-5 py-2 bg-asp-blue-700 hover:bg-asp-blue-800 text-white text-sm font-medium rounded-lg transition-colors shadow-sm disabled:opacity-50"
          >
            <svg v-if="!isSaving" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            {{ isSaving ? 'Enregistrement...' : 'Enregistrer' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Section Hero -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Section Hero</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Titre de la page</label>
          <input
            v-model="content.hero.title"
            type="text"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
            placeholder="Nos Services"
          />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            v-auto-resize
            v-model="content.hero.description"
            rows="2"
            class="auto-resize-textarea block w-full max-w-full min-w-0 px-4 py-2 border border-gray-300 rounded-lg resize-none overflow-hidden focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
            placeholder="Découvrez notre gamme complète..."
          ></textarea>
        </div>
      </div>
    </div>

    <!-- Liste des services avec navigation -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-lg font-semibold text-gray-900">Services ({{ content.services.length }})</h2>
        <div class="flex items-center gap-3">
          <span class="hidden sm:inline text-sm text-gray-600">
            Cliquez sur un service pour l'éditer
          </span>
          <button
            type="button"
            @click="addService"
            class="inline-flex items-center gap-2 px-4 py-2 bg-asp-blue-700 hover:bg-asp-blue-800 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Ajouter un service
          </button>
        </div>
      </div>

      <!-- Grille des services -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div
          v-for="(service, index) in paginatedServices"
          :key="service.id"
          @click="selectService((currentServicesPage - 1) * servicesPerPage + index)"
          :class="[
            'relative min-w-0 p-4 border-2 rounded-xl transition-all hover:shadow-md cursor-pointer',
            selectedServiceIndex === (currentServicesPage - 1) * servicesPerPage + index
              ? 'border-asp-blue-600 bg-asp-blue-50 ring-2 ring-asp-blue-200'
              : 'border-gray-200 bg-white hover:border-gray-300'
          ]"
        >
          <div v-if="selectedServiceIndex === (currentServicesPage - 1) * servicesPerPage + index" class="absolute -top-2.5 left-3 rounded-full bg-asp-blue-700 px-2 py-0.5 text-xs font-medium text-white">En cours d’édition</div>
          <div class="flex items-start justify-between gap-3">
            <button type="button" @click.stop="selectService((currentServicesPage - 1) * servicesPerPage + index)" class="flex items-start gap-3 flex-1 min-w-0 text-left">
              <div class="w-10 h-10 bg-asp-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-asp-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.5-9.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 8.5-8.5z" />
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="font-semibold text-gray-900 mb-1 truncate">{{ service.title }}</h3>
                <p class="text-xs text-gray-600 truncate">{{ service.subtitle || service.description }}</p>
                <span class="inline-block mt-2 text-xs font-medium text-asp-blue-700">Modifier</span>
              </div>
            </button>
            <button
              type="button"
              @click.stop="removeService((currentServicesPage - 1) * servicesPerPage + index)"
              class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
              :aria-label="`Supprimer ${service.title}`"
              title="Supprimer ce service"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div v-if="totalServicesPages > 1" class="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 pb-5">
        <p class="text-sm text-gray-600">Page {{ currentServicesPage }} sur {{ totalServicesPages }} · {{ content.services.length }} services</p>
        <div class="flex items-center gap-2"><button type="button" @click="currentServicesPage--" :disabled="currentServicesPage === 1" class="rounded-lg border border-gray-300 px-3 py-2 text-sm disabled:opacity-40">Précédent</button><button v-for="page in totalServicesPages" :key="page" type="button" @click="currentServicesPage = page" :class="currentServicesPage === page ? 'border-asp-blue-700 bg-asp-blue-700 text-white' : 'border-gray-300 bg-white text-gray-700'" class="min-w-9 rounded-lg border px-3 py-2 text-sm">{{ page }}</button><button type="button" @click="currentServicesPage++" :disabled="currentServicesPage === totalServicesPages" class="rounded-lg border border-gray-300 px-3 py-2 text-sm disabled:opacity-40">Suivant</button></div>
      </div>

      <!-- Formulaire d'édition du service sélectionné -->
      <div v-if="selectedServiceIndex !== null" ref="serviceEditor" class="scroll-mt-36 rounded-2xl border border-asp-blue-200 bg-asp-blue-50/30 p-5 sm:p-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-gray-900">
            Édition : {{ content.services[selectedServiceIndex].title }}
          </h3>
          <div class="flex items-center gap-2">
            <button
              type="button"
              @click="removeSelectedService"
              class="px-3 py-2 text-sm text-red-700 hover:bg-red-50 rounded-lg transition-colors"
            >
              Supprimer
            </button>
            <button
              type="button"
              @click="selectedServiceIndex = null"
              class="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Fermer le formulaire"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div class="space-y-5">
          <!-- Informations de base -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Identifiant (URL)</label>
              <input
                v-model="content.services[selectedServiceIndex].id"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
                placeholder="impression-grand-format"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Titre du service</label>
              <input
                v-model="content.services[selectedServiceIndex].title"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Sous-titre</label>
              <input
                v-model="content.services[selectedServiceIndex].subtitle"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-5 items-start">
            <div class="space-y-5">
              <!-- Description courte -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Description courte (carte)</label>
                <textarea v-auto-resize v-model="content.services[selectedServiceIndex].description" rows="2" class="auto-resize-textarea block w-full px-4 py-2 border border-gray-300 rounded-lg resize-none overflow-hidden focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"></textarea>
              </div>
              <!-- Description longue -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Description détaillée</label>
                <textarea v-auto-resize v-model="content.services[selectedServiceIndex].longDescription" rows="4" class="auto-resize-textarea block w-full px-4 py-2 border border-gray-300 rounded-lg resize-none overflow-hidden focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"></textarea>
              </div>
            </div>
            <!-- Image compacte dans une colonne dédiée -->
            <div class="min-w-0">
              <label class="block text-sm font-medium text-gray-700 mb-2">Image du service</label>
              <ImageUploader v-model="content.services[selectedServiceIndex].image" :alt="content.services[selectedServiceIndex].title || 'Image du service'" folder="services" compact square-preview @upload="handleServiceImageUpload" />
              <p class="mt-2 text-xs text-gray-500">Image envoyée dans le dossier « services » d'ImageKit.</p>
            </div>
          </div>

          <!-- Caractéristiques -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Caractéristiques (une par ligne)</label>
            <textarea
              v-auto-resize
              :value="content.services[selectedServiceIndex].features.join('\n')"
              @input="content.services[selectedServiceIndex].features = ($event.target as HTMLTextAreaElement).value.split('\n').filter(f => f.trim())"
              rows="3"
              class="auto-resize-textarea block w-full max-w-full min-w-0 px-4 py-2 border border-gray-300 rounded-lg resize-none overflow-hidden focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
              placeholder="Caractéristique 1&#10;Caractéristique 2&#10;..."
            ></textarea>
          </div>

          <!-- Applications courantes -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Applications courantes (une par ligne)</label>
            <textarea
              v-auto-resize
              :value="content.services[selectedServiceIndex].applications.join('\n')"
              @input="content.services[selectedServiceIndex].applications = ($event.target as HTMLTextAreaElement).value.split('\n').map(item => item.trim()).filter(Boolean)"
              rows="3"
              class="auto-resize-textarea block w-full max-w-full min-w-0 px-4 py-2 border border-gray-300 rounded-lg resize-none overflow-hidden focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
              placeholder="Entreprises&#10;Commerces&#10;Administrations"
            ></textarea>
            <p class="mt-1 text-xs text-gray-500">Ces textes apparaissent sous forme de petites étiquettes dans l’aperçu et sur la page publique.</p>
          </div>

          <!-- Tarification -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Tarif (à partir de)</label>
              <input
                v-model="content.services[selectedServiceIndex].pricing.from"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
                placeholder="À partir de 50 000 FCFA"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Détails tarification</label>
              <input
                v-model="content.services[selectedServiceIndex].pricing.description"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
                placeholder="Prix au m² ou forfait selon surface"
              />
            </div>
          </div>

          <!-- Informations complémentaires -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Délai de livraison</label>
              <input
                v-model="content.services[selectedServiceIndex].deliveryTime"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
                placeholder="2 à 4 semaines"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Garantie</label>
              <input
                v-model="content.services[selectedServiceIndex].warranty"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
                placeholder="2 ans sur les installations"
              />
            </div>
          </div>

          <div v-if="selectedServicePreview" class="rounded-2xl border border-gray-200 bg-white p-4 sm:p-6">
            <div class="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4">
              <div><h4 class="font-semibold text-gray-900">Aperçu sur la page publique</h4><p class="mt-1 text-sm text-gray-500">Cette vue reprend directement le composant utilisé sur la page Services.</p></div>
              <NuxtLink :to="`/services#${selectedServicePreview.id}`" target="_blank" class="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Ouvrir la page publique</NuxtLink>
            </div>
            <ServiceDetail :service="selectedServicePreview" />
          </div>
        </div>
      </div>

      <!-- Message si aucun service sélectionné -->
      <div v-else class="border-t border-gray-200 pt-6 text-center text-gray-500">
        <svg class="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
        </svg>
        <p class="text-sm">Sélectionnez un service ci-dessus pour l'éditer</p>
      </div>
    </div>

    <!-- Toast de notification -->
    <Transition
      enter-active-class="transition-all duration-300"
      enter-from-class="opacity-0 translate-x-full"
      enter-to-class="opacity-100 translate-x-0"
      leave-active-class="transition-all duration-200"
      leave-from-class="opacity-100 translate-x-0"
      leave-to-class="opacity-0 translate-x-full"
    >
      <div v-if="message" class="fixed top-4 right-4 z-50 max-w-sm">
        <div
          :class="[
            'px-4 py-3 rounded-lg shadow-lg border',
            message.type === 'success' 
              ? 'bg-green-50 border-green-200' 
              : 'bg-red-50 border-red-200'
          ]"
        >
          <div class="flex items-center gap-3">
            <div 
              :class="[
                'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                message.type === 'success' ? 'bg-green-100' : 'bg-red-100'
              ]"
            >
              <svg
                v-if="message.type === 'success'"
                class="w-5 h-5 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <svg
                v-else
                class="w-5 h-5 text-red-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
            <p :class="[
              'text-sm font-medium flex-1',
              message.type === 'success' ? 'text-green-800' : 'text-red-800'
            ]">
              {{ message.text }}
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

const isSaving = ref(false)
const selectedServiceIndex = ref<number | null>(null)
const message = ref<{ type: 'success' | 'error'; text: string } | null>(null)
const { services: defaultServices } = useServices()
const confirmDialog = ref<{ open: (options: { title?: string; message: string; confirmLabel?: string; danger?: boolean }) => Promise<boolean> } | null>(null)
const serviceEditor = ref<HTMLElement | null>(null)
const currentServicesPage = ref(1)
const servicesPerPage = 10

const resizeTextarea = (element: HTMLTextAreaElement) => {
  element.style.height = 'auto'
  element.style.height = `${Math.max(72, element.scrollHeight)}px`
}

const vAutoResize = { mounted: resizeTextarea, updated: resizeTextarea }

const content = ref<any>({
  servicesVersion: 2,
  hero: {
    title: "Nos Services",
    description: "Découvrez notre gamme complète de solutions en signalétique, marquage et impression"
  },
  services: [] as any[]
})

const createEmptyService = () => ({
  id: '',
  title: 'Nouveau service',
  subtitle: '',
  description: '',
  longDescription: '',
  image: '',
  icon: 'cube',
  features: [] as string[],
  applications: [] as string[],
  benefits: [] as string[],
  pricing: {
    from: '',
    description: ''
  },
  deliveryTime: '',
  warranty: ''
})

const slugify = (value: string) => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .trim()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '')

const totalServicesPages = computed(() => Math.max(1, Math.ceil(content.value.services.length / servicesPerPage)))
const paginatedServices = computed(() => {
  const start = (currentServicesPage.value - 1) * servicesPerPage
  return content.value.services.slice(start, start + servicesPerPage)
})

const selectedServicePreview = computed(() => {
  if (selectedServiceIndex.value === null) return null
  const service = content.value.services[selectedServiceIndex.value]
  if (!service) return null
  return {
    id: service.id || slugify(service.title || 'service'),
    title: service.title || 'Service',
    shortDescription: service.subtitle || service.description || '',
    description: service.longDescription || service.description || '',
    features: Array.isArray(service.features) ? service.features : [],
    applications: Array.isArray(service.applications) ? service.applications : [],
    benefits: Array.isArray(service.benefits) ? service.benefits : [],
    icon: service.icon || 'cube',
    image: service.image || '',
    gallery: Array.isArray(service.gallery) ? service.gallery : []
  }
})

const selectService = (index: number) => {
  selectedServiceIndex.value = index
  nextTick(() => serviceEditor.value?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
}

const addService = () => {
  content.value.services.unshift(createEmptyService())
  currentServicesPage.value = 1
  selectedServiceIndex.value = 0
  showMessage('success', 'Nouveau service ajouté. Complétez sa fiche puis enregistrez les modifications.')
  nextTick(() => serviceEditor.value?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
}

const handleServiceImageUpload = (result: { url: string; path: string }) => {
  if (selectedServiceIndex.value === null) return
  content.value.services[selectedServiceIndex.value].image = result.url
  showMessage('success', 'Image envoyée vers ImageKit avec succès.')
}

const removeService = async (index: number) => {
  const service = content.value.services[index]
  if (!service) return
  const confirmed = await confirmDialog.value?.open({ title: `Supprimer « ${service.title} » ?`, message: 'Le service sera retiré de la page publique après l’enregistrement.', confirmLabel: 'Supprimer', danger: true })
  if (!confirmed) return

  content.value.services.splice(index, 1)
  if (selectedServiceIndex.value === index) {
    selectedServiceIndex.value = null
  } else if (selectedServiceIndex.value !== null && selectedServiceIndex.value > index) {
    selectedServiceIndex.value--
  }
  if (currentServicesPage.value > totalServicesPages.value) currentServicesPage.value = totalServicesPages.value
  showMessage('success', 'Service supprimé. Cliquez sur Enregistrer pour confirmer.')
}

const removeSelectedService = () => {
  if (selectedServiceIndex.value !== null) removeService(selectedServiceIndex.value)
}

const defaultApplications: Record<string, string[]> = {
  signaletique: ['Entreprises', 'Commerces', 'Administrations', 'Hôtels & Restaurants', 'Immobilier', 'Événements'],
  'marquage-sol': ['Parkings', 'Zones industrielles', 'Entrepôts logistiques', 'Terrains de sport', 'Espaces publics', 'Centres commerciaux'],
  'impression-grand-format': ['Publicité extérieure', 'Stands événementiels', 'Décoration intérieure', 'Habillage véhicules', 'Enseignes commerciales', 'Campagnes marketing'],
  'consommables-xerox': ['Bureaux', 'Administrations', 'Écoles & Universités', 'Imprimeries', 'Centres de copie', 'Entreprises'],
  'impression-tshirts': ['Entreprises', 'Associations', 'Événements sportifs', 'Campagnes promotionnelles', 'Écoles', 'Cadeaux personnalisés'],
  'badges-cartes': ['Entreprises', 'Événements', 'Écoles', 'Associations', 'Contrôle d’accès', 'Cartes de visite'],
  'vente-imprimantes': ['Entreprises', 'Administrations', 'Imprimeries', 'Écoles', 'Centres de copie', 'Professionnels'],
  'location-imprimantes': ['Entreprises', 'Événements', 'Administrations', 'PME', 'Associations', 'Particuliers']
}

const toEditableService = (service: (typeof defaultServices)[number]) => ({
  id: service.id,
  title: service.title,
  subtitle: service.shortDescription,
  description: service.shortDescription,
  longDescription: service.description,
  image: service.image || '',
  icon: service.icon || 'cube',
  features: [...service.features],
  applications: [...(defaultApplications[service.id] || [])],
  benefits: [...service.benefits],
  gallery: [...(service.gallery || [])],
  pricing: { from: '', description: '' },
  deliveryTime: '',
  warranty: ''
})

const migrateLegacyServices = (loadedContent: any) => {
  const existingServices = Array.isArray(loadedContent.services) ? loadedContent.services : []
  const normalizedServices = existingServices.map((service: any) => ({
    ...service,
    applications: Array.isArray(service.applications)
      ? service.applications
      : [...(defaultApplications[service.id] || [])]
  }))
  if (loadedContent.servicesInitialized === true) return { ...loadedContent, services: normalizedServices }

  const existingIds = new Set(normalizedServices.map((service: any) => service.id))
  const missingServices = defaultServices
    .filter(service => !existingIds.has(service.id))
    .map(toEditableService)

  return {
    ...loadedContent,
    servicesVersion: 2,
    services: [...normalizedServices, ...missingServices]
  }
}

// Charger le contenu au montage
onMounted(async () => {
  try {
    const { data } = await useFetch('/api/pages/services')
    if (data.value?.success && data.value?.data) {
      content.value = migrateLegacyServices(data.value.data)
      if (content.value.services.length === 8 && data.value.data.servicesInitialized !== true) {
        showMessage('success', 'Les 8 services ont été restaurés. Cliquez sur Enregistrer pour confirmer.')
      }
    } else {
      content.value = migrateLegacyServices(content.value)
      showMessage('success', 'Les 8 services par défaut ont été chargés. Cliquez sur Enregistrer pour les conserver.')
    }
  } catch (error) {
    console.error('Erreur lors du chargement:', error)
  }
})

const handleSave = async () => {
  const confirmed = await confirmDialog.value?.open({ title: 'Enregistrer les services ?', message: 'Les modifications seront publiées sur la page Services.', confirmLabel: 'Enregistrer' })
  if (!confirmed) return

  isSaving.value = true

  try {
    content.value.servicesVersion = 2
    content.value.servicesInitialized = true
    for (const service of content.value.services) {
      service.id = slugify(service.id || service.title)
      service.features = Array.isArray(service.features) ? service.features : []
      service.applications = Array.isArray(service.applications) ? service.applications : []
      service.benefits = Array.isArray(service.benefits) ? service.benefits : []
      service.pricing ||= { from: '', description: '' }

      if (!service.id || !service.title.trim() || !service.description.trim()) {
        throw new Error('Chaque service doit avoir un identifiant, un titre et une description.')
      }
    }

    const ids = content.value.services.map(service => service.id)
    if (new Set(ids).size !== ids.length) {
      throw new Error('Chaque service doit avoir un identifiant unique.')
    }

    const { data } = await useFetch('/api/pages/services', {
      method: 'POST',
      body: content.value
    })

    if (data.value?.success) {
      showMessage('success', 'Services mis à jour avec succès !')
    } else {
      showMessage('error', data.value?.error || 'Erreur lors de l\'enregistrement')
    }
  } catch (error) {
    console.error('Erreur:', error)
    showMessage('error', error instanceof Error ? error.message : 'Erreur lors de l\'enregistrement')
  } finally {
    isSaving.value = false
  }
}

const showMessage = (type: 'success' | 'error', text: string) => {
  message.value = { type, text }
  setTimeout(() => {
    message.value = null
  }, 4000)
}
</script>

<style scoped>
.auto-resize-textarea {
  min-height: 4.5rem;
  overflow-wrap: anywhere;
  word-break: break-word;
  white-space: pre-wrap;
}
</style>
