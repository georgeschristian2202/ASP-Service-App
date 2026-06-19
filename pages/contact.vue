<template>
  <div>
    <!-- Page Header -->
    <section class="relative bg-gradient-to-br from-asp-blue-900 via-asp-blue-700 to-asp-blue-900 text-asp-white py-20">
      <Container>
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="heading-1 mb-6">
            Contactez-Nous
          </h1>
          <p class="text-body-lg text-asp-gray-400">
            Une question ? Un projet ? Notre équipe est à votre écoute pour vous accompagner 
            dans tous vos besoins en signalétique, impression et marquage au sol.
          </p>
        </div>
      </Container>

      <!-- Decorative wave -->
      <div class="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full">
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" fill="white"/>
        </svg>
      </div>
    </section>

    <!-- Contact Methods -->
    <section class="section-padding bg-asp-white">
      <Container>
        <div class="max-w-3xl mx-auto text-center mb-16">
          <h2 class="heading-2 text-asp-black mb-4">
            Plusieurs Façons de Nous Joindre
          </h2>
          <p class="text-body-lg text-muted">
            Choisissez le moyen de contact qui vous convient le mieux
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <!-- WhatsApp Card -->
          <a
            :href="`https://wa.me/${config.public.whatsappNumber.replace(/\s/g, '')}`"
            target="_blank"
            rel="noopener noreferrer"
            class="group cursor-pointer"
          >
            <Card variant="service" :hoverable="true">
              <div class="text-center space-y-4">
                <div class="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-600 transition-colors duration-200">
                  <MessageCircle class="w-8 h-8 text-green-600 group-hover:text-white transition-colors duration-200" />
                </div>
                <h3 class="text-xl font-semibold text-asp-black">
                  WhatsApp
                </h3>
                <p class="text-asp-gray-600">
                  Réponse rapide et directe
                </p>
                <p class="text-green-600 font-semibold">
                  {{ config.public.phone }}
                </p>
              </div>
            </Card>
          </a>

          <!-- Phone Card -->
          <a
            :href="`tel:${config.public.phone.replace(/\s/g, '')}`"
            class="group cursor-pointer"
          >
            <Card variant="service" :hoverable="true">
              <div class="text-center space-y-4">
                <div class="w-16 h-16 mx-auto rounded-full bg-asp-blue-100 flex items-center justify-center group-hover:bg-asp-blue-700 transition-colors duration-200">
                  <Phone class="w-8 h-8 text-asp-blue-700 group-hover:text-white transition-colors duration-200" />
                </div>
                <h3 class="text-xl font-semibold text-asp-black">
                  Téléphone
                </h3>
                <p class="text-asp-gray-600">
                  Appelez-nous directement
                </p>
                <p class="text-asp-blue-700 font-semibold">
                  {{ config.public.phone }}
                </p>
              </div>
            </Card>
          </a>

          <!-- Email Card -->
          <a
            :href="`mailto:${config.public.email}`"
            class="group cursor-pointer"
          >
            <Card variant="service" :hoverable="true">
              <div class="text-center space-y-4">
                <div class="w-16 h-16 mx-auto rounded-full bg-asp-blue-100 flex items-center justify-center group-hover:bg-asp-blue-500 transition-colors duration-200">
                  <Mail class="w-8 h-8 text-asp-blue-500 group-hover:text-white transition-colors duration-200" />
                </div>
                <h3 class="text-xl font-semibold text-asp-black">
                  Email
                </h3>
                <p class="text-asp-gray-600">
                  Écrivez-nous à
                </p>
                <p class="text-asp-blue-700 font-semibold break-all">
                  {{ config.public.email }}
                </p>
              </div>
            </Card>
          </a>
        </div>
      </Container>
    </section>

    <!-- Contact Form & Info -->
    <section class="section-padding bg-asp-gray-100">
      <Container>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <!-- Contact Form -->
          <div class="lg:col-span-2">
            <Card padding="lg">
              <div class="mb-8">
                <h2 class="heading-3 text-asp-black mb-2">
                  Envoyez-nous un Message
                </h2>
                <p class="text-asp-gray-600">
                  Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
                </p>
              </div>

              <ContactForm />
            </Card>
          </div>

          <!-- Contact Info Sidebar -->
          <div class="lg:col-span-1">
            <ContactInfo />
          </div>
        </div>
      </Container>
    </section>

    <!-- Map Section -->
    <section class="section-padding bg-asp-white">
      <Container>
        <div class="max-w-3xl mx-auto text-center mb-12">
          <h2 class="heading-2 text-asp-black mb-4">
            Visitez Notre Atelier
          </h2>
          <p class="text-body-lg text-muted">
            Nous sommes situés au cœur de Libreville, facilement accessible pour tous vos projets.
          </p>
        </div>

        <!-- Map Embed -->
        <div class="relative rounded-2xl overflow-hidden shadow-asp-2xl">
          <div class="aspect-video bg-asp-gray-200 relative">
            <!-- Google Maps Placeholder -->
            <a
              :href="config.public.googleMapsUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="block w-full h-full group cursor-pointer"
            >
              <div class="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-asp-blue-100 to-asp-blue-50 group-hover:from-asp-blue-200 group-hover:to-asp-blue-100 transition-all duration-200">
                <MapIcon class="w-20 h-20 text-asp-blue-700 mb-4 group-hover:scale-110 transition-transform duration-200" />
                <p class="text-xl font-semibold text-asp-blue-900 mb-2">
                  Voir sur Google Maps
                </p>
                <p class="text-asp-gray-600 max-w-md text-center px-4">
                  {{ config.public.address }}
                </p>
              </div>
            </a>

            <!-- Address Overlay Card -->
            <div class="absolute bottom-6 left-6 right-6 md:right-auto md:max-w-md">
              <Card class="backdrop-blur-sm bg-asp-white/95">
                <div class="space-y-3">
                  <div class="flex items-start gap-3">
                    <MapPin class="w-5 h-5 text-asp-blue-700 flex-shrink-0 mt-0.5" />
                    <div>
                      <p class="font-semibold text-asp-black text-sm mb-1">Adresse</p>
                      <p class="text-asp-gray-600 text-sm">{{ config.public.address }}</p>
                    </div>
                  </div>

                  <div class="border-t border-asp-gray-200 pt-3">
                    <div class="flex items-center gap-2 text-sm text-asp-gray-600">
                      <Clock class="w-4 h-4 text-asp-blue-700" />
                      <span>Lun-Ven: 8h-17h • Sam: 9h-13h</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        <!-- Direction Button -->
        <div class="text-center mt-8">
          <Button
            variant="primary"
            size="lg"
            :href="config.public.googleMapsUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MapIcon class="w-5 h-5" />
            Obtenir l'itinéraire
          </Button>
        </div>
      </Container>
    </section>

    <!-- FAQ Section -->
    <section class="section-padding bg-asp-gray-100">
      <Container>
        <div class="max-w-3xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="heading-2 text-asp-black mb-4">
              Questions Fréquentes
            </h2>
            <p class="text-body-lg text-muted">
              Trouvez rapidement les réponses à vos questions
            </p>
          </div>

          <div class="space-y-4">
            <FAQItem
              v-for="(faq, index) in faqs"
              :key="index"
              :question="faq.question"
              :answer="faq.answer"
            />
          </div>
        </div>
      </Container>
    </section>

    <!-- CTA -->
    <CallToAction />
  </div>
