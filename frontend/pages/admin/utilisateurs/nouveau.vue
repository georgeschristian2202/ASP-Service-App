<template>
  <div class="mx-auto w-full max-w-5xl space-y-6">
    <div>
      <div class="mb-3 flex items-center gap-2 text-sm text-slate-500">
        <NuxtLink to="/admin" class="transition hover:text-blue-700">Accueil</NuxtLink>
        <ChevronRight class="size-4" aria-hidden="true" />
        <span class="font-medium text-slate-800">Nouvel utilisateur</span>
      </div>
      <h1 class="text-3xl font-bold tracking-tight text-slate-950">Ajouter un utilisateur</h1>
      <p class="mt-2 text-slate-600">Créez un compte administrateur ou super administrateur.</p>
    </div>

    <UAlert
      color="warning"
      variant="soft"
      title="Accès réservé"
      description="Seul un super administrateur peut créer de nouveaux utilisateurs."
    >
      <template #leading><ShieldCheck class="size-5" aria-hidden="true" /></template>
    </UAlert>

    <UCard
      class="!bg-white !text-slate-900"
      :ui="{ root: 'border border-slate-200 !bg-white !text-slate-900 ring-0 shadow-sm', body: '!bg-white p-6 sm:p-8' }"
    >
      <div class="mb-7 flex items-start gap-4 border-b border-slate-100 pb-6">
        <div class="flex size-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
          <UserPlus class="size-6" aria-hidden="true" />
        </div>
        <div>
          <h2 class="text-xl font-bold text-slate-950">Informations du compte</h2>
          <p class="mt-1 text-sm text-slate-500">Tous les champs sont obligatoires.</p>
        </div>
      </div>

      <UAlert
        v-if="errorMessage"
        color="error"
        variant="soft"
        title="Création impossible"
        :description="errorMessage"
        class="mb-6"
      />

      <UAlert
        v-if="successMessage"
        color="success"
        variant="soft"
        title="Utilisateur créé"
        :description="successMessage"
        class="mb-6"
      />

      <UAlert
        v-if="emailWarningMessage"
        color="warning"
        variant="soft"
        title="Compte créé, e-mail non envoyé"
        :description="emailWarningMessage"
        class="mb-6"
      />

      <form class="space-y-6" @submit.prevent="createUser">
        <div class="grid gap-6 md:grid-cols-2">
          <div>
            <label for="new-username" class="mb-2 block text-sm font-semibold text-slate-700">
              Nom d’utilisateur <span class="text-red-600">*</span>
            </label>
            <div class="relative">
              <UserRound class="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-slate-400" aria-hidden="true" />
              <input id="new-username" v-model.trim="form.username" type="text" autocomplete="off" minlength="3" required class="form-control pl-11" placeholder="ex. administrateur2" />
            </div>
          </div>

          <div>
            <label for="new-email" class="mb-2 block text-sm font-semibold text-slate-700">
              Adresse email <span class="text-red-600">*</span>
            </label>
            <div class="relative">
              <Mail class="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-slate-400" aria-hidden="true" />
              <input id="new-email" v-model.trim="form.email" type="email" autocomplete="off" required class="form-control pl-11" placeholder="nom@aspservices.ga" />
            </div>
          </div>

          <div>
            <label for="new-role" class="mb-2 block text-sm font-semibold text-slate-700">
              Rôle <span class="text-red-600">*</span>
            </label>
            <div class="relative">
              <Shield class="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-slate-400" aria-hidden="true" />
              <select id="new-role" v-model="form.role" required class="form-control pl-11">
                <option value="admin">Administrateur</option>
                <option value="superadmin">Super administrateur</option>
              </select>
            </div>
            <p class="mt-2 text-xs leading-5 text-slate-500">
              Le super administrateur pourra à son tour créer d’autres comptes.
            </p>
          </div>

          <div>
            <label for="new-password" class="mb-2 block text-sm font-semibold text-slate-700">
              Mot de passe <span class="text-red-600">*</span>
            </label>
            <div class="relative">
              <KeyRound class="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-slate-400" aria-hidden="true" />
              <input id="new-password" v-model="form.password" :type="showPassword ? 'text' : 'password'" autocomplete="new-password" minlength="8" required class="form-control px-11" placeholder="Minimum 8 caractères" />
              <button type="button" class="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-slate-500 hover:text-blue-700" :aria-label="showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'" @click="showPassword = !showPassword">
                <component :is="showPassword ? EyeOff : Eye" class="size-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div class="md:col-start-2">
            <label for="confirm-password" class="mb-2 block text-sm font-semibold text-slate-700">
              Confirmer le mot de passe <span class="text-red-600">*</span>
            </label>
            <div class="relative">
              <CheckCircle2 class="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-slate-400" aria-hidden="true" />
              <input id="confirm-password" v-model="form.confirmPassword" :type="showPassword ? 'text' : 'password'" autocomplete="new-password" minlength="8" required class="form-control pl-11" placeholder="Saisissez de nouveau le mot de passe" />
            </div>
          </div>
        </div>

        <label class="flex cursor-pointer items-start gap-3 rounded-lg border border-blue-100 bg-blue-50/70 p-4">
          <input
            v-model="form.sendCredentialsByEmail"
            type="checkbox"
            class="mt-0.5 size-4 rounded border-slate-300 text-blue-700 focus:ring-blue-500"
          />
          <span>
            <span class="block text-sm font-semibold text-slate-800">Envoyer les identifiants par e-mail</span>
            <span class="mt-1 block text-xs leading-5 text-slate-600">
              Le nom d’utilisateur, le mot de passe initial et le rôle seront envoyés à l’adresse indiquée.
            </span>
          </span>
        </label>

        <div class="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
          <UButton to="/admin" color="neutral" variant="outline" size="lg" label="Annuler" class="justify-center" />
          <UButton type="submit" color="success" size="lg" :loading="isSubmitting" label="Créer l’utilisateur" class="justify-center font-semibold">
            <template #leading><UserPlus class="size-5" aria-hidden="true" /></template>
          </UButton>
        </div>
      </form>
    </UCard>

    <UCard
      class="!bg-white !text-slate-900"
      :ui="{ root: 'border border-slate-200 !bg-white !text-slate-900 ring-0 shadow-sm', body: '!bg-white p-0' }"
    >
      <div class="flex flex-col gap-3 border-b border-slate-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div class="flex items-center gap-2">
            <Users class="size-5 text-blue-700" aria-hidden="true" />
            <h2 class="text-xl font-bold text-slate-950">Utilisateurs créés</h2>
          </div>
          <p class="mt-1 text-sm text-slate-500">{{ users.length }} compte{{ users.length > 1 ? 's' : '' }} enregistré{{ users.length > 1 ? 's' : '' }}.</p>
        </div>
        <UButton
          type="button"
          color="neutral"
          variant="outline"
          :loading="isLoadingUsers"
          label="Actualiser"
          @click="loadUsers"
        >
          <template #leading><RefreshCw class="size-4" aria-hidden="true" /></template>
        </UButton>
      </div>

      <div v-if="isLoadingUsers && !users.length" class="flex min-h-40 items-center justify-center gap-3 text-sm text-slate-500">
        <LoaderCircle class="size-5 animate-spin text-blue-700" aria-hidden="true" />
        Chargement des utilisateurs…
      </div>

      <UAlert
        v-else-if="usersError"
        color="error"
        variant="soft"
        title="Liste indisponible"
        :description="usersError"
        class="m-6"
      />

      <div v-else-if="users.length" class="overflow-x-auto">
        <table class="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead class="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th class="px-6 py-3 font-semibold">Utilisateur</th>
              <th class="px-6 py-3 font-semibold">Adresse e-mail</th>
              <th class="px-6 py-3 font-semibold">Rôle</th>
              <th class="px-6 py-3 font-semibold">Créé le</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 bg-white">
            <tr v-for="account in users" :key="account.id" class="transition hover:bg-slate-50">
              <td class="whitespace-nowrap px-6 py-4">
                <div class="flex items-center gap-3">
                  <span class="flex size-9 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-800">
                    {{ account.username.charAt(0).toUpperCase() }}
                  </span>
                  <span class="font-semibold text-slate-900">{{ account.username }}</span>
                </div>
              </td>
              <td class="whitespace-nowrap px-6 py-4 text-slate-600">{{ account.email }}</td>
              <td class="whitespace-nowrap px-6 py-4">
                <span
                  class="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold"
                  :class="account.role === 'superadmin' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'"
                >
                  {{ roleName(account.role) }}
                </span>
              </td>
              <td class="whitespace-nowrap px-6 py-4 text-slate-600">{{ formatDate(account.createdAt) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else class="px-6 py-10 text-center text-sm text-slate-500">
        Aucun utilisateur enregistré.
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import {
  CheckCircle2,
  ChevronRight,
  Eye,
  EyeOff,
  KeyRound,
  LoaderCircle,
  Mail,
  RefreshCw,
  Shield,
  ShieldCheck,
  UserPlus,
  UserRound,
  Users
} from 'lucide-vue-next'

definePageMeta({
  layout: 'admin',
  middleware: ['admin', 'superadmin']
})

const form = reactive({
  username: '',
  email: '',
  role: 'admin' as 'admin' | 'superadmin',
  password: '',
  confirmPassword: '',
  sendCredentialsByEmail: true
})

const isSubmitting = ref(false)
const showPassword = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const emailWarningMessage = ref('')
type AccountRole = 'superadmin' | 'admin' | 'editor'
interface AccountDetails {
  id: string
  username: string
  email: string
  role: AccountRole
  createdAt: string
  updatedAt: string
}

const users = ref<AccountDetails[]>([])
const isLoadingUsers = ref(false)
const usersError = ref('')

const roleName = (role: AccountRole) => {
  if (role === 'superadmin') return 'Super administrateur'
  if (role === 'admin') return 'Administrateur'
  return 'Éditeur'
}

const formatDate = (value: string) => new Intl.DateTimeFormat('fr-FR', {
  dateStyle: 'medium',
  timeStyle: 'short'
}).format(new Date(value))

const loadUsers = async () => {
  isLoadingUsers.value = true
  usersError.value = ''

  try {
    const result = await $fetch<{ success: boolean; users: AccountDetails[] }>('/api/users')
    users.value = result.users
  } catch (error: any) {
    usersError.value = error.data?.message || 'Impossible de charger la liste des utilisateurs.'
  } finally {
    isLoadingUsers.value = false
  }
}

onMounted(loadUsers)

const createUser = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  emailWarningMessage.value = ''

  if (form.password !== form.confirmPassword) {
    errorMessage.value = 'Les deux mots de passe ne correspondent pas.'
    return
  }

  isSubmitting.value = true

  try {
    const result = await $fetch<{
      success: boolean
      message: string
      user: AccountDetails
      emailDelivery: { requested: boolean; sent: boolean; message: string }
    }>('/api/users', {
      method: 'POST',
      body: {
        username: form.username,
        email: form.email,
        password: form.password,
        role: form.role,
        sendCredentialsByEmail: form.sendCredentialsByEmail
      }
    })

    const roleLabel = result.user.role === 'superadmin' ? 'super administrateur' : 'administrateur'
    successMessage.value = result.emailDelivery.sent
      ? `${result.user.username} a été créé avec le rôle ${roleLabel}. ${result.emailDelivery.message}`
      : `${result.user.username} a été créé avec le rôle ${roleLabel}.`

    if (result.emailDelivery.requested && !result.emailDelivery.sent) {
      emailWarningMessage.value = result.emailDelivery.message
    }

    users.value = [result.user, ...users.value.filter((account) => account.id !== result.user.id)]

    form.username = ''
    form.email = ''
    form.role = 'admin'
    form.password = ''
    form.confirmPassword = ''
    form.sendCredentialsByEmail = true
  } catch (error: any) {
    errorMessage.value = error.data?.message || error.message || 'Une erreur est survenue pendant la création.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.form-control {
  width: 100%;
  min-height: 3.25rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.5rem;
  background: #f8fafc;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  color: #0f172a;
  outline: none;
  transition: border-color 150ms ease, box-shadow 150ms ease, background-color 150ms ease;
}

.form-control:focus {
  border-color: #2563eb;
  background: #fff;
  box-shadow: 0 0 0 4px rgb(37 99 235 / 12%);
}
</style>
