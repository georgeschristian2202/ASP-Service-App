<template>
  <div>
    <!-- Page Header -->
    <section class="relative bg-gradient-to-br from-asp-blue-900 via-asp-blue-700 to-asp-blue-900 text-asp-white pt-32 pb-20 overflow-hidden">
      <!-- Decorative Elements -->
      <div class="absolute top-10 right-10 w-80 h-80 bg-yellow-400/30 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 left-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
      
      <Container class="relative z-10">
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="about-page-title heading-1 mb-6 opacity-0">
            À Propos d'ASP Services
          </h1>
          <p class="about-page-subtitle text-body-lg text-asp-gray-400 opacity-0">
            ASP : trois initiales, une histoire, une identité depuis 1998
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

    <!-- Notre Histoire -->
    <section class="section-padding bg-asp-white relative overflow-hidden">
      <!-- Decorative Elements -->
      <div class="absolute top-40 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-40 right-10 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 1.5s;"></div>
      
      <Container class="relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Contenu -->
          <div class="space-y-6">
            <div>
              <span class="inline-block px-4 py-2 bg-asp-blue-100 text-asp-blue-700 rounded-full text-sm font-semibold mb-4">
                Notre Histoire
              </span>
              <h2 class="heading-2 text-asp-black mb-4">
                L'origine d'une ambition
              </h2>
            </div>

            <p class="histoire-intro-text text-body-lg text-muted leading-relaxed">
              Fondée en <strong>1998 par Andy Simon Pierre</strong>, ASP Services est née d'une ambition : 
              mettre l'expertise en <strong>management, en industrie graphique et en communication</strong> au service 
              des entreprises et des institutions.
            </p>

            <p class="histoire-intro-text text-asp-gray-600 leading-relaxed">
              Le nom <strong>ASP</strong> trouve son origine dans les initiales de son fondateur. 
              Depuis ses débuts, cette identité accompagne une volonté constante de développer un savoir-faire 
              solide dans les métiers de la communication et de la création visuelle.
            </p>

            <p class="histoire-intro-text text-asp-gray-600 leading-relaxed">
              Au fil des années, ASP Services a développé son expertise dans la 
              <strong>communication imprimée, l'identité graphique, l'imprimerie, la sérigraphie, 
              la signalisation et la signalétique</strong>.
            </p>

            <div class="pt-4">
              <button
                @click="toggleHistory"
                class="inline-flex items-center gap-2 text-asp-blue-700 font-semibold hover:text-asp-blue-600 transition-colors cursor-pointer"
              >
                <span>{{ showFullHistory ? 'Masquer' : 'Voir notre histoire complète' }}</span>
                <ChevronRight :class="['w-5 h-5 transition-transform duration-200', showFullHistory ? 'rotate-90' : '']" />
              </button>
            </div>
          </div>

          <!-- Image -->
          <div class="relative histoire-image opacity-0">
            <OptimizedImage
              src="/images/about/histoire.png"
              alt="ASP Services - Notre histoire depuis 1998"
              :width="1200"
              :height="800"
              :quality="90"
              format="webp"
              class="w-full h-[500px] object-cover rounded-2xl shadow-asp-2xl"
              @error="handleImageError"
            />
          </div>
        </div>

        <!-- Histoire complète (extensible) -->
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 -translate-y-4"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-4"
        >
          <div v-if="showFullHistory" class="mt-16">
            <div class="max-w-4xl mx-auto">
              <div class="space-y-12">
                <!-- Timeline -->
                <div class="relative">
                  <!-- Ligne verticale -->
                  <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-asp-blue-200"></div>

                  <!-- Événements -->
                  <div class="space-y-8">
                    <!-- 1998 -->
                    <div class="relative pl-12">
                      <div class="absolute left-0 w-8 h-8 bg-asp-blue-700 rounded-full flex items-center justify-center">
                        <div class="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                      <div class="bg-white p-6 rounded-xl shadow-md">
                        <h3 class="timeline-title text-xl font-bold text-asp-black mb-3">1998 — La naissance d'ASP</h3>
                        <p class="timeline-text text-asp-gray-700 mb-3">
                          En <strong>1998</strong>, <strong>Andy Simon Pierre</strong> donne naissance à ASP Services, 
                          avec la volonté de créer une structure spécialisée dans le <strong>management, l'industrie graphique 
                          et la communication</strong>.
                        </p>
                        <p class="timeline-text text-asp-gray-700">
                          Dès sa création, l'entreprise porte une identité directement liée à son fondateur : <strong>ASP</strong>, 
                          les initiales de <strong>Andy Simon Pierre</strong>. Ces trois lettres deviennent progressivement le symbole 
                          d'une entreprise qui construit son parcours autour de la créativité, du savoir-faire et de la qualité de ses réalisations.
                        </p>
                      </div>
                    </div>

                    <!-- Premières années -->
                    <div class="relative pl-12">
                      <div class="absolute left-0 w-8 h-8 bg-asp-blue-700 rounded-full flex items-center justify-center">
                        <div class="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                      <div class="bg-white p-6 rounded-xl shadow-md">
                        <h3 class="timeline-title text-xl font-bold text-asp-black mb-3">Les premières années — Construire le savoir-faire</h3>
                        <p class="text-asp-gray-700 mb-3">
                          Dès ses premières années d'activité, ASP Services participe à la <strong>Foire de 1998</strong>, 
                          une expérience qui contribue au développement de son savoir-faire et à son immersion dans différents projets 
                          liés à la communication et à l'industrie graphique.
                        </p>
                        <p class="timeline-text text-asp-gray-700">
                          L'entreprise commence alors à développer ses compétences dans la conception et la réalisation de supports 
                          de communication, tout en établissant progressivement son identité dans le secteur.
                        </p>
                      </div>
                    </div>

                    <!-- Années 2000 -->
                    <div class="relative pl-12">
                      <div class="absolute left-0 w-8 h-8 bg-asp-blue-700 rounded-full flex items-center justify-center">
                        <div class="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                      <div class="bg-white p-6 rounded-xl shadow-md">
                        <h3 class="timeline-title text-xl font-bold text-asp-black mb-3">Les années 2000 — La communication au cœur de notre développement</h3>
                        <p class="text-asp-gray-700 mb-3">
                          Au début des années 2000, ASP Services renforce son activité dans la <strong>communication imprimée</strong>.
                        </p>
                        <p class="text-asp-gray-700 mb-3">
                          Parmi les réalisations de cette période figurent notamment des <strong>sachets destinés aux pharmacies</strong>, 
                          utilisés comme supports de campagnes de sensibilisation, dont certains portaient le message 
                          <strong>« Oui à la vie, non au SIDA »</strong>.
                        </p>
                        <p class="timeline-text text-asp-gray-700">
                          Ces réalisations témoignent de la capacité de l'entreprise à transformer des besoins de communication 
                          en supports visuels concrets et adaptés à leur public.
                        </p>
                      </div>
                    </div>

                    <!-- 2012-2013 -->
                    <div class="relative pl-12">
                      <div class="absolute left-0 w-8 h-8 bg-asp-blue-700 rounded-full flex items-center justify-center">
                        <div class="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                      <div class="bg-white p-6 rounded-xl shadow-md">
                        <h3 class="timeline-title text-xl font-bold text-asp-black mb-3">2012–2013 — L'identité graphique</h3>
                        <p class="text-asp-gray-700 mb-3">
                          En <strong>2012–2013</strong>, ASP Services franchit une nouvelle étape en développant son expertise dans la 
                          <strong>conception d'identités graphiques</strong>.
                        </p>
                        <p class="text-asp-gray-700 mb-3">
                          L'entreprise accompagne notamment une société patrimoniale dans la création de son identité graphique. 
                          Cette expérience renforce son positionnement dans le domaine de la communication visuelle.
                        </p>
                        <p class="timeline-text text-asp-gray-700">
                          Cette période est également marquée par l'obtention d'un <strong>brevet auprès de l'OAPI</strong>, 
                          constituant une étape importante dans la reconnaissance et la protection des créations développées par l'entreprise.
                        </p>
                      </div>
                    </div>

                    <!-- Diversification -->
                    <div class="relative pl-12">
                      <div class="absolute left-0 w-8 h-8 bg-asp-blue-700 rounded-full flex items-center justify-center">
                        <div class="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                      <div class="bg-white p-6 rounded-xl shadow-md">
                        <h3 class="timeline-title text-xl font-bold text-asp-black mb-3">De la communication à la signalétique</h3>
                        <p class="text-asp-gray-700 mb-4">
                          Au fil de son évolution, ASP Services élargit progressivement son champ d'expertise.
                        </p>
                        <p class="text-asp-gray-700 mb-3">
                          L'entreprise développe notamment ses compétences dans :
                        </p>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div class="flex items-start gap-2 text-sm text-asp-gray-700">
                            <Check class="w-5 h-5 text-asp-blue-700 flex-shrink-0 mt-0.5" />
                            <span>la communication institutionnelle ;</span>
                          </div>
                          <div class="flex items-start gap-2 text-sm text-asp-gray-700">
                            <Check class="w-5 h-5 text-asp-blue-700 flex-shrink-0 mt-0.5" />
                            <span>l'imprimerie ;</span>
                          </div>
                          <div class="flex items-start gap-2 text-sm text-asp-gray-700">
                            <Check class="w-5 h-5 text-asp-blue-700 flex-shrink-0 mt-0.5" />
                            <span>la sérigraphie ;</span>
                          </div>
                          <div class="flex items-start gap-2 text-sm text-asp-gray-700">
                            <Check class="w-5 h-5 text-asp-blue-700 flex-shrink-0 mt-0.5" />
                            <span>la signalisation ;</span>
                          </div>
                          <div class="flex items-start gap-2 text-sm text-asp-gray-700">
                            <Check class="w-5 h-5 text-asp-blue-700 flex-shrink-0 mt-0.5" />
                            <span>la signalétique ;</span>
                          </div>
                          <div class="flex items-start gap-2 text-sm text-asp-gray-700">
                            <Check class="w-5 h-5 text-asp-blue-700 flex-shrink-0 mt-0.5" />
                            <span>la conception de panneaux intérieurs ;</span>
                          </div>
                          <div class="flex items-start gap-2 text-sm text-asp-gray-700 md:col-span-2">
                            <Check class="w-5 h-5 text-asp-blue-700 flex-shrink-0 mt-0.5" />
                            <span>les supports de circulation et d'orientation.</span>
                          </div>
                        </div>
                        <p class="text-asp-gray-700 mt-4">
                          Cette diversification permet à ASP Services de proposer une approche plus complète de la communication visuelle, 
                          allant de la conception graphique jusqu'à la réalisation et à l'installation de supports.
                        </p>
                      </div>
                    </div>

                    <!-- Aujourd'hui -->
                    <div class="relative pl-12">
                      <div class="absolute left-0 w-8 h-8 bg-asp-orange-700 rounded-full flex items-center justify-center">
                        <div class="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                      <div class="bg-gradient-to-br from-asp-blue-50 to-asp-orange-50 p-6 rounded-xl shadow-md border-2 border-asp-blue-100">
                        <h3 class="timeline-title text-xl font-bold text-asp-black mb-3">Aujourd'hui — Une histoire qui continue</h3>
                        <p class="text-asp-gray-700 mb-3">
                          Près de trois décennies après sa création, ASP Services poursuit son développement en s'appuyant 
                          sur l'expérience acquise depuis <strong>1998</strong>.
                        </p>
                        <p class="text-asp-gray-700 mb-3">
                          Notre parcours repose sur une conviction simple : <strong>une communication efficace doit être pensée, 
                          conçue et réalisée avec rigueur.</strong>
                        </p>
                        <p class="text-asp-gray-700 mb-4">
                          Aujourd'hui, ASP Services continue d'accompagner ses clients dans leurs projets de 
                          <strong>communication visuelle, d'impression, de signalisation et de signalétique</strong>, 
                          avec la volonté de proposer des solutions professionnelles, pertinentes et durables.
                        </p>
                        <p class="text-xl font-bold text-asp-blue-700">
                          ASP : trois initiales, une histoire, une identité.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </Container>
    </section>

    <!-- Mission & Vision (2 colonnes) -->
    <section class="section-padding bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      <!-- Decorative Elements -->
      <div class="absolute top-20 right-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 left-20 w-80 h-80 bg-yellow-400/20 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
      
      <Container class="relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Mission -->
          <div class="mission-card bg-white rounded-2xl shadow-lg p-8 opacity-0 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div class="flex items-start gap-4 mb-6">
              <div class="w-12 h-12 rounded-xl bg-asp-blue-100 flex items-center justify-center flex-shrink-0">
                <Target class="w-6 h-6 text-asp-blue-700" />
              </div>
              <div>
                <h2 class="mission-title text-2xl font-bold text-asp-black mb-2">Notre Mission</h2>
                <p class="mission-subtitle text-sm text-asp-gray-600">Servir notre clientèle dans les règles de l'art</p>
              </div>
            </div>

            <p class="mission-intro-text text-asp-gray-700 leading-relaxed mb-4">
              Concevoir et réaliser des solutions de communication et de signalétique 
              <strong>fiables, efficaces et adaptées</strong> aux besoins de chaque client.
            </p>

            <p class="mission-intro-text text-asp-gray-700 leading-relaxed mb-6">
              De la signalisation routière à la signalisation ferroviaire, nous accompagnons nos clients avec 
              <strong>professionnalisme, rigueur et exigence</strong>.
            </p>

            <button
              @click="toggleMission"
              class="inline-flex items-center gap-2 text-asp-blue-700 font-semibold hover:text-asp-blue-600 transition-colors cursor-pointer"
            >
              <span>{{ showMission ? 'Masquer' : 'En savoir plus' }}</span>
              <ChevronRight :class="['w-5 h-5 transition-transform duration-200', showMission ? 'rotate-90' : '']" />
            </button>

            <Transition
              name="expand-mission"
              @enter="onEnter"
              @leave="onLeave"
            >
              <div v-if="showMission" class="overflow-hidden">
                <div class="pt-6 border-t border-asp-gray-200">
                  <p class="mission-expand-text text-asp-gray-700 leading-relaxed mb-4">
                    Depuis sa création, Aspect Service développe son savoir-faire dans la communication par objet, 
                    la signalisation, la signalétique, le management et l'imprimerie.
                  </p>
                  <div class="bg-asp-blue-50 p-4 rounded-lg">
                    <p class="mission-expand-text text-sm font-semibold text-asp-blue-700">Notre engagement</p>
                    <p class="mission-expand-text text-sm text-asp-gray-700 mt-1">
                      Comprendre les besoins, maîtriser chaque étape et apporter des solutions à la hauteur des attentes.
                    </p>
                  </div>
                </div>
              </div>
            </Transition>
          </div>

          <!-- Vision -->
          <div class="vision-card bg-white rounded-2xl shadow-lg p-8 opacity-0 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div class="flex items-start gap-4 mb-6">
              <div class="w-12 h-12 rounded-xl bg-asp-orange-100 flex items-center justify-center flex-shrink-0">
                <Telescope class="w-6 h-6 text-asp-orange-700" />
              </div>
              <div>
                <h2 class="vision-title text-2xl font-bold text-asp-black mb-2">Notre Vision</h2>
                <p class="vision-subtitle text-sm text-asp-gray-600">Horizon 2030</p>
              </div>
            </div>

            <p class="vision-intro-text text-asp-gray-700 leading-relaxed mb-4">
              Devenir une <strong>référence en Afrique centrale</strong> dans l'industrie de la signalétique, 
              de la signalisation et du management.
            </p>

            <p class="vision-intro-text text-asp-gray-700 leading-relaxed mb-6">
              Étendre notre présence dans l'espace <strong>CEMAC</strong> : Cameroun, Congo, 
              Guinée équatoriale, République centrafricaine.
            </p>

            <button
              @click="toggleVision"
              class="inline-flex items-center gap-2 text-asp-orange-700 font-semibold hover:text-asp-orange-600 transition-colors cursor-pointer"
            >
              <span>{{ showVision ? 'Masquer' : 'En savoir plus' }}</span>
              <ChevronRight :class="['w-5 h-5 transition-transform duration-200', showVision ? 'rotate-90' : '']" />
            </button>

            <Transition
              name="expand-vision"
              @enter="onEnter"
              @leave="onLeave"
            >
              <div v-if="showVision" class="overflow-hidden">
                <div class="pt-6 border-t border-asp-gray-200">
                  <p class="vision-expand-text text-asp-gray-700 leading-relaxed mb-4">
                    À l'horizon 2030, nous ambitionnons de développer progressivement notre présence régionale 
                    en nous appuyant sur notre expérience et notre capacité à proposer des solutions adaptées.
                  </p>
                  <div class="bg-asp-orange-50 p-4 rounded-lg">
                    <p class="vision-expand-text text-sm font-semibold text-asp-orange-700">Notre ambition</p>
                    <p class="vision-expand-text text-sm text-asp-gray-700 mt-1">
                      Construire une présence régionale forte et devenir une référence en Afrique centrale.
                    </p>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </Container>
    </section>

    <!-- Nos Valeurs -->
    <section class="section-padding bg-asp-white relative overflow-hidden">
      <!-- Decorative Elements -->
      <div class="absolute top-40 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-40 right-10 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 1.5s;"></div>
      
      <Container class="relative z-10">
        <div class="max-w-3xl mx-auto text-center mb-16">
          <h2 class="values-title heading-2 text-asp-black mb-4 opacity-0">
            Nos Valeurs
          </h2>
          <p class="values-description text-body-lg text-muted opacity-0">
            Les principes qui orientent notre action au quotidien
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card v-for="(value, index) in values" :key="value.title" class="value-card opacity-0 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div class="space-y-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-asp-blue-100 flex items-center justify-center flex-shrink-0">
                  <Check class="w-5 h-5 text-asp-blue-700" />
                </div>
                <h3 class="text-xl font-semibold text-asp-black">
                  {{ value.title }}
                </h3>
              </div>
              <p class="text-asp-gray-600 leading-relaxed">
                {{ value.description }}
              </p>
            </div>
          </Card>
        </div>
      </Container>
    </section>

    <!-- Equipment & Expertise -->
    <section class="section-padding bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      <!-- Decorative Elements -->
      <div class="absolute top-20 right-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 left-20 w-80 h-80 bg-yellow-400/20 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
      
      <Container class="relative z-10">
        <div class="max-w-3xl mx-auto text-center mb-16">
          <h2 class="equipment-title heading-2 text-asp-black mb-4 opacity-0">
            Notre Équipement Professionnel
          </h2>
          <p class="equipment-description text-body-lg text-muted opacity-0">
            Des technologies de pointe pour une qualité irréprochable
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card 
            v-for="(equipment, index) in equipmentList" 
            :key="equipment.name"
            variant="service"
            :hoverable="true"
            class="equipment-card opacity-0 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
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
                    <Check class="w-4 h-4 text-asp-blue-700 flex-shrink-0" />
                    <span>{{ feature }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
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
              Notre atelier est situé au cœur de Libreville, facilement accessible pour tous vos projets.
            </p>

            <div class="space-y-4">
              <div class="flex items-start gap-4 p-4 bg-asp-gray-100 rounded-lg">
                <MapPin class="w-6 h-6 text-asp-blue-700 flex-shrink-0" />
                <div>
                  <p class="font-semibold text-asp-black mb-1">Adresse</p>
                  <p class="text-asp-gray-600">{{ config.public.address }}</p>
                </div>
              </div>

              <div class="flex items-start gap-4 p-4 bg-asp-gray-100 rounded-lg">
                <Clock class="w-6 h-6 text-asp-blue-700 flex-shrink-0" />
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

          <div class="relative h-[500px]">
            <GoogleMapEmbed
              :address="config.public.address"
              query="Assemblées de Dieu du Gabon - Église de Likouala, Libreville"
              :latitude="0.3901"
              :longitude="9.4544"
              :zoom="17"
              :show-overlay="false"
              :show-hours="false"
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
import { ref, nextTick, onMounted } from 'vue'
import {
  Check,
  ChevronRight,
  Target,
  Telescope,
  MapPin,
  Clock,
  MapIcon,
  Printer,
  Paintbrush,
  Box,
  Wrench
} from 'lucide-vue-next'

const config = useRuntimeConfig()
const { animateWords } = useTextAnimation()

const showFullHistory = ref(false)
const showMission = ref(false)
const showVision = ref(false)

// Refs pour les éléments à animer
const historyContentRef = ref<HTMLElement | null>(null)
const missionContentRef = ref<HTMLElement | null>(null)
const visionContentRef = ref<HTMLElement | null>(null)

// Animation au chargement de la page
onMounted(async () => {
  await nextTick()
  
  // Attendre que anime.js soit disponible
  setTimeout(() => {
    if (window.anime) {
      setupPageAnimations()
    } else {
      console.warn('⚠️ anime.js non disponible sur la page À Propos')
    }
  }, 200)
  
  // Animer les textes d'introduction de "Notre Histoire"
  const introTexts = document.querySelectorAll('.histoire-intro-text')
  introTexts.forEach((text, index) => {
    animateWords(text as HTMLElement, {
      duration: 600,
      delay: index * 150 + 300,
      stagger: 25
    })
  })
  
  // Animer les textes d'introduction de "Mission"
  const missionIntroTexts = document.querySelectorAll('.mission-intro-text')
  missionIntroTexts.forEach((text, index) => {
    animateWords(text as HTMLElement, {
      duration: 600,
      delay: index * 150 + 800,
      stagger: 25
    })
  })
  
  // Animer le titre et sous-titre de "Mission"
  const missionTitle = document.querySelector('.mission-title')
  const missionSubtitle = document.querySelector('.mission-subtitle')
  if (missionTitle) {
    animateWords(missionTitle as HTMLElement, {
      duration: 600,
      delay: 700,
      stagger: 40
    })
  }
  if (missionSubtitle) {
    animateWords(missionSubtitle as HTMLElement, {
      duration: 500,
      delay: 900,
      stagger: 30
    })
  }
  
  // Animer les textes d'introduction de "Vision"
  const visionIntroTexts = document.querySelectorAll('.vision-intro-text')
  visionIntroTexts.forEach((text, index) => {
    animateWords(text as HTMLElement, {
      duration: 600,
      delay: index * 150 + 800,
      stagger: 25
    })
  })
  
  // Animer le titre et sous-titre de "Vision"
  const visionTitle = document.querySelector('.vision-title')
  const visionSubtitle = document.querySelector('.vision-subtitle')
  if (visionTitle) {
    animateWords(visionTitle as HTMLElement, {
      duration: 600,
      delay: 700,
      stagger: 40
    })
  }
  if (visionSubtitle) {
    animateWords(visionSubtitle as HTMLElement, {
      duration: 500,
      delay: 900,
      stagger: 30
    })
  }
})

const setupPageAnimations = () => {
  // Header animations
  anime({
    targets: '.about-page-title',
    opacity: [0, 1],
    translateY: [-40, 0],
    duration: 1000,
    easing: 'easeOutExpo',
    delay: 300
  })
  
  anime({
    targets: '.about-page-subtitle',
    opacity: [0, 1],
    translateY: [-30, 0],
    duration: 1000,
    easing: 'easeOutExpo',
    delay: 500
  })
  
  // Histoire image animation
  setupHistoireImageAnimation()
  
  // Mission & Vision animations
  setupMissionVisionAnimations()
  
  // Setup observers pour les sections
  setupValuesAnimations()
  setupEquipmentAnimations()
}

const setupMissionVisionAnimations = () => {
  const missionVisionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Mission card from left
        anime({
          targets: '.mission-card',
          opacity: [0, 1],
          translateX: [-100, 0],
          scale: [0.95, 1],
          duration: 1000,
          easing: 'easeOutExpo',
          delay: 200
        })
        
        // Vision card from right
        anime({
          targets: '.vision-card',
          opacity: [0, 1],
          translateX: [100, 0],
          scale: [0.95, 1],
          duration: 1000,
          easing: 'easeOutExpo',
          delay: 400
        })
        
        missionVisionObserver.disconnect()
      }
    })
  }, { threshold: 0.2 })
  
  const missionCard = document.querySelector('.mission-card')
  if (missionCard) {
    missionVisionObserver.observe(missionCard)
  }
}

