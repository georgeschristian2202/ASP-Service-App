// Script de test pour vérifier l'authentification ImageKit
const privateKey = 'private_ZpjJpwjtQTzzHyKib/olkoVkhfQ=';

// Créer l'authentification Basic Auth
const authString = Buffer.from(`${privateKey}:`).toString('base64');

console.log('🔑 Private Key:', privateKey);
console.log('🔐 Auth String (Base64):', authString);

// Test de connexion simple
fetch('https://api.imagekit.io/v1/files', {
  method: 'GET',
  headers: {
    'Authorization': `Basic ${authString}`
  }
})
.then(response => {
  console.log('📊 Status:', response.status, response.statusText);
  return response.text();
})
.then(text => {
  console.log('📦 Response:', text);
  if (text.includes('error') || text.includes('Invalid')) {
    console.error('❌ ERREUR: Authentification échouée !');
    console.error('   Vérifiez que votre Private Key est correcte sur :');
    console.error('   https://imagekit.io/dashboard/developer/api-keys');
  } else {
    console.log('✅ SUCCÈS: Authentification OK !');
  }
})
.catch(error => {
  console.error('❌ ERREUR:', error.message);
});
