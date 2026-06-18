@echo off
echo 🔧 Nettoyage des dépendances pour Windows...

REM Supprimer les fichiers de cache
if exist "package-lock.json" (
    del /f "package-lock.json"
    echo ✅ package-lock.json supprime
)

if exist "node_modules" (
    rmdir /s /q "node_modules"
    echo ✅ node_modules supprime
)

if exist ".nuxt" (
    rmdir /s /q ".nuxt"
    echo ✅ .nuxt supprime
)

echo 🧹 Nettoyage du cache npm...
npm cache clean --force

echo 📦 Sauvegarde du package.json...
copy package.json package.json.backup

echo 📦 Utilisation de la configuration minimale...
copy package.minimal.json package.json

echo 📦 Installation des dépendances de base...
npm install --no-optional

echo 🎉 Test de démarrage avec configuration minimale...
echo Exécutez maintenant: npx nuxt dev --config-file nuxt.minimal.config.ts
pause