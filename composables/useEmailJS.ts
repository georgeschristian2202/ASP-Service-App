import emailjs from '@emailjs/browser'

export const useEmailJS = () => {
  const config = useRuntimeConfig()
  
  /**
   * Envoie un email via EmailJS
   * @param templateParams - Paramètres du template
   * @param templateType - Type de template: 'contact' ou 'quote'
   */
  const sendEmail = async (templateParams: Record<string, any>, templateType: 'contact' | 'quote' = 'contact') => {
    const serviceId = config.public.emailjsServiceId as string
    const publicKey = config.public.emailjsPublicKey as string
    
    // Sélectionner le bon template ID selon le type
    const templateId = templateType === 'quote' 
      ? config.public.emailjsTemplateIdQuote as string
      : config.public.emailjsTemplateId as string

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

