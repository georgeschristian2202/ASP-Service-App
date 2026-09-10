<template>
  <div class="min-h-screen bg-gray-50">
    <!-- En-tête -->
    <div class="bg-white border-b border-gray-200 p-6 rounded-lg shadow-sm mb-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-semibold text-gray-900 mb-1">Édition de la Page d'Accueil</h1>
          <p class="text-sm text-gray-600">Modifiez le contenu et les sections de votre page d'accueil</p>
        </div>
        <div class="flex gap-3">
          <NuxtLink
            to="/"
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
            class="inline-flex items-center gap-2 px-5 py-2 bg-asp-blue-700 hover:bg-asp-blue-800 text-white text-sm font-medium rounded-lg transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg v-if="!isSaving" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <svg v-else class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isSaving ? 'Enregistrement...' : 'Enregistrer les modifications' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Navigation par onglets -->
    <div class="bg-white rounded-lg shadow-sm mb-6 border border-gray-200">
      <div class="flex overflow-x-auto">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap',
            activeTab === tab.id
              ? 'border-asp-blue-600 text-asp-blue-700 bg-asp-blue-50'
              : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
          ]"
        >
          <component :is="tab.icon" class="w-5 h-5" />
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- Contenu des onglets -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <!-- Section Hero -->
      <div v-show="activeTab === 'hero'" class="space-y-6">
        <div>
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Section Hero (Bannière principale)</h2>
          <p class="text-sm text-gray-600 mb-6">Cette section est la première chose que vos visiteurs verront sur votre site.</p>
        </div>

        <div class="grid grid-cols-1 gap-6">
          <!-- Titre principal -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Titre principal
            </label>
            <input
              v-model="content.hero.title"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
              placeholder="Votre Expert en"
            />
          </div>

          <!-- Titre en surbrillance -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Mot en surbrillance (couleur jaune)
            </label>
            <input
              v-model="content.hero.titleHighlight"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
              placeholder="Signalétique"
            />
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              v-model="content.hero.description"
              rows="3"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
              placeholder="De la conception à la réalisation..."
            ></textarea>
          </div>

          <!-- Textes rotatifs -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Textes animés (un par ligne)
            </label>
            <textarea
              :value="content.hero.rotatingTexts.join('\n')"
              @input="content.hero.rotatingTexts = ($event.target as HTMLTextAreaElement).value.split('\n').filter(t => t.trim())"
              rows="4"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
              placeholder="Professionnelle&#10;Sur Mesure&#10;Innovante&#10;de Qualité"
            ></textarea>
            <p class="mt-1 text-xs text-gray-500">Ces textes s'afficheront alternativement avec une animation</p>
          </div>

          <!-- Points clés -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Points clés (un par ligne, avec icône ✓)
            </label>
            <textarea
              :value="content.hero.features.join('\n')"
              @input="content.hero.features = ($event.target as HTMLTextAreaElement).value.split('\n').filter(t => t.trim())"
              rows="3"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
              placeholder="Devis gratuit 24h&#10;Équipement MUTOH&#10;Installation incluse"
            ></textarea>
          </div>

          <!-- Bouton CTA -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Texte du bouton principal
            </label>
            <input
              v-model="content.hero.ctaText"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
              placeholder="Obtenir un Devis Gratuit"
            />
          </div>
        </div>
      </div>

      <!-- Section Projets -->
      <div v-show="activeTab === 'projects'" class="space-y-6">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-lg font-semibold text-gray-900 mb-1">Carousel de Projets</h2>
            <p class="text-sm text-gray-600">Projets affichés dans le carousel de la page d'accueil</p>
          </div>
          <button
            @click="addProject"
            class="inline-flex items-center gap-2 px-4 py-2 bg-asp-blue-700 hover:bg-asp-blue-800 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Ajouter un projet
          </button>
        </div>

        <div class="space-y-4">
          <div
            v-for="(project, index) in content.hero.projects"
            :key="index"
            class="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
          >
            <div class="flex items-start justify-between mb-4">
              <h3 class="text-sm font-semibold text-gray-900">Projet {{ index + 1 }}</h3>
              <button
                @click="removeProject(index)"
                class="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                title="Supprimer"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Titre</label>
                <input
                  v-model="project.title"
                  type="text"
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
                  placeholder="Signalétique Entreprise"
                />
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Localisation</label>
                <input
                  v-model="project.location"
                  type="text"
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
                  placeholder="Libreville, Gabon"
                />
              </div>
              <div class="md:col-span-2">
                <label class="block text-xs font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  v-model="project.description"
                  rows="2"
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
                  placeholder="Installation complète de panneaux..."
                ></textarea>
              </div>
              <div class="md:col-span-2">
                <label class="block text-xs font-medium text-gray-700 mb-1">URL de l'image</label>
                <input
                  v-model="project.image"
                  type="text"
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
                  placeholder="/images/projects/project-1.jpg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Section Services -->
      <div v-show="activeTab === 'services'" class="space-y-6">
        <div>
          <h2 class="text-lg font-semibold text-gray-900 mb-1">Section Services</h2>
          <p class="text-sm text-gray-600 mb-6">Aperçu des services affichés sur la page d'accueil</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Titre de la section</label>
            <input
              v-model="content.services.title"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
              placeholder="Nos Services"
            />
          </div>
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <input
              v-model="content.services.description"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
              placeholder="Solutions complètes pour tous vos besoins..."
            />
          </div>
        </div>

        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div class="flex gap-3">
            <svg class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 class="text-sm font-semibold text-blue-900 mb-1">Édition détaillée des services</h4>
              <p class="text-xs text-blue-700">Pour modifier le détail complet de chaque service (descriptions détaillées, tarifs, images), rendez-vous sur la page <strong>Services</strong> du menu.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Section Processus -->
      <div v-show="activeTab === 'process'" class="space-y-6">
        <div>
          <h2 class="text-lg font-semibold text-gray-900 mb-1">Processus de Travail</h2>
          <p class="text-sm text-gray-600 mb-6">Les 4 étapes de votre processus</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Titre de la section</label>
            <input
              v-model="content.process.title"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
              placeholder="Notre Processus de Travail"
            />
          </div>
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <input
              v-model="content.process.description"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
              placeholder="Un processus simple et transparent..."
            />
          </div>
        </div>

        <div class="space-y-4">
          <div
            v-for="(step, index) in content.process.steps"
            :key="index"
            class="border border-gray-200 rounded-lg p-4"
          >
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 bg-asp-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                {{ step.number }}
              </div>
              <h3 class="text-sm font-semibold text-gray-900">Étape {{ step.number }}</h3>
            </div>
            <div class="grid grid-cols-1 gap-3 ml-13">
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Titre</label>
                <input
                  v-model="step.title"
                  type="text"
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
                  placeholder="Contact"
                />
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  v-model="step.description"
                  rows="2"
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
                  placeholder="Contactez-nous par téléphone..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>
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

