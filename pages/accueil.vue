<template>
  <div class="bg-white">
    <!-- Hero Section avec carousel -->
    <section 
      class="relative min-h-[85vh] bg-gradient-to-br from-asp-blue-900 via-asp-blue-800 to-asp-blue-700 pt-20 flex items-center overflow-hidden"
      aria-label="Section principale - Services de signalétique"
    >
      <!-- Decorative Background Pattern - Plus Visible -->
      <div class="absolute inset-0">
        <!-- Cercles de couleur avec blur -->
        <div class="floating-circle floating-shape absolute top-10 left-10 w-96 h-96 bg-yellow-400/30 rounded-full blur-[120px] opacity-0"></div>
        <div class="floating-circle floating-shape absolute bottom-10 right-10 w-[500px] h-[500px] bg-blue-300/30 rounded-full blur-[140px] opacity-0"></div>
        <div class="floating-circle floating-shape absolute top-1/3 right-1/4 w-64 h-64 bg-purple-400/20 rounded-full blur-[100px] opacity-0"></div>
        
        <!-- Grille de points décorative -->
        <div class="absolute inset-0 opacity-10">
          <div class="grid-dots"></div>
        </div>
        
        <!-- Cercles géométriques -->
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div class="w-[800px] h-[800px] border border-white/10 rounded-full animate-spin-very-slow"></div>
          <div class="absolute inset-0 w-[600px] h-[600px] m-auto border border-white/10 rounded-full animate-spin-reverse-slow"></div>
          <div class="absolute inset-0 w-[400px] h-[400px] m-auto border border-yellow-400/20 rounded-full animate-pulse-slow"></div>
        </div>
        
        <!-- Formes géométriques flottantes -->
        <div class="absolute top-20 right-20 w-20 h-20 border-2 border-white/30 rotate-45 animate-float"></div>
        <div class="absolute bottom-40 left-40 w-16 h-16 bg-white/5 rounded-lg animate-float-delayed"></div>
      </div>

      <!-- Hero Content -->
      <div class="relative z-5 py-12 px-4 sm:px-6 lg:px-8 w-full md:py-16">
        <div class="max-w-7xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <!-- Texte Hero -->
            <div class="text-white space-y-6">
              <h1 class="hero-title text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 leading-tight opacity-0"
                  role="heading"
                  aria-level="1">
                Votre Expert en
                <span class="text-yellow-400">Signalétique</span>
                <br />
                <span class="inline-block relative h-16 w-full min-w-[300px]">
                  <ScrambleText 
                    :texts="rotatingTexts" 
                    :interval="3500"
                    class="absolute left-0"
                  />
                </span>
              </h1>
              
              <p class="hero-description text-lg sm:text-xl text-white/90 mb-8 leading-relaxed max-w-xl opacity-0">
                De la conception à la réalisation, ASP Services vous accompagne dans tous vos projets 
                de signalétique, marquage au sol et impression grand format à Libreville.
              </p>

              <!-- Points clés -->
              <div class="flex flex-wrap gap-4 mb-8" role="list" aria-label="Avantages ASP Services">
                <div class="hero-feature flex items-center gap-2 opacity-0" role="listitem">
                  <CheckCircle2 class="w-6 h-6 text-green-400" aria-hidden="true" />
                  <span class="text-sm sm:text-base">Devis gratuit 24h</span>
                </div>
                <div class="hero-feature flex items-center gap-2 opacity-0" role="listitem">
                  <CheckCircle2 class="w-6 h-6 text-green-400" aria-hidden="true" />
                  <span class="text-sm sm:text-base">Équipement MUTOH</span>
                </div>
                <div class="hero-feature flex items-center gap-2 opacity-0" role="listitem">
                  <CheckCircle2 class="w-6 h-6 text-green-400" aria-hidden="true" />
                  <span class="text-sm sm:text-base">Installation incluse</span>
                </div>
              </div>

              <div class="flex flex-col sm:flex-row gap-4">
                <button
                  @click="showQuoteModal = true"
                  class="hero-cta bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 inline-flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300 opacity-0"
                  aria-label="Obtenir un devis gratuit - Ouvre un formulaire de contact"
                  type="button"
                >
                  <FileText class="w-5 h-5" aria-hidden="true" />
                  Obtenir un Devis Gratuit
                </button>
              </div>
            </div>

            <!-- Carousel des œuvres - Design Professionnel -->
            <div class="carousel-card relative opacity-0" role="region" aria-label="Projets récents de ASP Services">
              <div class="bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                <!-- Header -->
                <div class="px-6 sm:px-8 pt-6 pb-4 border-b border-white/10">
                  <h3 class="text-white text-xl font-bold">Projets Récents</h3>
                  <p class="text-slate-300 text-sm mt-1">Découvrez nos dernières réalisations</p>
                </div>
                
                <!-- Carousel Container -->
                <div class="relative" role="group" aria-roledescription="carousel" aria-label="Galerie de projets">
                  <!-- Main Image Display -->
                  <div class="relative overflow-hidden" style="height: 320px;" aria-live="polite" aria-atomic="true">
                    <div 
                      class="flex transition-transform duration-700 ease-out h-full"
                      :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
                    >
                      <div
                        v-for="(project, index) in projects"
                        :key="index"
                        class="w-full flex-shrink-0 h-full relative group"
                      >
                        <!-- Image -->
                        <img
                          :src="project.image"
                          :alt="`${project.title} - ${project.description}`"
                          class="w-full h-full object-cover"
                          @error="handleProjectImageError"
                          loading="lazy"
                        >
                        
                        <!-- Gradient Overlay -->
                        <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent opacity-80"></div>
                        
                        <!-- Content Overlay -->
                        <div class="absolute inset-0 flex flex-col justify-end p-6">
                          <div class="transform transition-all duration-300 group-hover:translate-y-0 translate-y-2">
                            <div class="inline-block px-3 py-1 bg-blue-500/90 backdrop-blur-sm rounded-full text-xs font-semibold text-white mb-2">
                              Projet #{{ index + 1 }}
                            </div>
                            <h4 class="text-white text-xl sm:text-2xl font-bold mb-1 leading-tight">
                              {{ project.title }}
                            </h4>
                            <p class="text-slate-200 text-sm mb-2 line-clamp-2">
                              {{ project.description }}
                            </p>
                            <div class="flex items-center gap-2 text-slate-300">
                              <MapPin class="w-4 h-4 text-blue-400 flex-shrink-0" aria-hidden="true" />
                              <span class="text-sm">{{ project.location }}</span>
                            </div>
                          </div>
                        </div>
                        
                        <!-- Click overlay - Supprimé car non nécessaire -->
                      </div>
                    </div>
                  </div>

                  <!-- Navigation Arrows - Modern Design -->
                  <button
                    @click="prevSlide"
                    class="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center group shadow-lg hover:scale-110 focus:outline-none focus:ring-4 focus:ring-white/30"
                    aria-label="Voir le projet précédent"
                    type="button"
                  >
                    <ChevronLeft class="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" aria-hidden="true" />
                  </button>
                  <button
                    @click="nextSlide"
                    class="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center group shadow-lg hover:scale-110 focus:outline-none focus:ring-4 focus:ring-white/30"
                    aria-label="Voir le projet suivant"
                    type="button"
                  >
                    <ChevronRight class="w-6 h-6 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                  </button>
                </div>

                <!-- Thumbnails Navigation -->
                <div class="px-6 sm:px-8 py-4 bg-slate-900/50" role="tablist" aria-label="Sélection rapide des projets">
                  <div class="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                    <button
                      v-for="(project, index) in projects"
                      :key="`thumb-${index}`"
                      @click="currentSlide = index"
                      :class="[
                        'flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 cursor-pointer relative group',
                        currentSlide === index 
                          ? 'border-blue-500 ring-2 ring-blue-500/50 scale-105' 
                          : 'border-white/20 hover:border-white/40 opacity-60 hover:opacity-100'
                      ]"
                      :aria-label="`Aller au projet ${index + 1}: ${project.title}`"
                      :aria-selected="currentSlide === index"
                      role="tab"
                      type="button"
                    >
                      <img
                        :src="project.image"
                        :alt="`Miniature du projet ${project.title}`"
                        class="w-full h-full object-cover"
                        @error="handleProjectImageError"
                        loading="lazy"
                      >
                      <div 
                        v-if="currentSlide === index"
                        class="absolute inset-0 bg-blue-500/20 flex items-center justify-center"
                      >
                        <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                    </button>
                  </div>
                </div>

                <!-- Progress Indicators -->
                <div class="px-6 pb-6 flex items-center justify-center gap-8 text-slate-400 text-sm">
                  <span class="font-medium" aria-live="polite" aria-atomic="true">Projet {{ currentSlide + 1 }} sur {{ projects.length }}</span>
                  <div class="flex gap-1.5" role="presentation" aria-hidden="true">
                    <div
                      v-for="(_, index) in projects"
                      :key="`indicator-${index}`"
                      :class="[
                        'h-1 rounded-full transition-all duration-300',
                        currentSlide === index 
                          ? 'w-8 bg-blue-500' 
                          : 'w-1.5 bg-slate-600 hover:bg-slate-500'
                      ]"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden" aria-labelledby="services-heading">
      <!-- Decorative Elements -->
      <div class="absolute top-20 right-10 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-20 left-10 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl"></div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center mb-16">
          <h2 id="services-heading" class="services-title text-4xl sm:text-5xl font-bold text-asp-black mb-6 opacity-0">Nos Services</h2>
          <p class="services-description text-xl sm:text-2xl text-asp-gray-600 max-w-3xl mx-auto leading-relaxed opacity-0">
            Solutions complètes pour tous vos besoins en signalétique et impression
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Service 1 : Signalétique -->
          <NuxtLink
            to="/services#signaletique"
            class="service-card group block bg-white/80 backdrop-blur-sm border-2 border-asp-gray-200 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer focus:outline-none focus:ring-4 focus:ring-asp-blue-300 hover:border-asp-blue-400 overflow-hidden relative opacity-0"
            aria-label="En savoir plus sur nos services de signalétique"
          >
            <div class="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div class="relative z-10">
              <div class="text-asp-blue-600 mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Building class="w-16 h-16" />
              </div>
              <h3 class="text-2xl font-bold text-asp-black mb-4 group-hover:text-asp-blue-600 transition-colors">Signalétique</h3>
              <p class="text-asp-gray-600 mb-6 leading-relaxed">
                Panneaux d'entreprise, enseignes lumineuses et signalisation directionnelle sur mesure.
              </p>
              <ul class="text-sm text-asp-gray-600 space-y-2">
                <li class="flex items-center gap-3">
                  <Check class="w-5 h-5 text-green-600 flex-shrink-0" />
                  Enseignes lumineuses
                </li>
                <li class="flex items-center gap-3">
                  <Check class="w-5 h-5 text-green-600 flex-shrink-0" />
                  Panneaux directionnels
                </li>
                <li class="flex items-center gap-3">
                  <Check class="w-5 h-5 text-green-600 flex-shrink-0" />
                  Plaques professionnelles
                </li>
              </ul>
              <div class="mt-6 flex items-center text-asp-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
                <span>En savoir plus</span>
                <ChevronRight class="w-5 h-5 ml-2" />
              </div>
            </div>
          </NuxtLink>

          <!-- Service 2 : Marquage au Sol -->
          <NuxtLink
            to="/services#marquage-sol"
            class="service-card group block bg-white/80 backdrop-blur-sm border-2 border-asp-gray-200 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer focus:outline-none focus:ring-4 focus:ring-asp-blue-300 hover:border-asp-blue-400 overflow-hidden relative opacity-0"
            aria-label="En savoir plus sur nos services de marquage au sol"
          >
            <div class="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div class="relative z-10">
              <div class="text-asp-blue-600 mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Car class="w-16 h-16" />
              </div>
              <h3 class="text-2xl font-bold text-asp-black mb-4 group-hover:text-asp-blue-600 transition-colors">Marquage au Sol</h3>
              <p class="text-asp-gray-600 mb-6 leading-relaxed">
                Traçage professionnel pour parkings, zones industrielles et terrains de sport.
              </p>
              <ul class="text-sm text-asp-gray-600 space-y-2">
                <li class="flex items-center gap-3">
                  <Check class="w-5 h-5 text-green-600 flex-shrink-0" />
                  Parkings et stationnements
                </li>
                <li class="flex items-center gap-3">
                  <Check class="w-5 h-5 text-green-600 flex-shrink-0" />
                  Zones industrielles
                </li>
                <li class="flex items-center gap-3">
                  <Check class="w-5 h-5 text-green-600 flex-shrink-0" />
                  Terrains de sport
                </li>
              </ul>
              <div class="mt-6 flex items-center text-asp-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
                <span>En savoir plus</span>
                <ChevronRight class="w-5 h-5 ml-2" />
              </div>
            </div>
          </NuxtLink>

          <!-- Service 3 : Impression Grand Format -->
          <NuxtLink
            to="/services#impression-grand-format"
            class="service-card group block bg-white/80 backdrop-blur-sm border-2 border-asp-gray-200 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer focus:outline-none focus:ring-4 focus:ring-asp-blue-300 hover:border-asp-blue-400 overflow-hidden relative opacity-0"
            aria-label="En savoir plus sur nos services d'impression grand format"
          >
            <div class="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div class="relative z-10">
              <div class="text-asp-blue-600 mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Printer class="w-16 h-16" />
              </div>
              <h3 class="text-2xl font-bold text-asp-black mb-4 group-hover:text-asp-blue-600 transition-colors">Impression Grand Format</h3>
              <p class="text-asp-gray-600 mb-6 leading-relaxed">
                Bâches, roll-up, affiches et stickers avec notre traceur MUTOH professionnel.
              </p>
              <ul class="text-sm text-asp-gray-600 space-y-2">
                <li class="flex items-center gap-3">
                  <Check class="w-5 h-5 text-green-600 flex-shrink-0" />
                  Bâches publicitaires
                </li>
                <li class="flex items-center gap-3">
                  <Check class="w-5 h-5 text-green-600 flex-shrink-0" />
                  Roll-up et kakémonos
                </li>
                <li class="flex items-center gap-3">
                  <Check class="w-5 h-5 text-green-600 flex-shrink-0" />
                  Stickers personnalisés
                </li>
              </ul>
              <div class="mt-6 flex items-center text-asp-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
                <span>En savoir plus</span>
                <ChevronRight class="w-5 h-5 ml-2" />
              </div>
            </div>
          </NuxtLink>

          <!-- Service 4 : Consommables Xerox -->
          <NuxtLink
            to="/services#consommables-xerox"
            class="service-card group block bg-white/80 backdrop-blur-sm border-2 border-asp-gray-200 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer focus:outline-none focus:ring-4 focus:ring-asp-blue-300 hover:border-asp-blue-400 overflow-hidden relative opacity-0"
            aria-label="En savoir plus sur nos consommables Xerox"
          >
            <div class="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div class="relative z-10">
              <div class="text-asp-blue-600 mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Package class="w-16 h-16" />
              </div>
              <h3 class="text-2xl font-bold text-asp-black mb-4 group-hover:text-asp-blue-600 transition-colors">Consommables Xerox</h3>
              <p class="text-asp-gray-600 mb-6 leading-relaxed">
                Toners, cartouches et pièces détachées d'origine pour vos équipements.
              </p>
              <ul class="text-sm text-asp-gray-600 space-y-2">
                <li class="flex items-center gap-3">
                  <Check class="w-5 h-5 text-green-600 flex-shrink-0" />
                  Toners d'origine
                </li>
                <li class="flex items-center gap-3">
                  <Check class="w-5 h-5 text-green-600 flex-shrink-0" />
                  Kits de maintenance
                </li>
                <li class="flex items-center gap-3">
                  <Check class="w-5 h-5 text-green-600 flex-shrink-0" />
                  Support technique
                </li>
              </ul>
              <div class="mt-6 flex items-center text-asp-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
                <span>En savoir plus</span>
                <ChevronRight class="w-5 h-5 ml-2" />
              </div>
            </div>
          </NuxtLink>

          <!-- Service 5 : Impression T-shirts -->
          <NuxtLink
            to="/services#impression-tshirts"
            class="service-card group block bg-white/80 backdrop-blur-sm border-2 border-asp-gray-200 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer focus:outline-none focus:ring-4 focus:ring-asp-blue-300 hover:border-asp-blue-400 overflow-hidden relative opacity-0"
            aria-label="En savoir plus sur nos services d'impression textile"
          >
            <div class="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div class="relative z-10">
              <div class="text-asp-blue-600 mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Shirt class="w-16 h-16" />
              </div>
              <h3 class="text-2xl font-bold text-asp-black mb-4 group-hover:text-asp-blue-600 transition-colors">Impression T-shirts</h3>
              <p class="text-asp-gray-600 mb-6 leading-relaxed">
                Personnalisation textile pour entreprises, événements et associations.
              </p>
              <ul class="text-sm text-asp-gray-600 space-y-2">
                <li class="flex items-center gap-3">
                  <Check class="w-5 h-5 text-green-600 flex-shrink-0" />
                  Uniformes d'entreprise
                </li>
                <li class="flex items-center gap-3">
                  <Check class="w-5 h-5 text-green-600 flex-shrink-0" />
                  Vêtements événementiels
                </li>
                <li class="flex items-center gap-3">
                  <Check class="w-5 h-5 text-green-600 flex-shrink-0" />
                  Petites et grandes séries
                </li>
              </ul>
              <div class="mt-6 flex items-center text-asp-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
                <span>En savoir plus</span>
                <ChevronRight class="w-5 h-5 ml-2" />
              </div>
            </div>
          </NuxtLink>

          <!-- Service 6 : Badges & Cartes -->
          <NuxtLink
            to="/services#badges-cartes"
            class="service-card group block bg-white/80 backdrop-blur-sm border-2 border-asp-gray-200 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer focus:outline-none focus:ring-4 focus:ring-asp-blue-300 hover:border-asp-blue-400 overflow-hidden relative opacity-0"
            aria-label="En savoir plus sur nos services de badges et cartes"
          >
            <div class="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div class="relative z-10">
              <div class="text-asp-blue-600 mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <CreditCard class="w-16 h-16" />
              </div>
              <h3 class="text-2xl font-bold text-asp-black mb-4 group-hover:text-asp-blue-600 transition-colors">Badges & Cartes</h3>
              <p class="text-asp-gray-600 mb-6 leading-relaxed">
                Badges professionnels, cartes de visite et cartes d'accès personnalisés.
              </p>
              <ul class="text-sm text-asp-gray-600 space-y-2">
                <li class="flex items-center gap-3">
                  <Check class="w-5 h-5 text-green-600 flex-shrink-0" />
                  Badges nominatifs
                </li>
                <li class="flex items-center gap-3">
                  <Check class="w-5 h-5 text-green-600 flex-shrink-0" />
                  Cartes de visite premium
                </li>
                <li class="flex items-center gap-3">
                  <Check class="w-5 h-5 text-green-600 flex-shrink-0" />
                  Cartes d'accès personnalisées
                </li>
              </ul>
              <div class="mt-6 flex items-center text-asp-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
                <span>En savoir plus</span>
                <ChevronRight class="w-5 h-5 ml-2" />
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- Bouton Voir Plus -->
        <div class="text-center mt-16">
          <NuxtLink 
            to="/services"
            class="services-cta inline-flex items-center gap-3 bg-asp-blue-600 hover:bg-asp-blue-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer focus:outline-none focus:ring-4 focus:ring-asp-blue-300 opacity-0"
          >
            <span>Voir Tous Nos Services</span>
            <ChevronRight class="w-6 h-6" />
          </NuxtLink>
        </div>
      </div>
    </section>



    <!-- Notre Processus -->
    <section class="py-24 bg-asp-blue-900 relative overflow-hidden" aria-labelledby="processus-heading">
      <!-- Decorative Elements -->
      <div class="absolute top-10 right-10 w-80 h-80 bg-yellow-400/40 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-10 left-10 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
      <div class="absolute top-1/2 right-1/4 w-64 h-64 bg-yellow-300/30 rounded-full blur-3xl animate-pulse" style="animation-delay: 0.5s;"></div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center mb-20 reveal">
          <h2 id="processus-heading" class="text-4xl sm:text-5xl font-bold text-white mb-6">Notre Processus de Travail</h2>
          <p class="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Un processus simple et transparent en 4 étapes pour votre tranquillité d'esprit
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 relative" role="list">
          <!-- Étape 1 : Contact -->
          <div class="relative reveal reveal-delay-1" role="listitem">
            <div 
              class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-gray-100 hover:border-asp-blue-300 cursor-pointer focus-within:ring-4 focus-within:ring-asp-blue-300 h-full flex flex-col"
              tabindex="0"
              role="article"
              aria-labelledby="etape-1"
            >
              <div class="w-16 h-16 bg-asp-blue-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mb-6 mx-auto" aria-hidden="true">
                1
              </div>
              <h3 id="etape-1" class="text-xl font-bold text-asp-black mb-4 text-center">Contact</h3>
              <p class="text-asp-gray-600 text-center leading-relaxed">
                Contactez-nous par téléphone, WhatsApp ou via notre formulaire de devis
              </p>
            </div>
            <!-- Flèche pour desktop -->
            <div class="hidden lg:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-10 items-center justify-center w-8 h-8 bg-asp-blue-900 rounded-full" aria-hidden="true">
              <ChevronRight class="w-6 h-6 text-yellow-400" />
            </div>
          </div>

          <!-- Étape 2 : Devis -->
          <div class="relative reveal reveal-delay-2" role="listitem">
            <div 
              class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-gray-100 hover:border-yellow-300 cursor-pointer focus-within:ring-4 focus-within:ring-yellow-300 h-full flex flex-col"
              tabindex="0"
              role="article"
              aria-labelledby="etape-2"
            >
              <div class="w-16 h-16 bg-yellow-500 text-white rounded-full flex items-center justify-center text-3xl font-bold mb-6 mx-auto" aria-hidden="true">
                2
              </div>
              <h3 id="etape-2" class="text-xl font-bold text-asp-black mb-4 text-center">Devis</h3>
              <p class="text-asp-gray-600 text-center leading-relaxed">
                Nous établissons un devis détaillé et gratuit sous 24h adapté à vos besoins
              </p>
            </div>
            <!-- Flèche pour desktop -->
            <div class="hidden lg:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-10 items-center justify-center w-8 h-8 bg-asp-blue-900 rounded-full" aria-hidden="true">
              <ChevronRight class="w-6 h-6 text-yellow-400" />
            </div>
          </div>

          <!-- Étape 3 : Réalisation -->
          <div class="relative reveal reveal-delay-3" role="listitem">
            <div 
              class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-gray-100 hover:border-asp-blue-300 cursor-pointer focus-within:ring-4 focus-within:ring-asp-blue-300 h-full flex flex-col"
              tabindex="0"
              role="article"
              aria-labelledby="etape-3"
            >
              <div class="w-16 h-16 bg-asp-blue-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mb-6 mx-auto" aria-hidden="true">
                3
              </div>
              <h3 id="etape-3" class="text-xl font-bold text-asp-black mb-4 text-center">Réalisation</h3>
              <p class="text-asp-gray-600 text-center leading-relaxed">
                Notre équipe réalise votre projet avec soin et professionnalisme
              </p>
            </div>
            <!-- Flèche pour desktop -->
            <div class="hidden lg:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-10 items-center justify-center w-8 h-8 bg-asp-blue-900 rounded-full" aria-hidden="true">
              <ChevronRight class="w-6 h-6 text-yellow-400" />
            </div>
          </div>

          <!-- Étape 4 : Livraison -->
          <div class="relative reveal reveal-delay-4" role="listitem">
            <div 
              class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-gray-100 hover:border-yellow-300 cursor-pointer focus-within:ring-4 focus-within:ring-yellow-300 h-full flex flex-col"
              tabindex="0"
              role="article"
              aria-labelledby="etape-4"
            >
              <div class="w-16 h-16 bg-yellow-500 text-white rounded-full flex items-center justify-center text-3xl font-bold mb-6 mx-auto" aria-hidden="true">
                4
              </div>
              <h3 id="etape-4" class="text-xl font-bold text-asp-black mb-4 text-center">Livraison</h3>
              <p class="text-asp-gray-600 text-center leading-relaxed">
                Installation et livraison dans les délais convenus, avec garantie qualité
              </p>
            </div>
          </div>
        </div>

        <!-- CTA -->
        <div class="text-center mt-16">
          <button
            @click="scrollToQuoteForm"
            class="bg-yellow-500 hover:bg-yellow-600 text-white px-10 py-5 rounded-lg font-semibold transition-all duration-200 inline-flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300"
            aria-label="Commencer votre projet avec ASP Services"
            type="button"
          >
            <FileText class="w-6 h-6" aria-hidden="true" />
            Commencer Mon Projet
          </button>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden" aria-labelledby="faq-heading">
      <!-- Decorative Elements -->
      <div class="absolute top-20 right-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 left-20 w-80 h-80 bg-yellow-400/20 rounded-full blur-3xl animate-pulse" style="animation-delay: 1.5s;"></div>
      
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center mb-20 reveal">
          <h2 id="faq-heading" class="text-4xl sm:text-5xl font-bold text-asp-black mb-6">Questions Fréquentes</h2>
          <p class="text-xl sm:text-2xl text-asp-gray-600 leading-relaxed">
            Tout ce que vous devez savoir sur nos services
          </p>
        </div>

        <div class="space-y-5" role="list" aria-label="Liste des questions fréquentes">
          <!-- FAQ Item 1 -->
          <div class="bg-white rounded-xl border-2 border-gray-100 overflow-hidden transition-all duration-300" role="listitem">
            <button
              @click="toggleFaq(0)"
              class="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors cursor-pointer focus:outline-none focus:ring-4 focus:ring-inset focus:ring-asp-blue-300"
              :aria-expanded="openFaq === 0"
              aria-controls="faq-answer-0"
              type="button"
            >
              <span class="text-lg font-semibold text-asp-black pr-4">Quels types de services proposez-vous ?</span>
              <ChevronRight 
                :class="['w-6 h-6 text-asp-blue-600 transition-transform duration-300 flex-shrink-0', openFaq === 0 ? 'rotate-90' : '']"
                aria-hidden="true"
              />
            </button>
            <Transition name="faq-slide">
              <div 
                v-if="openFaq === 0"
                id="faq-answer-0"
                class="px-8 pb-6 text-asp-gray-600 leading-relaxed"
                role="region"
                aria-labelledby="faq-answer-0"
              >
                Nous offrons une gamme complète de services : signalétique (enseignes lumineuses, panneaux), 
                marquage au sol (parkings, terrains de sport), impression grand format (bâches, roll-up, stickers), 
                fourniture de consommables Xerox, et impression textile (t-shirts personnalisés).
              </div>
            </Transition>
          </div>

          <!-- FAQ Item 2 -->
          <div class="bg-white rounded-xl border-2 border-gray-100 overflow-hidden transition-all duration-300">
            <button
              @click="toggleFaq(1)"
              class="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <span class="text-lg font-semibold text-asp-black">Quels sont vos délais de réalisation ?</span>
              <ChevronRight 
                :class="['w-5 h-5 text-asp-blue-600 transition-transform duration-300', openFaq === 1 ? 'rotate-90' : '']"
              />
            </button>
            <Transition name="faq-slide">
              <div 
                v-if="openFaq === 1"
                class="px-6 pb-5 text-asp-gray-600 leading-relaxed"
              >
                Les délais varient selon le projet : devis sous 24h, impression grand format 2-3 jours, 
                signalétique 5-7 jours, marquage au sol 3-5 jours, t-shirts personnalisés 3-5 jours. 
                Service express disponible pour les projets urgents.
              </div>
            </Transition>
          </div>

          <!-- FAQ Item 3 -->
          <div class="bg-white rounded-xl border-2 border-gray-100 overflow-hidden transition-all duration-300">
            <button
              @click="toggleFaq(2)"
              class="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <span class="text-lg font-semibold text-asp-black">Intervenez-vous partout à Libreville ?</span>
              <ChevronRight 
                :class="['w-5 h-5 text-asp-blue-600 transition-transform duration-300', openFaq === 2 ? 'rotate-90' : '']"
              />
            </button>
            <Transition name="faq-slide">
              <div 
                v-if="openFaq === 2"
                class="px-6 pb-5 text-asp-gray-600 leading-relaxed"
              >
                Oui, nous intervenons dans tout Libreville et ses environs pour l'installation de signalétique, 
                le marquage au sol et la livraison de nos produits. Contactez-nous pour connaître nos zones 
                d'intervention exactes.
              </div>
            </Transition>
          </div>

          <!-- FAQ Item 4 -->
          <div class="bg-white rounded-xl border-2 border-gray-100 overflow-hidden transition-all duration-300">
            <button
              @click="toggleFaq(3)"
              class="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <span class="text-lg font-semibold text-asp-black">Proposez-vous la création graphique ?</span>
              <ChevronRight 
                :class="['w-5 h-5 text-asp-blue-600 transition-transform duration-300', openFaq === 3 ? 'rotate-90' : '']"
              />
            </button>
            <Transition name="faq-slide">
              <div 
                v-if="openFaq === 3"
                class="px-6 pb-5 text-asp-gray-600 leading-relaxed"
              >
                Absolument ! Notre équipe de designers peut créer vos visuels : logos, maquettes pour enseignes, 
                designs pour t-shirts, mise en page pour bâches publicitaires. Nous adaptons vos idées ou créons 
                de A à Z selon vos besoins.
              </div>
            </Transition>
          </div>

          <!-- FAQ Item 5 -->
          <div class="bg-white rounded-xl border-2 border-gray-100 overflow-hidden transition-all duration-300">
            <button
              @click="toggleFaq(4)"
              class="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <span class="text-lg font-semibold text-asp-black">Quelle est votre politique de garantie ?</span>
              <ChevronRight 
                :class="['w-5 h-5 text-asp-blue-600 transition-transform duration-300', openFaq === 4 ? 'rotate-90' : '']"
              />
            </button>
            <Transition name="faq-slide">
              <div 
                v-if="openFaq === 4"
                class="px-6 pb-5 text-asp-gray-600 leading-relaxed"
              >
                Tous nos travaux sont garantis : 6 mois pour les impressions, 1 an pour la signalétique, 
                2 ans pour le marquage au sol. Nous utilisons des matériaux de qualité professionnelle 
                pour assurer la durabilité de nos réalisations.
              </div>
            </Transition>
          </div>

          <!-- FAQ Item 6 -->
          <div class="bg-white rounded-xl border-2 border-gray-100 overflow-hidden transition-all duration-300">
            <button
              @click="toggleFaq(5)"
              class="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <span class="text-lg font-semibold text-asp-black">Acceptez-vous les commandes en grande quantité ?</span>
              <ChevronRight 
                :class="['w-5 h-5 text-asp-blue-600 transition-transform duration-300', openFaq === 5 ? 'rotate-90' : '']"
              />
            </button>
            <Transition name="faq-slide">
              <div 
                v-if="openFaq === 5"
                class="px-6 pb-5 text-asp-gray-600 leading-relaxed"
              >
                Oui, nous gérons aussi bien les petites que les grandes commandes. Pour les volumes importants 
                (t-shirts, bâches, signalétique multiple), nous proposons des tarifs dégressifs. 
                Contactez-nous pour un devis personnalisé.
              </div>
            </Transition>
          </div>
        </div>

        <!-- CTA après FAQ -->
        <div class="mt-12 text-center bg-white rounded-2xl p-8 border-2 border-asp-blue-100">
          <p class="text-lg text-asp-gray-700 mb-4">Vous ne trouvez pas la réponse à votre question ?</p>
          <button
            @click="showQuoteModal = true"
            class="bg-asp-blue-600 hover:bg-asp-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center gap-2 cursor-pointer"
          >
            <Phone class="w-5 h-5" />
            Contactez-nous
          </button>
        </div>
      </div>
    </section>

    <!-- Pourquoi nous choisir -->
    <section class="py-24 bg-gradient-to-br from-white via-blue-50/30 to-white relative overflow-hidden" aria-labelledby="avantages-heading">
      <!-- Decorative Elements -->
      <div class="absolute top-10 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-10 right-10 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl"></div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center mb-20">
          <h2 id="avantages-heading" class="avantages-title text-4xl sm:text-5xl font-bold text-asp-black mb-6 opacity-0">Pourquoi Choisir ASP Services ?</h2>
          <p class="avantages-description text-xl sm:text-2xl text-asp-gray-600 max-w-3xl mx-auto leading-relaxed opacity-0">
            Notre engagement : votre satisfaction et la qualité de nos réalisations
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12" role="list">
          <!-- Garantie 1 : Qualité -->
          <div 
            class="avantage-card group bg-white/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-asp-blue-100 hover:border-asp-blue-400 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 focus-within:ring-4 focus-within:ring-asp-blue-300 opacity-0 overflow-hidden relative"
            tabindex="0"
            role="listitem"
            aria-labelledby="garantie-qualite"
          >
            <!-- Gradient Overlay on Hover -->
            <div class="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div class="relative z-10">
              <div class="w-16 h-16 bg-asp-blue-600 rounded-xl flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" aria-hidden="true">
                <Shield class="w-9 h-9 text-white" />
              </div>
              <h3 id="garantie-qualite" class="text-2xl font-bold text-asp-black mb-5 group-hover:text-asp-blue-600 transition-colors">Garantie Qualité</h3>
              <p class="text-asp-gray-600 leading-relaxed mb-6">
                Nous utilisons uniquement des matériaux premium et des équipements professionnels de dernière génération pour garantir la durabilité de nos réalisations.
              </p>
              <ul class="space-y-3" role="list">
                <li class="flex items-center gap-3 text-sm text-asp-gray-700" role="listitem">
                  <Check class="w-5 h-5 text-asp-blue-600 flex-shrink-0" aria-hidden="true" />
                  Matériaux certifiés
                </li>
                <li class="flex items-center gap-3 text-sm text-asp-gray-700" role="listitem">
                  <Check class="w-5 h-5 text-asp-blue-600 flex-shrink-0" aria-hidden="true" />
                  Équipement MUTOH professionnel
                </li>
                <li class="flex items-center gap-3 text-sm text-asp-gray-700" role="listitem">
                  <Check class="w-5 h-5 text-asp-blue-600 flex-shrink-0" aria-hidden="true" />
                  Garantie sur nos travaux
                </li>
              </ul>
            </div>
          </div>

          <!-- Garantie 2 : Rapidité -->
          <div 
            class="avantage-card group bg-white/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-asp-blue-100 hover:border-asp-blue-400 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 focus-within:ring-4 focus-within:ring-asp-blue-300 opacity-0 overflow-hidden relative"
            tabindex="0"
            role="listitem"
            aria-labelledby="garantie-rapidite"
          >
            <div class="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div class="relative z-10">
              <div class="w-16 h-16 bg-asp-blue-600 rounded-xl flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" aria-hidden="true">
                <Clock class="w-9 h-9 text-white" />
              </div>
              <h3 id="garantie-rapidite" class="text-2xl font-bold text-asp-black mb-5 group-hover:text-asp-blue-600 transition-colors">Rapidité d'Exécution</h3>
              <p class="text-asp-gray-600 leading-relaxed mb-6">
                Nous nous engageons à respecter les délais convenus. Votre temps est précieux, nous le savons et nous le respectons.
              </p>
              <ul class="space-y-3" role="list">
                <li class="flex items-center gap-3 text-sm text-asp-gray-700" role="listitem">
                  <Check class="w-5 h-5 text-asp-blue-600 flex-shrink-0" aria-hidden="true" />
                  Devis sous 24h
                </li>
                <li class="flex items-center gap-3 text-sm text-asp-gray-700" role="listitem">
                  <Check class="w-5 h-5 text-asp-blue-600 flex-shrink-0" aria-hidden="true" />
                  Intervention rapide
                </li>
                <li class="flex items-center gap-3 text-sm text-asp-gray-700" role="listitem">
                  <Check class="w-5 h-5 text-asp-blue-600 flex-shrink-0" aria-hidden="true" />
                  Respect des délais
                </li>
              </ul>
            </div>
          </div>

          <!-- Garantie 3 : Professionnalisme -->
          <div 
            class="avantage-card group bg-white/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-asp-blue-100 hover:border-asp-blue-400 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 focus-within:ring-4 focus-within:ring-asp-blue-300 opacity-0 overflow-hidden relative"
            tabindex="0"
            role="listitem"
            aria-labelledby="garantie-pro"
          >
            <div class="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div class="relative z-10">
              <div class="w-16 h-16 bg-asp-blue-600 rounded-xl flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" aria-hidden="true">
                <Award class="w-9 h-9 text-white" />
              </div>
              <h3 id="garantie-pro" class="text-2xl font-bold text-asp-black mb-5 group-hover:text-asp-blue-600 transition-colors">Professionnalisme</h3>
              <p class="text-asp-gray-600 leading-relaxed mb-6">
                Une équipe expérimentée et passionnée, à votre écoute pour transformer vos idées en réalité avec expertise et créativité.
              </p>
              <ul class="space-y-3" role="list">
                <li class="flex items-center gap-3 text-sm text-asp-gray-700" role="listitem">
                  <Check class="w-5 h-5 text-asp-blue-600 flex-shrink-0" aria-hidden="true" />
                  Équipe qualifiée
                </li>
                <li class="flex items-center gap-3 text-sm text-asp-gray-700" role="listitem">
                  <Check class="w-5 h-5 text-asp-blue-600 flex-shrink-0" aria-hidden="true" />
                  Conseil personnalisé
                </li>
                <li class="flex items-center gap-3 text-sm text-asp-gray-700" role="listitem">
                  <Check class="w-5 h-5 text-asp-blue-600 flex-shrink-0" aria-hidden="true" />
                  Suivi de projet
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Nos Partenaires -->
 <PartnersSection />


    <!-- Chiffres Clés -->
    <section ref="statsSection" class="py-24 bg-asp-blue-600 relative overflow-hidden" aria-labelledby="stats-heading">
      <!-- Decorative Elements -->
      <div class="absolute top-10 left-10 w-96 h-96 bg-yellow-400/30 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-10 right-10 w-80 h-80 bg-blue-400/30 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 0.5s;"></div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center mb-16">
          <h2 id="stats-heading" class="text-4xl sm:text-5xl font-bold text-white mb-6">ASP Services en Chiffres</h2>
          <p class="text-xl sm:text-2xl text-blue-100 leading-relaxed">Notre expertise en quelques chiffres</p>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-12" role="list">
          <!-- Chiffre 1 -->
          <div class="text-center" role="listitem">
            <div class="text-5xl md:text-6xl font-bold text-yellow-400 mb-4" aria-live="polite">
              {{ animatedStats.years }}+
            </div>
            <div class="text-lg text-blue-100 font-medium">Années d'Expérience</div>
          </div>
          
          <!-- Chiffre 2 -->
          <div class="text-center">
            <div class="text-5xl md:text-6xl font-bold text-yellow-400 mb-3">
              {{ animatedStats.projects }}+
            </div>
            <div class="text-lg text-blue-100 font-medium">Projets Réalisés</div>
          </div>
          
          <!-- Chiffre 3 -->
          <div class="text-center">
            <div class="text-5xl md:text-6xl font-bold text-yellow-400 mb-3">
              {{ animatedStats.satisfaction }}%
            </div>
            <div class="text-lg text-blue-100 font-medium">Clients Satisfaits</div>
          </div>
          
          <!-- Chiffre 4 -->
          <div class="text-center">
            <div class="text-5xl md:text-6xl font-bold text-yellow-400 mb-3">
              {{ animatedStats.response }}h
            </div>
            <div class="text-lg text-blue-100 font-medium">Délai d'Intervention</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal Devis -->
    <QuoteModal v-model="showQuoteModal" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue'
