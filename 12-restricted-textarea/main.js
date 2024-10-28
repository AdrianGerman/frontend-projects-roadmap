const messageElement = document.getElementById("message")
const charCountElement = document.getElementById("charCount")
const maxChars = 250

messageElement.addEventListener("input", () => {
  const currentLength = messageElement.value.length
  charCountElement.textContent = `${currentLength} / ${maxChars}`

  if (currentLength >= maxChars) {
    messageElement.classList.add("char-limit")
    charCountElement.classList.add("char-limit")
  } else {
    messageElement.classList.remove("char-limit")
    charCountElement.classList.remove("char-limit")
  }
})