const setupHistoireImageAnimation = () => {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        anime({
          targets: '.histoire-image',
          opacity: [0, 1],
          scale: [0.9, 1],
          translateX: [100, 0],
          duration: 1200,
          easing: 'easeOutExpo',
          delay: 400
        })
        
        imageObserver.disconnect()
      }
    })
  }, { threshold: 0.2 })
  
  const histoireImage = document.querySelector('.histoire-image')
  if (histoireImage) {
    imageObserver.observe(histoireImage)
  }
}

const setupValuesAnimations = () => {
  const valuesObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        anime({
          targets: '.values-title',
          opacity: [0, 1],
          translateY: [-40, 0],
          duration: 1000,
          easing: 'easeOutExpo'
        })
        
        anime({
          targets: '.values-description',
          opacity: [0, 1],
          translateY: [-30, 0],
          duration: 1000,
          easing: 'easeOutExpo',
          delay: 200
        })
        
        anime({
          targets: '.value-card',
          opacity: [0, 1],
          translateY: [60, 0],
          scale: [0.9, 1],
          duration: 800,
          easing: 'easeOutExpo',
          delay: anime.stagger(100, { start: 400 })
        })
        
        valuesObserver.disconnect()
      }
    })
  }, { threshold: 0.2 })
  
  const valuesTitle = document.querySelector('.values-title')
  if (valuesTitle) {
    valuesObserver.observe(valuesTitle)
  }
}

