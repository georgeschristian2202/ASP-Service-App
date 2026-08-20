<template>
  <div>
    <h1 class="text-3xl font-bold text-asp-black mb-6">Configuration</h1>
    <Card class="p-8 text-center">
      <p class="text-asp-gray-600 mb-4">Cette page sera créée à la prochaine étape.</p>
      <NuxtLink to="/admin" class="text-asp-blue-700 hover:text-asp-blue-800">
        ← Retour au dashboard
      </NuxtLink>
    </Card>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})
</script>
