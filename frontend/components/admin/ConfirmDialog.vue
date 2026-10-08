<template>
  <Teleport to="body">
    <Transition enter-active-class="transition duration-200" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition duration-150" leave-from-class="opacity-100" leave-to-class="opacity-0">
      <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm" @click.self="resolve(false)">
        <div role="alertdialog" aria-modal="true" :aria-labelledby="titleId" :aria-describedby="descriptionId" class="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
          <div class="flex items-start gap-4">
            <div :class="danger ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-700'" class="flex size-12 shrink-0 items-center justify-center rounded-full">
              <AlertTriangle v-if="danger" class="size-6" aria-hidden="true" />
              <CircleHelp v-else class="size-6" aria-hidden="true" />
            </div>
            <div class="min-w-0">
              <h2 :id="titleId" class="text-lg font-bold text-slate-950">{{ title }}</h2>
              <p :id="descriptionId" class="mt-2 text-sm leading-6 text-slate-600">{{ message }}</p>
            </div>
          </div>
          <div class="mt-6 flex justify-end gap-3">
            <button ref="cancelButton" type="button" @click="resolve(false)" class="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200">Annuler</button>
            <button type="button" @click="resolve(true)" :class="danger ? 'bg-red-600 hover:bg-red-700 focus:ring-red-200' : 'bg-blue-700 hover:bg-blue-800 focus:ring-blue-200'" class="rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition focus:outline-none focus:ring-4">{{ confirmLabel }}</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { AlertTriangle, CircleHelp } from 'lucide-vue-next'

const isOpen = ref(false)
const title = ref('Confirmer cette action')
const message = ref('Voulez-vous continuer ?')
const confirmLabel = ref('Confirmer')
const danger = ref(false)
const cancelButton = ref<HTMLButtonElement | null>(null)
const titleId = `confirm-title-${Math.random().toString(36).slice(2)}`
const descriptionId = `confirm-description-${Math.random().toString(36).slice(2)}`
let resolver: ((value: boolean) => void) | null = null

const open = (options: { title?: string; message: string; confirmLabel?: string; danger?: boolean }) => {
  title.value = options.title ?? 'Confirmer cette action'
  message.value = options.message
  confirmLabel.value = options.confirmLabel ?? 'Confirmer'
  danger.value = options.danger ?? false
  isOpen.value = true
  nextTick(() => cancelButton.value?.focus())
  return new Promise<boolean>((resolve) => { resolver = resolve })
}

const resolve = (value: boolean) => {
  isOpen.value = false
  resolver?.(value)
  resolver = null
}

defineExpose({ open })
</script>
