<template>
  <div class="min-h-screen bg-gray-50">
    <ConfirmDialog ref="confirmDialog" />
    <!-- En-tête -->
    <div class="bg-white border-b border-gray-200 p-6 rounded-lg shadow-sm mb-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-semibold text-gray-900 mb-1">Édition de la Page d'Accueil</h1>
          <p class="text-sm text-gray-600">Modifiez le contenu et les sections de votre page d'accueil</p>
        </div>
        <div class="flex gap-3">
          <NuxtLink
            to="/accueil"
            target="_blank"
            class="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors text-sm font-medium"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Prévisualiser
          </NuxtLink>
          <button
            @click="handleSave"
            :disabled="isSaving"
            class="inline-flex items-center gap-2 px-5 py-2 bg-asp-blue-700 hover:bg-asp-blue-800 text-white text-sm font-medium rounded-lg transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg v-if="!isSaving" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <svg v-else class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isSaving ? 'Enregistrement...' : 'Enregistrer les modifications' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Navigation par onglets -->
    <div class="bg-white rounded-lg shadow-sm mb-6 border border-gray-200">
      <div class="flex overflow-x-auto">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap',
            activeTab === tab.id
              ? 'border-asp-blue-600 text-asp-blue-700 bg-asp-blue-50'
              : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
          ]"
        >
          <component :is="tab.icon" class="w-5 h-5" />
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- Contenu des onglets -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <!-- Section Hero -->
      <div v-show="activeTab === 'hero'" class="space-y-6">
        <div>
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Section Hero (Bannière principale)</h2>
          <p class="text-sm text-gray-600 mb-6">Cette section est la première chose que vos visiteurs verront sur votre site.</p>
        </div>

        <div class="grid grid-cols-1 gap-6">
          <!-- Titre principal -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Titre principal
            </label>
            <input
              v-model="content.hero.title"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
              placeholder="Votre Expert en"
            />
          </div>

          <!-- Titre en surbrillance -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Mot en surbrillance (couleur jaune)
            </label>
            <input
              v-model="content.hero.titleHighlight"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
              placeholder="Signalétique"
            />
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              v-model="content.hero.description"
              rows="3"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
              placeholder="De la conception à la réalisation..."
            ></textarea>
          </div>

          <!-- Textes rotatifs -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Textes animés (un par ligne)
            </label>
            <textarea
              :value="content.hero.rotatingTexts.join('\n')"
              @input="content.hero.rotatingTexts = ($event.target as HTMLTextAreaElement).value.split('\n').filter(t => t.trim())"
              rows="4"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
              placeholder="Professionnelle&#10;Sur Mesure&#10;Innovante&#10;de Qualité"
            ></textarea>
            <p class="mt-1 text-xs text-gray-500">Ces textes s'afficheront alternativement avec une animation</p>
          </div>

          <!-- Points clés -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Points clés (un par ligne, avec icône ✓)
            </label>
            <textarea
              :value="content.hero.features.join('\n')"
              @input="content.hero.features = ($event.target as HTMLTextAreaElement).value.split('\n').filter(t => t.trim())"
              rows="3"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
              placeholder="Devis gratuit 24h&#10;Équipement MUTOH&#10;Installation incluse"
            ></textarea>
          </div>

          <!-- Bouton CTA -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Texte du bouton principal
            </label>
            <input
              v-model="content.hero.ctaText"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
              placeholder="Obtenir un Devis Gratuit"
            />
          </div>
        </div>
      </div>

      <!-- Section Projets -->
      <div v-show="activeTab === 'projects'" class="space-y-6">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-lg font-semibold text-gray-900 mb-1">Carousel de Projets</h2>
            <p class="text-sm text-gray-600">Projets affichés dans le carousel de la page d'accueil</p>
          </div>
          <button
            @click="addProject"
            class="inline-flex items-center gap-2 px-4 py-2 bg-asp-blue-700 hover:bg-asp-blue-800 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Ajouter un projet
          </button>
        </div>

        <div ref="projectListTop" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 scroll-mt-40">
          <div
            v-for="(project, index) in content.hero.projects"
            :key="index"
            @click="selectedProjectIndex = index"
            :class="selectedProjectIndex === index ? 'border-asp-blue-500 ring-2 ring-asp-blue-200 bg-asp-blue-50/40' : 'border-gray-200 bg-white'"
            class="relative min-w-0 border rounded-xl p-3 transition-all duration-200"
          >
            <div v-if="selectedProjectIndex === index" class="absolute -top-2.5 left-3 px-2 py-0.5 bg-asp-blue-700 text-white text-xs font-medium rounded-full">En cours d’édition</div>
            <div class="flex items-start justify-between mb-3">
              <h3 class="text-sm font-semibold text-gray-900">Projet {{ index + 1 }}</h3>
              <button
                @click.stop="removeProject(index)"
                class="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                title="Supprimer"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div class="grid grid-cols-1 gap-3">
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Titre</label>
                <input
                  v-model="project.title"
                  type="text"
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
                  placeholder="Signalétique Entreprise"
                />
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Localisation</label>
                <input
                  v-model="project.location"
                  type="text"
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
                  placeholder="Libreville, Gabon"
                />
              </div>
              <div class="min-w-0">
                <label class="block text-xs font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  v-auto-resize
                  v-model="project.description"
                  rows="2"
                  class="auto-resize-textarea block w-full max-w-full min-w-0 px-3 py-2 text-sm border border-gray-300 rounded-lg resize-none overflow-hidden focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
                  placeholder="Installation complète de panneaux..."
                ></textarea>
              </div>
              <div class="min-w-0">
                <label class="block text-xs font-medium text-gray-700 mb-2">Photo du projet</label>
                <ImageUploader
                  v-model="project.image"
                  :alt="project.title || `Projet ${index + 1}`"
                  folder="homepage-projects"
                  compact
                />
                <p class="mt-2 text-xs text-gray-500">La photo est envoyée vers ImageKit et son URL est enregistrée avec le projet.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Section Services -->
      <div v-show="activeTab === 'services'" class="space-y-6">
        <div>
          <h2 class="text-lg font-semibold text-gray-900 mb-1">Section Services</h2>
          <p class="text-sm text-gray-600 mb-6">Aperçu des services affichés sur la page d'accueil</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Titre de la section</label>
            <input
              v-model="content.services.title"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
              placeholder="Nos Services"
            />
          </div>
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <input
              v-model="content.services.description"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
              placeholder="Solutions complètes pour tous vos besoins..."
            />
          </div>
        </div>

        <NuxtLink to="/admin/pages/services" class="block bg-blue-50 border border-blue-200 rounded-lg p-4 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-asp-blue-500 transition-colors">
          <div class="flex gap-3">
            <svg class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 class="text-sm font-semibold text-blue-900 mb-1">Édition détaillée des services</h4>
              <p class="text-xs text-blue-700">Pour modifier le détail complet de chaque service (descriptions détaillées, tarifs, images), rendez-vous sur la page <strong>Services</strong> du menu.</p>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Section Processus -->
      <div v-show="activeTab === 'process'" class="space-y-6">
        <div class="flex items-start justify-between gap-4">
          <div><h2 class="text-lg font-semibold text-gray-900 mb-1">Processus de Travail</h2><p class="text-sm text-gray-600 mb-6">Gérez les différentes étapes de votre processus.</p></div>
          <button type="button" @click="addProcessStep" class="inline-flex items-center gap-2 px-4 py-2 bg-asp-blue-700 hover:bg-asp-blue-800 text-white text-sm font-medium rounded-lg">+ Ajouter une étape</button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Titre de la section</label>
            <input
              v-model="content.process.title"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
              placeholder="Notre Processus de Travail"
            />
          </div>
          <div class="md:col-span-2 min-w-0">
            <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              v-auto-resize
              v-model="content.process.description"
              rows="2"
              class="auto-resize-textarea block w-full max-w-full min-w-0 px-4 py-2 border border-gray-300 rounded-lg resize-none overflow-hidden focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
              placeholder="Un processus simple et transparent..."
            ></textarea>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="(step, index) in content.process.steps"
            :key="index"
            :id="`process-step-${index}`"
            @click="selectedProcessIndex = index"
            :class="selectedProcessIndex === index ? 'border-asp-blue-500 ring-2 ring-asp-blue-200 bg-asp-blue-50/40' : 'border-gray-200 bg-white'"
            class="relative min-w-0 border rounded-xl p-4 transition-all duration-200"
          >
            <div v-if="selectedProcessIndex === index" class="absolute -top-2.5 left-3 px-2 py-0.5 bg-asp-blue-700 text-white text-xs font-medium rounded-full">En cours d’édition</div>
            <div class="flex items-center justify-between gap-3 mb-3">
              <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-asp-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                {{ step.number }}
              </div>
              <h3 class="text-sm font-semibold text-gray-900">Étape {{ step.number }}</h3>
              </div>
              <button type="button" @click.stop="removeProcessStep(index)" class="px-2 py-1 text-sm text-red-600 hover:bg-red-50 rounded">Supprimer</button>
            </div>
            <div class="grid grid-cols-1 gap-3">
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Titre</label>
                <input
                  v-model="step.title"
                  type="text"
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
                  placeholder="Contact"
                />
              </div>
              <div class="min-w-0">
                <label class="block text-xs font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  v-auto-resize
                  v-model="step.description"
                  rows="2"
                  class="auto-resize-textarea block w-full max-w-full min-w-0 px-3 py-2 text-sm border border-gray-300 rounded-lg resize-none overflow-hidden focus:ring-2 focus:ring-asp-blue-500 focus:border-asp-blue-500"
                  placeholder="Contactez-nous par téléphone..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-show="activeTab === 'faq'" class="space-y-6">
        <div class="flex items-start justify-between gap-4"><div><h2 class="text-lg font-semibold text-gray-900">Questions Fréquentes</h2><p class="text-sm text-gray-600">Modifiez, ajoutez ou supprimez les questions et leurs réponses.</p></div><button type="button" @click="addFaqItem" class="inline-flex items-center gap-2 px-4 py-2 bg-asp-blue-700 hover:bg-asp-blue-800 text-white text-sm font-medium rounded-lg">+ Ajouter une question</button></div>
        <label class="block text-sm font-medium text-gray-700">Titre<input v-model="content.faq.title" class="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg" /></label>
        <label class="block text-sm font-medium text-gray-700">Description<input v-model="content.faq.description" class="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg" /></label>
        <div ref="faqListTop" class="grid md:grid-cols-2 xl:grid-cols-3 gap-4 scroll-mt-40">
          <div
            v-for="(item, index) in paginatedFaqItems"
            :key="(currentFaqPage - 1) * faqPerPage + index"
            @click="selectedFaqIndex = (currentFaqPage - 1) * faqPerPage + index"
            :class="selectedFaqIndex === (currentFaqPage - 1) * faqPerPage + index ? 'border-asp-blue-500 ring-2 ring-asp-blue-200 bg-asp-blue-50/40' : 'border-gray-200 bg-white'"
            class="relative min-w-0 border rounded-xl p-3 grid gap-3 transition-all duration-200"
          >
            <div v-if="selectedFaqIndex === (currentFaqPage - 1) * faqPerPage + index" class="absolute -top-2.5 left-3 px-2 py-0.5 bg-asp-blue-700 text-white text-xs font-medium rounded-full">En cours d’édition</div>
            <div class="flex items-center justify-between"><h3 class="text-sm font-semibold text-gray-900">Question {{ (currentFaqPage - 1) * faqPerPage + index + 1 }}</h3><button type="button" @click.stop="removeFaqItem((currentFaqPage - 1) * faqPerPage + index)" class="px-2 py-1 text-sm text-red-600 hover:bg-red-50 rounded">Supprimer</button></div>
            <label class="text-xs font-medium text-gray-700">Question<input v-model="item.question" class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg" /></label>
            <label class="min-w-0 text-xs font-medium text-gray-700">Réponse<textarea v-auto-resize v-model="item.answer" rows="2" class="faq-answer-textarea mt-1 block w-full max-w-full min-w-0 px-3 py-2 border border-gray-300 rounded-lg resize-none overflow-hidden"></textarea></label>
          </div>
        </div>
        <div v-if="totalFaqPages > 1" class="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-gray-200">
          <p class="text-sm text-gray-600">Page {{ currentFaqPage }} sur {{ totalFaqPages }} · {{ content.faq.items.length }} questions</p>
          <div class="flex items-center gap-2">
            <button type="button" @click="currentFaqPage--" :disabled="currentFaqPage === 1" class="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-40">Précédent</button>
            <button v-for="page in totalFaqPages" :key="page" type="button" @click="currentFaqPage = page" :class="currentFaqPage === page ? 'bg-asp-blue-700 text-white border-asp-blue-700' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'" class="min-w-9 px-3 py-2 text-sm border rounded-lg">{{ page }}</button>
            <button type="button" @click="currentFaqPage++" :disabled="currentFaqPage === totalFaqPages" class="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-40">Suivant</button>
          </div>
        </div>
      </div>

      <div v-show="activeTab === 'advantages'" class="space-y-6">
        <div><h2 class="text-lg font-semibold text-gray-900">Pourquoi Choisir ASP Services ?</h2><p class="text-sm text-gray-600">Modifiez le titre et les trois avantages.</p></div>
        <label class="block text-sm font-medium text-gray-700">Titre<input v-model="content.advantages.title" class="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg" /></label>
        <label class="block text-sm font-medium text-gray-700">Description<input v-model="content.advantages.description" class="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg" /></label>
        <div v-for="(item, index) in content.advantages.items" :key="index" class="min-w-0 border border-gray-200 rounded-lg p-4 grid gap-3">
          <label class="text-xs font-medium text-gray-700">Titre de l’avantage<input v-model="item.title" class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg" /></label>
          <label class="min-w-0 text-xs font-medium text-gray-700">Description<textarea v-auto-resize v-model="item.description" rows="2" class="auto-resize-textarea mt-1 block w-full max-w-full min-w-0 px-3 py-2 border border-gray-300 rounded-lg resize-none overflow-hidden"></textarea></label>
        </div>
      </div>

      <div v-show="activeTab === 'partners'" class="space-y-5">
        <div class="flex items-start justify-between gap-4"><div><h2 class="text-lg font-semibold text-gray-900">Ils Nous Font Confiance</h2><p class="text-sm text-gray-600">Ajoutez, modifiez ou supprimez les partenaires affichés dans le carrousel public.</p></div><button type="button" @click="addPartner" class="inline-flex items-center gap-2 px-4 py-2 bg-asp-blue-700 hover:bg-asp-blue-800 text-white text-sm font-medium rounded-lg">+ Ajouter un partenaire</button></div>
        <label class="block text-sm font-medium text-gray-700">Titre<input v-model="content.partners.title" class="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg" /></label>
        <label class="block text-sm font-medium text-gray-700">Description<input v-model="content.partners.description" class="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg" /></label>
        <div class="grid md:grid-cols-2 gap-4"><label class="text-sm font-medium text-gray-700">Nombre affiché<input v-model="content.partners.count" class="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg" /></label><label class="text-sm font-medium text-gray-700">Libellé<input v-model="content.partners.countLabel" class="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg" /></label></div>
        <div ref="partnerListTop" class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 scroll-mt-40">
          <div
            v-for="(partner, index) in paginatedPartners"
            :key="partner.id"
            @click="selectedPartnerId = partner.id"
            :class="selectedPartnerId === partner.id ? 'border-asp-blue-500 ring-2 ring-asp-blue-200 bg-asp-blue-50/40' : 'border-gray-200 bg-white'"
            class="relative border rounded-xl p-3 space-y-3 transition-all duration-200"
          >
            <div v-if="selectedPartnerId === partner.id" class="absolute -top-2.5 left-3 px-2 py-0.5 bg-asp-blue-700 text-white text-xs font-medium rounded-full">En cours d’édition</div>
            <div class="flex items-center justify-between"><h3 class="text-sm font-semibold text-gray-900">Partenaire {{ (currentPartnerPage - 1) * partnersPerPage + index + 1 }}</h3><button type="button" @click.stop="removePartner(partner.id)" class="px-2 py-1 text-sm text-red-600 hover:bg-red-50 rounded" :aria-label="`Supprimer ${partner.name || 'ce partenaire'}`">Supprimer</button></div>
            <label class="block text-xs font-medium text-gray-700">Nom<input v-model="partner.name" class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Nom du partenaire" /></label>
            <label class="block text-xs font-medium text-gray-700">Description facultative<input v-model="partner.description" class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Description du partenaire" /></label>
            <div><label class="block text-xs font-medium text-gray-700 mb-2">Logo</label><ImageUploader v-model="partner.logo" :alt="partner.name || `Partenaire ${index + 1}`" folder="partners" object-fit="contain" compact /></div>
          </div>
        </div>
        <div v-if="totalPartnerPages > 1" class="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-gray-200">
          <p class="text-sm text-gray-600">Page {{ currentPartnerPage }} sur {{ totalPartnerPages }} · {{ content.partners.items.length }} partenaires</p>
          <div class="flex items-center gap-2">
            <button type="button" @click="currentPartnerPage--" :disabled="currentPartnerPage === 1" class="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed">Précédent</button>
            <button v-for="page in totalPartnerPages" :key="page" type="button" @click="currentPartnerPage = page" :class="currentPartnerPage === page ? 'bg-asp-blue-700 text-white border-asp-blue-700' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'" class="min-w-9 px-3 py-2 text-sm border rounded-lg">{{ page }}</button>
            <button type="button" @click="currentPartnerPage++" :disabled="currentPartnerPage === totalPartnerPages" class="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed">Suivant</button>
          </div>
        </div>
      </div>

      <div v-show="activeTab === 'stats'" class="space-y-5">
        <div><h2 class="text-lg font-semibold text-gray-900">ASP Services en Chiffres</h2><p class="text-sm text-gray-600">Modifiez les valeurs et leurs libellés.</p></div>
        <label class="block text-sm font-medium text-gray-700">Titre<input v-model="content.stats.title" class="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg" /></label>
        <label class="block text-sm font-medium text-gray-700">Description<input v-model="content.stats.description" class="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg" /></label>
        <div class="grid md:grid-cols-2 gap-4"><div v-for="item in content.stats.items" :key="item.key" class="border border-gray-200 rounded-lg p-4 grid grid-cols-3 gap-3"><label class="text-xs font-medium text-gray-700">Valeur<input v-model.number="item.value" type="number" min="0" class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg" /></label><label class="text-xs font-medium text-gray-700">Suffixe<input v-model="item.suffix" class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg" /></label><label class="text-xs font-medium text-gray-700">Libellé<input v-model="item.label" class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg" /></label></div></div>
      </div>
    </div>

    <!-- Toast de notification -->
    <Transition
      enter-active-class="transition-all duration-300"
      enter-from-class="opacity-0 translate-x-full"
      enter-to-class="opacity-100 translate-x-0"
      leave-active-class="transition-all duration-200"
      leave-from-class="opacity-100 translate-x-0"
      leave-to-class="opacity-0 translate-x-full"
    >
      <div v-if="message" class="fixed top-4 right-4 z-50 max-w-sm">
        <div
          :class="[
            'px-4 py-3 rounded-lg shadow-lg border',
            message.type === 'success' 
              ? 'bg-green-50 border-green-200' 
              : 'bg-red-50 border-red-200'
          ]"
        >
          <div class="flex items-center gap-3">
            <div 
              :class="[
                'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                message.type === 'success' ? 'bg-green-100' : 'bg-red-100'
              ]"
            >
              <svg
                v-if="message.type === 'success'"
                class="w-5 h-5 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <svg
                v-else
                class="w-5 h-5 text-red-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
            <p :class="[
              'text-sm font-medium flex-1',
              message.type === 'success' ? 'text-green-800' : 'text-red-800'
            ]">
              {{ message.text }}
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

