<template>
  <div class="mx-auto w-full max-w-7xl space-y-6">
    <ConfirmDialog ref="confirmDialog" />
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
      <UCard class="overflow-hidden !bg-white !text-slate-900" :ui="{ root: 'border border-slate-200 !bg-white !text-slate-900 ring-0 shadow-sm', body: '!bg-white p-0' }">
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

      <div class="space-y-6">
        <form class="space-y-6" @submit.prevent="saveProfile">
          <UAlert v-if="errorMessage" color="error" variant="soft" title="Enregistrement impossible" :description="errorMessage" />
          <UAlert v-if="successMessage" color="success" variant="soft" title="Profil mis à jour" :description="successMessage" />

        <UCard class="!bg-white !text-slate-900" :ui="{ root: 'border border-slate-200 !bg-white !text-slate-900 ring-0 shadow-sm', body: '!bg-white p-6 sm:p-7' }">
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
            <div class="md:col-span-2">
              <label class="mb-2 block text-sm font-semibold text-slate-700">Logo de l’entreprise</label>
              <ImageUploader
                v-model="form.company.logo"
                folder="company-logo"
                alt="Logo de l’entreprise"
                :allow-url="false"
                object-fit="contain"
              />
              <p class="mt-2 text-xs text-slate-500">Choisissez une nouvelle image pour remplacer le logo actuel, puis enregistrez le profil.</p>
            </div>
            <div class="md:col-span-2">
              <label for="company-description" class="mb-2 block text-sm font-semibold text-slate-700">Description</label>
              <textarea id="company-description" v-model="form.company.description" rows="4" class="profile-control resize-none" placeholder="Présentez brièvement l’entreprise..." />
            </div>
          </div>
        </UCard>

        <UCard class="!bg-white !text-slate-900" :ui="{ root: 'border border-slate-200 !bg-white !text-slate-900 ring-0 shadow-sm', body: '!bg-white p-6 sm:p-7' }">
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

        <form class="space-y-5" @submit.prevent="changePassword">
          <UCard class="!bg-white !text-slate-900" :ui="{ root: 'border border-slate-200 !bg-white !text-slate-900 ring-0 shadow-sm', body: '!bg-white p-6 sm:p-7' }">
            <div class="mb-6 flex items-center gap-3 border-b border-slate-100 pb-5">
              <div class="flex size-11 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                <LockKeyhole class="size-5" aria-hidden="true" />
              </div>
              <div>
                <h2 class="text-xl font-bold text-slate-950">Sécurité du compte</h2>
                <p class="text-sm text-slate-500">Modifiez le mot de passe de votre compte connecté.</p>
              </div>
            </div>

            <UAlert v-if="passwordError" color="error" variant="soft" title="Modification impossible" :description="passwordError" class="mb-5" />
            <UAlert v-if="passwordSuccess" color="success" variant="soft" title="Mot de passe modifié" :description="passwordSuccess" class="mb-5" />

            <div class="grid gap-5">
              <div>
                <label for="current-password" class="mb-2 block text-sm font-semibold text-slate-700">Mot de passe actuel <span class="text-red-600">*</span></label>
                <input id="current-password" v-model="passwordForm.currentPassword" type="password" autocomplete="current-password" required class="profile-control" />
              </div>
              <div class="grid gap-5 md:grid-cols-2">
                <div>
                  <label for="new-account-password" class="mb-2 block text-sm font-semibold text-slate-700">Nouveau mot de passe <span class="text-red-600">*</span></label>
                  <input id="new-account-password" v-model="passwordForm.newPassword" type="password" autocomplete="new-password" minlength="8" required class="profile-control" />
                  <p class="mt-2 text-xs text-slate-500">Minimum 8 caractères.</p>
                </div>
                <div>
                  <label for="confirm-account-password" class="mb-2 block text-sm font-semibold text-slate-700">Confirmer le nouveau mot de passe <span class="text-red-600">*</span></label>
                  <input id="confirm-account-password" v-model="passwordForm.confirmPassword" type="password" autocomplete="new-password" minlength="8" required class="profile-control" />
                </div>
              </div>
            </div>

            <div class="mt-7 flex justify-end border-t border-slate-100 pt-6">
              <UButton type="submit" color="warning" size="lg" :loading="isChangingPassword" label="Changer le mot de passe" class="justify-center font-semibold">
                <template #leading><KeyRound class="size-5" aria-hidden="true" /></template>
              </UButton>
            </div>
          </UCard>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Building2, ChevronRight, ContactRound, KeyRound, LoaderCircle, LockKeyhole, Save } from 'lucide-vue-next'

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
const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})
const isChangingPassword = ref(false)
const passwordError = ref('')
const passwordSuccess = ref('')
const toast = useToast()
const profileDirty = ref(false)
const passwordDirty = ref(false)
const trackProfileChanges = ref(false)
const confirmDialog = ref<{ open: (options: { title?: string; message: string; confirmLabel?: string; danger?: boolean }) => Promise<boolean> } | null>(null)

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
    toast.add({ title: 'Chargement impossible', description: errorMessage.value, color: 'error' })
  } finally {
    isLoading.value = false
    nextTick(() => { trackProfileChanges.value = true })
  }
}

