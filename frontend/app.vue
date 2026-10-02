<template>
  <UApp>
    <div id="app" class="min-h-screen bg-asp-white">
      <SchemaOrg />

      <NuxtLayout>
        <NuxtPage :transition="{ name: 'page', mode: 'out-in' }" />
      </NuxtLayout>
    </div>
  </UApp>
</template>

<script setup lang="ts">
// App-wide meta configuration
useHead({
  htmlAttrs: {
    lang: 'fr'
  }
})
</script>
