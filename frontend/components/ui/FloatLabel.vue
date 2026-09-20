<template>
  <div class="relative">
    <slot />
  </div>
</template>

<script setup lang="ts">
// Composant wrapper pour les floating labels
// Les inputs/textarea/select à l'intérieur doivent utiliser placeholder=" " pour activer l'animation
</script>

<style scoped>
/* Styles pour le floating label - label sur la bordure */
:deep(input),
:deep(textarea),
:deep(select) {
  @apply pt-3 pb-3;
}

:deep(label) {
  @apply absolute left-3 top-1/2 -translate-y-1/2 text-asp-gray-500 transition-all duration-200 pointer-events-none px-2 bg-white;
}

/* Quand l'input a une valeur ou est focus - label se positionne sur la bordure */
:deep(input:focus ~ label),
:deep(input:not(:placeholder-shown) ~ label),
:deep(textarea:focus ~ label),
:deep(textarea:not(:placeholder-shown) ~ label),
:deep(select:focus ~ label),
:deep(select:not([value=""]) ~ label) {
  @apply top-0 -translate-y-1/2 text-xs text-asp-blue-700 font-medium;
}

/* Pour le textarea, ajuster la position initiale du label */
:deep(textarea ~ label) {
  @apply top-8;
}

:deep(textarea:focus ~ label),
:deep(textarea:not(:placeholder-shown) ~ label) {
  @apply top-0 -translate-y-1/2;
}

/* Pour le select */
:deep(select ~ label) {
  @apply top-1/2 -translate-y-1/2;
}

:deep(select:focus ~ label),
:deep(select:not([value=""]) ~ label) {
  @apply top-0 -translate-y-1/2 text-xs;
}

/* Assurer que le fond blanc du label couvre la bordure */
:deep(label) {
  z-index: 1;
}
</style>
