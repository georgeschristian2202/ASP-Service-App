<template>
  <section class="section-padding bg-gradient-to-br from-asp-blue-700 via-asp-blue-900 to-asp-blue-900">
    <Container>
      <div class="max-w-4xl mx-auto text-center">
        <!-- Content -->
        <div class="space-y-6">
          <h2 class="heading-2 text-asp-white">
            Prêt à Donner Vie à Votre Projet ?
          </h2>
          <p class="text-body-lg text-asp-gray-400 max-w-2xl mx-auto">
            Contactez-nous dès aujourd'hui pour un devis gratuit. Notre équipe se tient prête à vous accompagner 
            dans tous vos projets de signalétique, marquage et impression.
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button
              variant="secondary"
              size="lg"
              :href="`https://wa.me/${config.public.whatsappNumber.replace(/\s/g, '')}?text=Bonjour ASP Services, je souhaite obtenir un devis gratuit`"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ChatBubbleLeftRightIcon class="w-6 h-6" />
              Devis Gratuit via WhatsApp
            </Button>

            <Button
              variant="ghost"
              size="lg"
              to="/contact"
              class="!text-asp-white !border-asp-white hover:!bg-asp-white hover:!text-asp-blue-900"
            >
              <EnvelopeIcon class="w-6 h-6" />
              Formulaire de Contact
            </Button>
          </div>

          <!-- Contact Info -->
          <div class="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 text-asp-gray-400">
            <a
              :href="`tel:${config.public.phone.replace(/\s/g, '')}`"
              class="flex items-center gap-2 hover:text-asp-white transition-colors duration-200 cursor-pointer"
            >
              <PhoneIcon class="w-5 h-5" />
              <span>{{ config.public.phone }}</span>
            </a>

            <span class="hidden sm:block text-asp-gray-600">|</span>

            <a
              :href="`mailto:${config.public.email}`"
              class="flex items-center gap-2 hover:text-asp-white transition-colors duration-200 cursor-pointer"
            >
              <EnvelopeIcon class="w-5 h-5" />
              <span>{{ config.public.email }}</span>
            </a>

            <span class="hidden sm:block text-asp-gray-600">|</span>

            <div class="flex items-center gap-2">
              <MapPinIcon class="w-5 h-5" />
              <span>Libreville, Gabon</span>
            </div>
          </div>
        </div>

        <!-- Decorative Elements -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
          <div class="absolute -top-24 -right-24 w-96 h-96 bg-asp-blue-500 rounded-full blur-3xl"></div>
          <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-asp-blue-700 rounded-full blur-3xl"></div>
        </div>
      </div>
    </Container>
  </section>
</template>

<script setup lang="ts">
import {
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon
} from '@heroicons/vue/24/outline'

const config = useRuntimeConfig()
</script>