</template>

<script setup lang="ts">
import {
  MessageCircle,
  Phone,
  Mail,
  MapIcon,
  MapPin,
  Clock
} from 'lucide-vue-next'

const config = useRuntimeConfig()

useHead({
  title: 'Contact - ASP Services Gabon',
  meta: [
    {
      name: 'description',
      content: 'Contactez ASP Services Gabon pour vos projets de signalétique et impression à Libreville. Devis gratuit par WhatsApp, téléphone ou email. Likouala en face de l\'église Hebron.'
    }
  ]
})

const faqs = [
  {
    question: 'Quels sont vos délais de réalisation ?',
    answer: 'Les délais varient selon la complexité du projet. Pour une signalétique simple, comptez 3-5 jours ouvrés. Pour des projets plus complexes (marquage au sol, impression grand format), comptez 1-2 semaines. Nous vous communiquons un délai précis lors du devis.'
  },
  {
    question: 'Proposez-vous des devis gratuits ?',
    answer: 'Oui, tous nos devis sont gratuits et sans engagement. Contactez-nous par WhatsApp, téléphone ou via le formulaire avec les détails de votre projet, et nous vous répondrons sous 24h avec un devis détaillé.'
  },
  {
    question: 'Livrez-vous en dehors de Libreville ?',
    answer: 'Oui, nous intervenons dans tout le Gabon. Les frais de déplacement sont calculés en fonction de la distance et inclus dans le devis. Pour les projets importants, nous nous déplaçons gratuitement pour une visite technique.'
  },
  {
    question: 'Quels moyens de paiement acceptez-vous ?',
    answer: 'Nous acceptons les paiements en espèces, par chèque, et par virement bancaire. Pour les entreprises, nous proposons des facilités de paiement selon le montant du projet.'
  },
  {
    question: 'Offrez-vous une garantie sur vos réalisations ?',
    answer: 'Oui, toutes nos réalisations sont garanties. La durée de garantie varie selon le type de prestation : 1 an pour la signalétique, 6 mois pour le marquage au sol, et conformité aux spécifications pour l\'impression.'
  }
]
</script>
