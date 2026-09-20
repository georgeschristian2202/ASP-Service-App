<template>
  <div>
    <!-- Page Header -->
    <section class="relative bg-gradient-to-br from-asp-blue-900 via-asp-blue-700 to-asp-blue-900 text-asp-white pt-32 pb-20 overflow-hidden">
      <!-- Decorative floating shapes -->
      <div class="absolute top-10 left-10 w-32 h-32 bg-asp-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute top-1/2 left-1/3 w-24 h-24 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>

      <Container>
        <div class="max-w-3xl mx-auto text-center relative z-10">
          <h1 class="heading-1 mb-6 header-title opacity-0">
            Contactez-Nous
          </h1>
          <p class="text-body-lg text-asp-gray-400 header-description opacity-0">
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
    <section class="relative section-padding bg-asp-white overflow-hidden">
      <!-- Decorative shapes -->
      <div class="absolute top-20 left-20 w-32 h-32 bg-asp-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>

      <Container>
        <div class="max-w-3xl mx-auto text-center mb-16 relative z-10">
          <h2 class="heading-2 text-asp-black mb-4 section-title opacity-0">
            Plusieurs Façons de Nous Joindre
          </h2>
          <p class="text-body-lg text-muted section-description opacity-0">
            Choisissez le moyen de contact qui vous convient le mieux
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 relative z-10">
          <!-- WhatsApp Card -->
          <a
            :href="`whatsapp://send?phone=${config.public.whatsappNumber}`"
            target="_blank"
            rel="noopener noreferrer"
            class="contact-card opacity-0 group cursor-pointer"
            data-index="0"
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
            class="contact-card opacity-0 group cursor-pointer"
            data-index="1"
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
            class="contact-card opacity-0 group cursor-pointer"
            data-index="2"
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
    <section class="relative section-padding bg-asp-gray-100 overflow-hidden">
      <!-- Decorative shapes -->
      <div class="absolute top-10 left-10 w-28 h-28 bg-asp-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-10 right-10 w-36 h-36 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>

      <Container>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
          <!-- Contact Form -->
          <div class="lg:col-span-2 form-container opacity-0">
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
          <div class="lg:col-span-1 info-sidebar opacity-0">
            <ContactInfo />
          </div>
        </div>
      </Container>
    </section>

    <!-- Map Section -->
    <section class="relative section-padding bg-asp-white overflow-hidden">
      <!-- Decorative shapes -->
      <div class="absolute top-10 right-10 w-32 h-32 bg-asp-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-10 left-10 w-36 h-36 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>

      <Container>
        <div class="max-w-3xl mx-auto text-center mb-12 relative z-10">
          <h2 class="heading-2 text-asp-black mb-4 map-title opacity-0">
            Visitez Notre Atelier
          </h2>
          <p class="text-body-lg text-muted map-description opacity-0">
            Nous sommes situés au cœur de Libreville, facilement accessible pour tous vos projets.
          </p>
        </div>

        <!-- Map Embed -->
        <div class="aspect-video map-container opacity-0 relative z-10">
          <GoogleMapEmbed
            :address="config.public.address"
            query="Assemblées de Dieu du Gabon - Église de Likouala, Libreville"
            :latitude="0.3901"
            :longitude="9.4544"
            :zoom="17"
            :show-overlay="true"
            :show-hours="true"
          />
        </div>

        <!-- Direction Button -->
        <div class="text-center mt-8 map-button opacity-0 relative z-10">
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
    <section class="relative section-padding bg-asp-gray-100 overflow-hidden">
      <!-- Decorative shapes -->
      <div class="absolute top-20 left-20 w-32 h-32 bg-asp-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>

      <Container>
        <div class="max-w-3xl mx-auto relative z-10">
          <div class="text-center mb-12">
            <h2 class="heading-2 text-asp-black mb-4 faq-title opacity-0">
              Questions Fréquentes
            </h2>
            <p class="text-body-lg text-muted faq-description opacity-0">
              Trouvez rapidement les réponses à vos questions
            </p>
          </div>

          <div class="space-y-4">
            <div v-for="(faq, index) in faqs" :key="index" class="faq-item opacity-0" :data-index="index">
              <FAQItem
                :question="faq.question"
                :answer="faq.answer"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>

    <!-- CTA -->
    <CallToAction />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
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
      content: 'Contactez ASP Services Gabon pour vos projets de signalétique et impression à Libreville. Devis gratuit par WhatsApp, téléphone ou email. Likouala en face de l\'Assemblées de Dieu du Gabon - Église de Likouala.'
    },
    {
      name: 'keywords',
      content: 'contact ASP Services Gabon, devis signalétique Libreville, WhatsApp ASP Gabon, téléphone impression Libreville, adresse Likouala Libreville, devis gratuit'
    },
    { property: 'og:title', content: 'Contact - ASP Services Gabon' },
    { property: 'og:description', content: 'Contactez ASP Services pour un devis gratuit. Signalétique, impression et marquage au sol à Libreville, Gabon. Disponible sur WhatsApp.' },
    { property: 'og:url', content: 'https://aspservices.ga/contact' },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: 'https://aspservices.ga/images/hero/hero-background.jpg' },
    { property: 'og:image:alt', content: 'Contactez ASP Services Gabon - Libreville' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Contact - ASP Services Gabon' },
    { name: 'twitter:description', content: 'Devis gratuit par WhatsApp pour vos projets de signalétique et impression à Libreville, Gabon.' },
    { name: 'twitter:image', content: 'https://aspservices.ga/images/hero/hero-background.jpg' }
  ],
  link: [
    { rel: 'canonical', href: 'https://aspservices.ga/contact' }
  ],
  script: [
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js',
      defer: true
    }
  ]
})

