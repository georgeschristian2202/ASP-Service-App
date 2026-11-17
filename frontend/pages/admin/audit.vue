<template>
  <div class="space-y-6">
    <section class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-900">Audit et statistiques</h1>
          <p class="text-sm text-slate-600">Suivi des actions administratives, demandes de devis et clics WhatsApp.</p>
        </div>
        <button type="button" @click="refreshAll" :disabled="pending" class="rounded-lg bg-asp-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-asp-blue-800 disabled:opacity-50">
          {{ pending ? 'Actualisation...' : 'Actualiser' }}
        </button>
      </div>
    </section>

    <section class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <article class="rounded-xl border border-blue-200 bg-blue-50 p-5"><p class="text-sm font-medium text-blue-700">Demandes de devis</p><p class="mt-2 text-3xl font-bold text-blue-950">{{ summary.quoteRequests }}</p><p class="mt-1 text-xs text-blue-700">{{ summary.uniqueQuoteVisitors }} visiteur(s) unique(s)</p></article>
      <article class="rounded-xl border border-green-200 bg-green-50 p-5"><p class="text-sm font-medium text-green-700">Clics WhatsApp</p><p class="mt-2 text-3xl font-bold text-green-950">{{ summary.whatsappClicks }}</p><p class="mt-1 text-xs text-green-700">{{ summary.uniqueWhatsappVisitors }} visiteur(s) unique(s)</p></article>
      <article class="rounded-xl border border-amber-200 bg-amber-50 p-5"><p class="text-sm font-medium text-amber-700">Événements sur 30 jours</p><p class="mt-2 text-3xl font-bold text-amber-950">{{ summary.last30Days }}</p></article>
    </section>

    <section class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <h2 class="mb-4 text-lg font-bold text-slate-900">Origine des conversions</h2>
      <div v-if="summary.bySource.length" class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div v-for="item in summary.bySource" :key="`${item.type}-${item.source}`" class="rounded-lg border border-slate-200 p-4">
          <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">{{ eventLabel(item.type) }}</p>
          <p class="mt-1 text-sm font-medium text-slate-800">{{ sourceLabel(item.source) }}</p>
          <p class="mt-2 text-2xl font-bold text-asp-blue-700">{{ item.count }}</p>
        </div>
      </div>
      <p v-else class="text-sm text-slate-500">Aucun événement enregistré pour le moment.</p>
    </section>

    <section class="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div class="border-b border-slate-200 p-4 sm:p-5">
        <h2 class="text-lg font-bold text-slate-900">Journal des actions administratives</h2>
        <div class="mt-4 grid gap-3 sm:grid-cols-2 lg:flex lg:flex-wrap">
          <select v-model="filters.action" @change="loadAudit" class="min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm lg:w-auto">
            <option value="">Toutes les actions</option><option value="CREATE_OR_EXECUTE">Création / exécution</option><option value="UPDATE">Modification</option><option value="DELETE">Suppression</option>
          </select>
          <select v-model="filters.success" @change="loadAudit" class="min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm lg:w-auto">
            <option value="">Tous les résultats</option><option value="true">Réussies</option><option value="false">Échouées</option>
          </select>
        </div>
      </div>
      <div class="divide-y divide-slate-200 md:hidden">
        <article v-for="item in auditItems" :key="`mobile-${item.identifiant}`" class="space-y-4 p-4">
          <div class="flex items-start justify-between gap-3">
            <div class="min-w-0">
              <p class="font-semibold text-slate-900">{{ actionLabel(item.action) }}</p>
              <p class="mt-1 text-xs text-slate-500">{{ formatDate(item.creeLe) }}</p>
            </div>
            <span :class="item.reussie ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'" class="shrink-0 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold">
              {{ item.reussie ? 'Réussie' : `Échec ${item.codeStatut}` }}
            </span>
          </div>
          <dl class="grid gap-3 text-sm">
            <div>
              <dt class="text-xs font-semibold uppercase tracking-wide text-slate-400">Administrateur</dt>
              <dd class="mt-1 font-medium text-slate-800">{{ item.nomUtilisateur }}</dd>
            </div>
            <div>
              <dt class="text-xs font-semibold uppercase tracking-wide text-slate-400">Ressource</dt>
              <dd class="mt-1 font-medium text-slate-800">{{ item.ressource }}</dd>
              <dd class="mt-1 break-all text-xs leading-5 text-slate-500">{{ item.chemin }}</dd>
            </div>
          </dl>
        </article>
        <p v-if="!auditItems.length" class="px-4 py-10 text-center text-sm text-slate-500">Aucune action enregistrée.</p>
      </div>

      <div class="hidden overflow-x-auto md:block">
        <table class="min-w-full divide-y divide-slate-200 text-sm">
          <thead class="bg-slate-50"><tr><th class="px-5 py-3 text-left">Date</th><th class="px-5 py-3 text-left">Administrateur</th><th class="px-5 py-3 text-left">Action</th><th class="px-5 py-3 text-left">Ressource</th><th class="px-5 py-3 text-left">Résultat</th></tr></thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="item in auditItems" :key="item.identifiant" class="hover:bg-slate-50">
              <td class="whitespace-nowrap px-5 py-3 text-slate-600">{{ formatDate(item.creeLe) }}</td>
              <td class="px-5 py-3 font-medium text-slate-900">{{ item.nomUtilisateur }}</td>
              <td class="px-5 py-3">{{ actionLabel(item.action) }}</td>
              <td class="px-5 py-3"><p class="font-medium text-slate-800">{{ item.ressource }}</p><p class="max-w-md truncate text-xs text-slate-500">{{ item.chemin }}</p></td>
              <td class="px-5 py-3"><span :class="item.reussie ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'" class="whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold">{{ item.reussie ? 'Réussie' : `Échec ${item.codeStatut}` }}</span></td>
            </tr>
            <tr v-if="!auditItems.length"><td colspan="5" class="px-5 py-10 text-center text-slate-500">Aucune action enregistrée.</td></tr>
          </tbody>
        </table>
      </div>
      <div class="flex flex-col gap-3 border-t border-slate-200 px-4 py-4 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <span class="text-slate-500">{{ total }} action(s)</span>
        <div class="grid grid-cols-2 gap-2 sm:flex"><button @click="changePage(page - 1)" :disabled="page <= 1" class="min-h-10 rounded border px-3 py-1.5 disabled:opacity-40">Précédent</button><button @click="changePage(page + 1)" :disabled="page * 25 >= total" class="min-h-10 rounded border px-3 py-1.5 disabled:opacity-40">Suivant</button></div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

