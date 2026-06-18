<template>
  <div id="app" class="min-h-screen bg-asp-white">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// App-wide meta configuration
useHead({
  htmlAttrs: {
    lang: 'fr'
  }
})
</script>