onMounted(() => {
  // Attendre que anime.js soit chargé
  const checkAnime = setInterval(() => {
    if (typeof window !== 'undefined' && (window as any).anime) {
      clearInterval(checkAnime)
      setupAnimations()
    }
  }, 100)
})

const setupAnimations = () => {
  const anime = (window as any).anime

  // 1. Header animations
  anime({
    targets: '.header-title',
    opacity: [0, 1],
    translateY: [30, 0],
    duration: 1000,
    easing: 'easeOutExpo'
  })

  anime({
    targets: '.header-description',
    opacity: [0, 1],
    translateY: [30, 0],
    duration: 1000,
    delay: 200,
    easing: 'easeOutExpo'
  })

  // 2. Contact methods section - scroll trigger
  setupContactMethodsAnimation()

  // 3. Form and sidebar - scroll trigger
  setupFormAnimation()

  // 4. Map section - scroll trigger
  setupMapAnimation()

  // 5. FAQ section - scroll trigger
  setupFAQAnimation()
}

// Animation de la section moyens de contact au scroll
const setupContactMethodsAnimation = () => {
  const anime = (window as any).anime
  const section = document.querySelector('.section-title')?.closest('section')

  if (!section) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Titre
          anime({
            targets: '.section-title',
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 800,
            easing: 'easeOutExpo'
          })

          // Description
          anime({
            targets: '.section-description',
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 800,
            delay: 150,
            easing: 'easeOutExpo'
          })

          // Cartes contact avec stagger
          anime({
            targets: '.contact-card',
            opacity: [0, 1],
            translateY: [40, 0],
            scale: [0.95, 1],
            duration: 800,
            delay: anime.stagger(120, { start: 300 }),
            easing: 'easeOutExpo'
          })

          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.2 }
  )

  observer.observe(section)
}

// Animation du formulaire et sidebar au scroll
const setupFormAnimation = () => {
  const anime = (window as any).anime
  const formSection = document.querySelector('.form-container')?.closest('section')

  if (!formSection) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Formulaire (vient de gauche)
          anime({
            targets: '.form-container',
            opacity: [0, 1],
            translateX: [-50, 0],
            duration: 1000,
            easing: 'easeOutExpo'
          })

          // Sidebar (vient de droite)
          anime({
            targets: '.info-sidebar',
            opacity: [0, 1],
            translateX: [50, 0],
            duration: 1000,
            delay: 200,
            easing: 'easeOutExpo'
          })

          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.2 }
  )

  observer.observe(formSection)
}

// Animation de la section carte au scroll
const setupMapAnimation = () => {
  const anime = (window as any).anime
  const mapSection = document.querySelector('.map-title')?.closest('section')

  if (!mapSection) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Titre
          anime({
            targets: '.map-title',
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 800,
            easing: 'easeOutExpo'
          })

          // Description
          anime({
            targets: '.map-description',
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 800,
            delay: 150,
            easing: 'easeOutExpo'
          })

          // Container de carte (zoom in)
          anime({
            targets: '.map-container',
            opacity: [0, 1],
            scale: [0.95, 1],
            duration: 1000,
            delay: 300,
            easing: 'easeOutExpo'
          })

          // Bouton
          anime({
            targets: '.map-button',
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 800,
            delay: 500,
            easing: 'easeOutExpo'
          })

          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.2 }
  )

  observer.observe(mapSection)
}

// Animation de la section FAQ au scroll
const setupFAQAnimation = () => {
  const anime = (window as any).anime
  const faqSection = document.querySelector('.faq-title')?.closest('section')

  if (!faqSection) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Titre
          anime({
            targets: '.faq-title',
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 800,
            easing: 'easeOutExpo'
          })

          // Description
          anime({
            targets: '.faq-description',
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 800,
            delay: 150,
            easing: 'easeOutExpo'
          })

          // FAQ items avec stagger
          anime({
            targets: '.faq-item',
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 800,
            delay: anime.stagger(100, { start: 300 }),
            easing: 'easeOutExpo'
          })

          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.2 }
  )

  observer.observe(faqSection)
}

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
