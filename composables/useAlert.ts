export const useAlert = () => {
  const showSuccess = (title: string, message: string, duration: number = 20000) => {
    // Créer l'élément d'alerte
    const alert = document.createElement('div')
    alert.className = 'asp-alert asp-alert-success'
    alert.innerHTML = `
      <div class="asp-alert-content">
        <div class="asp-alert-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <div class="asp-alert-text">
          <h3>${title}</h3>
          <p>${message}</p>
        </div>
        <button class="asp-alert-close" onclick="this.parentElement.parentElement.remove()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div class="asp-alert-timer"></div>
    `

    // Ajouter au DOM
    document.body.appendChild(alert)

    // Animer l'entrée
    setTimeout(() => {
      alert.classList.add('asp-alert-show')
    }, 10)

    // Animer la barre de progression
    const timer = alert.querySelector('.asp-alert-timer') as HTMLElement
    if (timer) {
      timer.style.animation = `asp-alert-timer ${duration}ms linear`
    }

    // Retirer après le délai
    setTimeout(() => {
      alert.classList.remove('asp-alert-show')
      setTimeout(() => {
        alert.remove()
      }, 300)
    }, duration)
  }

  const showError = (title: string, message: string, duration: number = 20000) => {
    const alert = document.createElement('div')
    alert.className = 'asp-alert asp-alert-error'
    alert.innerHTML = `
      <div class="asp-alert-content">
        <div class="asp-alert-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
        <div class="asp-alert-text">
          <h3>${title}</h3>
          <p>${message}</p>
        </div>
        <button class="asp-alert-close" onclick="this.parentElement.parentElement.remove()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div class="asp-alert-timer"></div>
    `

    document.body.appendChild(alert)

    setTimeout(() => {
      alert.classList.add('asp-alert-show')
    }, 10)

    const timer = alert.querySelector('.asp-alert-timer') as HTMLElement
    if (timer) {
      timer.style.animation = `asp-alert-timer ${duration}ms linear`
    }

    setTimeout(() => {
      alert.classList.remove('asp-alert-show')
      setTimeout(() => {
        alert.remove()
      }, 300)
    }, duration)
  }

  return {
    showSuccess,
    showError
  }
}
