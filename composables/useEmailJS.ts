import emailjs from '@emailjs/browser'

export const useEmailJS = () => {
  const config = useRuntimeConfig()
  
  /**
   * Envoie un email via EmailJS
   * @param templateParams - Paramètres du template
   * @param templateType - Type de template: 'contact' | 'quote' | 'quote-client'
   */
  const sendEmail = async (templateParams: Record<string, any>, templateType: 'contact' | 'quote' | 'quote-client' = 'contact') => {
    let serviceId: string
    let templateId: string
    let publicKey: string
    
    if (templateType === 'quote-client') {
      // Compte EmailJS séparé pour la confirmation client
      serviceId = config.public.emailjsServiceIdClient as string
      templateId = config.public.emailjsTemplateIdQuoteClient as string
      publicKey = config.public.emailjsPublicKeyClient as string
    } else {
      // Compte EmailJS principal pour contact et devis entreprise
      serviceId = config.public.emailjsServiceId as string
      publicKey = config.public.emailjsPublicKey as string
      
        templateId = config.public.emailjsTemplateIdQuote as string
      } else {
        templateId = config.public.emailjsTemplateId as string
      }
    }

    if (!serviceId || !templateId || !publicKey) {
      throw new Error('EmailJS configuration is missing. Please check your .env file.')
    }

    try {
      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      )
      console.log(`✅ Email ${templateType} envoyé avec succès:`, response)
      return response
    } catch (error) {
      console.error(`❌ Erreur lors de l'envoi de l'email ${templateType}:`, error)
      throw error
    }
  }

  return {
    sendEmail
  }
}

