document.addEventListener("DOMContentLoaded", () => {
  const cookieMenu = document.querySelector(".cookie-menu")
  const overlay = document.querySelector(".overlay")
  const acceptButton = document.querySelector(".button-cookie button")
  const closeButton = document.querySelector(".close-icon")

  // verifica si ya se aceptaron las cookies anteriormente
  if (localStorage.getItem("cookiesAccepted") == "true") {
    cookieMenu.style.display = "none"
    overlay.style.display = "none"
  } else {
    cookieMenu.style.display = "flex"
    overlay.style.display = "block"
  }

  // boton de aceptar cookies
  acceptButton.addEventListener("click", () => {
    localStorage.setItem("cookiesAccepted", "true")
    cookieMenu.style.display = "none"
    overlay.style.display = "none"
  })

  // boton cerrar
  closeButton.addEventListener("click", () => {
    cookieMenu.style.display = "none"
    overlay.style.display = "none"
  })
})
