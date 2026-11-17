<template>
  <main class="login-shell relative flex items-start overflow-x-hidden overflow-y-auto bg-slate-950 p-3 sm:items-center sm:p-6 lg:p-8">
    <Toast />
    <div class="pointer-events-none absolute -right-24 -top-32 size-96 rounded-full bg-blue-500/20 blur-3xl" />
    <div class="pointer-events-none absolute -bottom-48 left-1/3 size-96 rounded-full bg-cyan-400/10 blur-3xl" />

    <div class="login-panel relative mx-auto grid min-w-0 w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-white shadow-2xl shadow-black/30 lg:grid-cols-[1.08fr_0.92fr]">
      <aside class="login-aside relative hidden overflow-hidden bg-gradient-to-br from-[#123b70] via-[#0d2d56] to-[#081a31] p-10 text-white lg:flex lg:flex-col lg:justify-between">
        <div class="pointer-events-none absolute -left-20 bottom-10 size-72 rounded-full bg-blue-400/20 blur-3xl" />

        <div class="relative">
          <div class="inline-flex rounded-2xl bg-white p-4 shadow-xl shadow-black/10">
            <img src="/Logo-ASP-Service-sans fond.png" alt="ASP Services" class="h-auto w-60" />
          </div>

          <div class="login-brand-copy mt-16 max-w-md">
            <UBadge color="neutral" variant="soft" size="lg" class="border border-white/15 bg-white/10 text-blue-50">
              <span class="mr-2 size-2 rounded-full bg-emerald-400" />
              Espace d’administration
            </UBadge>
            <h1 class="mt-6 text-4xl font-bold leading-tight tracking-tight">
              Pilotez votre présence digitale en toute simplicité.
            </h1>
            <p class="login-aside-description mt-5 text-base leading-7 text-blue-100/80">
              Services, réalisations et contenus réunis dans un espace de gestion sécurisé.
            </p>
          </div>
        </div>

        <div class="relative flex items-center gap-3 border-t border-white/10 pt-6 text-sm text-blue-100/75">
          <ShieldCheck class="size-5" aria-hidden="true" />
          Accès protégé — ASP Services Gabon
        </div>
      </aside>

      <section class="login-section flex min-h-0 min-w-0 items-center overflow-hidden bg-slate-50/70 p-4 sm:p-8 lg:p-10">
        <UCard
          class="login-card mx-auto min-w-0 w-full max-w-md"
          :ui="{
            root: 'border border-slate-200 bg-white text-slate-900 shadow-xl shadow-slate-900/5 ring-0',
            body: 'bg-white p-6 sm:p-8'
          }"
        >
          <UButton
            to="/accueil"
            color="neutral"
            variant="ghost"
            size="lg"
            label="Retour au site"
            class="login-back mb-7 -ml-2 font-semibold text-asp-blue-700 hover:bg-blue-50 hover:text-asp-blue-900"
          >
            <template #leading><ArrowLeft class="size-5" aria-hidden="true" /></template>
          </UButton>

          <img src="/Logo-ASP-Service-sans fond.png" alt="ASP Services" class="login-mobile-logo mb-7 h-auto w-52 max-w-full lg:hidden" />

          <div class="login-intro mb-7">
            <div class="mb-5 flex size-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700 ring-1 ring-blue-100">
              <LockKeyhole class="size-6" aria-hidden="true" />
            </div>
            <h2 class="text-3xl font-bold tracking-tight text-slate-950">Bienvenue</h2>
            <p class="mt-2 text-sm leading-6 text-slate-500">
              Identifiez-vous pour accéder au tableau de bord ASP Services.
            </p>
          </div>

          <UForm :state="credentials" class="space-y-5" autocomplete="off" @submit="handleLogin">
            <UFormField name="username" required>
              <fieldset class="login-field" :class="{ 'has-value': fieldHasValue('username') }">
                <legend aria-hidden="true"><span>Nom d’utilisateur *</span></legend>
                <input
                  ref="usernameInput"
                  id="admin-username"
                  v-model="credentials.username"
                  type="text"
                  autocomplete="username"
                  inputmode="text"
                  autocapitalize="none"
                  :spellcheck="false"
                  placeholder=" "
                  aria-label="Nom d’utilisateur"
                  class="login-input"
                  :class="{ 'is-filled': credentials.username.length > 0 }"
                  :disabled="isLoading"
                  required
                  @input="syncAutofillState"
                  @change="syncAutofillState"
                  @animationstart="syncAutofillState"
                />
                <label for="admin-username">
                  Nom d’utilisateur <span aria-hidden="true">*</span>
                </label>
              </fieldset>
            </UFormField>

            <UFormField name="password" required>
              <fieldset class="login-field" :class="{ 'has-value': fieldHasValue('password') }">
                <legend aria-hidden="true"><span>Mot de passe *</span></legend>
                <input
                  ref="passwordInput"
                  id="admin-password"
                  v-model="credentials.password"
                  :type="showPassword ? 'text' : 'password'"
                  autocomplete="current-password"
                  placeholder=" "
                  aria-label="Mot de passe"
                  class="login-input pr-12"
                  :class="{ 'is-filled': credentials.password.length > 0 }"
                  :disabled="isLoading"
                  required
                  @input="syncAutofillState"
                  @change="syncAutofillState"
                  @animationstart="syncAutofillState"
                />
                <label for="admin-password">
                  Mot de passe <span aria-hidden="true">*</span>
                </label>
                <button
                  type="button"
                  class="login-password-toggle absolute inset-y-0 right-0 flex w-12 items-center justify-center rounded-r-md text-asp-gray-500 transition-colors hover:text-asp-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-asp-blue-500"
                  :disabled="isLoading"
                  :aria-label="showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'"
                  @click="showPassword = !showPassword"
                >
                  <component :is="showPassword ? EyeOff : Eye" class="size-4" aria-hidden="true" />
                </button>
              </fieldset>
            </UFormField>

            <button
              type="submit"
              class="login-submit mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-md font-semibold text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-asp-blue-500 focus-visible:ring-offset-2"
              :disabled="isLoading || !isFormValid"
              :aria-busy="isLoading"
            >
              <LoaderCircle v-if="isLoading" class="size-5 animate-spin" aria-hidden="true" />
              <LogIn v-else class="size-5" aria-hidden="true" />
              <span>{{ isLoading ? 'Connexion en cours…' : 'Se connecter' }}</span>
            </button>
          </UForm>

          <div class="login-security-note mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
            <ShieldCheck class="size-4 text-emerald-600" aria-hidden="true" />
            Connexion sécurisée à l’administration
          </div>
        </UCard>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import {
  ArrowLeft,
  Eye,
  EyeOff,
  LockKeyhole,
  LoaderCircle,
  LogIn,
  ShieldCheck
} from 'lucide-vue-next'
import { useToast as useAppToast } from '@/composables/useToast'

