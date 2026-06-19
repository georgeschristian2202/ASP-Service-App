import emailjs from '@emailjs/browser'

export const useEmailJS = () => {
  const config = useRuntimeConfig()
  
  const sendEmail = async (templateParams: Record<string, any>) => {
    const serviceId = config.public.emailjsServiceId as string
    const templateId = config.public.emailjsTemplateId as string
    const publicKey = config.public.emailjsPublicKey as string

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
      return response
    } catch (error) {
      console error('EmailJS Error:', error)
      throw error
    }
  }

  return {
    sendEmail
  }
}