const activeTab = ref('hero')
const isSaving = ref(false)
const message = ref<{ type: 'success' | 'error'; text: string } | null>(null)

// Icônes pour les onglets (pseudo-composants)
const tabs = [
  { id: 'hero', label: 'Hero / Bannière', icon: 'IconHome' },
  { id: 'projects', label: 'Projets (Carousel)', icon: 'IconImage' },
  { id: 'services', label: 'Services', icon: 'IconBriefcase' },
  { id: 'process', label: 'Processus', icon: 'IconList' }
]

// Contenu de la page
const content = ref({
  hero: {
    title: "Votre Expert en",
    titleHighlight: "Signalétique",
    rotatingTexts: [
      "Professionnelle",
      "Sur Mesure",
      "Innovante",
      "de Qualité"
    ],
    description: "De la conception à la réalisation, ASP Services vous accompagne dans tous vos projets de signalétique, marquage au sol et impression grand format à Libreville.",
    features: [
      "Devis gratuit 24h",
      "Équipement MUTOH",
      "Installation incluse"
    ],
    ctaText: "Obtenir un Devis Gratuit",
    projects: [
      {
        title: "Signalétique Entreprise",
        description: "Installation complète de panneaux directionnels et enseignes lumineuses",
        location: "Libreville, Gabon",
        image: "/images/projects/project-1.jpg"
      },
      {
        title: "Marquage Parking",
        description: "Traçage professionnel pour parking d'entreprise de 200 places",
        location: "Libreville, Gabon",
        image: "/images/projects/project-2.jpg"
      },
      {
        title: "Impression Grand Format",
        description: "Bâches publicitaires XXL pour campagne marketing",
        location: "Libreville, Gabon",
        image: "/images/projects/project-3.jpg"
      }
    ]
  },
  services: {
    title: "Nos Services",
    description: "Solutions complètes pour tous vos besoins en signalétique et impression"
  },
  process: {
    title: "Notre Processus de Travail",
    description: "Un processus simple et transparent en 4 étapes pour votre tranquillité d'esprit",
    steps: [
      {
        number: 1,
        title: "Contact",
        description: "Contactez-nous par téléphone, WhatsApp ou via notre formulaire de devis"
      },
      {
        number: 2,
        title: "Consultation",
        description: "Étude détaillée de votre projet et élaboration d'un devis personnalisé"
      },
      {
        number: 3,
        title: "Production",
        description: "Réalisation de votre projet avec nos équipements professionnels MUTOH"
      },
      {
        number: 4,
        title: "Installation",
        description: "Pose professionnelle et suivi qualité pour votre entière satisfaction"
      }
    ]
  }
})

// Charger le contenu au montage
onMounted(async () => {
  try {
    const { data } = await useFetch('/api/homepage/content')
    if (data.value?.success && data.value?.data) {
      content.value = data.value.data
    }
  } catch (error) {
    console.error('Erreur lors du chargement:', error)
  }
})

// Ajouter un projet
const addProject = () => {
  content.value.hero.projects.push({
    title: "",
    description: "",
    location: "Libreville, Gabon",
    image: "/images/projects/placeholder.jpg"
  })
}

// Supprimer un projet
const removeProject = (index: number) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
    content.value.hero.projects.splice(index, 1)
  }
}

// Enregistrer les modifications
const handleSave = async () => {
  isSaving.value = true

  try {
    const { data } = await useFetch('/api/homepage/content', {
      method: 'POST',
      body: content.value
    })

    if (data.value?.success) {
      showMessage('success', 'Modifications enregistrées avec succès !')
    } else {
      showMessage('error', data.value?.error || 'Erreur lors de l\'enregistrement')
    }
  } catch (error) {
    console.error('Erreur:', error)
    showMessage('error', 'Erreur lors de l\'enregistrement')
  } finally {
    isSaving.value = false
  }
}

// Afficher un message
const showMessage = (type: 'success' | 'error', text: string) => {
  message.value = { type, text }
  setTimeout(() => {
    message.value = null
  }, 4000)
}
</script>