import QuoteModal from '~/components/home/QuoteModal.vue'
import PartnersSection from '~/components/home/PartnersSection.vue'
import ScrambleText from '~/components/ScrambleText.vue'
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Star,
  Building,
  Car,
  Printer,
  Package,
  Shirt,
  Check,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  FileText,
  Shield,
  Clock,
  Award,
  CreditCard,
  User,
  Briefcase,
  ShieldCheck
} from 'lucide-vue-next'

useHead({
  title: 'ASP Services Gabon - Signalétique, Impression & Marquage au Sol à Libreville',
  meta: [
    {
      name: 'description',
      content: 'ASP Services Gabon : votre expert en signalétique professionnelle, marquage au sol, impression grand format et consommables Xerox à Libreville. Devis gratuit sur WhatsApp.'
    },
    {
      name: 'keywords',
      content: 'signalétique Gabon, impression grand format Libreville, marquage au sol Gabon, panneaux publicitaires Libreville, consommables Xerox Gabon, ASP Services Gabon, signalétique professionnelle Libreville, impression textile Gabon'
    },
    { property: 'og:title', content: 'ASP Services Gabon - Signalétique, Impression & Marquage au Sol' },
    { property: 'og:description', content: 'Votre expert en signalétique professionnelle, marquage au sol, impression grand format et consommables Xerox à Libreville, Gabon. Devis gratuit sur WhatsApp.' },
    { property: 'og:url', content: 'https://aspservices.ga/accueil' },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: 'https://aspservices.ga/images/hero/hero-background.jpg' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: 'ASP Services Gabon - Signalétique et Impression à Libreville' },
    { property: 'og:locale', content: 'fr_GA' },
    { property: 'og:site_name', content: 'ASP Services Gabon' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'ASP Services Gabon - Signalétique, Impression & Marquage au Sol' },
    { name: 'twitter:description', content: 'Expert signalétique, marquage au sol, impression grand format et Xerox à Libreville, Gabon.' },
    { name: 'twitter:image', content: 'https://aspservices.ga/images/hero/hero-background.jpg' }
  ],
  link: [
    { rel: 'canonical', href: 'https://aspservices.ga/accueil' }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: 'ASP Services Gabon',
        description: 'Expert en signalétique professionnelle, impression grand format, marquage au sol et consommables Xerox à Libreville, Gabon.',
        url: 'https://aspservices.ga',
        telephone: '+24177863198',
        email: 'aspservicesgabon@gmail.com',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Likouala, en face de l\'Assemblées de Dieu du Gabon - Église de Likouala',
          addressLocality: 'Libreville',
          addressCountry: 'GA'
        },
        image: 'https://aspservices.ga/images/hero/hero-background.jpg',
        logo: 'https://aspservices.ga/logo.png',
        priceRange: '$$',
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            opens: '08:00',
            closes: '18:00'
          }
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Services ASP Gabon',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Signalétique professionnelle' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Marquage au sol' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Impression grand format' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Consommables Xerox' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Impression textile' } }
          ]
        }
      })
    }
  ]
})

