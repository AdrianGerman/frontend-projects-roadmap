document.addEventListener("DOMContentLoaded", () => {
  const languageSelect = document.getElementById("language-select")
  const stateDiv = document.getElementById("state")
  const refreshBtn = document.getElementById("refresh-btn")

  stateDiv.innerHTML = `
  <div class="empty-state">
    Por favor, selecciona un lenguaje
  </div>
`
  refreshBtn.style.display = "none"

  fetch(
    "https://raw.githubusercontent.com/kamranahmedse/githunt/master/src/components/filters/language-filter/languages.json"
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al cargar la lista de lenguajes.")
      }
      return response.json()
    })
    .then((languages) => {
      languages.forEach((lang) => {
        const option = document.createElement("option")
        option.value = lang.value
        option.textContent = lang.title
        languageSelect.appendChild(option)
      })
    })
    .catch((error) => {
      stateDiv.innerHTML =
        '<div class="error">Error al cargar los lenguajes. Por favor, recarga la página.</div>'
      console.error(error)
    })

  languageSelect.addEventListener("change", () => {
    const language = languageSelect.value.trim()

    if (language) {
      fetchRepository(language)
    } else {
      stateDiv.innerHTML =
        '<div class="error">Por favor, selecciona un lenguaje válido.</div>'
    }
  })

  const fetchRepository = (language) => {
    stateDiv.innerHTML =
      '<div class="loading">Cargando, por favor espera...</div>'
    refreshBtn.style.display = "none"

    const encodedLanguage = encodeURIComponent(language)
    const url = `https://api.github.com/search/repositories?q=language:${encodedLanguage}&sort=stars&order=desc`

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        if (data.items && data.items.length > 0) {
          const randomRepo =
            data.items[Math.floor(Math.random() * data.items.length)]
          displayRepository(randomRepo)
        } else {
          throw new Error("No se encontraron repositorios.")
        }
      })
      .catch((error) => {
        stateDiv.innerHTML = `
            <div class="error">
              Error al obtener los repositorios. ${
                error.message || "Por favor, intenta nuevamente."
              }
            </div>`
        console.error(error)
      })
  }

  const displayRepository = (repo) => {
    stateDiv.innerHTML = `
      <div class="repo-info">
        <div class="repo-header">
          <h3>${repo.name}</h3>
          <p class="repo-description">${
            repo.description || "No hay descripción disponible."
          }</p>
        </div>
        <div class="repo-stats">
          <span class="language-badge">${repo.language || "N/A"}</span>
          <span>⭐ ${repo.stargazers_count}</span>
          <span>🍴 ${repo.forks_count}</span>
          <span>🐛 ${repo.open_issues_count}</span>
        </div>
        <a href="${
          repo.html_url
        }" target="_blank" class="repo-link">Ver en GitHub</a>
      </div>
    `

    refreshBtn.style.display = "inline-block"
    refreshBtn.onclick = () =>
      fetchRepository(document.getElementById("language-select").value)
  }
})
