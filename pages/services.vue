<template>
  <div>
    <!-- Page Header -->
    <section class="relative bg-gradient-to-br from-asp-blue-900 via-asp-blue-700 to-asp-blue-900 text-asp-white pt-32 pb-20 overflow-hidden">
      <!-- Decorative Elements -->
      <div class="absolute top-10 right-10 w-80 h-80 bg-yellow-400/30 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 left-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
      
      <Container class="relative z-10">
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="services-page-title heading-1 mb-6 opacity-0">
            Nos Services
          </h1>
          <p class="services-page-description text-body-lg text-asp-gray-400 opacity-0">
            Solutions complètes en signalétique, marquage au sol, impression grand format et consommables. 
            De la conception à la réalisation, nous vous accompagnons à chaque étape de votre projet.
          </p>
        </div>
      </Container>

      <!-- Decorative wave -->
      <div class="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full">
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" fill="white"/>
        </svg>
      </div>
    </section>

    <!-- Services Grid -->
    <section class="section-padding bg-asp-white relative overflow-hidden">
      <!-- Decorative Elements -->
      <div class="absolute top-40 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-40 right-10 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 1.5s;"></div>
      
      <Container class="relative z-10">
        <div class="space-y-24">
          <!-- Affichage dynamique de TOUS les services -->
          <ServiceDetail
            v-for="(service, index) in services"
            :key="service.id"
            :service="service"
            :reversed="index % 2 === 1"
            :class="`service-detail-${index}`"
            @request-quote="handleRequestQuote"
          />
        </div>
      </Container>
    </section>

    <!-- Why Choose Us Section -->
    <section class="section-padding bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      <!-- Decorative Elements -->
      <div class="absolute top-20 right-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 left-20 w-80 h-80 bg-yellow-400/20 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
      
      <Container class="relative z-10">
        <div class="max-w-3xl mx-auto text-center mb-16">
          <h2 class="benefits-title heading-2 text-asp-black mb-4 opacity-0">
            Pourquoi Choisir ASP Services ?
          </h2>
          <p class="benefits-description text-body-lg text-muted opacity-0">
            Notre engagement envers la qualité et votre satisfaction
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card v-for="(benefit, index) in benefits" :key="benefit.title" class="benefit-card text-center opacity-0 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div class="flex flex-col items-center space-y-4">
              <div class="w-16 h-16 rounded-full bg-asp-blue-100 flex items-center justify-center transition-transform duration-300 hover:scale-110 hover:rotate-6">
                <component :is="benefit.icon" class="w-8 h-8 text-asp-blue-700" />
              </div>
              <h3 class="text-xl font-semibold text-asp-black">
                {{ benefit.title }}
              </h3>
              <p class="text-sm text-muted">
                {{ benefit.description }}
              </p>
            </div>
          </Card>
        </div>
      </Container>
    </section>

    <!-- CTA Section -->
    <CallToAction />

    <!-- Quote Modal -->
    <QuoteModal v-model="showQuoteModal" :preselected-service="selectedService" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { BadgeCheck, Clock, Wrench, DollarSign } from 'lucide-vue-next'

const { services } = useServices()

// Modal de devis
const showQuoteModal = ref(false)
const selectedService = ref('')

const handleRequestQuote = (serviceId: string) => {
  selectedService.value = serviceId
  showQuoteModal.value = true
}

// Animations au chargement de la page
onMounted(() => {
  // Attendre que anime.js soit disponible
  setTimeout(() => {
    if (window.anime) {
      setupPageAnimations()
    } else {
      console.warn('⚠️ anime.js non disponible sur la page Services')
      showContentWithoutAnimations()
    }
  }, 200)
})

const setupPageAnimations = () => {
  // Header animations
  anime({
    targets: '.services-page-title',
    opacity: [0, 1],
    translateY: [-40, 0],
    duration: 1000,
    easing: 'easeOutExpo',
    delay: 300
  })
  
  anime({
    targets: '.services-page-description',
    opacity: [0, 1],
    translateY: [-30, 0],
    duration: 1000,
    easing: 'easeOutExpo',
    delay: 500
  })
  
  // Setup observers pour les autres sections
  setupBenefitsAnimations()
  setupServicesAnimations()
}

