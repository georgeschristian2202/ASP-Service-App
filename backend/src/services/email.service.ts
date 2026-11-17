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

export interface ContactNotificationEmail {
  name: string
  email: string
  phone: string
  service: string
  message: string
}

const smtp = {
  host: env.SMTP_HOST ?? env.EMAIL_HOST,
  port: env.SMTP_PORT ?? env.EMAIL_PORT,
  secure: env.SMTP_SECURE ?? (env.SMTP_PORT ?? env.EMAIL_PORT) === 465,
  user: env.SMTP_USER ?? env.EMAIL_USER,
  password: env.SMTP_PASSWORD ?? env.EMAIL_PASSWORD,
  from: env.SMTP_FROM ?? env.EMAIL_FROM,
  fromName: env.SMTP_FROM_NAME ?? env.EMAIL_FROM_NAME,
  to: env.SMTP_TO ?? env.SMTP_FROM ?? env.EMAIL_FROM
}

const smtpConfigured = Boolean(smtp.host && smtp.from)

function createTransporter() {
  return nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure,
    ...(smtp.user && smtp.password
      ? { auth: { user: smtp.user, pass: smtp.password } }
      : {})
  })
}

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

  const transporter = createTransporter()

  try {
    await transporter.sendMail({
      from: {
        name: smtp.fromName,
        address: smtp.from as string
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

export async function sendContactNotification(
  contact: ContactNotificationEmail
): Promise<EmailDeliveryResult> {
  if (!smtpConfigured || !smtp.to) {
    return {
      requested: true,
      sent: false,
      message: 'Message enregistré, mais le serveur SMTP n’est pas encore configuré.'
    }
  }

  try {
    await createTransporter().sendMail({
      from: {
        name: smtp.fromName,
        address: smtp.from as string
      },
      to: smtp.to,
      replyTo: {
        name: contact.name,
        address: contact.email
      },
      subject: `Nouveau contact ASP Services - ${contact.service}`,
      text: [
        'Un nouveau message a été envoyé depuis le site ASP Services.',
        '',
        `Nom : ${contact.name}`,
        `E-mail : ${contact.email}`,
        `Téléphone : ${contact.phone}`,
        `Service : ${contact.service}`,
        '',
        'Message :',
        contact.message
      ].join('\n')
    })

    return {
      requested: true,
      sent: true,
      message: 'Le message a été enregistré et transmis par e-mail.'
    }
  } catch (error) {
    console.error('Échec de la notification du formulaire de contact:', error)
    return {
      requested: true,
      sent: false,
      message: 'Message enregistré, mais la notification e-mail n’a pas pu être envoyée.'
    }
  }
}
