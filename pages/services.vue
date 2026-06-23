<template>
  <div>
    <!-- Page Header -->
    <section class="relative bg-gradient-to-br from-asp-blue-900 via-asp-blue-700 to-asp-blue-900 text-asp-white py-20">
      <Container>
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="heading-1 mb-6">
            Nos Services
          </h1>
          <p class="text-body-lg text-asp-gray-400">
            Solutions complètes en signalétique, marquage au sol, impression grand format et consommables. 
            De la conception à la réalisation, nous vous accompagnons à chaque étape de votre projet.
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

    <!-- Services Grid -->
    <section class="section-padding bg-asp-white">
      <Container>
        <div class="space-y-24">
          <!-- Affichage dynamique de TOUS les services -->
          <ServiceDetail
            v-for="(service, index) in services"
            :key="service.id"
            :service="service"
            :reversed="index % 2 === 1"
            @request-quote="handleRequestQuote"
          />
        </div>
      </Container>
    </section>

    <!-- Why Choose Us Section -->
    <section class="section-padding bg-asp-gray-100">
      <Container>
        <div class="max-w-3xl mx-auto text-center mb-16">
          <h2 class="heading-2 text-asp-black mb-4">
            Pourquoi Choisir ASP Services ?
          </h2>
          <p class="text-body-lg text-muted">
            Notre engagement envers la qualité et votre satisfaction
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card v-for="benefit in benefits" :key="benefit.title" class="text-center">
            <div class="flex flex-col items-center space-y-4">
              <div class="w-16 h-16 rounded-full bg-asp-blue-100 flex items-center justify-center">
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
import { ref } from 'vue'
import { BadgeCheck, Clock, Wrench, DollarSign } from 'lucide-vue-next'

const { services } = useServices()

// Modal de devis
const showQuoteModal = ref(false)
const selectedService = ref('')

const handleRequestQuote = (serviceId: string) => {
  selectedService.value = serviceId
  showQuoteModal.value = true
}

useHead({
  title: 'Nos Services - ASP Services Gabon',
  meta: [
    {
      name: 'description',
      content: 'Découvrez nos services : signalétique professionnelle, marquage au sol, impression grand format, consommables Xerox et impression textile à Libreville, Likouala.'
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
