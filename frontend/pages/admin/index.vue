<template>
  <div class="mx-auto w-full max-w-[1600px] space-y-6 lg:space-y-8">
    <UCard
      class="relative overflow-hidden bg-[#0b2747] text-white"
      :ui="{ root: 'border-0 ring-0 shadow-xl', body: 'relative p-6 sm:p-8' }"
    >
      <div class="pointer-events-none absolute -right-12 -top-16 size-56 rounded-full bg-cyan-300/15 blur-3xl" />
      <div class="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <UBadge color="neutral" variant="soft" class="mb-3 bg-white/10 text-blue-100 ring-white/15">
            Espace d’administration
          </UBadge>
          <h1 class="text-2xl font-bold tracking-tight sm:text-3xl">
            Bonjour, {{ user?.username || 'Administrateur' }}
          </h1>
          <p class="mt-2 max-w-2xl text-sm leading-6 text-blue-100/85">
            Suivez les indicateurs essentiels et accédez rapidement aux contenus de votre site.
          </p>
        </div>
        <UButton
          to="/accueil"
          target="_blank"
          color="neutral"
          variant="solid"
          size="lg"
          label="Voir le site"
          class="justify-center font-semibold text-blue-900"
        >
          <template #leading><ExternalLink class="size-4" aria-hidden="true" /></template>
        </UButton>
      </div>
    </UCard>

    <section aria-labelledby="stats-title">
      <div class="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 id="stats-title" class="text-lg font-bold text-slate-950">Vue d’ensemble</h2>
          <p class="mt-1 text-sm text-slate-500">Données principales de votre site.</p>
        </div>
        <UBadge color="success" variant="soft" size="lg">
          <span class="mr-1.5 size-2 rounded-full bg-emerald-500" />
          Site en ligne
        </UBadge>
      </div>

      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <UCard
          v-for="item in statCards"
          :key="item.label"
          class="group transition duration-200 hover:-translate-y-0.5 hover:shadow-lg"
          :ui="{ root: 'border border-slate-200 ring-0 shadow-sm', body: 'p-5' }"
        >
          <div class="flex items-start justify-between gap-3">
            <div class="flex size-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700 ring-1 ring-blue-100">
              <component :is="item.icon" class="size-5" aria-hidden="true" />
            </div>
            <UButton
              v-if="item.to"
              :to="item.to"
              color="primary"
              variant="link"
              size="sm"
              label="Gérer"
              class="-mr-2"
            />
          </div>
          <p class="mt-5 text-3xl font-bold tracking-tight text-slate-950">{{ item.value }}</p>
          <p class="mt-1 text-sm font-medium text-slate-500">{{ item.label }}</p>
        </UCard>
      </div>
    </section>

    <div class="grid grid-cols-1 gap-6 xl:grid-cols-3">
      <UCard class="xl:col-span-2" :ui="{ root: 'border border-slate-200 ring-0 shadow-sm', body: 'p-0' }">
        <template #header>
          <div class="flex items-center justify-between gap-4">
            <div>
              <h2 class="text-lg font-bold text-slate-950">Dernières réalisations</h2>
              <p class="mt-1 text-sm text-slate-500">Projets récemment ajoutés ou modifiés.</p>
            </div>
            <UButton to="/admin/realisations" color="primary" variant="soft" label="Tout voir">
              <template #trailing><ArrowRight class="size-4" aria-hidden="true" /></template>
            </UButton>
          </div>
        </template>

        <div v-if="recentProjects.length" class="divide-y divide-slate-100">
          <NuxtLink
            v-for="project in recentProjects"
            :key="project.id"
            :to="`/admin/realisations/${project.id}`"
            class="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500"
          >
            <UAvatar v-if="project.imageUrl" :src="project.imageUrl" :alt="project.title" size="lg" />
            <UAvatar v-else size="lg" class="bg-blue-50 text-blue-700">
              <ImageIcon class="size-5" aria-hidden="true" />
            </UAvatar>
            <div class="min-w-0 flex-1">
              <p class="truncate font-semibold text-slate-800">{{ project.title }}</p>
              <p class="truncate text-sm text-slate-500">{{ project.category }}</p>
            </div>
            <span class="hidden text-xs text-slate-400 sm:block">{{ formatDate(project.updatedAt) }}</span>
            <ChevronRight class="size-4 text-slate-400" aria-hidden="true" />
          </NuxtLink>
        </div>

        <UAlert
          v-else
          color="neutral"
          variant="soft"
          title="Aucune réalisation"
          description="Ajoutez votre premier projet pour le voir apparaître ici."
          class="m-6"
        >
          <template #leading><ImageIcon class="size-5" aria-hidden="true" /></template>
          <template #actions>
            <UButton to="/admin/realisations/create" color="primary" variant="soft" label="Ajouter une réalisation" />
          </template>
        </UAlert>
      </UCard>

      <UCard :ui="{ root: 'border border-slate-200 ring-0 shadow-sm', body: 'p-0' }">
        <template #header>
          <div>
            <h2 class="text-lg font-bold text-slate-950">Accès rapides</h2>
            <p class="mt-1 text-sm text-slate-500">Vos actions les plus fréquentes.</p>
          </div>
        </template>

        <div class="space-y-2 p-4">
          <UButton
            v-for="shortcut in shortcuts"
            :key="shortcut.to"
            :to="shortcut.to"
            color="neutral"
            variant="ghost"
            size="lg"
            :label="shortcut.label"
            class="w-full justify-start text-left"
            :ui="{ trailingIcon: 'ml-auto' }"
          >
            <template #leading><component :is="shortcut.icon" class="size-5" aria-hidden="true" /></template>
            <template #trailing><ChevronRight class="ml-auto size-4" aria-hidden="true" /></template>
          </UButton>
        </div>
      </UCard>
    </div>

    <UCard :ui="{ root: 'border border-blue-100 bg-blue-50/60 ring-0 shadow-sm', body: 'p-5 sm:p-6' }">
      <div class="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex items-start gap-4">
          <div class="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-700 text-white">
            <BriefcaseBusiness class="size-5" aria-hidden="true" />
          </div>
          <div>
            <h2 class="font-bold text-slate-950">Gestion des services</h2>
            <p class="mt-1 text-sm leading-6 text-slate-600">
              Ajoutez, modifiez ou supprimez les services affichés sur le site public.
            </p>
          </div>
        </div>
        <div class="flex flex-col gap-2 sm:flex-row">
          <UButton to="/admin/pages/services" color="primary" variant="solid" label="Gérer les services">
            <template #leading><Settings2 class="size-4" aria-hidden="true" /></template>
          </UButton>
          <UButton to="/services" target="_blank" color="neutral" variant="outline" label="Voir la page">
            <template #leading><ExternalLink class="size-4" aria-hidden="true" /></template>
          </UButton>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowRight,
  BriefcaseBusiness,
  ChevronRight,
  ExternalLink,
  FilePenLine,
  Image as ImageIcon,
  Images,
  Layers3,
  Plus,
  Settings,
  Settings2,
  Sparkles
} from 'lucide-vue-next'

definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

const { user } = useAuth()
const { services: defaultServices } = useServices()

const stats = ref({
  totalPortfolio: 0,
  totalCategories: 0,
  totalServices: defaultServices.length,
  featuredPortfolio: 0
})

const recentProjects = ref<any[]>([])

const statCards = computed(() => [
  { label: 'Réalisations', value: stats.value.totalPortfolio, icon: Images },
  { label: 'Catégories', value: stats.value.totalCategories, icon: Layers3 },
  { label: 'Services publiés', value: stats.value.totalServices, icon: BriefcaseBusiness, to: '/admin/pages/services' },
  { label: 'À la une', value: stats.value.featuredPortfolio, icon: Sparkles },
  { label: 'Dernière connexion', value: formattedTime.value, icon: Settings }
])

const shortcuts = [
  { label: 'Ajouter une réalisation', to: '/admin/realisations/create', icon: Plus },
  { label: 'Gérer les services', to: '/admin/pages/services', icon: BriefcaseBusiness },
  { label: 'Modifier la page d’accueil', to: '/admin/pages/accueil', icon: FilePenLine },
  { label: 'Configuration de l’entreprise', to: '/admin/config', icon: Settings2 }
]

const currentTime = ref(new Date())
const formattedTime = computed(() => currentTime.value.toLocaleTimeString('fr-FR', {
  hour: '2-digit',
  minute: '2-digit'
}))

let timeInterval: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  timeInterval = setInterval(() => {
    currentTime.value = new Date()
  }, 60000)
  loadStats()
})

onUnmounted(() => {
  if (timeInterval) clearInterval(timeInterval)
})

const loadStats = async () => {
  const { fetchStats, fetchList } = usePortfolio()
  const [result, listResult, servicesResult] = await Promise.all([
    fetchStats(),
    fetchList({ limit: 4 }),
    $fetch<{ success: boolean; data: { services?: unknown[] } | null }>('/api/pages/services').catch(() => null)
  ])

  if (result.success && result.stats) {
    stats.value.totalPortfolio = result.stats.total
    stats.value.featuredPortfolio = result.stats.featured || 0
    stats.value.totalCategories = Object.keys(result.stats.byCategory || {}).length
  }

  if (listResult.success && listResult.items) {
    recentProjects.value = listResult.items
  }

  if (servicesResult?.success && servicesResult.data?.services?.length) {
    stats.value.totalServices = servicesResult.data.services.length
  }
}

const formatDate = (value: string) => new Intl.DateTimeFormat('fr-FR', {
  day: '2-digit',
  month: 'short',
  year: 'numeric'
}).format(new Date(value))
</script>
