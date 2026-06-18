<template>
  <div>
    <!-- Page Header -->
    <section class="relative bg-gradient-to-br from-asp-blue-900 via-asp-blue-700 to-asp-blue-900 text-asp-white py-20">
      <Container>
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="heading-1 mb-6">
            À Propos d'ASP Services
          </h1>
          <p class="text-body-lg text-asp-gray-400">
            Votre partenaire de confiance en signalétique, impression et marquage au sol depuis plusieurs années à Libreville.
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

    <!-- Company Story -->
    <section class="section-padding bg-asp-white">
      <Container>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="space-y-6">
            <div>
              <span class="inline-block px-4 py-2 bg-asp-blue-100 text-asp-blue-700 rounded-full text-sm font-semibold mb-4">
                Notre Histoire
              </span>
              <h2 class="heading-2 text-asp-black mb-4">
                Expertise Locale, Qualité Internationale
              </h2>
            </div>

            <p class="text-body-lg text-muted leading-relaxed">
              ASP Services Gabon s'est imposée comme un acteur majeur de l'industrie graphique au Gabon. 
              Spécialisés dans la signalétique professionnelle, le marquage au sol et l'impression grand format, 
              nous accompagnons entreprises, administrations et commerces dans la réalisation de leurs projets visuels.
            </p>

            <p class="text-asp-gray-600 leading-relaxed">
              Notre engagement envers la qualité et la satisfaction client nous a permis de bâtir une réputation 
              solide à Libreville et dans tout le Gabon. Nous combinons savoir-faire artisanal et technologies 
              de pointe pour offrir des solutions adaptées à chaque besoin.
            </p>

            <div class="flex flex-wrap gap-6 pt-4">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-full bg-asp-blue-100 flex items-center justify-center">
                  <BuildingOfficeIcon class="w-6 h-6 text-asp-blue-700" />
                </div>
                <div>
                  <p class="font-semibold text-asp-black">Basés à Libreville</p>
                  <p class="text-sm text-asp-gray-600">Rue Agondjo Okawé</p>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-full bg-asp-blue-100 flex items-center justify-center">
                  <UsersIcon class="w-6 h-6 text-asp-blue-700" />
                </div>
                <div>
                  <p class="font-semibold text-asp-black">782+ Clients</p>
                  <p class="text-sm text-asp-gray-600">Satisfaits</p>
                </div>
              </div>
            </div>
          </div>

          <div class="relative">
            <img
              src="/images/about/company.jpg"
              alt="ASP Services Gabon - Entreprise"
              class="w-full h-[500px] object-cover rounded-2xl shadow-asp-2xl"
              @error="handleImageError"
            >
          </div>
        </div>
      </Container>
    </section>

    <!-- Mission & Values -->
    <section class="section-padding bg-asp-gray-100">
      <Container>
        <div class="max-w-3xl mx-auto text-center mb-16">
          <h2 class="heading-2 text-asp-black mb-4">
            Notre Mission & Nos Valeurs
          </h2>
          <p class="text-body-lg text-muted">
            Ce qui guide notre action au quotidien
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card v-for="value in values" :key="value.title">
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-xl bg-asp-blue-700 flex items-center justify-center">
                <component :is="value.icon" class="w-7 h-7 text-asp-white" />
              </div>
              <h3 class="text-xl font-semibold text-asp-black">
                {{ value.title }}
              </h3>
              <p class="text-asp-gray-600 leading-relaxed">
                {{ value.description }}
              </p>
            </div>
          </Card>
        </div>
      </Container>
    </section>

    <!-- Equipment & Expertise -->
    <section class="section-padding bg-asp-white">
      <Container>
        <div class="max-w-3xl mx-auto text-center mb-16">
          <h2 class="heading-2 text-asp-black mb-4">
            Notre Équipement Professionnel
          </h2>
          <p class="text-body-lg text-muted">
            Des technologies de pointe pour une qualité irréprochable
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card 
            v-for="equipment in equipmentList" 
            :key="equipment.name"
            variant="service"
            :hoverable="true"
          >
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-16 h-16 rounded-xl bg-asp-blue-100 flex items-center justify-center">
                <component :is="equipment.icon" class="w-8 h-8 text-asp-blue-700" />
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-semibold text-asp-black mb-2">
                  {{ equipment.name }}
                </h3>
                <p class="text-asp-gray-600 text-sm mb-3">
                  {{ equipment.description }}
                </p>
                <ul class="space-y-2">
                  <li 
                    v-for="(feature, index) in equipment.features"
                    :key="index"
                    class="flex items-center gap-2 text-sm text-asp-gray-600"
                  >
                    <CheckIcon class="w-4 h-4 text-asp-blue-700 flex-shrink-0" />
                    <span>{{ feature }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </Container>
    </section>

    <!-- Service Areas -->
    <section class="section-padding bg-asp-blue-900 text-asp-white">
      <Container>
        <div class="max-w-3xl mx-auto text-center mb-16">
          <h2 class="heading-2 mb-4">
            Nos Domaines d'Activité
          </h2>
          <p class="text-body-lg text-asp-gray-400">
            Une gamme complète de services pour répondre à tous vos besoins
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <div 
            v-for="area in serviceAreas"
            :key="area.title"
            class="bg-asp-blue-700/50 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-asp-blue-700 transition-colors duration-200 cursor-pointer"
          >
            <component :is="area.icon" class="w-12 h-12 mx-auto mb-4 text-asp-blue-500" />
            <h3 class="font-semibold mb-2">{{ area.title }}</h3>
            <p class="text-sm text-asp-gray-400">{{ area.subtitle }}</p>
          </div>
        </div>
      </Container>
    </section>

    <!-- Location -->
    <section class="section-padding bg-asp-white">
      <Container>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="space-y-6">
            <div>
              <span class="inline-block px-4 py-2 bg-asp-blue-100 text-asp-blue-700 rounded-full text-sm font-semibold mb-4">
                Où nous trouver
              </span>
              <h2 class="heading-2 text-asp-black mb-4">
                Venez Nous Rencontrer
              </h2>
            </div>

            <p class="text-body-lg text-muted">
              Notre atelier est situé au cœur de Libreville, facilement accessible pour tous vos projets 
              de signalétique et d'impression.
            </p>

            <div class="space-y-4">
              <div class="flex items-start gap-4 p-4 bg-asp-gray-100 rounded-lg">
                <MapPinIcon class="w-6 h-6 text-asp-blue-700 flex-shrink-0" />
                <div>
                  <p class="font-semibold text-asp-black mb-1">Adresse</p>
                  <p class="text-asp-gray-600">{{ config.public.address }}</p>
                </div>
              </div>

              <div class="flex items-start gap-4 p-4 bg-asp-gray-100 rounded-lg">
                <ClockIcon class="w-6 h-6 text-asp-blue-700 flex-shrink-0" />
                <div>
                  <p class="font-semibold text-asp-black mb-2">Horaires</p>
                  <div class="space-y-1 text-sm text-asp-gray-600">
                    <p>Lundi - Vendredi : 8h - 17h</p>
                    <p>Samedi : 9h - 13h</p>
                    <p>Dimanche : Fermé</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="pt-4">
              <Button
                variant="primary"
                size="lg"
                :href="config.public.googleMapsUrl"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapIcon class="w-5 h-5" />
                Voir sur Google Maps
              </Button>
            </div>
          </div>

          <div class="relative h-[500px] rounded-2xl overflow-hidden shadow-asp-2xl">
            <a
              :href="config.public.googleMapsUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="block w-full h-full bg-asp-gray-200 group cursor-pointer"
            >
              <div class="absolute inset-0 flex items-center justify-center bg-asp-blue-900/20 group-hover:bg-asp-blue-900/30 transition-colors duration-200">
                <div class="text-center">
                  <MapIcon class="w-16 h-16 text-asp-blue-700 mx-auto mb-4" />
                  <p class="text-asp-blue-700 font-semibold text-lg">Cliquez pour voir la carte</p>
                </div>
              </div>
            </a>
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
  BuildingOfficeIcon,
  UsersIcon,
  CheckIcon,
  MapPinIcon,
  ClockIcon,
  MapIcon,
  SparklesIcon,
  HandThumbUpIcon,
  ShieldCheckIcon,
  WrenchScrewdriverIcon,
  PrinterIcon,
  PaintBrushIcon,
  CubeIcon,
  ShoppingBagIcon
} from '@heroicons/vue/24/outline'