// Quote modal state
const showQuoteModal = ref(false)

// Watch pour déboguer
watch(showQuoteModal, (newVal) => {
  console.log('showQuoteModal changed to:', newVal)
})

// Services list for modal
const services = [
  { value: 'signaletique', label: 'Signalétique', icon: Building },
  { value: 'marquage-sol', label: 'Marquage au Sol', icon: Car },
  { value: 'impression-grand-format', label: 'Impression Grand Format', icon: Printer },
  { value: 'consommables-xerox', label: 'Consommables Xerox', icon: Package },
  { value: 'impression-tshirts', label: 'Impression T-shirts', icon: Shirt },
  { value: 'badges-cartes', label: 'Badges & Cartes', icon: CreditCard },
  { value: 'vente-imprimantes', label: 'Vente Imprimantes Xerox', icon: Printer },
  { value: 'location-imprimantes', label: 'Location Imprimantes Xerox', icon: Package }
]

// FAQ state
const openFaq = ref<number | null>(null)

// Rotating text animation
const rotatingTexts = ['Industrie graphique', 'Management', 'Bureautique', 'Impression']

// Quote form state (déjà déclaré plus haut)
const quoteForm = ref({
  name: '',
  phone: '',
  email: '',
  service: '',
  description: ''
})
const isSubmitting = ref(false)
const quoteSubmitted = ref(false)

