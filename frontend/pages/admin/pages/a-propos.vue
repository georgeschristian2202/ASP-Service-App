<template>
  <div class="min-h-screen bg-gray-50">
    <ConfirmDialog ref="confirmDialog" />
    <!-- En-tête -->
    <div class="bg-white border-b border-gray-200 p-6 rounded-lg shadow-sm mb-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-semibold text-gray-900 mb-1">Édition de la Page À propos</h1>
          <p class="text-sm text-gray-600">Modifiez l'histoire, les valeurs et l'équipe de votre entreprise</p>
        </div>
        <div class="flex gap-3">
          <NuxtLink
            to="/a-propos"
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

    <!-- Navigation par onglets -->
    <div class="bg-white rounded-lg shadow-sm mb-6 border border-gray-200">
      <div class="flex overflow-x-auto">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap',
            activeTab === tab.id
              ? 'border-asp-blue-600 text-asp-blue-700 bg-asp-blue-50'
              : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
          ]"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- Contenu des onglets -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <!-- Hero -->
      <div v-show="activeTab === 'hero'" class="space-y-4">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Section Hero</h2>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Titre</label>
          <input
            v-model="content.hero.title"
            type="text"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            v-model="content.hero.description"
            rows="2"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500"
          ></textarea>
        </div>
      </div>

      <!-- Histoire -->
      <div v-show="activeTab === 'story'" class="space-y-6">
        <div>
          <h2 class="text-lg font-semibold text-gray-900">Notre Histoire</h2>
          <p class="text-sm text-gray-600">Le texte et l’image sont affichés côte à côte sur la page publique.</p>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div class="min-w-0 space-y-4 rounded-xl border border-gray-200 p-4">
            <label class="block text-sm font-medium text-gray-700">Titre
              <input v-model="content.story.title" type="text" class="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500" />
            </label>
            <label class="block min-w-0 text-sm font-medium text-gray-700">Contenu
              <textarea v-auto-resize v-model="content.story.content" @input="resizeTextareaFromEvent" rows="6" class="auto-resize-textarea mt-2 block w-full max-w-full min-w-0 min-h-36 px-4 py-3 border border-gray-300 rounded-lg resize-none overflow-hidden leading-6 whitespace-pre-wrap break-words focus:ring-2 focus:ring-asp-blue-500"></textarea>
            </label>
          </div>
          <div class="min-w-0 rounded-xl border border-gray-200 p-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Image de l’histoire</label>
            <ImageUploader v-model="content.story.image" :alt="content.story.title" folder="about" object-fit="contain" compact square-preview />
          </div>
        </div>
      </div>

      <!-- Mission & Valeurs -->
      <div v-show="activeTab === 'mission'" class="space-y-6">
        <div><h2 class="text-lg font-semibold text-gray-900">Mission & Valeurs</h2><p class="text-sm text-gray-600">Organisez la mission, la vision et les valeurs présentées sur la page publique.</p></div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Titre</label>
            <input v-model="content.mission.title" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Sous-titre</label>
            <input v-model="content.mission.subtitle" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500" />
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Mission</label>
          <textarea v-auto-resize @input="resizeTextareaFromEvent"
            v-model="content.mission.content"
            rows="3"
            class="auto-resize-textarea block w-full max-w-full min-w-0 min-h-28 px-4 py-3 border border-gray-300 rounded-lg resize-none overflow-hidden leading-6 whitespace-pre-wrap break-words focus:ring-2 focus:ring-asp-blue-500"
          ></textarea>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label class="block text-sm font-medium text-gray-700 mb-2">Titre de la vision</label><input v-model="content.mission.visionTitle" class="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
          <div><label class="block text-sm font-medium text-gray-700 mb-2">Sous-titre de la vision</label><input v-model="content.mission.visionSubtitle" class="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
          <div class="md:col-span-2"><label class="block text-sm font-medium text-gray-700 mb-2">Vision</label><textarea v-auto-resize v-model="content.mission.visionContent" @input="resizeTextareaFromEvent" rows="3" class="auto-resize-textarea block w-full max-w-full min-w-0 min-h-28 px-4 py-3 border border-gray-300 rounded-lg resize-none overflow-hidden leading-6 whitespace-pre-wrap break-words focus:ring-2 focus:ring-asp-blue-500"></textarea></div>
        </div>

        <div class="border-t border-gray-200 pt-6">
          <div class="flex items-start justify-between gap-4 mb-4">
            <div><h3 class="font-semibold text-gray-900">Valeurs ({{ content.mission.values.length }})</h3><p class="text-sm text-gray-600">Cliquez sur une carte pour la mettre en édition.</p></div>
            <button type="button" @click="addValue" class="inline-flex items-center gap-2 px-4 py-2 bg-asp-blue-700 hover:bg-asp-blue-800 text-white rounded-lg text-sm font-medium">+ Ajouter une valeur</button>
          </div>
          <div ref="valuesListTop" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 scroll-mt-40">
            <div
              v-for="(value, index) in content.mission.values"
              :key="index"
              @click="selectedValueIndex = index"
              :class="selectedValueIndex === index ? 'border-asp-blue-500 ring-2 ring-asp-blue-200 bg-asp-blue-50/40' : 'border-gray-200 bg-white'"
              class="relative min-w-0 border rounded-xl p-4 transition-all duration-200"
            >
              <div v-if="selectedValueIndex === index" class="absolute -top-2.5 left-3 px-2 py-0.5 bg-asp-blue-700 text-white text-xs font-medium rounded-full">En cours d’édition</div>
              <div class="flex items-center justify-between mb-3">
                <h4 class="text-sm font-semibold text-gray-900">Valeur {{ index + 1 }}</h4>
                <button
                  type="button"
                  @click.stop="removeValue(index)"
                  class="px-2 py-1 text-sm text-red-600 hover:bg-red-50 rounded"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div class="grid gap-3">
                <div>
                  <label class="block text-xs font-medium text-gray-700 mb-1">Titre</label>
                  <input
                    v-model="value.title"
                    type="text"
                    class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500"
                  />
                </div>
                <div>
                  <label class="block text-xs font-medium text-gray-700 mb-1">Description</label>
                  <textarea v-auto-resize @input="resizeTextareaFromEvent"
                    v-model="value.description"
                    rows="2"
                    class="auto-resize-textarea block w-full max-w-full min-w-0 min-h-20 px-3 py-2 text-sm border border-gray-300 rounded-lg resize-none overflow-hidden leading-5 whitespace-pre-wrap break-words focus:ring-2 focus:ring-asp-blue-500"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Équipe -->
      <div v-show="activeTab === 'team'" class="space-y-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Notre Équipe</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Titre</label>
            <input
              v-model="content.team.title"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <input
              v-model="content.team.description"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500"
            />
          </div>
        </div>

        <div class="space-y-4">
          <div
            v-for="(member, index) in content.team.members"
            :key="index"
            class="border border-gray-200 rounded-lg p-4"
          >
            <div class="flex items-center justify-between mb-3">
              <h4 class="text-sm font-semibold text-gray-900">Membre {{ index + 1 }}</h4>
              <button
                @click="removeMember(index)"
                class="p-1 text-red-600 hover:bg-red-50 rounded"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Nom</label>
                <input
                  v-model="member.name"
                  type="text"
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Poste</label>
                <input
                  v-model="member.position"
                  type="text"
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                />
              </div>
              <div class="md:row-span-2">
                <label class="block text-xs font-medium text-gray-700 mb-1">Photo</label>
                <ImageUploader v-model="member.photo" :alt="member.name || `Membre ${index + 1}`" folder="about/team" object-fit="cover" compact square-preview />
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Biographie courte</label>
                <input
                  v-model="member.bio"
                  type="text"
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
        <button
          @click="addMember"
          class="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg text-sm font-medium"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Ajouter un membre
        </button>
      </div>

      <!-- Stats -->
      <div v-show="activeTab === 'stats'" class="space-y-4">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Statistiques</h2>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Titre</label>
          <input
            v-model="content.stats.title"
            type="text"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500"
          />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="(stat, index) in content.stats.items" :key="index" class="border border-gray-200 rounded-lg p-4">
            <h4 class="text-sm font-semibold text-gray-900 mb-3">Stat {{ index + 1 }}</h4>
            <div class="space-y-2">
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Nombre</label>
                <input v-model="stat.number" type="text" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Label</label>
                <input v-model="stat.label" type="text" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast -->
    <Transition enter-active-class="transition-all duration-300" enter-from-class="opacity-0 translate-x-full" enter-to-class="opacity-100 translate-x-0" leave-active-class="transition-all duration-200" leave-from-class="opacity-100 translate-x-0" leave-to-class="opacity-0 translate-x-full">
      <div v-if="message" class="fixed top-4 right-4 z-50 max-w-sm">
        <div :class="['px-4 py-3 rounded-lg shadow-lg border', message.type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200']">
          <p :class="['text-sm font-medium', message.type === 'success' ? 'text-green-800' : 'text-red-800']">{{ message.text }}</p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