definePageMeta({
  layout: false
})

const { login, fetchUser, isLoading, isAuthenticated } = useAuth()
const { showError } = useAppToast()
const adminTransitionLoading = useState('admin-transition-loading', () => false)

const credentials = reactive({
  username: '',
  password: ''
})
const errorMessage = ref('')
const showPassword = ref(false)
const usernameInput = ref<HTMLInputElement | null>(null)
const passwordInput = ref<HTMLInputElement | null>(null)
const autofillState = reactive({ username: false, password: false })
const isFormValid = computed(() => {
  return credentials.username.trim().length > 0 && credentials.password.length > 0
})

const syncAutofillState = () => {
  autofillState.username = Boolean(usernameInput.value?.value)
  autofillState.password = Boolean(passwordInput.value?.value)
}

const fieldHasValue = (field: 'username' | 'password') => {
  return Boolean(credentials[field]) || autofillState[field]
}

const handleLogin = async () => {
  if (isLoading.value) return

  errorMessage.value = ''

  if (!credentials.username.trim()) {
    errorMessage.value = 'Veuillez saisir votre nom d’utilisateur.'
    showError('Champ obligatoire', errorMessage.value, 4000)
    usernameInput.value?.focus()
    return
  }

  if (!credentials.password) {
    errorMessage.value = 'Veuillez saisir votre mot de passe.'
    showError('Champ obligatoire', errorMessage.value, 4000)
    passwordInput.value?.focus()
    return
  }

  credentials.username = credentials.username.trim()
  const result = await login(credentials)

  if (result.success) {
    const session = await fetchUser()
    if (!session.success) {
      errorMessage.value = 'La connexion a été acceptée, mais la session n’a pas pu être conservée. Rechargez la page puis réessayez.'
      showError('Session non conservée', errorMessage.value, 6000)
      return
    }

    adminTransitionLoading.value = true
    sessionStorage.setItem('admin-login-success', 'true')
    await navigateTo('/admin')
    return
  }

  errorMessage.value = result.error || 'Une erreur empêche la connexion.'
  const toastTitle = result.errorType === 'credentials'
    ? 'Identifiants incorrects'
    : result.errorType === 'rate_limit'
      ? 'Trop de tentatives'
    : result.errorType === 'server'
      ? 'Serveur indisponible'
      : 'Connexion impossible'
  showError(toastTitle, errorMessage.value, 5000)
}

