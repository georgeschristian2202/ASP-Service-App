import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

// Simple password comparison (en production, utilisez bcrypt)
function comparePassword(password: string, hash: string): boolean {
  // Pour le MVP, on utilise une comparaison simple
  // Le hash dans admin-users.json est un exemple
  // En production, utilisez: bcrypt.compare(password, hash)
  
  // Mot de passe par défaut: admin123
  if (password === 'admin123') {
    return true
  }
  
  return false
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { username, password } = body

    if (!username || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Nom d\'utilisateur et mot de passe requis'
      })
    }

    // Lire le fichier des utilisateurs admin
    const usersFilePath = join(process.cwd(), 'data', 'admin-users.json')
    const usersData = JSON.parse(readFileSync(usersFilePath, 'utf-8'))
    
    // Trouver l'utilisateur
    const user = usersData.users.find((u: any) => u.username === username)

    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Identifiants incorrects'
      })
    }

    // Vérifier le mot de passe
    const isPasswordValid = comparePassword(password, user.passwordHash)

    if (!isPasswordValid) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Identifiants incorrects'
      })
    }

    // Créer une session
    const session = {
      userId: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      loginAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24h
    }

    // Stocker la session dans un cookie sécurisé
    setCookie(event, 'admin-session', JSON.stringify(session), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60, // 24 heures
      path: '/'
    })

    return {
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      },
      message: 'Connexion réussie'
    }

  } catch (error: any) {
    console.error('Login error:', error)
    
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de la connexion'
    })
  }
})
