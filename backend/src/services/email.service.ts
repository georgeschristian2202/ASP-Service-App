import nodemailer from 'nodemailer'
import { env } from '../config/env.js'

export interface AccountCredentialsEmail {
  email: string
  username: string
  password: string
  role: 'admin' | 'superadmin'
}

export interface EmailDeliveryResult {
  requested: boolean
  sent: boolean
  message: string
}

const smtpConfigured = Boolean(
  env.EMAIL_HOST &&
  env.EMAIL_USER &&
  env.EMAIL_PASSWORD &&
  env.EMAIL_FROM
)

export async function sendAccountCredentials(
  account: AccountCredentialsEmail
): Promise<EmailDeliveryResult> {
  if (!smtpConfigured) {
    return {
      requested: true,
      sent: false,
      message: 'Compte créé, mais le serveur SMTP n’est pas encore configuré.'
    }
  }

  const transporter = nodemailer.createTransport({
    host: env.EMAIL_HOST,
    port: env.EMAIL_PORT,
    secure: env.EMAIL_PORT === 465,
    auth: {
      user: env.EMAIL_USER,
      pass: env.EMAIL_PASSWORD
    }
  })

  try {
    await transporter.sendMail({
      from: {
        name: env.EMAIL_FROM_NAME,
        address: env.EMAIL_FROM as string
      },
      to: account.email,
      subject: 'Vos accès à l’administration ASP Services',
      text: [
        `Bonjour ${account.username},`,
        '',
        'Votre compte d’administration ASP Services a été créé.',
        `Nom d’utilisateur : ${account.username}`,
        `Mot de passe initial : ${account.password}`,
        `Rôle : ${account.role === 'superadmin' ? 'Super administrateur' : 'Administrateur'}`,
        '',
        'Connectez-vous puis changez votre mot de passe dès que possible.',
        '',
        'ASP Services Gabon'
      ].join('\n')
    })

    return {
      requested: true,
      sent: true,
      message: `Les identifiants ont été envoyés à ${account.email}.`
    }
  } catch (error) {
    console.error('Échec de l’envoi des identifiants par e-mail:', error)
    return {
      requested: true,
      sent: false,
      message: 'Compte créé, mais l’e-mail contenant les identifiants n’a pas pu être envoyé.'
    }
  }
}