const activeTab = ref('hero')
const isSaving = ref(false)
const message = ref<{ type: 'success' | 'error'; text: string } | null>(null)
const confirmDialog = ref<{ open: (options: { title?: string; message: string; confirmLabel?: string; danger?: boolean }) => Promise<boolean> } | null>(null)
const selectedValueIndex = ref<number | null>(null)
const valuesListTop = ref<HTMLElement | null>(null)
let messageTimer: ReturnType<typeof setTimeout> | null = null

const resizeTextarea = (element: HTMLTextAreaElement) => {
  element.style.height = 'auto'
  element.style.height = `${Math.max(80, element.scrollHeight + 2)}px`
}

const resizeTextareaFromEvent = (event: Event) => {
  resizeTextarea(event.target as HTMLTextAreaElement)
}

const resizeAllTextareas = async () => {
  await nextTick()
  requestAnimationFrame(() => {
    document.querySelectorAll<HTMLTextAreaElement>('.auto-resize-textarea').forEach(resizeTextarea)
  })
}

const vAutoResize = {
  mounted: resizeTextarea,
  updated: resizeTextarea
}

const showMessage = (type: 'success' | 'error', text: string) => {
  if (messageTimer) clearTimeout(messageTimer)
  message.value = { type, text }
  messageTimer = setTimeout(() => { message.value = null }, 4000)
}

