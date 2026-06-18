<template>
  <section class="section-padding bg-asp-white">
    <Container>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <!-- Image Side -->
        <div class="relative">
          <div class="relative rounded-2xl overflow-hidden shadow-asp-2xl">
            <img
              src="/images/about/workshop.jpg"
              alt="Atelier ASP Services Gabon"
              class="w-full h-[500px] object-cover"
              @error="handleImageError"
            >
          </div>

          <!-- Floating Stats Card -->
          <div class="absolute -bottom-6 -right-6 bg-asp-blue-900 text-asp-white p-6 rounded-xl shadow-asp-xl">
            <div class="flex items-center gap-4">
              <div class="text-center">
                <p class="text-4xl font-bold text-asp-blue-500">782+</p>
                <p class="text-sm text-asp-gray-400 mt-1">Clients satisfaits</p>
              </div>
              <div class="w-px h-12 bg-asp-blue-700"></div>
              <div class="text-center">
                <p class="text-4xl font-bold text-asp-blue-700">15+</p>
                <p class="text-sm text-asp-gray-400 mt-1">Années d'expertise</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Content Side -->
        <div class="space-y-6">
          <div>
            <span class="inline-block px-4 py-2 bg-asp-blue-100 text-asp-blue-700 rounded-full text-sm font-semibold mb-4">
              Qui sommes-nous ?
            </span>
            <h2 class="heading-2 text-asp-black mb-4">
              Expertise et Qualité au Service de Vos Projets
            </h2>
            <p class="text-body-lg text-muted leading-relaxed">
              Basée à Libreville, ASP Services Gabon est votre partenaire de confiance dans l'industrie graphique 
              et le management visuel depuis plusieurs années.
            </p>
          </div>

          <div class="space-y-4">
            <p class="text-asp-gray-600 leading-relaxed">
              Nous combinons expertise technique et créativité pour offrir des solutions sur mesure en signalétique, 
              marquage au sol, et impression grand format. Notre équipement de pointe, incluant un traceur MUTOH et 
              des imprimantes Xerox professionnelles, nous permet de garantir une qualité irréprochable.
            </p>

            <p class="text-asp-gray-600 leading-relaxed">
              De la conception à la pose, nous accompagnons entreprises, administrations et commerces dans la 
              réalisation de leurs projets visuels.
            </p>
          </div>

          <!-- Key Features -->
          <div class="grid grid-cols-2 gap-4 pt-4">
            <div class="flex items-start gap-3">
              <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-asp-blue-100 flex items-center justify-center">
                <WrenchScrewdriverIcon class="w-5 h-5 text-asp-blue-700" />
              </div>
              <div>
                <p class="font-semibold text-asp-black text-sm">Équipement Pro</p>
                <p class="text-xs text-asp-gray-600">Traceur MUTOH, Xerox</p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-asp-blue-100 flex items-center justify-center">
                <UsersIcon class="w-5 h-5 text-asp-blue-700" />
              </div>
              <div>
                <p class="font-semibold text-asp-black text-sm">Équipe Experte</p>
                <p class="text-xs text-asp-gray-600">Savoir-faire local</p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-asp-blue-100 flex items-center justify-center">
                <ClockIcon class="w-5 h-5 text-asp-blue-700" />
              </div>
              <div>
                <p class="font-semibold text-asp-black text-sm">Réactivité</p>
                <p class="text-xs text-asp-gray-600">Devis sous 24h</p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-asp-blue-100 flex items-center justify-center">
                <CheckBadgeIcon class="w-5 h-5 text-asp-blue-700" />
              </div>
              <div>
                <p class="font-semibold text-asp-black text-sm">Qualité</p>
                <p class="text-xs text-asp-gray-600">Garantie satisfait</p>
              </div>
            </div>
          </div>

          <!-- CTA -->
          <div class="pt-4">
            <Button
              variant="primary"
              to="/a-propos"
            >
              En savoir plus sur nous
              <ArrowRightIcon class="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </Container>
  </section>
</template>

<script setup lang="ts">
import {
  WrenchScrewdriverIcon,
  UsersIcon,
  ClockIcon,
  CheckBadgeIcon,
  ArrowRightIcon
} from '@heroicons/vue/24/outline'

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"%3E%3Crect fill="%23F1F5F9" width="800" height="600"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%2394A3B8"%3EAtelier ASP Services%3C/text%3E%3C/svg%3E'
}
</script>
