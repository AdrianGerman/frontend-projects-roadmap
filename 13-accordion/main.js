document.addEventListener("DOMContentLoaded", function () {
  const headers = document.querySelectorAll(".acordeon-header")

  headers.forEach((header) => {
    header.addEventListener("click", function () {
      // Cerrar cualquier contenido abierto que no sea el actual
      const openContent = document.querySelector(".acordeon-content.show")
      const openHeader = document.querySelector(".acordeon-header.active")

      if (openContent && openContent !== this.nextElementSibling) {
        openContent.classList.remove("show")
        openContent.style.display = "none"
      }

      if (openHeader && openHeader !== this) {
        openHeader.classList.remove("active")
      }

      // Alternar el contenido correspondiente
      const content = this.nextElementSibling
      if (content.style.display === "block") {
        content.style.display = "none"
        content.classList.remove("show")
        this.classList.remove("active")
      } else {
        content.style.display = "block"
        content.classList.add("show")
        this.classList.add("active")
      }
    })
  })
})