// Carousel data
const currentSlide = ref(0)
const projects = ref([
  {
    title: 'Lanyards Personnalisés OMP',
    description: 'Cordons porte-badge OMP imprimés en bleu et vert, logo sérigraphié haute qualité',
    location: 'Libreville',
    image: '/images/portfolio/Panneau-publicitaire/IMG-20260709-WA0204.jpg'
  },
  {
    title: 'Signalétique au Passage à Niveau PK4',
    description: 'Pose de panneaux stop et signalisation sur mât métallique au passage à niveau PK4 — voie SETRAG',
    location: 'PK4 après Sovog - Libreville',
    image: '/images/portfolio/Panneau-publicitaire/Panneau-Pk4 apres sovog-1.jpg'
  },
  {
    title: 'Badges & Cartes de Visite',
    description: 'Badges professionnels et cartes de visite pour SETRAG, GSE, OMP',
    location: 'Libreville',
    image: '/images/portfolio/carte & badge/badge-setrag-1.jpg'
  },
  {
    title: 'Vêtements Personnalisés',
    description: 'T-shirts, casquettes et ensembles brodés aux couleurs ASP Services',
    location: 'Libreville',
    image: '/images/portfolio/imprimerie/ensemble-asp-1.jpg'
  },
  {
    title: 'Panneaux Directionnels',
    description: 'Signalétique directionnelle professionnelle sur mesure',
    location: 'Zone Industrielle Owendo',
    image: '/images/portfolio/Panneau-publicitaire/Panneau-2.jpg'
  },
  {
    title: 'Machines Xerox',
    description: 'Vente et location d\'imprimantes Xerox professionnelles',
    location: 'Libreville',
    image: '/images/portfolio/Machine xerox/xerox-3.jpg'
  }
])

