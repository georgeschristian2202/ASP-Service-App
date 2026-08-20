<template>
  <div class="bg-white">
    <!-- Hero Section avec carousel -->
    <section class="relative min-h-screen bg-gradient-to-br from-asp-blue-900 to-asp-blue-700 pt-20">

      <!-- Hero Content -->
      <div class="relative z-5 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <!-- Texte Hero -->
            <div class="text-white">
              <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
                <Star class="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span class="text-sm font-medium">Leader de l'industrie graphique au Gabon</span>
              </div>
              
              <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Votre Expert en
                <span class="text-yellow-400">Signalétique</span>
                <br />
                <span class="inline-block relative h-16 w-full min-w-[300px]">
                  <span 
                    class="text-blue-300 absolute left-0 whitespace-nowrap transition-opacity duration-500 ease-in-out"
                    :class="{ 'opacity-100': isTextVisible, 'opacity-0': !isTextVisible }"
                  >
                    {{ rotatingText }}
                  </span>
                </span>
              </h1>
              
              <p class="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed max-w-xl">
                De la conception à la réalisation, ASP Services vous accompagne dans tous vos projets 
                de signalétique, marquage au sol et impression grand format à Libreville.
              </p>

              <!-- Points clés -->
              <div class="flex flex-wrap gap-4 mb-8">
                <div class="flex items-center gap-2">
                  <CheckCircle2 class="w-5 h-5 text-green-400" />
                  <span class="text-sm">Devis gratuit 24h</span>
                </div>
                <div class="flex items-center gap-2">
                  <CheckCircle2 class="w-5 h-5 text-green-400" />
                  <span class="text-sm">Équipement MUTOH</span>
                </div>
                <div class="flex items-center gap-2">
                  <CheckCircle2 class="w-5 h-5 text-green-400" />
                  <span class="text-sm">Installation incluse</span>
                </div>
              </div>

              <div class="flex flex-col sm:flex-row gap-4">
                <button
                  @click="showQuoteModal = true"
                  class="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-xl"
                >
                  <FileText class="w-5 h-5" />
                  Obtenir un Devis Gratuit
                </button>
              </div>
            </div>

            <!-- Carousel des œuvres -->
            <div class="relative animate-float">
              <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/20">
                <h3 class="text-white text-2xl font-bold mb-6 text-center">Projets Récents</h3>
                
                <!-- Carousel Container -->
                <div class="relative overflow-hidden rounded-xl shadow-2xl">
                  <div 
                    class="flex transition-transform duration-500 ease-in-out"
                    :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
                  >
                    <div
                      v-for="(project, index) in projects"
                      :key="index"
                      class="w-full flex-shrink-0"
                    >
                      <div class="relative group cursor-pointer" @click="openProjectModal(project)">
                        <img
                          :src="project.image"
                          :alt="project.title"
                          class="w-full h-80 object-cover rounded-lg"
                          @error="handleProjectImageError"
                        >
                        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-lg flex items-end transition-opacity duration-300">
                          <div class="p-6 text-white w-full">
                            <h4 class="text-xl font-bold mb-2">{{ project.title }}</h4>
                            <p class="text-sm text-white/90 mb-3">{{ project.description }}</p>
                            <div class="flex items-center gap-2">
                              <MapPin class="w-4 h-4 text-green-400" />
                              <span class="text-sm">{{ project.location }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Navigation arrows -->
                  <button
                    @click="prevSlide"
                    class="absolute left-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-200 cursor-pointer"
                    aria-label="Image précédente"
                  >
                    <ChevronLeft class="w-5 h-5" />
                  </button>
                  <button
                    @click="nextSlide"
                    class="absolute right-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-200 cursor-pointer"
                    aria-label="Image suivante"
                  >
                    <ChevronRight class="w-5 h-5" />
                  </button>
                </div>

                <!-- Indicators -->
                <div class="flex justify-center gap-2 mt-6">
                  <button
                    v-for="(_, index) in projects"
                    :key="index"
                    @click="currentSlide = index"
                    :class="[
                      'w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer',
                      currentSlide === index ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/70'
                    ]"
                    :aria-label="`Aller au projet ${index + 1}`"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="py-12 bg-white">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-16 reveal">
          <h2 class="text-4xl font-bold text-asp-black mb-4">Nos Services</h2>
          <p class="text-xl text-asp-gray-600 max-w-2xl mx-auto">
            Solutions complètes pour tous vos besoins en signalétique et impression
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <!-- Service 1 -->
          <NuxtLink to="/services?service=signaletique" class="block bg-white border border-asp-gray-200 rounded-xl p-8 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer reveal reveal-delay-1">
            <div class="text-asp-blue-600 mb-4">
              <Building class="w-12 h-12" />
            </div>
            <h3 class="text-xl font-bold text-asp-black mb-3">Signalétique</h3>
            <p class="text-asp-gray-600 mb-4">
              Panneaux d'entreprise, enseignes lumineuses et signalisation directionnelle sur mesure.
            </p>
            <ul class="text-sm text-asp-gray-600 space-y-1">
              <li class="flex items-center gap-2">
                <Check class="w-4 h-4 text-green-600" />
                Enseignes lumineuses
              </li>
              <li class="flex items-center gap-2">
                <Check class="w-4 h-4 text-green-600" />
                Panneaux directionnels
              </li>
              <li class="flex items-center gap-2">
                <Check class="w-4 h-4 text-green-600" />
                Plaques professionnelles
              </li>
            </ul>
          </NuxtLink>

          <!-- Service 2 -->
          <div class="bg-white border border-asp-gray-200 rounded-xl p-8 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer reveal">
            <div class="text-asp-blue-600 mb-4">
              <Car class="w-12 h-12" />
            </div>
            <h3 class="text-xl font-bold text-asp-black mb-3">Marquage au Sol</h3>
            <p class="text-asp-gray-600 mb-4">
              Traçage professionnel pour parkings, zones industrielles et terrains de sport.
            </p>
            <ul class="text-sm text-asp-gray-600 space-y-1">
              <li class="flex items-center gap-2">
                <Check class="w-4 h-4 text-green-600" />
                Parkings et stationnements
              </li>
              <li class="flex items-center gap-2">
                <Check class="w-4 h-4 text-green-600" />
                Zones industrielles
              </li>
              <li class="flex items-center gap-2">
                <Check class="w-4 h-4 text-green-600" />
                Terrains de sport
              </li>
            </ul>
          </div>

          <!-- Service 3 -->
          <div class="bg-white border border-asp-gray-200 rounded-xl p-8 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer reveal">
            <div class="text-asp-blue-600 mb-4">
              <Printer class="w-12 h-12" />
            </div>
            <h3 class="text-xl font-bold text-asp-black mb-3">Impression Grand Format</h3>
            <p class="text-asp-gray-600 mb-4">
              Bâches, roll-up, affiches et stickers avec notre traceur MUTOH professionnel.
            </p>
            <ul class="text-sm text-asp-gray-600 space-y-1">
              <li class="flex items-center gap-2">
                <Check class="w-4 h-4 text-green-600" />
                Bâches publicitaires
              </li>
              <li class="flex items-center gap-2">
                <Check class="w-4 h-4 text-green-600" />
                Roll-up et kakémonos
              </li>
              <li class="flex items-center gap-2">
                <Check class="w-4 h-4 text-green-600" />
                Stickers personnalisés
              </li>
            </ul>
          </div>

          <!-- Service 4 -->
          <div class="bg-white border border-asp-gray-200 rounded-xl p-8 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer reveal">
            <div class="text-asp-blue-600 mb-4">
              <Package class="w-12 h-12" />
            </div>
            <h3 class="text-xl font-bold text-asp-black mb-3">Consommables Xerox</h3>
            <p class="text-asp-gray-600 mb-4">
              Toners, cartouches et pièces détachées d'origine pour vos équipements.
            </p>
            <ul class="text-sm text-asp-gray-600 space-y-1">
              <li class="flex items-center gap-2">
                <Check class="w-4 h-4 text-green-600" />
                Toners d'origine
              </li>
              <li class="flex items-center gap-2">
                <Check class="w-4 h-4 text-green-600" />
                Kits de maintenance
              </li>
              <li class="flex items-center gap-2">
                <Check class="w-4 h-4 text-green-600" />
                Support technique
              </li>
            </ul>
          </div>

          <!-- Service 5 -->
          <div class="bg-white border border-asp-gray-200 rounded-xl p-8 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer reveal">
            <div class="text-asp-blue-600 mb-4">
              <Shirt class="w-12 h-12" />
            </div>
            <h3 class="text-xl font-bold text-asp-black mb-3">Impression T-shirts</h3>
            <p class="text-asp-gray-600 mb-4">
              Personnalisation textile pour entreprises, événements et associations.
            </p>
            <ul class="text-sm text-asp-gray-600 space-y-1">
              <li class="flex items-center gap-2">
                <Check class="w-4 h-4 text-green-600" />
                Uniformes d'entreprise
              </li>
              <li class="flex items-center gap-2">
                <Check class="w-4 h-4 text-green-600" />
                Vêtements événementiels
              </li>
              <li class="flex items-center gap-2">
                <Check class="w-4 h-4 text-green-600" />
                Petites et grandes séries
              </li>
            </ul>
          </div>

          <!-- Service 6 -->
          <div class="bg-white border border-asp-gray-200 rounded-xl p-8 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer reveal">
            <div class="text-asp-blue-600 mb-4">
              <CreditCard class="w-12 h-12" />
            </div>
            <h3 class="text-xl font-bold text-asp-black mb-3">Badges & Cartes</h3>
            <p class="text-asp-gray-600 mb-4">
              Badges professionnels, cartes de visite et cartes d'accès personnalisés.
            </p>
            <ul class="text-sm text-asp-gray-600 space-y-1">
              <li class="flex items-center gap-2">
                <Check class="w-4 h-4 text-green-600" />
                Badges nominatifs
              </li>
              <li class="flex items-center gap-2">
                <Check class="w-4 h-4 text-green-600" />
                Cartes de visite premium
              </li>
              <li class="flex items-center gap-2">
                <Check class="w-4 h-4 text-green-600" />
                Cartes d'accès personnalisées
              </li>
            </ul>
          </div>

          <!-- Service 7 : Vente Imprimantes -->
          <div class="bg-white border border-asp-gray-200 rounded-xl p-8 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer reveal">
            <div class="text-asp-blue-600 mb-4">
              <Printer class="w-12 h-12" />
            </div>
            <h3 class="text-xl font-bold text-asp-black mb-3">Vente Imprimantes Xerox</h3>
            <p class="text-asp-gray-600 mb-4">
              Imprimantes multifonctions professionnelles Xerox neuves avec garantie constructeur.
            </p>
            <ul class="text-sm text-asp-gray-600 space-y-1">
              <li class="flex items-center gap-2">
                <Check class="w-4 h-4 text-green-600" />
                Xerox C8045 / C8145
              </li>
              <li class="flex items-center gap-2">
                <Check class="w-4 h-4 text-green-600" />
                Xerox C60 Production
              </li>
              <li class="flex items-center gap-2">
                <Check class="w-4 h-4 text-green-600" />
                Installation & Formation
              </li>
            </ul>
          </div>

          <!-- Service 8 : Location Imprimantes -->
          <div class="bg-white border border-asp-gray-200 rounded-xl p-8 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer reveal">
            <div class="text-asp-blue-600 mb-4">
              <Package class="w-12 h-12" />
            </div>
            <h3 class="text-xl font-bold text-asp-black mb-3">Location Imprimantes Xerox</h3>
            <p class="text-asp-gray-600 mb-4">
              Solutions de location flexibles pour entreprises et particuliers avec maintenance incluse.
            </p>
            <ul class="text-sm text-asp-gray-600 space-y-1">
              <li class="flex items-center gap-2">
                <Check class="w-4 h-4 text-green-600" />
                Formules entreprise
              </li>
              <li class="flex items-center gap-2">
                <Check class="w-4 h-4 text-green-600" />
                Formules particulier
              </li>
              <li class="flex items-center gap-2">
                <Check class="w-4 h-4 text-green-600" />
                Maintenance & Assistance
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Ancienne Modal (désactivée - remplacée par QuoteModal component) -->
    <!--
    <Teleport to="body">
      ...
    </Teleport>
    -->

    <!-- Notre Processus -->
    <section class="py-20 bg-asp-blue-900">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-16 reveal">
          <h2 class="text-4xl font-bold text-white mb-4">Notre Processus de Travail</h2>
          <p class="text-xl text-blue-100 max-w-2xl mx-auto">
            Un processus simple et transparent en 4 étapes pour votre tranquillité d'esprit
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <!-- Étape 1 : Contact -->
          <div class="relative reveal reveal-delay-1">
            <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-gray-100 hover:border-asp-blue-300 cursor-pointer">
              <div class="w-16 h-16 bg-asp-blue-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mb-6 mx-auto">
                1
              </div>
              <h3 class="text-xl font-bold text-asp-black mb-3 text-center">Contact</h3>
              <p class="text-asp-gray-600 text-center leading-relaxed">
                Contactez-nous par téléphone, WhatsApp ou via notre formulaire de devis
              </p>
            </div>
            <!-- Flèche pour desktop -->
            <div class="hidden lg:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-10 items-center justify-center w-8 h-8 bg-asp-blue-900 rounded-full">
              <ChevronRight class="w-6 h-6 text-yellow-400" />
            </div>
          </div>

          <!-- Étape 2 : Devis -->
          <div class="relative reveal reveal-delay-2">
            <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-gray-100 hover:border-yellow-300 cursor-pointer">
              <div class="w-16 h-16 bg-yellow-500 text-white rounded-full flex items-center justify-center text-3xl font-bold mb-6 mx-auto">
                2
              </div>
              <h3 class="text-xl font-bold text-asp-black mb-3 text-center">Devis</h3>
              <p class="text-asp-gray-600 text-center leading-relaxed">
                Nous établissons un devis détaillé et gratuit sous 24h adapté à vos besoins
              </p>
            </div>
            <!-- Flèche pour desktop -->
            <div class="hidden lg:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-10 items-center justify-center w-8 h-8 bg-asp-blue-900 rounded-full">
              <ChevronRight class="w-6 h-6 text-yellow-400" />
            </div>
          </div>

          <!-- Étape 3 : Réalisation -->
          <div class="relative reveal reveal-delay-3">
            <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-gray-100 hover:border-asp-blue-300 cursor-pointer">
              <div class="w-16 h-16 bg-asp-blue-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mb-6 mx-auto">
                3
              </div>
              <h3 class="text-xl font-bold text-asp-black mb-3 text-center">Réalisation</h3>
              <p class="text-asp-gray-600 text-center leading-relaxed">
                Notre équipe réalise votre projet avec soin et professionnalisme
              </p>
            </div>
            <!-- Flèche pour desktop -->
            <div class="hidden lg:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-10 items-center justify-center w-8 h-8 bg-asp-blue-900 rounded-full">
              <ChevronRight class="w-6 h-6 text-yellow-400" />
            </div>
          </div>

          <!-- Étape 4 : Livraison -->
          <div class="relative reveal reveal-delay-4">
            <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-gray-100 hover:border-yellow-300 cursor-pointer">
              <div class="w-16 h-16 bg-yellow-500 text-white rounded-full flex items-center justify-center text-3xl font-bold mb-6 mx-auto">
                4
              </div>
              <h3 class="text-xl font-bold text-asp-black mb-3 text-center">Livraison</h3>
              <p class="text-asp-gray-600 text-center leading-relaxed">
                Installation et livraison dans les délais convenus, avec garantie qualité
              </p>
            </div>
          </div>
        </div>

        <!-- CTA -->
        <div class="text-center mt-12">
          <button
            @click="scrollToQuoteForm"
            class="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-xl"
          >
            <FileText class="w-5 h-5" />
            Commencer Mon Projet
          </button>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div class="max-w-4xl mx-auto px-4">
        <div class="text-center mb-16 reveal">
          <h2 class="text-4xl font-bold text-asp-black mb-4">Questions Fréquentes</h2>
          <p class="text-xl text-asp-gray-600">
            Tout ce que vous devez savoir sur nos services
          </p>
        </div>

        <div class="space-y-4">
          <!-- FAQ Item 1 -->
          <div class="bg-white rounded-xl border-2 border-gray-100 overflow-hidden transition-all duration-300">
            <button
              @click="toggleFaq(0)"
              class="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <span class="text-lg font-semibold text-asp-black">Quels types de services proposez-vous ?</span>
              <ChevronRight 
                :class="['w-5 h-5 text-asp-blue-600 transition-transform duration-300', openFaq === 0 ? 'rotate-90' : '']"
              />
            </button>
            <Transition name="faq-slide">
              <div 
                v-if="openFaq === 0"
                class="px-6 pb-5 text-asp-gray-600 leading-relaxed"
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
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-asp-black mb-4">Pourquoi Choisir ASP Services ?</h2>
          <p class="text-xl text-asp-gray-600 max-w-2xl mx-auto">
            Notre engagement : votre satisfaction et la qualité de nos réalisations
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Garantie 1 : Qualité -->
          <div class="bg-gradient-to-br from-asp-blue-50 to-white rounded-2xl p-8 border-2 border-asp-blue-100 hover:border-asp-blue-300 transition-all duration-300 hover:shadow-lg">
            <div class="w-16 h-16 bg-asp-blue-600 rounded-xl flex items-center justify-center mb-6">
              <Shield class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-2xl font-bold text-asp-black mb-4">Garantie Qualité</h3>
            <p class="text-asp-gray-600 leading-relaxed mb-4">
              Nous utilisons uniquement des matériaux premium et des équipements professionnels de dernière génération pour garantir la durabilité de nos réalisations.
            </p>
            <ul class="space-y-2">
              <li class="flex items-center gap-2 text-sm text-asp-gray-700">
                <Check class="w-4 h-4 text-asp-blue-600 flex-shrink-0" />
                Matériaux certifiés
              </li>
              <li class="flex items-center gap-2 text-sm text-asp-gray-700">
                <Check class="w-4 h-4 text-asp-blue-600 flex-shrink-0" />
                Équipement MUTOH professionnel
              </li>
              <li class="flex items-center gap-2 text-sm text-asp-gray-700">
                <Check class="w-4 h-4 text-asp-blue-600 flex-shrink-0" />
                Garantie sur nos travaux
              </li>
            </ul>
          </div>

          <!-- Garantie 2 : Rapidité -->
          <div class="bg-gradient-to-br from-asp-blue-50 to-white rounded-2xl p-8 border-2 border-asp-blue-100 hover:border-asp-blue-300 transition-all duration-300 hover:shadow-lg">
            <div class="w-16 h-16 bg-asp-blue-600 rounded-xl flex items-center justify-center mb-6">
              <Clock class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-2xl font-bold text-asp-black mb-4">Rapidité d'Exécution</h3>
            <p class="text-asp-gray-600 leading-relaxed mb-4">
              Nous nous engageons à respecter les délais convenus. Votre temps est précieux, nous le savons et nous le respectons.
            </p>
            <ul class="space-y-2">
              <li class="flex items-center gap-2 text-sm text-asp-gray-700">
                <Check class="w-4 h-4 text-asp-blue-600 flex-shrink-0" />
                Devis sous 24h
              </li>
              <li class="flex items-center gap-2 text-sm text-asp-gray-700">
                <Check class="w-4 h-4 text-asp-blue-600 flex-shrink-0" />
                Intervention rapide
              </li>
              <li class="flex items-center gap-2 text-sm text-asp-gray-700">
                <Check class="w-4 h-4 text-asp-blue-600 flex-shrink-0" />
                Respect des délais
              </li>
            </ul>
          </div>

          <!-- Garantie 3 : Professionnalisme -->
          <div class="bg-gradient-to-br from-asp-blue-50 to-white rounded-2xl p-8 border-2 border-asp-blue-100 hover:border-asp-blue-300 transition-all duration-300 hover:shadow-lg">
            <div class="w-16 h-16 bg-asp-blue-600 rounded-xl flex items-center justify-center mb-6">
              <Award class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-2xl font-bold text-asp-black mb-4">Professionnalisme</h3>
            <p class="text-asp-gray-600 leading-relaxed mb-4">
              Une équipe expérimentée et passionnée, à votre écoute pour transformer vos idées en réalité avec expertise et créativité.
            </p>
            <ul class="space-y-2">
              <li class="flex items-center gap-2 text-sm text-asp-gray-700">
                <Check class="w-4 h-4 text-asp-blue-600 flex-shrink-0" />
                Équipe qualifiée
              </li>
              <li class="flex items-center gap-2 text-sm text-asp-gray-700">
                <Check class="w-4 h-4 text-asp-blue-600 flex-shrink-0" />
                Conseil personnalisé
              </li>
              <li class="flex items-center gap-2 text-sm text-asp-gray-700">
                <Check class="w-4 h-4 text-asp-blue-600 flex-shrink-0" />
                Suivi de projet
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Nos Partenaires -->
 <PartnersSection />


    <!-- Chiffres Clés -->
    <section ref="statsSection" class="py-20 bg-asp-blue-600">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-white mb-4">ASP Services en Chiffres</h2>
          <p class="text-xl text-blue-100">Notre expertise en quelques chiffres</p>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <!-- Chiffre 1 -->
          <div class="text-center">
            <div class="text-5xl md:text-6xl font-bold text-yellow-400 mb-3">
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
    { property: 'og:url', content: 'https://aspservices.ga/' },
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
    { rel: 'canonical', href: 'https://aspservices.ga/' }
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
          streetAddress: 'Likouala, en face de l\'Église Prophétique Hébron',
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
const rotatingText = ref(rotatingTexts[0])
const isTextVisible = ref(true)
let rotatingIndex = 0

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
  // Carousel auto-play
  setInterval(() => {
    nextSlide()
  }, 5000) // Change slide every 5 seconds
  
  // Rotating text animation with smooth fade
  setInterval(() => {
    // Fade out
    isTextVisible.value = false
    
    // Wait for fade out, then change text and fade in
    setTimeout(() => {
      rotatingIndex = (rotatingIndex + 1) % rotatingTexts.length
      rotatingText.value = rotatingTexts[rotatingIndex]
      isTextVisible.value = true
    }, 500) // 500ms = durée de la transition CSS
  }, 3000) // Change text every 3 seconds
  
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

const openProjectModal = (project: any) => {
  // Future: open a modal with project details
  console.log('Open project:', project)
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

/* Animation de flottement pour la section projets récents */
.animate-float {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
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