const setupEquipmentAnimations = () => {
  const equipmentObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        anime({
          targets: '.equipment-title',
          opacity: [0, 1],
          translateY: [-40, 0],
          duration: 1000,
          easing: 'easeOutExpo'
        })
        
        anime({
          targets: '.equipment-description',
          opacity: [0, 1],
          translateY: [-30, 0],
          duration: 1000,
          easing: 'easeOutExpo',
          delay: 200
        })
        
        anime({
          targets: '.equipment-card',
          opacity: [0, 1],
          translateX: (el, i) => i % 2 === 0 ? [-100, 0] : [100, 0],
          duration: 1000,
          easing: 'easeOutExpo',
          delay: anime.stagger(150, { start: 400 })
        })
        
        equipmentObserver.disconnect()
      }
    })
  }, { threshold: 0.2 })
  
  const equipmentTitle = document.querySelector('.equipment-title')
  if (equipmentTitle) {
    equipmentObserver.observe(equipmentTitle)
  }
}

// Animation au chargement de la page

// Fonction pour animer le contenu de l'histoire
const toggleHistory = async () => {
  showFullHistory.value = !showFullHistory.value
  
  if (showFullHistory.value) {
    await nextTick()
    
    // Animer les titres des événements de la timeline
    const timelineTitles = document.querySelectorAll('.timeline-title')
    timelineTitles.forEach((title, index) => {
      animateWords(title as HTMLElement, {
        duration: 600,
        delay: index * 100,
        stagger: 40
      })
    })
    
    // Animer les paragraphes
    const timelineParagraphs = document.querySelectorAll('.timeline-text')
    timelineParagraphs.forEach((p, index) => {
      animateWords(p as HTMLElement, {
        duration: 500,
        delay: index * 80 + 200,
        stagger: 30
      })
    })
  }
}