const tabs = [
  { id: 'hero', label: 'Hero' },
  { id: 'story', label: 'Histoire' },
  { id: 'mission', label: 'Mission & Valeurs' },
  { id: 'team', label: 'Équipe' },
  { id: 'stats', label: 'Statistiques' }
]

watch(activeTab, () => resizeAllTextareas())

const content = ref({
  hero: { title: "À Propos d'ASP Services", description: "ASP : trois initiales, une histoire, une identité depuis 1998" },
  story: {
    title: "L'origine d'une ambition",
    content: "Fondée en 1998 par Andy Simon Pierre, ASP Services est née d'une ambition : mettre l'expertise en management, en industrie graphique et en communication au service des entreprises et des institutions. Le nom ASP trouve son origine dans les initiales de son fondateur. Au fil des années, ASP Services a développé son expertise dans la communication imprimée, l'identité graphique, l'imprimerie, la sérigraphie, la signalisation et la signalétique.",
    image: "/images/about/histoire.png"
  },
  mission: {
    title: "Notre Mission",
    subtitle: "Servir notre clientèle dans les règles de l'art",
    content: "Concevoir et réaliser des solutions de communication et de signalétique fiables, efficaces et adaptées aux besoins de chaque client. De la signalisation routière à la signalisation ferroviaire, nous accompagnons nos clients avec professionnalisme, rigueur et exigence.",
    visionTitle: "Notre Vision",
    visionSubtitle: "Horizon 2030",
    visionContent: "Devenir une référence en Afrique centrale dans l'industrie de la signalétique, de la signalisation et du management. Étendre notre présence dans l'espace CEMAC.",
    values: [
      { title: "Excellence opérationnelle", description: "Qualité et efficacité dans chaque réalisation. Respect des exigences techniques pour des résultats fiables et durables.", icon: "check" },
      { title: "Réactivité", description: "Capacité à répondre rapidement aux besoins et à agir dans les meilleurs délais.", icon: "check" },
      { title: "Accompagnement", description: "Comprendre les besoins et accompagner chaque client à chaque étape de son projet.", icon: "check" },
      { title: "Esprit d'équipe", description: "Collaboration et complémentarité des compétences pour construire ensemble des solutions performantes.", icon: "check" },
      { title: "Transmission des compétences", description: "Partage des connaissances pour renforcer nos équipes et préparer les générations futures.", icon: "check" },
      { title: "Intégrité", description: "Honnêteté, transparence et respect des engagements.", icon: "check" }
    ] as any[]
  },
  team: { title: "Notre Équipe", description: "Une équipe expérimentée et engagée au service de vos projets.", members: [] as any[] },
  stats: { title: "ASP Services en chiffres", items: [
    { number: "28+", label: "Années d'expérience" },
    { number: "500+", label: "Projets réalisés" },
    { number: "90%", label: "Clients satisfaits" },
    { number: "24h", label: "Délai de réponse" }
  ] as any[] }
})

