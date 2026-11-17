<template>
  <nav v-if="links.length" :aria-label="ariaLabel" :class="['flex flex-wrap gap-3', justifyClass]">
    <a
      v-for="link in links"
      :key="link.key"
      :href="link.url"
      target="_blank"
      rel="noopener noreferrer"
      :aria-label="`${link.label} — ouvre un nouvel onglet`"
      :title="link.label"
      :class="[
        'inline-flex items-center justify-center gap-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2',
        showLabels ? 'px-4 py-2 text-sm font-semibold' : 'w-11 h-11',
        theme === 'dark'
          ? 'bg-white/10 text-white hover:bg-yellow-400 hover:text-asp-black focus:ring-offset-asp-black'
          : 'bg-asp-blue-50 text-asp-blue-700 hover:bg-asp-blue-700 hover:text-white focus:ring-offset-white'
      ]"
    >
      <component :is="link.icon" class="w-5 h-5" aria-hidden="true" />
      <span v-if="showLabels">{{ link.label }}</span>
    </a>
  </nav>
</template>

<script setup lang="ts">
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-vue-next'

const props = withDefaults(defineProps<{
  theme?: 'light' | 'dark'
  justify?: 'start' | 'center' | 'end'
  showLabels?: boolean
  ariaLabel?: string
}>(), {
  theme: 'light',
  justify: 'start',
  showLabels: false,
  ariaLabel: 'Réseaux sociaux ASP Services'
})

const { data } = await useFetch<{
  success: boolean
  config?: { social?: Record<string, string | undefined> }
}>('/api/config/get', { key: 'public-site-social-config' })

const candidates = [
  { key: 'facebook', label: 'Facebook', icon: Facebook },
  { key: 'instagram', label: 'Instagram', icon: Instagram },
  { key: 'linkedin', label: 'LinkedIn', icon: Linkedin },
  { key: 'twitter', label: 'X / Twitter', icon: Twitter }
]

const links = computed(() => candidates
  .map(item => ({ ...item, url: data.value?.config?.social?.[item.key]?.trim() || '' }))
  .filter(item => item.url))

const justifyClass = computed(() => ({
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end'
}[props.justify]))
</script>
