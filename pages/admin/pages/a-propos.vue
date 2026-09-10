<template>
  <div class="min-h-screen bg-gray-50">
    <!-- En-tête -->
    <div class="bg-white border-b border-gray-200 p-6 rounded-lg shadow-sm mb-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-semibold text-gray-900 mb-1">Édition de la Page À propos</h1>
          <p class="text-sm text-gray-600">Modifiez l'histoire, les valeurs et l'équipe de votre entreprise</p>
        </div>
        <div class="flex gap-3">
          <NuxtLink
            to="/about"
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
      <div v-show="activeTab === 'story'" class="space-y-4">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Notre Histoire</h2>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Titre</label>
          <input
            v-model="content.story.title"
            type="text"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Contenu</label>
          <textarea
            v-model="content.story.content"
            rows="6"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500"
          ></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">URL de l'image</label>
          <input
            v-model="content.story.image"
            type="text"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500"
          />
        </div>
      </div>

      <!-- Mission & Valeurs -->
      <div v-show="activeTab === 'mission'" class="space-y-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Mission & Valeurs</h2>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Titre</label>
          <input
            v-model="content.mission.title"
            type="text"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Mission</label>
          <textarea
            v-model="content.mission.content"
            rows="4"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500"
          ></textarea>
        </div>

        <div class="border-t border-gray-200 pt-6">
          <h3 class="font-semibold text-gray-900 mb-4">Valeurs ({{ content.mission.values.length }})</h3>
          <div class="space-y-4">
            <div
              v-for="(value, index) in content.mission.values"
              :key="index"
              class="border border-gray-200 rounded-lg p-4"
            >
              <div class="flex items-center justify-between mb-3">
                <h4 class="text-sm font-semibold text-gray-900">Valeur {{ index + 1 }}</h4>
                <button
                  @click="removeValue(index)"
                  class="p-1 text-red-600 hover:bg-red-50 rounded"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-medium text-gray-700 mb-1">Titre</label>
                  <input
                    v-model="value.title"
                    type="text"
                    class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500"
                  />
                </div>
                <div>
                  <label class="block text-xs font-medium text-gray-700 mb-1">Icône</label>
                  <input
                    v-model="value.icon"
                    type="text"
                    class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500"
                    placeholder="star"
                  />
                </div>
                <div class="md:col-span-2">
                  <label class="block text-xs font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    v-model="value.description"
                    rows="2"
                    class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <button
            @click="addValue"
            class="mt-4 inline-flex items-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg text-sm font-medium"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Ajouter une valeur
          </button>
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
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Photo (URL)</label>
                <input
                  v-model="member.photo"
                  type="text"
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                />
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

const tabs = [
  { id: 'hero', label: 'Hero' },
  { id: 'story', label: 'Histoire' },
  { id: 'mission', label: 'Mission & Valeurs' },
  { id: 'team', label: 'Équipe' },
  { id: 'stats', label: 'Statistiques' }
]

const content = ref({
  hero: { title: "", description: "" },
  story: { title: "", content: "", image: "" },
  mission: { title: "", content: "", values: [] as any[] },
  team: { title: "", description: "", members: [] as any[] },
  stats: { title: "", items: [] as any[] }
})

onMounted(async () => {
  const { data } = await useFetch('/api/pages/about')
  if (data.value?.success && data.value?.data) {
    content.value = data.value.data
  }
})

const addValue = () => {
  content.value.mission.values.push({ title: "", description: "", icon: "star" })
}

const removeValue = (index: number) => {
  if (confirm('Supprimer cette valeur ?')) {
    content.value.mission.values.splice(index, 1)
  }
}

const addMember = () => {
  content.value.team.members.push({ name: "", position: "", photo: "", bio: "" })
}

const removeMember = (index: number) => {
  if (confirm('Supprimer ce membre ?')) {
    content.value.team.members.splice(index, 1)
  }
}

const handleSave = async () => {
  isSaving.value = true
  try {
    const { data } = await useFetch('/api/pages/about', { method: 'POST', body: content.value })
    if (data.value?.success) {
      message.value = { type: 'success', text: 'Modifications enregistrées !' }
    } else {
      message.value = { type: 'error', text: 'Erreur lors de l\'enregistrement' }
    }
  } catch (error) {
    message.value = { type: 'error', text: 'Erreur lors de l\'enregistrement' }
  } finally {
    isSaving.value = false
    setTimeout(() => { message.value = null }, 4000)
  }
}
</script>