onMounted(async () => {
  try {
    const response = await $fetch<{ success: boolean; data: any | null }>('/api/pages/about')
    if (response.success && response.data) {
      const saved = response.data
      Object.assign(content.value.hero, saved.hero ?? {})
      Object.assign(content.value.story, saved.story ?? {})
      Object.assign(content.value.mission, saved.mission ?? {})
      Object.assign(content.value.team, saved.team ?? {})
      Object.assign(content.value.stats, saved.stats ?? {})
      await resizeAllTextareas()
    } else {
      showMessage('success', 'Le contenu public actuel a été chargé comme base. Enregistrez pour le conserver en base.')
    }
  } catch {
    showMessage('error', 'Impossible de charger les données enregistrées. Les contenus par défaut restent disponibles.')
  }
})

const addValue = () => {
  content.value.mission.values.unshift({ title: "", description: "", icon: "check" })
  selectedValueIndex.value = 0
  showMessage('success', 'Nouvelle valeur ajoutée. Complétez-la puis enregistrez les modifications.')
  nextTick(() => valuesListTop.value?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
}

const removeValue = async (index: number) => {
  const confirmed = await confirmDialog.value?.open({ title: 'Supprimer cette valeur ?', message: 'Cette valeur ne sera plus affichée après l’enregistrement.', confirmLabel: 'Supprimer', danger: true })
  if (confirmed) {
    content.value.mission.values.splice(index, 1)
    selectedValueIndex.value = null
    showMessage('success', 'Valeur supprimée. Enregistrez les modifications pour confirmer définitivement.')
  }
}

const addMember = () => {
  content.value.team.members.push({ name: "", position: "", photo: "", bio: "" })
}

const removeMember = async (index: number) => {
  const confirmed = await confirmDialog.value?.open({ title: 'Supprimer ce membre ?', message: 'Ce membre sera retiré après l’enregistrement.', confirmLabel: 'Supprimer', danger: true })
  if (confirmed) {
    content.value.team.members.splice(index, 1)
  }
}

const handleSave = async () => {
  const requiredFields = [
    { value: content.value.story.title, label: 'le titre de l’histoire', tab: 'story' },
    { value: content.value.story.content, label: 'le contenu de l’histoire', tab: 'story' },
    { value: content.value.story.image, label: 'l’image de l’histoire', tab: 'story' },
    { value: content.value.mission.title, label: 'le titre de la mission', tab: 'mission' },
    { value: content.value.mission.content, label: 'le texte de la mission', tab: 'mission' },
    { value: content.value.mission.visionTitle, label: 'le titre de la vision', tab: 'mission' },
    { value: content.value.mission.visionContent, label: 'le texte de la vision', tab: 'mission' }
  ]
  const missingField = requiredFields.find(field => !String(field.value ?? '').trim())
  const invalidValueIndex = content.value.mission.values.findIndex((item: any) => !item.title?.trim() || !item.description?.trim())
  if (missingField) {
    activeTab.value = missingField.tab
    showMessage('error', `Veuillez renseigner ${missingField.label}.`)
    return
  }
  if (invalidValueIndex >= 0) {
    activeTab.value = 'mission'
    selectedValueIndex.value = invalidValueIndex
    showMessage('error', `Complétez le titre et la description de la valeur ${invalidValueIndex + 1}.`)
    await nextTick()
    valuesListTop.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    return
  }
  if (content.value.mission.values.length === 0) {
    activeTab.value = 'mission'
    showMessage('error', 'Ajoutez au moins une valeur avant l’enregistrement.')
    return
  }
  const confirmed = await confirmDialog.value?.open({ title: 'Enregistrer la page À propos ?', message: 'Les changements seront publiés sur la page publique.', confirmLabel: 'Enregistrer' })
  if (!confirmed) return
  isSaving.value = true
  try {
    const response = await $fetch<{ success: boolean }>('/api/pages/about', { method: 'POST', body: content.value })
    if (response.success) {
      showMessage('success', 'Modifications enregistrées et publiées sur la page À propos.')
    } else {
      showMessage('error', 'Erreur lors de l\'enregistrement.')
    }
  } catch (error) {
    showMessage('error', 'Erreur lors de l\'enregistrement.')
  } finally {
    isSaving.value = false
  }
}
</script>
