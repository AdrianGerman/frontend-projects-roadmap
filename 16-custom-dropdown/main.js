const dropdownHeader = document.getElementById("dropdownHeader")
const dropdownOptions = document.getElementById("dropdownOptions")
const options = document.querySelectorAll(".dropdown-option")

dropdownHeader.addEventListener("click", () => {
  dropdownOptions.classList.toggle("open")
  dropdownHeader.parentElement.classList.toggle("open")
})

options.forEach((option) => {
  option.addEventListener("click", () => {
    const chevron = dropdownHeader.querySelector(".chevron")
    dropdownHeader.innerHTML = `${option.textContent} <span class="chevron">${chevron.textContent}</span>`

    dropdownOptions.classList.remove("open")
    dropdownHeader.parentElement.classList.remove("open")

    options.forEach((opt) => opt.classList.remove("selected"))
    option.classList.add("selected")
  })
})

document.addEventListener("click", (e) => {
  if (
    !dropdownHeader.contains(e.target) &&
    !dropdownOptions.contains(e.target)
  ) {
    dropdownOptions.classList.remove("open")
    dropdownHeader.parentElement.classList.remove("open")
  }
})