watch(form, () => {
  if (trackProfileChanges.value) profileDirty.value = true
}, { deep: true })

watch(passwordForm, () => {
  passwordDirty.value = Boolean(passwordForm.currentPassword || passwordForm.newPassword || passwordForm.confirmPassword)
}, { deep: true })

const saveProfile = async () => {
  const confirmed = await confirmDialog.value?.open({ title: 'Mettre à jour le profil ?', message: 'Les nouvelles informations seront utilisées dans l’administration et sur le site public.', confirmLabel: 'Enregistrer' })
  if (!confirmed) return

  isSaving.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    await $fetch('/api/config/update', {
      method: 'POST',
      body: JSON.parse(JSON.stringify(form))
    })
    successMessage.value = 'Les informations de l’entreprise ont été enregistrées.'
    profileDirty.value = false
    toast.add({ title: 'Profil mis à jour', description: successMessage.value, color: 'success' })
  } catch (error: any) {
    errorMessage.value = error.data?.message || error.message || 'Impossible d’enregistrer le profil.'
    toast.add({ title: 'Enregistrement impossible', description: errorMessage.value, color: 'error' })
  } finally {
    isSaving.value = false
  }
}

const changePassword = async () => {
  passwordError.value = ''
  passwordSuccess.value = ''

  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    passwordError.value = 'La confirmation ne correspond pas au nouveau mot de passe.'
    toast.add({ title: 'Vérification requise', description: passwordError.value, color: 'error' })
    return
  }

  const confirmed = await confirmDialog.value?.open({ title: 'Modifier le mot de passe ?', message: 'Vous devrez utiliser le nouveau mot de passe lors de votre prochaine connexion.', confirmLabel: 'Modifier le mot de passe', danger: true })
  if (!confirmed) return

  isChangingPassword.value = true

  try {
    const response = await $fetch<{ success: boolean; message: string }>('/api/auth/password', {
      method: 'POST',
      body: {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      }
    })

    passwordSuccess.value = response.message
    passwordForm.currentPassword = ''
    passwordForm.newPassword = ''
    passwordForm.confirmPassword = ''
    passwordDirty.value = false
    toast.add({ title: 'Mot de passe modifié', description: passwordSuccess.value, color: 'success' })
  } catch (error: any) {
    passwordError.value = error.data?.message || error.message || 'Impossible de modifier le mot de passe.'
    toast.add({ title: 'Modification impossible', description: passwordError.value, color: 'error' })
  } finally {
    isChangingPassword.value = false
  }
}

const hasUnsavedProfileChanges = computed(() => profileDirty.value || passwordDirty.value)
const warnBeforeUnload = (event: BeforeUnloadEvent) => {
  if (!hasUnsavedProfileChanges.value) return
  event.preventDefault()
  event.returnValue = ''
}

onBeforeRouteLeave(async () => {
  if (!hasUnsavedProfileChanges.value) return true
  return await confirmDialog.value?.open({ title: 'Modifications non enregistrées', message: 'Vous allez perdre les changements effectués sur le profil.', confirmLabel: 'Quitter sans enregistrer', danger: true }) ?? false
})

onMounted(() => {
  window.addEventListener('beforeunload', warnBeforeUnload)
  loadProfile()
})
onBeforeUnmount(() => window.removeEventListener('beforeunload', warnBeforeUnload))
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
