function showTab(tabId) {
  const tabs = document.querySelectorAll(".tab-content")
  tabs.forEach((tab) => {
    tab.style.display = "none"
  })

  document.getElementById(tabId).style.display = "block"

  const buttons = document.querySelectorAll(".menu button")
  buttons.forEach((button) => {
    button.classList.remove("active")
  })

  const activeButton = document.querySelector(
    `button[onclick="showTab('${tabId}')"]`
  )
  if (activeButton) {
    activeButton.classList.add("active")
  }
}

// Mostrar la primera pestaña por defecto al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  showTab("tab1")
})
