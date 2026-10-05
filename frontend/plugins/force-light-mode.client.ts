export default defineNuxtPlugin(() => {
  const colorMode = useColorMode()
  colorMode.preference = 'light'

  document.documentElement.classList.remove('dark')
  document.documentElement.classList.add('light')
  document.documentElement.style.colorScheme = 'light'
  localStorage.setItem('nuxt-color-mode', 'light')
})
