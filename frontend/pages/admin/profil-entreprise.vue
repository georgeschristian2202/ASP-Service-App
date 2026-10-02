<template>
  <div class="mx-auto w-full max-w-7xl space-y-6">
    <div>
      <div class="mb-3 flex items-center gap-2 text-sm text-slate-500">
        <NuxtLink to="/admin" class="transition hover:text-blue-700">Accueil</NuxtLink>
        <ChevronRight class="size-4" aria-hidden="true" />
        <span class="font-medium text-slate-800">Profil de l’entreprise</span>
      </div>
      <h1 class="text-3xl font-bold tracking-tight text-slate-950">Profil de l’entreprise</h1>
      <p class="mt-2 text-slate-600">Gérez l’identité et les coordonnées publiques d’ASP Services.</p>
    </div>

    <div v-if="isLoading" class="flex min-h-64 items-center justify-center">
      <LoaderCircle class="size-9 animate-spin text-blue-700" aria-label="Chargement" />
    </div>

    <div v-else class="grid items-start gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
      <UCard class="overflow-hidden" :ui="{ root: 'border border-slate-200 ring-0 shadow-sm', body: 'p-0' }">
        <div class="h-36 bg-gradient-to-br from-emerald-500 via-amber-400 to-blue-700" />
        <div class="px-6 pb-7 text-center">
          <div class="relative mx-auto -mt-16 flex size-32 items-center justify-center overflow-hidden rounded-full border-8 border-white bg-white shadow-xl">
            <img v-if="form.company.logo" :src="form.company.logo" alt="Logo de l’entreprise" class="h-full w-full object-contain p-3" />
            <Building2 v-else class="size-14 text-blue-700" aria-hidden="true" />
          </div>
          <h2 class="mt-4 text-xl font-bold text-slate-950">{{ form.company.name || 'ASP Services Gabon' }}</h2>
          <p class="mt-1 text-sm text-slate-500">{{ form.contact.email || 'Adresse email non renseignée' }}</p>
          <UBadge color="success" variant="soft" size="lg" class="mt-4">
            <span class="mr-1.5 size-2 rounded-full bg-emerald-500" />
            Profil entreprise actif
          </UBadge>
          <div class="mt-6 space-y-3 border-t border-slate-100 pt-5 text-left text-sm">
            <div class="flex items-center justify-between gap-3">
              <span class="text-slate-500">Ville</span>
              <span class="font-semibold text-slate-800">{{ form.location.city || '—' }}</span>
            </div>
            <div class="flex items-center justify-between gap-3">
              <span class="text-slate-500">Pays</span>
              <span class="font-semibold text-slate-800">{{ form.location.country || '—' }}</span>
            </div>
            <div class="flex items-center justify-between gap-3">
              <span class="text-slate-500">Statut</span>
              <span class="font-semibold text-emerald-600">Actif</span>
            </div>
          </div>
        </div>
      </UCard>

      <form class="space-y-6" @submit.prevent="saveProfile">
        <UAlert v-if="errorMessage" color="error" variant="soft" title="Enregistrement impossible" :description="errorMessage" />
        <UAlert v-if="successMessage" color="success" variant="soft" title="Profil mis à jour" :description="successMessage" />

        <UCard :ui="{ root: 'border border-slate-200 ring-0 shadow-sm', body: 'p-6 sm:p-7' }">
          <div class="mb-6 flex flex-col gap-3 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div class="flex items-center gap-3">
              <div class="flex size-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <Building2 class="size-5" aria-hidden="true" />
              </div>
              <div>
                <h2 class="text-xl font-bold text-slate-950">Informations de l’entreprise</h2>
                <p class="text-sm text-slate-500">Identité affichée sur le site public.</p>
              </div>
            </div>
            <UButton type="submit" color="success" variant="soft" :loading="isSaving" label="Enregistrer">
              <template #leading><Save class="size-4" aria-hidden="true" /></template>
            </UButton>
          </div>

          <div class="grid gap-5 md:grid-cols-2">
            <ProfileField v-model="form.company.name" label="Nom de l’entreprise" required icon="building" placeholder="ASP Services Gabon" />
            <ProfileField v-model="form.company.tagline" label="Slogan" icon="sparkles" placeholder="Industrie Graphique et Management" />
            <ProfileField v-model="form.company.logo" class="md:col-span-2" label="Adresse du logo" icon="image" placeholder="/logo.png" />
            <div class="md:col-span-2">
              <label for="company-description" class="mb-2 block text-sm font-semibold text-slate-700">Description</label>
              <textarea id="company-description" v-model="form.company.description" rows="4" class="profile-control resize-none" placeholder="Présentez brièvement l’entreprise..." />
            </div>
          </div>
        </UCard>

        <UCard :ui="{ root: 'border border-slate-200 ring-0 shadow-sm', body: 'p-6 sm:p-7' }">
          <div class="mb-6 flex items-center gap-3 border-b border-slate-100 pb-5">
            <div class="flex size-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <ContactRound class="size-5" aria-hidden="true" />
            </div>
            <div>
              <h2 class="text-xl font-bold text-slate-950">Coordonnées</h2>
              <p class="text-sm text-slate-500">Informations de contact visibles par les clients.</p>
            </div>
          </div>

          <div class="grid gap-5 md:grid-cols-2">
            <ProfileField v-model="form.contact.email" label="Adresse email" required type="email" icon="mail" placeholder="contact@aspservices.ga" />
            <ProfileField v-model="form.contact.phone" label="Téléphone" required type="tel" icon="phone" placeholder="+241 77 86 31 98" />
            <ProfileField v-model="form.contact.whatsapp" label="WhatsApp" type="tel" icon="phone" placeholder="24177863198" />
            <ProfileField v-model="form.location.city" label="Ville" icon="map" placeholder="Libreville" />
            <ProfileField v-model="form.location.address" class="md:col-span-2" label="Adresse" required icon="map" placeholder="Adresse complète de l’entreprise" />
            <ProfileField v-model="form.location.country" label="Pays" icon="map" placeholder="Gabon" />
          </div>

          <div class="mt-7 flex justify-end border-t border-slate-100 pt-6">
            <UButton type="submit" color="primary" size="lg" :loading="isSaving" label="Mettre à jour le profil" class="justify-center font-semibold">
              <template #leading><Save class="size-5" aria-hidden="true" /></template>
            </UButton>
          </div>
        </UCard>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Building2, ChevronRight, ContactRound, LoaderCircle, Save } from 'lucide-vue-next'

definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

type SiteConfig = {
  company: { name: string; tagline: string; description: string; logo: string }
  contact: { phone: string; email: string; whatsapp: string }
  location: { address: string; city: string; country: string; [key: string]: unknown }
  [key: string]: any
}

const emptyConfig = (): SiteConfig => ({
  company: { name: '', tagline: '', description: '', logo: '' },
  contact: { phone: '', email: '', whatsapp: '' },
  location: { address: '', city: '', country: '' }
})

const form = reactive<SiteConfig>(emptyConfig())
const isLoading = ref(true)
const isSaving = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const loadProfile = async () => {
  try {
    const response = await $fetch<{ success: boolean; config: Partial<SiteConfig> }>('/api/config/get')
    const config = response.config || {}
    Object.assign(form, config, {
      company: { ...emptyConfig().company, ...(config.company || {}) },
      contact: { ...emptyConfig().contact, ...(config.contact || {}) },
      location: { ...emptyConfig().location, ...(config.location || {}) }
    })
  } catch (error: any) {
    errorMessage.value = error.data?.message || 'Impossible de charger le profil de l’entreprise.'
  } finally {
    isLoading.value = false
  }
}

const saveProfile = async () => {
  isSaving.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    await $fetch('/api/config/update', {
      method: 'POST',
      body: JSON.parse(JSON.stringify(form))
    })
    successMessage.value = 'Les informations de l’entreprise ont été enregistrées.'
  } catch (error: any) {
    errorMessage.value = error.data?.message || error.message || 'Impossible d’enregistrer le profil.'
  } finally {
    isSaving.value = false
  }
}

onMounted(loadProfile)
</script>

<style scoped>
.profile-control {
  width: 100%;
  border: 1px solid #cbd5e1;
  border-radius: 0.5rem;
  background: #f8fafc;
  padding: 0.8rem 1rem;
  color: #0f172a;
  outline: none;
  transition: border-color 150ms ease, box-shadow 150ms ease, background-color 150ms ease;
}

.profile-control:focus {
  border-color: #2563eb;
  background: #fff;
  box-shadow: 0 0 0 4px rgb(37 99 235 / 12%);
}
</style>