const activeTab = ref('hero')
const isSaving = ref(false)
const message = ref<{ type: 'success' | 'error'; text: string } | null>(null)
const persistedContent = ref<Record<string, unknown>>({})
const partnerListTop = ref<HTMLElement | null>(null)
const selectedPartnerId = ref<string | null>(null)
const currentPartnerPage = ref(1)
const partnersPerPage = 10
const faqListTop = ref<HTMLElement | null>(null)
const selectedFaqIndex = ref<number | null>(null)
const currentFaqPage = ref(1)
const faqPerPage = 10
const selectedProcessIndex = ref<number | null>(null)
const projectListTop = ref<HTMLElement | null>(null)
const selectedProjectIndex = ref<number | null>(null)
const hasUnsavedChanges = ref(false)
const trackChanges = ref(false)
const confirmDialog = ref<{ open: (options: { title?: string; message: string; confirmLabel?: string; danger?: boolean }) => Promise<boolean> } | null>(null)

const resizeFaqTextarea = (element: HTMLTextAreaElement) => {
  element.style.height = 'auto'
  element.style.height = `${Math.max(72, element.scrollHeight)}px`
}

const vAutoResize = {
  mounted: resizeFaqTextarea,
  updated: resizeFaqTextarea
}

// Icônes pour les onglets (pseudo-composants)
const tabs = [
  { id: 'hero', label: 'Hero / Bannière', icon: 'IconHome' },
  { id: 'projects', label: 'Projets (Carousel)', icon: 'IconImage' },
  { id: 'services', label: 'Services', icon: 'IconBriefcase' },
  { id: 'process', label: 'Processus', icon: 'IconList' },
  { id: 'faq', label: 'Questions fréquentes', icon: 'IconList' },
  { id: 'advantages', label: 'Pourquoi nous choisir', icon: 'IconBriefcase' },
  { id: 'partners', label: 'Partenaires', icon: 'IconImage' },
  { id: 'stats', label: 'Chiffres clés', icon: 'IconList' }
]