onMounted(async () => {
  syncAutofillState()
  window.setTimeout(syncAutofillState, 100)
  window.setTimeout(syncAutofillState, 500)
  window.setTimeout(syncAutofillState, 1500)

  if (isAuthenticated.value) {
    await navigateTo('/admin')
  }
})
</script>

<style scoped>
.login-shell {
  min-height: 100vh;
  min-height: 100dvh;
}

.login-panel {
  min-height: calc(100dvh - 1.5rem);
  max-height: 760px;
}

.login-section,
.login-card {
  min-width: 0;
  max-width: 100%;
}

.login-input {
  box-sizing: border-box;
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
  border-radius: 0.32rem;
  background: transparent;
  padding: 0.85rem 1rem 0;
  color: #0f172a;
  font-size: 1rem;
  line-height: 1.5rem;
  outline: none;
  transition: border-color 180ms ease, box-shadow 180ms ease, background-color 180ms ease;
}

.login-field {
  position: relative;
  width: 100%;
  height: 3.5rem;
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 1px solid #94a3b8;
  border-radius: 0.375rem;
  background: #fff;
  transition: border-color 180ms ease, box-shadow 180ms ease, background-color 180ms ease;
}

.login-field legend {
  width: auto;
  max-width: 0;
  height: 0;
  margin-left: 0.75rem;
  padding: 0;
  overflow: hidden;
  color: transparent;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 0;
  white-space: nowrap;
  transition: max-width 180ms ease, padding 180ms ease;
}

.login-field legend span {
  display: inline-block;
}

.login-field label {
  pointer-events: none;
  position: absolute;
  top: 50%;
  left: 0.75rem;
  z-index: 1;
  max-width: calc(100% - 4rem);
  overflow: hidden;
  padding: 0 0.35rem;
  color: #64748b;
  font-size: 1rem;
  line-height: 1rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  transform: translateY(-50%);
  transform-origin: left center;
  transition: top 180ms ease, color 180ms ease, font-size 180ms ease, transform 180ms ease;
}

.login-field label span {
  color: #dc2626;
}

.login-field:focus-within {
  border-color: #2563eb;
  background-color: #eff6ff;
  box-shadow: 0 0 0 4px rgb(37 99 235 / 18%);
}

.login-input:focus {
  box-shadow: none;
}

.login-input:focus ~ label,
.login-field.has-value label,
.login-input:not(:placeholder-shown) ~ label,
.login-input.is-filled ~ label,
.login-input:autofill ~ label,
.login-input:-webkit-autofill ~ label,
.login-input:-moz-autofill ~ label {
  top: 0;
  color: #1d4ed8;
  font-size: 0.75rem;
  font-weight: 600;
  transform: translateY(-50%);
}

.login-field:focus-within > label,
.login-field.has-value > label {
  top: 0 !important;
  color: #1d4ed8 !important;
  font-size: 0.75rem !important;
  font-weight: 600 !important;
  transform: translateY(-50%) !important;
}

.login-field:focus-within > legend,
.login-field.has-value > legend {
  max-width: calc(100% - 3rem);
  padding: 0 0.35rem;
}

.login-field:focus-within .login-password-toggle {
  color: #1d4ed8;
}

.login-input:disabled,
.login-password-toggle:disabled {
  cursor: not-allowed;
}

@keyframes login-autofill-detected {
  from { opacity: 1; }
  to { opacity: 1; }
}

.login-input:-webkit-autofill {
  animation: login-autofill-detected 1ms;
}

.login-submit {
  background: #1d4ed8;
}

.login-submit:hover:not(:disabled) {
  background: #1e3a8a;
}

.login-submit:disabled {
  cursor: wait;
  background: #94a3b8;
  color: #f8fafc;
}

@media (min-width: 640px) {
  .login-panel {
    min-height: 0;
    height: calc(100dvh - 3rem);
  }
}

@media (min-width: 1024px) {
  .login-panel {
    height: calc(100dvh - 4rem);
  }
}

@media (max-width: 639px) {
  .login-panel {
    max-height: none;
  }

  .login-section {
    overflow: visible;
  }
}

@media (max-height: 720px) {
  .login-aside,
  .login-section {
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
  }

  .login-brand-copy {
    margin-top: 2rem;
  }

  .login-aside-description {
    margin-top: 0.75rem;
  }

  .login-back,
  .login-intro,
  .login-mobile-logo {
    margin-bottom: 1rem;
  }

  .login-security-note {
    margin-top: 1rem;
  }
}

@media (max-height: 580px) {
  .login-aside-description,
  .login-security-note,
  .login-mobile-logo {
    display: none;
  }

  .login-brand-copy {
    margin-top: 1rem;
  }

  .login-back,
  .login-intro {
    margin-bottom: 0.75rem;
  }
}
</style>