const config = useRuntimeConfig()

useHead({
  title: 'À Propos - ASP Services Gabon',
  meta: [
    {
      name: 'description',
      content: 'Découvrez ASP Services Gabon, spécialiste en signalétique, impression et marquage au sol à Libreville. Équipement professionnel et expertise locale depuis plusieurs années.'
    }
  ]
})

const values = [
  {
    icon: SparklesIcon,
    title: 'Qualité',
    description: 'Nous utilisons des matériaux de première qualité et des techniques éprouvées pour garantir la durabilité et l\'esthétique de chaque réalisation.'
  },
  {
    icon: HandThumbUpIcon,
    title: 'Satisfaction Client',
    description: 'Votre satisfaction est notre priorité. Nous vous accompagnons de la conception à la livraison pour un résultat qui dépasse vos attentes.'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Fiabilité',
    description: 'Respect des délais, engagement sur les prix annoncés et garantie sur nos prestations. Une relation de confiance durable avec nos clients.'
  }
]

const equipmentList = [
  {
    name: 'Traceur MUTOH',
    description: 'Impression grand format haute définition',
    icon: PrinterIcon,
    features: [
      'Impression jusqu\'à 1,6m de largeur',
      'Résolution ultra HD',
      'Compatible tous supports'
    ]
  },
  {
    name: 'Imprimantes Xerox',
    description: 'Matériel professionnel pour tous vos besoins',
    icon: CubeIcon,
    features: [
      'Qualité d\'impression optimale',
      'Consommables d\'origine',
      'Support technique dédié'
    ]
  },
  {
    name: 'Atelier de Signalétique',
    description: 'Fabrication sur mesure de panneaux',
    icon: PaintBrushIcon,
    features: [
      'Découpe de précision',
      'Assemblage professionnel',
      'Finitions soignées'
    ]
  },
  {
    name: 'Équipement Marquage',
    description: 'Matériel spécialisé pour marquage au sol',
    icon: WrenchScrewdriverIcon,
    features: [
      'Peintures professionnelles',
      'Traçage de précision',
      'Séchage rapide'
    ]
  }
]

const serviceAreas = [
  { title: 'Signalétique', subtitle: 'Panneaux & Enseignes', icon: PaintBrushIcon },
  { title: 'Marquage', subtitle: 'Sol & Parking', icon: MapIcon },
  { title: 'Impression', subtitle: 'Grand Format', icon: PrinterIcon },
  { title: 'Xerox', subtitle: 'Consommables', icon: ShoppingBagIcon },
  { title: 'Textile', subtitle: 'T-shirts', icon: CubeIcon }
]

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"%3E%3Crect fill="%23F1F5F9" width="800" height="600"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%2394A3B8"%3EASP Services Gabon%3C/text%3E%3C/svg%3E'
}
</script>