// Fonction pour animer le contenu de la mission
const toggleMission = async () => {
  showMission.value = !showMission.value
  
  if (showMission.value) {
    await nextTick()
    
    const missionTexts = document.querySelectorAll('.mission-expand-text')
    missionTexts.forEach((text, index) => {
      animateWords(text as HTMLElement, {
        duration: 600,
        delay: index * 100,
        stagger: 35
      })
    })
  }
}

// Fonction pour animer le contenu de la vision
const toggleVision = async () => {
  showVision.value = !showVision.value
  
  if (showVision.value) {
    await nextTick()
    
    const visionTexts = document.querySelectorAll('.vision-expand-text')
    visionTexts.forEach((text, index) => {
      animateWords(text as HTMLElement, {
        duration: 600,
        delay: index * 100,
        stagger: 35
      })
    })
  }
}

// Hooks de transition pour le height animate
const onEnter = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = '0'
  element.style.opacity = '0'
  element.style.marginTop = '0'
  
  requestAnimationFrame(() => {
    element.style.transition = 'all 0.3s ease-out'
    element.style.height = element.scrollHeight + 'px'
    element.style.opacity = '1'
    element.style.marginTop = '1.5rem'
  })
  
  element.addEventListener('transitionend', () => {
    element.style.height = 'auto'
  }, { once: true })
}

