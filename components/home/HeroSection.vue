<template>
  <section class="relative h-screen min-h-[600px] flex items-center">
    <!-- Background Image with Overlay -->
    <div class="absolute inset-0 z-0">
      <img
        src="/images/hero-background.jpg"
        alt="ASP Services - Signalétique et Impression"
        class="w-full h-full object-cover"
        @error="handleImageError"
      >
      <!-- Dark overlay for text legibility -->
      <div class="overlay-gradient"></div>
    </div>

    <!-- Content -->
    <Container class="relative z-10">
      <div class="max-w-4xl">
        <!-- Animated content -->
        <div class="space-y-6 animate-fade-in">
          <!-- Tagline -->
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-asp-blue-500/90 backdrop-blur-sm text-asp-white rounded-full text-sm font-medium animate-slide-down">
            <SparklesIcon class="w-4 h-4" />
            <span>Leader de l'industrie graphique au Gabon</span>
          </div>

          <!-- Main Headline -->
          <h1 class="heading-display text-asp-white animate-slide-up">
            Votre Partenaire en
            <span class="text-asp-blue-500">Signalétique</span>
            et <span class="text-asp-blue-700">Impression</span>
          </h1>

          <!-- Subheadline -->
          <p class="text-xl md:text-2xl text-asp-white/90 leading-relaxed max-w-2xl animate-slide-up animation-delay-200">
            De la conception à la réalisation, ASP Services vous accompagne dans tous vos projets de signalétique, marquage au sol et impression grand format à Libreville.
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 pt-4 animate-slide-up animation-delay-400">
            <Button
              variant="secondary"
              size="lg"
              :href="`https://wa.me/${config.public.whatsappNumber.replace(/\s/g, '')}?text=Bonjour, je souhaite obtenir un devis`"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ChatBubbleLeftRightIcon class="w-5 h-5" />
              Devis Gratuit WhatsApp
            </Button>

            <Button
              variant="ghost"
              size="lg"
              to="/services"
              class="!text-asp-white !border-asp-white hover:!bg-asp-white hover:!text-asp-blue-900"
            >
              Découvrir nos services
              <ArrowRightIcon class="w-5 h-5" />
            </Button>
          </div>

          <!-- Trust Indicators -->
          <div class="flex flex-wrap items-center gap-8 pt-8 text-asp-white/80 animate-fade-in animation-delay-600">
            <div class="flex items-center gap-2">
              <CheckBadgeIcon class="w-6 h-6 text-asp-blue-500" />
              <span class="text-sm">Qualité garantie</span>
            </div>
            <div class="flex items-center gap-2">
              <ClockIcon class="w-6 h-6 text-asp-blue-500" />
              <span class="text-sm">Délais respectés</span>
            </div>
            <div class="flex items-center gap-2">
              <StarIcon class="w-6 h-6 text-asp-blue-500" />
              <span class="text-sm">Plusieurs années d'expérience</span>
            </div>
          </div>
        </div>
      </div>
    </Container>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
      <ChevronDownIcon class="w-8 h-8 text-asp-white/60" />
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  ChatBubbleLeftRightIcon,
  ArrowRightIcon,
  CheckBadgeIcon,
  ClockIcon,
  StarIcon,
  SparklesIcon,
  ChevronDownIcon
} from '@heroicons/vue/24/outline'

const config = useRuntimeConfig()

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  // Fallback to solid color if image fails to load
  img.style.display = 'none'
  const parent = img.parentElement
  if (parent) {
    parent.style.background = 'linear-gradient(135deg, #1E3A8A 0%, #1D4ED8 100%)'
  }
}
</script>
