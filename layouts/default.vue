<template>
  <div class="min-h-screen flex flex-col">
    <TheNavigation />
    
    <!-- Add top padding to account for fixed navbar -->
    <main class="flex-grow pt-20">
      <slot />
    </main>
    
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
// Default layout for most pages with navigation and footer
</script>
