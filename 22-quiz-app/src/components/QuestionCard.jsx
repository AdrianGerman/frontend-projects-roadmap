import { useState, useEffect } from "react"
import useQuiz from "../context/useQuiz"
import questions from "../data/questions.json"

const QuestionCard = () => {
  const {
    currentQuestionIndex,
    incrementScore,
    recordAnswer,
    nextQuestion,
    timeLeft,
    decrementTime,
    score
  } = useQuiz()
  const [selectedOption, setSelectedOption] = useState(null)

  const question = questions[currentQuestionIndex - 1]

  useEffect(() => {
    const timer = setInterval(() => {
      decrementTime()
    }, 1000)

    if (timeLeft === 0) {
      nextQuestion()
      setSelectedOption(null)
    }

    return () => clearInterval(timer)
  }, [timeLeft, decrementTime, nextQuestion])

  useEffect(() => {
    setSelectedOption(null)
  }, [currentQuestionIndex])

  const handleAnswer = (option) => {
    setSelectedOption(option)

    recordAnswer(question.question, option, question.answer)

    if (option === question.answer) {
      incrementScore()
    }
    setTimeout(() => {
      nextQuestion()
      setSelectedOption(null)
    }, 2000)
  }

  return (
    <div className="bg-[#323232] shadow-md rounded p-6 max-w-lg w-full">
      <h2 className="text-2xl font-bold mb-4">{question.question}</h2>
      <div className="grid grid-cols-2 gap-4">
        {question.options.map((option) => (
          <button
            key={option}
            onClick={() => handleAnswer(option)}
            disabled={!!selectedOption}
            className={`py-2 px-4 rounded text-white font-semibold ${
              selectedOption
                ? option === question.answer
                  ? "bg-green-500"
                  : option === selectedOption
                  ? "bg-red-500"
                  : "bg-gray-300"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="mt-6 text-gray-400 flex justify-between">
        <p>
          Puntuación: <strong>{score}</strong>
        </p>
        <p>Tiempo restante: {timeLeft}</p>
      </div>
    </div>
  )
}

export default QuestionCard
