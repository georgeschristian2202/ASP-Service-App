import 'dotenv/config'
import { hash } from 'bcryptjs'
import { readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { prisma } from '../src/config/database.js'

interface PortfolioSeedItem {
  id: string
  title: string
  category: string
  description?: string
  imageUrl?: string
  imagePath?: string
  tags?: string[]
  featured?: boolean
  orderIndex?: number
  createdAt?: string
  updatedAt?: string
}

interface PortfolioSeedData {
  items: PortfolioSeedItem[]
}

function getDataPath(fileName: string): string {
  const seedDirectory = dirname(fileURLToPath(import.meta.url))
  return resolve(seedDirectory, '../../../frontend/data', fileName)
}

async function readJsonFile<T>(fileName: string): Promise<T> {
  return JSON.parse(await readFile(getDataPath(fileName), 'utf-8')) as T
}

function parseDate(value: string | undefined): Date | undefined {
  if (!value) {
    return undefined
  }

  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? undefined : date
}

async function seedAdminUser() {
  const password = process.env.ADMIN_PASSWORD

  if (!password || password === 'change-this-secure-password') {
    throw new Error('Définissez ADMIN_PASSWORD dans backend/.env avant de lancer le seed.')
  }

  const username = process.env.ADMIN_USERNAME ?? 'admin'
  const email = (process.env.ADMIN_EMAIL ?? 'aspservicesgabon@gmail.com').toLowerCase()
  const passwordHash = await hash(password, Number(process.env.BCRYPT_ROUNDS ?? 12))
  const existingUser = await prisma.utilisateur.findFirst({
    where: {
      OR: [{ nomUtilisateur: username }, { courriel: email }]
    }
  })

  const userData = {
    nomUtilisateur: username,
    courriel: email,
    motDePasseHache: passwordHash,
    role: 'ADMINISTRATEUR' as const
  }

  if (existingUser) {
    await prisma.utilisateur.update({
      where: { identifiant: existingUser.identifiant },
      data: userData
    })
    return
  }

  await prisma.utilisateur.create({ data: userData })
}

async function seedConfiguration() {
  const configuration = await readJsonFile<Record<string, unknown>>('site-config.json')

  await prisma.configurationSite.upsert({
    where: { identifiant: 'default' },
    update: { donnees: configuration as never },
    create: {
      identifiant: 'default',
      donnees: configuration as never
    }
  })
}

async function seedHomepageContent() {
  const content = await readJsonFile<Record<string, unknown>>('home.json')

  await prisma.contenuPage.upsert({
    where: { cle: 'homepage' },
    update: { donnees: content as never },
    create: {
      cle: 'homepage',
      donnees: content as never
    }
  })
}

async function seedPortfolio() {
  const portfolio = await readJsonFile<PortfolioSeedData>('portfolio.json')

  for (const item of portfolio.items) {
    const itemData = {
      titre: item.title,
      categorie: item.category,
      description: item.description ?? '',
      urlImage: item.imageUrl ?? '',
      cheminImage: item.imagePath ?? '',
      etiquettes: Array.isArray(item.tags) ? item.tags : [],
      aLaUne: item.featured === true,
      ordreAffichage: item.orderIndex ?? 999,
      creeLe: parseDate(item.createdAt),
      modifieLe: parseDate(item.updatedAt)
    }

    await prisma.realisation.upsert({
      where: { identifiant: item.id },
      update: itemData,
      create: {
        identifiant: item.id,
        ...itemData
      }
    })
  }
}

async function main() {
  await seedAdminUser()
  await seedConfiguration()
  await seedHomepageContent()
  await seedPortfolio()

  console.info('Données initiales importées avec succès.')
}

main()
  .catch((error) => {
    console.error('Échec de l’import des données initiales:', error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