const setupBenefitsAnimations = () => {
  const benefitsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        anime({
          targets: '.benefits-title',
          opacity: [0, 1],
          translateY: [-40, 0],
          duration: 1000,
          easing: 'easeOutExpo'
        })
        
        anime({
          targets: '.benefits-description',
          opacity: [0, 1],
          translateY: [-30, 0],
          duration: 1000,
          easing: 'easeOutExpo',
          delay: 200
        })
        
        anime({
          targets: '.benefit-card',
          opacity: [0, 1],
          translateY: [60, 0],
          scale: [0.9, 1],
          duration: 800,
          easing: 'easeOutExpo',
          delay: anime.stagger(100, { start: 400 })
        })
        
        benefitsObserver.disconnect()
      }
    })
  }, { threshold: 0.2 })
  
  const benefitsTitle = document.querySelector('.benefits-title')
  if (benefitsTitle) {
    benefitsObserver.observe(benefitsTitle)
  }
}

const setupServicesAnimations = () => {
  // Animer chaque service detail quand il entre dans le viewport
  const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Extraire l'index depuis la classe (service-detail-0, service-detail-1, etc.)
        const indexMatch = entry.target.className.match(/service-detail-(\d+)/)
        const index = indexMatch ? parseInt(indexMatch[1]) : 0
        
        // Alternance : pair = gauche→droite, impair = droite→gauche
        const fromLeft = index % 2 === 0
        
        anime({
          targets: entry.target,
          opacity: [0, 1],
          translateX: fromLeft ? [-100, 0] : [100, 0],
          duration: 1000,
          easing: 'easeOutExpo'
        })
        
        serviceObserver.unobserve(entry.target)
      }
    })
  }, { threshold: 0.1 })
  
  // Observer tous les service details
  setTimeout(() => {
    document.querySelectorAll('[class*="service-detail-"]').forEach(el => {
      (el as HTMLElement).style.opacity = '0'
      serviceObserver.observe(el)
    })
  }, 100)
}

const showContentWithoutAnimations = () => {
  document.querySelectorAll('.services-page-title, .services-page-description, .benefits-title, .benefits-description, .benefit-card').forEach(el => {
    (el as HTMLElement).style.opacity = '1'
  })
}

useHead({
  title: 'Nos Services - ASP Services Gabon',
  meta: [
    {
      name: 'description',
      content: 'Découvrez nos services : signalétique professionnelle, marquage au sol, impression grand format, consommables Xerox et impression textile à Libreville, Likouala.'
    },
    {
      name: 'keywords',
      content: 'services signalétique Libreville, marquage au sol Gabon, impression grand format Libreville, panneaux publicitaires Gabon, Xerox Libreville, impression textile Gabon, fabrication panneaux'
    },
    { property: 'og:title', content: 'Nos Services - ASP Services Gabon' },
    { property: 'og:description', content: 'Signalétique professionnelle, marquage au sol, impression grand format, consommables Xerox et impression textile à Libreville, Gabon.' },
    { property: 'og:url', content: 'https://aspservices.ga/services' },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: 'https://aspservices.ga/images/services/affiche-fabrication-des-panneaux-signaletiques-ferroviaires et routiers.jpg' },
    { property: 'og:image:alt', content: 'Services de signalétique et impression - ASP Services Gabon' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Nos Services - ASP Services Gabon' },
    { name: 'twitter:description', content: 'Signalétique, marquage au sol, impression grand format et Xerox à Libreville, Gabon.' },
    { name: 'twitter:image', content: 'https://aspservices.ga/images/hero/hero-background.jpg' }
  ],
  link: [
    { rel: 'canonical', href: 'https://aspservices.ga/services' }
  ],
  script: [
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js',
      defer: true
    }
  ]
})

const benefits = [
  {
    icon: BadgeCheck,
    title: 'Qualité Garantie',
    description: 'Matériaux de qualité et finitions professionnelles pour tous vos projets'
  },
  {
    icon: Clock,
    title: 'Délais Respectés',
    description: 'Engagement sur les délais de livraison et réactivité optimale'
  },
  {
    icon: Wrench,
    title: 'Équipement Pro',
    description: 'Traceur MUTOH, imprimantes Xerox et outils de dernière génération'
  },
  {
    icon: DollarSign,
    title: 'Prix Compétitifs',
    description: 'Tarifs adaptés à tous les budgets avec devis gratuit sous 24h'
  }
]
</script>
