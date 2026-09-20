#!/usr/bin/env node

/**
 * Script de nettoyage automatique pour Windows
 * Résout le problème Rolldown qui survient après l'installation de dépendances
 */

import { existsSync, rmSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

console.log('🧹 Nettoyage du projet pour Windows...\n');

// Fichiers et dossiers à supprimer
const toClean = [
  'node_modules',
  'package-lock.json',
  '.nuxt',
  '.output',
  'dist'
];

let cleaned = 0;

toClean.forEach(item => {
  const itemPath = join(rootDir, item);
  
  if (existsSync(itemPath)) {
    try {
      console.log(`🗑️  Suppression de ${item}...`);
      rmSync(itemPath, { recursive: true, force: true });
      cleaned++;
      console.log(`✅ ${item} supprimé`);
    } catch (error) {
      console.error(`❌ Erreur lors de la suppression de ${item}:`, error.message);
    }
  } else {
    console.log(`⏭️  ${item} n'existe pas, ignoré`);
  }
});

console.log(`\n✨ Nettoyage terminé ! ${cleaned} éléments supprimés.`);
console.log('📦 Vous pouvez maintenant lancer: npm install\n');