const legacyProjectImages: Record<string, string> = {
  '/images/projects/project-1.jpg': '/images/portfolio/Panneau-publicitaire/IMG-20260709-WA0204.jpg',
  '/images/projects/project-2.jpg': '/images/portfolio/Panneau-publicitaire/Panneau-Pk4 apres sovog-1.jpg',
  '/images/projects/project-3.jpg': '/images/portfolio/carte & badge/badge-setrag-1.jpg'
}

// Contenu de la page
const content = ref({
  hero: {
    title: "Votre Expert en",
    titleHighlight: "Signalétique",
    rotatingTexts: [
      "Professionnelle",
      "Sur Mesure",
      "Innovante",
      "de Qualité"
    ],
    description: "De la conception à la réalisation, ASP Services vous accompagne dans tous vos projets de signalétique, marquage au sol et impression grand format à Libreville.",
    features: [
      "Devis gratuit 24h",
      "Équipement MUTOH",
      "Installation incluse"
    ],
    ctaText: "Obtenir un Devis Gratuit",
    projects: [
      {
        title: "Signalétique Entreprise",
        description: "Installation complète de panneaux directionnels et enseignes lumineuses",
        location: "Libreville, Gabon",
        image: "/images/portfolio/Panneau-publicitaire/IMG-20260709-WA0204.jpg"
      },
      {
        title: "Marquage Parking",
        description: "Traçage professionnel pour parking d'entreprise de 200 places",
        location: "Libreville, Gabon",
        image: "/images/portfolio/Panneau-publicitaire/Panneau-Pk4 apres sovog-1.jpg"
      },
      {
        title: "Badges & Cartes de Visite",
        description: "Badges professionnels et cartes de visite pour SETRAG, GSE et OMP",
        location: "Libreville",
        image: "/images/portfolio/carte & badge/badge-setrag-1.jpg"
      },
      {
        title: "Vêtements Personnalisés",
        description: "T-shirts, casquettes et ensembles brodés aux couleurs ASP Services",
        location: "Libreville",
        image: "/images/portfolio/imprimerie/ensemble-asp-1.jpg"
      },
      {
        title: "Panneaux Directionnels",
        description: "Signalétique directionnelle professionnelle sur mesure",
        location: "Zone Industrielle Owendo",
        image: "/images/portfolio/Panneau-publicitaire/Panneau-2.jpg"
      },
      {
        title: "Machines Xerox",
        description: "Vente et location d'imprimantes Xerox professionnelles",
        location: "Libreville",
        image: "/images/portfolio/Machine xerox/xerox-3.jpg"
      }
    ]
  },
  services: {
    title: "Nos Services",
    description: "Solutions complètes pour tous vos besoins en signalétique et impression"
  },
  process: {
    title: "Notre Processus de Travail",
    description: "Un processus simple et transparent en 4 étapes pour votre tranquillité d'esprit",
    steps: [
      {
        number: 1,
        title: "Contact",
        description: "Contactez-nous par téléphone, WhatsApp ou via notre formulaire de devis"
      },
      {
        number: 2,
        title: "Consultation",
        description: "Étude détaillée de votre projet et élaboration d'un devis personnalisé"
      },
      {
        number: 3,
        title: "Production",
        description: "Réalisation de votre projet avec nos équipements professionnels MUTOH"
      },
      {
        number: 4,
        title: "Installation",
        description: "Pose professionnelle et suivi qualité pour votre entière satisfaction"
      }
    ]
  },
  faq: {
    title: "Questions Fréquentes",
    description: "Tout ce que vous devez savoir sur nos services",
    items: [
      { question: "Quels types de services proposez-vous ?", answer: "Nous offrons une gamme complète de services : signalétique, marquage au sol, impression grand format, consommables Xerox et impression textile." },
      { question: "Quels sont vos délais de réalisation ?", answer: "Les délais varient selon le projet. Un devis détaillé vous précise le délai de réalisation." },
      { question: "Intervenez-vous partout à Libreville ?", answer: "Oui, nous intervenons dans tout Libreville et ses environs." },
      { question: "Proposez-vous la création graphique ?", answer: "Oui, notre équipe peut créer ou adapter vos visuels selon vos besoins." },
      { question: "Quelle est votre politique de garantie ?", answer: "Nos travaux bénéficient de garanties adaptées au type de réalisation." },
      { question: "Acceptez-vous les commandes en grande quantité ?", answer: "Oui, avec des tarifs adaptés aux volumes importants." }
    ]
  },
  advantages: {
    title: "Pourquoi Choisir ASP Services ?",
    description: "Notre engagement : votre satisfaction et la qualité de nos réalisations",
    items: [
      { title: "Garantie Qualité", description: "Des matériaux premium et des équipements professionnels pour des réalisations durables." },
      { title: "Rapidité d'Exécution", description: "Nous nous engageons à respecter les délais convenus." },
      { title: "Professionnalisme", description: "Une équipe expérimentée et passionnée, à votre écoute." }
    ]
  },
  partners: {
    title: "Ils Nous Font Confiance",
    description: "Des partenaires prestigieux qui nous font confiance au quotidien",
    count: "+100",
    countLabel: "Entreprises et administrations partenaires",
    items: [
      { id: "seeg", name: "SEEG", logo: "/images/partenaire/seeg.webp", description: "Société d'Énergie et d'Eau du Gabon" },
      { id: "setrag", name: "SETRAG", logo: "/images/partenaire/setragwebp.webp", description: "Société d'Exploitation du Transgabonais" },
      { id: "eramet", name: "Eramet Comilog", logo: "/images/partenaire/eramet setrag.webp", description: "Leader mondial du manganèse" },
      { id: "omp", name: "OMP", logo: "/images/partenaire/OMP.png", description: "Office Multimodal des Permis" },
      { id: "dusk", name: "Dusk Gabon", logo: "/images/partenaire/Dusk-SymbolDusk_Gabon.png", description: "Solutions numériques au Gabon" },
      { id: "autre", name: "Autres Partenaires", logo: "/images/partenaire/télécharger.webp", description: "Entreprises et administrations gabonaises" }
    ]
  },
  stats: {
    title: "ASP Services en Chiffres",
    description: "Notre expertise en quelques chiffres",
    items: [
      { key: "years", value: 28, suffix: "+", label: "Années d'Expérience" },
      { key: "projects", value: 500, suffix: "+", label: "Projets Réalisés" },
      { key: "satisfaction", value: 90, suffix: "%", label: "Clients Satisfaits" },
      { key: "response", value: 24, suffix: "h", label: "Délai d'Intervention" }
    ]
  }
})

