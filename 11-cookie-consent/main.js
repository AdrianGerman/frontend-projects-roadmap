document.addEventListener("DOMContentLoaded", () => {
  const cookieMenu = document.querySelector(".cookie-menu")
  const overlay = document.querySelector(".overlay")
  const acceptButton = document.querySelector(".button-cookie button")
  const closeButton = document.querySelector(".close-icon")

  // desactivar la pagina hasta que se cierre la ventana de cookies
  function disablePage() {
    document.body.style.overflow = "hidden"
  }

  // función para habilitar la pagina
  function enablePage() {
    document.body.style.overflow = ""
  }

  // verifica si ya se aceptaron las cookies anteriormente
  if (localStorage.getItem("cookiesAccepted") == "true") {
    cookieMenu.style.display = "none"
    overlay.style.display = "none"
    enablePage()
  } else {
    cookieMenu.style.display = "flex"
    overlay.style.display = "block"
    disablePage()
  }

  // boton de aceptar cookies
  acceptButton.addEventListener("click", () => {
    localStorage.setItem("cookiesAccepted", "true")
    cookieMenu.style.display = "none"
    overlay.style.display = "none"
    enablePage()
  })

  // boton cerrar
  closeButton.addEventListener("click", () => {
    cookieMenu.style.display = "none"
    overlay.style.display = "none"
    enablePage()
  })
})