const onLeave = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = element.scrollHeight + 'px'
  
  requestAnimationFrame(() => {
    element.style.transition = 'all 0.2s ease-in'
    element.style.height = '0'
    element.style.opacity = '0'
    element.style.marginTop = '0'
  })
}

useHead({
  title: 'À Propos - ASP Services | Notre Histoire depuis 1998',
  meta: [
    {
      name: 'description',
      content: 'Découvrez ASP Services, fondée en 1998 par Andy Simon Pierre. Expert en signalétique, communication et management à Libreville, Gabon.'
    }
  ],
  script: [
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js',
      defer: true
    }
  ]
})

const values = [
  {
    title: 'Excellence opérationnelle',
    description: 'Qualité et efficacité dans chaque réalisation. Respect des exigences techniques pour des résultats fiables et durables.'
  },
  {
    title: 'Réactivité',
    description: 'Capacité à répondre rapidement aux besoins. Comprendre, décider et agir dans les meilleurs délais.'
  },
  {
    title: 'Accompagnement',
    description: 'Comprendre les besoins et accompagner chaque client à chaque étape de son projet.'
  },
  {
    title: 'Esprit d\'équipe',
    description: 'Collaboration et complémentarité des compétences pour construire ensemble des solutions performantes.'
  },
  {
    title: 'Transmission des compétences',
    description: 'Partage des connaissances pour renforcer nos équipes et préparer les générations futures.'
  },
  {
    title: 'Intégrité',
    description: 'Honnêteté, transparence et respect des engagements. Relations fondées sur la confiance.'
  }
]

const equipmentList = [
  {
    name: 'Traceur MUTOH',
    description: 'Impression grand format haute définition',
    icon: Printer,
    features: [
      'Impression jusqu\'à 1,6m de largeur',
      'Résolution ultra HD',
      'Compatible tous supports'
    ]
  },
  {
    name: 'Imprimantes Xerox',
    description: 'Matériel professionnel pour tous vos besoins',
    icon: Box,
    features: [
      'Qualité d\'impression optimale',
      'Consommables d\'origine',
      'Support technique dédié'
    ]
  },
  {
    name: 'Atelier de Signalétique',
    description: 'Fabrication sur mesure de panneaux',
    icon: Paintbrush,
    features: [
      'Découpe de précision',
      'Assemblage professionnel',
      'Finitions soignées'
    ]
  },
  {
    name: 'Équipement Marquage',
    description: 'Matériel spécialisé pour marquage au sol',
    icon: Wrench,
    features: [
      'Peintures professionnelles',
      'Traçage de précision',
      'Séchage rapide'
    ]
  }
]

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"%3E%3Crect fill="%23F1F5F9" width="800" height="600"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%2394A3B8"%3EASP Services%3C/text%3E%3C/svg%3E'
}
</script>