// Testimonials carousel
const currentTestimonialSlide = ref(0)
const testimonialsPerView = ref(3)

// Animated statistics
const statsSection = ref<HTMLElement | null>(null)
const animatedStats = reactive({
  years: 0,
  projects: 0,
  satisfaction: 0,
  response: 0
})

const statsTargets = {
  years: 28,
  projects: 500,
  satisfaction: 90,
  response: 24
}

let statsAnimated = false

// Partners data (remplace testimonials)
const { partners } = usePartners()

// Carousel functions
const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % projects.value.length
}

const prevSlide = () => {
  currentSlide.value = currentSlide.value === 0 ? projects.value.length - 1 : currentSlide.value - 1
}

// Testimonials carousel functions
const nextTestimonial = () => {
  const maxSlides = Math.ceil(testimonials.value.length / testimonialsPerView.value)
  currentTestimonialSlide.value = (currentTestimonialSlide.value + 1) % maxSlides
}

const prevTestimonial = () => {
  const maxSlides = Math.ceil(testimonials.value.length / testimonialsPerView.value)
  currentTestimonialSlide.value = currentTestimonialSlide.value === 0 ? maxSlides - 1 : currentTestimonialSlide.value - 1
}

// Auto-play carousel
onMounted(() => {
  // ✨ ANIME.JS via CDN (plus fiable pour Nuxt)
  if (process.client) {
    // Charger anime.js via CDN si pas déjà chargé
    if (!(window as any).anime) {
      const script = document.createElement('script')
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js'
      script.onload = () => {
        console.log('✅ Anime.js chargé via CDN')
        initAnimations()
      }
      script.onerror = () => {
        console.error('❌ Erreur chargement anime.js')
        showContentWithoutAnimations()
      }
      document.head.appendChild(script)
    } else {
      console.log('✅ Anime.js déjà disponible')
      initAnimations()
    }
  }
  
  // Fonction pour initialiser les animations
  function initAnimations() {
    const anime = (window as any).anime
    
    if (typeof anime !== 'function') {
      console.error('❌ anime n\'est pas une fonction')
      showContentWithoutAnimations()
      return
    }
    
    setTimeout(() => {
      console.log('🎬 Lancement des animations...')
      
      // 1. Hero Title
      anime({
        targets: '.hero-title',
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 1200,
        easing: 'easeOutExpo',
        delay: 300
      })
      
      // 2. Hero Description
      anime({
        targets: '.hero-description',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 1000,
        easing: 'easeOutExpo',
        delay: 600
      })
      
      // 3. Hero Features (staggered)
      anime({
        targets: '.hero-feature',
        opacity: [0, 1],
        translateX: [-30, 0],
        duration: 800,
        easing: 'easeOutExpo',
        delay: anime.stagger(100, { start: 900 })
      })
      
      // 4. CTA Button
      anime({
        targets: '.hero-cta',
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 1000,
        easing: 'easeOutElastic(1, .8)',
        delay: 1200
      })
      
      // 5. Carousel Card
      anime({
        targets: '.carousel-card',
        opacity: [0, 1],
        translateX: [100, 0],
        rotate: [5, 0],
        duration: 1400,
        easing: 'easeOutExpo',
        delay: 800
      })
      
      // 6. Floating Shapes
      anime({
        targets: '.floating-shape',
        opacity: [0, 1],
        scale: [0, 1],
        duration: 2000,
        easing: 'easeOutElastic(1, .6)',
        delay: anime.stagger(200)
      })
      
      // 7. Continuous Float
      anime({
        targets: '.floating-circle',
        translateY: ['-20px', '20px'],
        duration: 4000,
        easing: 'easeInOutSine',
        direction: 'alternate',
        loop: true
      })
      
      console.log('✨ Animations activées !')
    }, 150)
  }
  
  // Services Section Animations avec Intersection Observer
  const setupServicesAnimations = () => {
    if (!window.anime) {
      console.warn('⚠️ anime.js non disponible pour les animations Services')
      return
    }
    
    const servicesObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          console.log('🎯 Section Services visible - lancement animations')
          
          // Animate Title
          anime({
            targets: '.services-title',
            opacity: [0, 1],
            translateY: [-40, 0],
            duration: 1000,
            easing: 'easeOutExpo'
          })
          
          // Animate Description
          anime({
            targets: '.services-description',
            opacity: [0, 1],
            translateY: [-30, 0],
            duration: 1000,
            easing: 'easeOutExpo',
            delay: 200
          })
          
          // Animate Service Cards (staggered - one by one)
          anime({
            targets: '.service-card',
            opacity: [0, 1],
            translateY: [60, 0],
            scale: [0.9, 1],
            duration: 800,
            easing: 'easeOutExpo',
            delay: anime.stagger(120, { start: 400 }) // 120ms between each card
          })
          
          // Animate CTA Button
          anime({
            targets: '.services-cta',
            opacity: [0, 1],
            translateY: [30, 0],
            scale: [0.95, 1],
            duration: 800,
            easing: 'easeOutExpo',
            delay: 1200 // After all cards
          })
          
          // Disconnect observer after animation
          servicesObserver.disconnect()
        }
      })
    }, {
      threshold: 0.2, // Trigger when 20% visible
      rootMargin: '0px 0px -100px 0px' // Trigger 100px before entering viewport
    })
    
    // Observe services title
    const servicesTitle = document.querySelector('.services-title')
    if (servicesTitle) {
      servicesObserver.observe(servicesTitle)
    }
  }
  
  // Setup services animations after mount
  setTimeout(() => {
    setupServicesAnimations()
    setupAvantagesAnimations()
  }, 500)
  
  // Avantages Section Animations avec Intersection Observer
  const setupAvantagesAnimations = () => {
    if (!window.anime) {
      console.warn('⚠️ anime.js non disponible pour les animations Avantages')
      return
    }
    
    const avantagesObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          console.log('🎯 Section Avantages visible - lancement animations')
          
          // Animate Title
          anime({
            targets: '.avantages-title',
            opacity: [0, 1],
            translateY: [-40, 0],
            duration: 1000,
            easing: 'easeOutExpo'
          })
          
          // Animate Description
          anime({
            targets: '.avantages-description',
            opacity: [0, 1],
            translateY: [-30, 0],
            duration: 1000,
            easing: 'easeOutExpo',
            delay: 200
          })
          
          // Animate Avantage Cards (staggered)
          anime({
            targets: '.avantage-card',
            opacity: [0, 1],
            translateY: [60, 0],
            scale: [0.9, 1],
            duration: 800,
            easing: 'easeOutExpo',
            delay: anime.stagger(100, { start: 400 })
          })
          
          // Disconnect observer after animation
          avantagesObserver.disconnect()
        }
      })
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    })
    
    // Observe avantages title
    const avantagesTitle = document.querySelector('.avantages-title')
    if (avantagesTitle) {
      avantagesObserver.observe(avantagesTitle)
    }
  }
  
  // Fallback : afficher sans animations
  function showContentWithoutAnimations() {
    document.querySelectorAll('.hero-title, .hero-description, .hero-feature, .hero-cta, .carousel-card, .floating-shape').forEach(el => {
      (el as HTMLElement).style.opacity = '1'
    })
  }
  
  // Carousel auto-play
  setInterval(() => {
    nextSlide()
  }, 5000) // Change slide every 5 seconds
  
  // Responsive testimonials per view (not used for infinite scroll but kept for future)
  const updateTestimonialsPerView = () => {
    if (window.innerWidth >= 1024) {
      testimonialsPerView.value = 3
    } else if (window.innerWidth >= 768) {
      testimonialsPerView.value = 2
    } else {
      testimonialsPerView.value = 1
    }
  }
  
  updateTestimonialsPerView()
  window.addEventListener('resize', updateTestimonialsPerView)
  
  // Intersection Observer for stats counter animation
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  }
  
  const animateCounter = (key: keyof typeof statsTargets, duration: number = 2000) => {
    const target = statsTargets[key]
    const startTime = performance.now()
    
    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function (easeOutQuart)
      const easeOut = 1 - Math.pow(1 - progress, 4)
      
      animatedStats[key] = Math.floor(easeOut * target)
      
      if (progress < 1) {
        requestAnimationFrame(updateCount)
      } else {
        animatedStats[key] = target
      }
    }
    
    requestAnimationFrame(updateCount)
  }
  
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true
        
        // Animate all counters
        animateCounter('years', 2000)
        animateCounter('projects', 2500)
        animateCounter('satisfaction', 2200)
        animateCounter('response', 1800)
      }
    })
  }, observerOptions)
  
  if (statsSection.value) {
    statsObserver.observe(statsSection.value)
  }
})

const handleProjectImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"%3E%3Crect fill="%231E3A8A" width="800" height="600"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="24" fill="%23fff"%3EProjekt ASP%3C/text%3E%3C/svg%3E'
}

// Toggle FAQ
const toggleFaq = (index: number) => {
  openFaq.value = openFaq.value === index ? null : index
}

// Scroll to quote form (now opens modal)
const scrollToQuoteForm = () => {
  showQuoteModal.value = true
}

// Submit quote form and generate PDF
const submitQuoteForm = async () => {
  isSubmitting.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Here you would normally send data to backend to generate PDF
    console.log('Quote form data:', quoteForm.value)
    
    // Show success message
    quoteSubmitted.value = true
    
    // Close modal and reset after 3 seconds
    setTimeout(() => {
      quoteForm.value = {
        name: '',
        phone: '',
        email: '',
        service: '',
        description: ''
      }
      quoteSubmitted.value = false
      showQuoteModal.value = false
    }, 3000)
    
  } catch (error) {
    console.error('Error submitting quote:', error)
    alert('Une erreur est survenue. Veuillez réessayer.')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.nav-link {
  @apply text-gray-700 hover:text-asp-blue-600 font-medium transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-asp-blue-50 cursor-pointer;
}

.nav-link-mobile {
  @apply text-gray-700 hover:text-asp-blue-600 font-medium transition-colors duration-200 py-2 cursor-pointer;
}

/* Transitions pour le modal */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active > div,
.modal-leave-active > div {
  transition: transform 0.3s ease;
}

.modal-enter-from > div {
  transform: scale(0.9);
}

.modal-leave-to > div {
  transform: scale(0.9);
}

/* Transition pour le bouton scroll to top */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Animation FAQ slide down/up avec fade */
.faq-slide-enter-active {
  animation: faq-slide-down 0.4s ease-out;
}

.faq-slide-leave-active {
  animation: faq-slide-up 0.3s ease-in;
}

@keyframes faq-slide-down {
  from {
    max-height: 0;
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    max-height: 500px;
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes faq-slide-up {
  from {
    max-height: 500px;
    opacity: 1;
    transform: translateY(0);
  }
  to {
    max-height: 0;
    opacity: 0;
    transform: translateY(-10px);
  }
}

/* Scrollbar personnalisée pour les thumbnails */
.scrollbar-thin::-webkit-scrollbar {
  height: 4px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #475569;
  border-radius: 2px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}

/* Animation défilement infini témoignages */
.testimonials-track {
  animation: scroll-left 40s linear infinite;
  will-change: transform;
}

.testimonials-track:hover {
  animation-play-state: paused;
}

@keyframes scroll-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.testimonial-card {
  min-width: 384px;
}

/* Animations pour les éléments décoratifs */
@keyframes pulse-slow {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.05);
  }
}

@keyframes pulse-slower {
  0%, 100% {
    opacity: 0.2;
    transform: scale(1);
  }
  50% {
    opacity: 0.4;
    transform: scale(1.08);
  }
}

@keyframes spin-very-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes spin-reverse-slow {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(45deg);
  }
  50% {
    transform: translateY(-20px) rotate(45deg);
  }
}