// Charger le contenu au montage
onMounted(async () => {
  try {
    const response = await $fetch<{ success: boolean; data: typeof content.value | null }>('/api/homepage/content')
    if (response.success && response.data) {
      const saved = response.data
      persistedContent.value = saved as Record<string, unknown>
      Object.assign(content.value.hero, saved.hero ?? {})
      content.value.hero.projects = content.value.hero.projects.map(project => ({
        ...project,
        image: legacyProjectImages[project.image] ?? project.image
      }))
      Object.assign(content.value.services, saved.services ?? {})
      Object.assign(content.value.process, saved.process ?? {})
      Object.assign(content.value.faq, saved.faq ?? {})
      Object.assign(content.value.advantages, saved.advantages ?? {})
      Object.assign(content.value.partners, saved.partners ?? {})
      Object.assign(content.value.stats, saved.stats ?? {})
    }
  } catch (error) {
    console.error('Erreur lors du chargement:', error)
    showMessage('error', 'Impossible de charger le contenu de la page d’accueil.')
  } finally {
    nextTick(() => { trackChanges.value = true })
  }
})

watch(content, () => {
  if (trackChanges.value) hasUnsavedChanges.value = true
}, { deep: true })

// Ajouter un projet
const addProject = () => {
  content.value.hero.projects.unshift({
    title: "",
    description: "",
    location: "Libreville, Gabon",
    image: ""
  })
  selectedProjectIndex.value = 0
  showMessage('success', 'Nouveau projet ajouté. Complétez sa fiche puis enregistrez les modifications.')
  nextTick(() => projectListTop.value?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
}

// Supprimer un projet
const removeProject = async (index: number) => {
  const confirmed = await confirmDialog.value?.open({ title: 'Supprimer ce projet ?', message: 'Le projet sera retiré de la page d’accueil après l’enregistrement des modifications.', confirmLabel: 'Supprimer', danger: true })
  if (confirmed) {
    content.value.hero.projects.splice(index, 1)
    selectedProjectIndex.value = null
    showMessage('success', 'Projet supprimé. Enregistrez les modifications pour confirmer définitivement.')
  }
}

const renumberProcessSteps = () => {
  content.value.process.steps.forEach((step, index) => { step.number = index + 1 })
}

const addProcessStep = () => {
  content.value.process.steps.push({
    number: content.value.process.steps.length + 1,
    title: "",
    description: ""
  })
  const index = content.value.process.steps.length - 1
  selectedProcessIndex.value = index
  showMessage('success', 'Nouvelle étape ajoutée. Complétez-la puis enregistrez les modifications.')
  nextTick(() => document.getElementById(`process-step-${index}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }))
}

const removeProcessStep = async (index: number) => {
  const confirmed = await confirmDialog.value?.open({ title: 'Supprimer cette étape ?', message: 'Cette étape sera retirée du processus après l’enregistrement.', confirmLabel: 'Supprimer', danger: true })
  if (!confirmed) return
  content.value.process.steps.splice(index, 1)
  renumberProcessSteps()
  selectedProcessIndex.value = null
  showMessage('success', 'Étape supprimée. Enregistrez les modifications pour confirmer définitivement.')
}

const addFaqItem = () => {
  content.value.faq.items.unshift({ question: "", answer: "" })
  currentFaqPage.value = 1
  selectedFaqIndex.value = 0
  showMessage('success', 'Nouvelle question ajoutée. Complétez-la puis enregistrez les modifications.')
  nextTick(() => faqListTop.value?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
}

const removeFaqItem = async (index: number) => {
  const confirmed = await confirmDialog.value?.open({ title: 'Supprimer cette question ?', message: 'Cette question et sa réponse seront retirées après l’enregistrement.', confirmLabel: 'Supprimer', danger: true })
  if (confirmed) {
    content.value.faq.items.splice(index, 1)
    selectedFaqIndex.value = null
    showMessage('success', 'Question supprimée. Enregistrez les modifications pour confirmer définitivement.')
    if (currentFaqPage.value > totalFaqPages.value) currentFaqPage.value = totalFaqPages.value
  }
}

const totalFaqPages = computed(() => Math.max(1, Math.ceil(content.value.faq.items.length / faqPerPage)))
const paginatedFaqItems = computed(() => {
  const start = (currentFaqPage.value - 1) * faqPerPage
  return content.value.faq.items.slice(start, start + faqPerPage)
})

const addPartner = () => {
  const id = `partner-${Date.now()}`
  content.value.partners.items.unshift({
    id,
    name: "",
    logo: "",
    description: ""
  })
  currentPartnerPage.value = 1
  selectedPartnerId.value = id
  showMessage('success', 'Nouveau partenaire ajouté. Ajoutez son logo puis enregistrez les modifications.')
  nextTick(() => {
    partnerListTop.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
}

const removePartner = async (id: string) => {
  const confirmed = await confirmDialog.value?.open({ title: 'Supprimer ce partenaire ?', message: 'Son logo ne sera plus affiché dans le carrousel après l’enregistrement.', confirmLabel: 'Supprimer', danger: true })
  if (confirmed) {
    const index = content.value.partners.items.findIndex(partner => partner.id === id)
    if (index !== -1) content.value.partners.items.splice(index, 1)
    if (selectedPartnerId.value === id) selectedPartnerId.value = null
    showMessage('success', 'Partenaire supprimé. Enregistrez les modifications pour confirmer définitivement.')
    if (currentPartnerPage.value > totalPartnerPages.value) {
      currentPartnerPage.value = totalPartnerPages.value
    }
  }
}

const totalPartnerPages = computed(() => Math.max(1, Math.ceil(content.value.partners.items.length / partnersPerPage)))
const paginatedPartners = computed(() => {
  const start = (currentPartnerPage.value - 1) * partnersPerPage
  return content.value.partners.items.slice(start, start + partnersPerPage)
})

// Enregistrer les modifications
const handleSave = async () => {
  const confirmed = await confirmDialog.value?.open({ title: 'Enregistrer les modifications ?', message: 'Toutes les sections modifiées seront publiées sur la page d’accueil.', confirmLabel: 'Enregistrer' })
  if (!confirmed) return

  isSaving.value = true

  try {
    const response = await $fetch<{ success: boolean; message?: string }>('/api/homepage/content', {
      method: 'POST',
      body: {
        ...persistedContent.value,
        ...content.value
      }
    })

    if (response.success) {
      hasUnsavedChanges.value = false
      showMessage('success', 'Modifications enregistrées avec succès !')
    } else {
      showMessage('error', response.message || 'Erreur lors de l\'enregistrement')
    }
  } catch (error) {
    console.error('Erreur:', error)
    showMessage('error', 'Erreur lors de l\'enregistrement')
  } finally {
    isSaving.value = false
  }
}

const warnBeforeUnload = (event: BeforeUnloadEvent) => {
  if (!hasUnsavedChanges.value) return
  event.preventDefault()
  event.returnValue = ''
}

onMounted(() => window.addEventListener('beforeunload', warnBeforeUnload))
onBeforeUnmount(() => window.removeEventListener('beforeunload', warnBeforeUnload))
onBeforeRouteLeave(async () => {
  if (!hasUnsavedChanges.value) return true
  return await confirmDialog.value?.open({ title: 'Modifications non enregistrées', message: 'Vous allez perdre les changements effectués sur la page d’accueil.', confirmLabel: 'Quitter sans enregistrer', danger: true }) ?? false
})

// Afficher un message
const showMessage = (type: 'success' | 'error', text: string) => {
  message.value = { type, text }
  setTimeout(() => {
    message.value = null
  }, 4000)
}
</script>

<style scoped>
.faq-answer-textarea,
.auto-resize-textarea {
  min-height: 4.5rem;
  overflow-wrap: anywhere;
  word-break: break-word;
  white-space: pre-wrap;
}
</style>
