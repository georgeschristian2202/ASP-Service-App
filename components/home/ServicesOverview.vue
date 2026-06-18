<template>
  <section class="section-padding bg-asp-gray-100">
    <Container>
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="heading-2 text-asp-black mb-4">
          Nos Services
        </h2>
        <p class="text-body-lg text-muted">
          De la signalétique professionnelle au marquage au sol, en passant par l'impression grand format, 
          nous proposons une gamme complète de solutions adaptées à vos besoins.
        </p>
      </div>

      <!-- Services Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ServiceCard
          v-for="service in displayServices"
          :key="service.id"
          :title="service.title"
          :description="service.description"
          :icon="service.icon"
          :features="service.features.slice(0, 3)"
        />
      </div>

      <!-- View All Services CTA -->
      <div class="text-center mt-12">
        <Button
          variant="primary"
          size="lg"
          to="/services"
        >
          Voir tous nos services
          <ArrowRightIcon class="w-5 h-5" />
        </Button>
      </div>
    </Container>
  </section>
</template>

<script setup lang="ts">
import { ArrowRightIcon } from '@heroicons/vue/24/outline'

const { services } = useServices()

// Display all 5 services on homepage
const displayServices = services
</script>