type AuditItem = { identifiant: string; nomUtilisateur: string; action: string; ressource: string; chemin: string; codeStatut: number; reussie: boolean; creeLe: string }
type SourceStat = { type: string; source: string; count: number }

const pending = ref(false)
const page = ref(1)
const total = ref(0)
const auditItems = ref<AuditItem[]>([])
const filters = reactive({ action: '', success: '' })
const summary = reactive({ quoteRequests: 0, whatsappClicks: 0, uniqueQuoteVisitors: 0, uniqueWhatsappVisitors: 0, last30Days: 0, bySource: [] as SourceStat[] })

const loadSummary = async () => {
  const response = await $fetch<{ success: boolean; stats: typeof summary }>('/api/events/summary')
  if (response.success) Object.assign(summary, response.stats)
}

const loadAudit = async () => {
  const response = await $fetch<{ success: boolean; items: AuditItem[]; total: number }>('/api/audit', { query: { page: page.value, limit: 25, action: filters.action || undefined, success: filters.success || undefined } })
  auditItems.value = response.items
  total.value = response.total
}

const refreshAll = async () => {
  pending.value = true
  try { await Promise.all([loadSummary(), loadAudit()]) } finally { pending.value = false }
}

const changePage = async (nextPage: number) => { page.value = nextPage; await loadAudit() }
const formatDate = (value: string) => new Intl.DateTimeFormat('fr-GA', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(value))
const actionLabel = (value: string) => (({ CREATE_OR_EXECUTE: 'Création / exécution', UPDATE: 'Modification', DELETE: 'Suppression', LOGIN: 'Connexion' } as Record<string, string>)[value] || value)
const eventLabel = (value: string) => value === 'QUOTE_REQUEST' ? 'Demande de devis' : 'Clic WhatsApp'
const sourceLabel = (value: string) => (({ floating_button: 'Bouton flottant', promo_popup: 'Popup promotionnelle', contact_page_card: 'Page contact', call_to_action: 'Appel à l’action', service_card: 'Carte service', homepage_quote_modal: 'Formulaire de devis' } as Record<string, string>)[value] || value)

onMounted(refreshAll)
</script>
