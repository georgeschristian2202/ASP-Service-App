<template>
  <UApp>
    <div id="app" class="min-h-screen bg-asp-white">
      <SchemaOrg />

      <GlobalPageLoader
        forced-only
        :force="adminTransitionLoading"
        force-text="Préparation de votre espace d’administration..."
      />

      <NuxtLayout>
        <NuxtPage :transition="{ name: 'page', mode: 'out-in' }" />
      </NuxtLayout>
    </div>
  </UApp>
</template>

<script setup lang="ts">
const adminTransitionLoading = useState('admin-transition-loading', () => false)

// App-wide meta configuration
useHead({
  htmlAttrs: {
    lang: 'fr'
  }
})
</script>