@keyframes float-delayed {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
}

@keyframes scroll-down {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(10px);
  }
}

.animate-pulse-slow {
  animation: pulse-slow 8s ease-in-out infinite;
}

.animate-pulse-slower {
  animation: pulse-slower 10s ease-in-out infinite;
}

.animate-spin-very-slow {
  animation: spin-very-slow 60s linear infinite;
}

.animate-spin-reverse-slow {
  animation: spin-reverse-slow 45s linear infinite;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 7s ease-in-out infinite 2s;
}

.animate-scroll-down {
  animation: scroll-down 2s ease-in-out infinite;
}

/* Grille de points décorative */
.grid-dots {
  width: 100%;
  height: 100%;
  background-image: radial-gradient(circle, rgba(255, 255, 255, 0.15) 1px, transparent 1px);
  background-size: 30px 30px;
}
</style>

<style>
/* Supprimer tous les espaces au-dessus du header */
body,
html {
  margin: 0 !important;
  padding: 0 !important;
}

#__nuxt,
#__layout {
  margin: 0 !important;
  padding: 0 !important;
}
</style>


/* Transitions pour la modal */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .bg-white,
.modal-leave-active .bg-white {
  transition: transform 0.3s ease;
}

.modal-enter-from .bg-white {
  transform: scale(0.9);
}

.modal-leave-to .bg-white {
  transform: scale(0.9);
}

/* Transition pour le message de succès */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
