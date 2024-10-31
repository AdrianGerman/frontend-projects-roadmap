const flashcards = [
  {
    question: "¿Qué es una variable en JavaScript?",
    answer: "Es un contenedor para almacenar datos."
  },
  {
    question: "¿Qué es un array?",
    answer:
      "Es una estructura de datos para almacenar múltiples valores en una sola variable."
  },
  {
    question: "¿Para qué sirve el método map()?",
    answer:
      "Crea un nuevo array con los resultados de aplicar una función a cada elemento."
  },
  {
    question: "¿Qué es una función?",
    answer:
      "Es un bloque de código diseñado para realizar una tarea específica."
  },
  {
    question: "¿Cuál es la diferencia entre let y var?",
    answer: "let tiene alcance de bloque y var tiene alcance de función."
  }
]

let currentCard = 0
let showingAnswer = false

const cardContent = document.getElementById("cardContent")
const progress = document.getElementById("progress")
const flipButton = document.getElementById("flipButton")
const prevButton = document.getElementById("prevButton")
const nextButton = document.getElementById("nextButton")
const progressPercentage = document.getElementById("progressPercentage")
const cardCounter = document.getElementById("cardCounter")

function updateCard() {
  showingAnswer = false
  cardContent.textContent = flashcards[currentCard].question
  flipButton.textContent = "Ver Respuesta"
  updateProgress()
}

function updateProgress() {
  const progressPercentageValue = ((currentCard + 1) / flashcards.length) * 100
  progress.style.width = `${progressPercentageValue}%`
  progressPercentage.textContent = `${Math.round(progressPercentageValue)}%`
  cardCounter.textContent = `${currentCard + 1} de ${flashcards.length}`
}

flipButton.addEventListener("click", () => {
  if (showingAnswer) {
    cardContent.textContent = flashcards[currentCard].question
    flipButton.textContent = "Ver Respuesta"
  } else {
    cardContent.textContent = flashcards[currentCard].answer
    flipButton.textContent = "Ver Respuesta"
  }
  showingAnswer = !showingAnswer
})

prevButton.addEventListener("click", () => {
  if (currentCard > 0) {
    currentCard--
    updateCard()
  }
})

nextButton.addEventListener("click", () => {
  if (currentCard < flashcards.length - 1) {
    currentCard++
    updateCard()
  }
})

// iniciamos la primer tarjeta
updateCard()
