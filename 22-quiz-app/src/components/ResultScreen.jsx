import useQuiz from "../context/useQuiz"

const ResultScreen = () => {
  const { score, resetQuiz, userAnswers } = useQuiz()

  return (
    <div className="text-center bg-[#323232] text-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Resultados finales</h1>
      <p className="text-xl mb-6">
        <strong className="text-purple-400 font-extrabold">
          Tu puntuación final: {score}
        </strong>
      </p>
      <div className="text-left p-4 rounded-lg mb-4">
        <h2 className="text-md font-bold mb-4">Tus respuestas:</h2>
        <ul className="space-y-4">
          {userAnswers.map(({ question, userAnswer, correctAnswer }, index) => (
            <li key={index} className="p-4 bg-gray-900 rounded-lg">
              <p>
                <strong>Pregunta:</strong> {question}
              </p>
              <p>
                <strong>Tu respuesta:</strong>{" "}
                <span
                  className={`font-bold ${
                    userAnswer === correctAnswer
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {userAnswer || "Sin respuesta"}
                </span>
              </p>
              <p>
                <strong>Respuesta correcta:</strong>{" "}
                <span className="text-green-400 font-bold">
                  {correctAnswer}
                </span>
              </p>
            </li>
          ))}
        </ul>
      </div>
      <button
        className="bg-purple-800 text-white py-2 px-4 rounded 
        transform transition duration-300 hover:bg-purple-900 hover:scale-105"
        onClick={resetQuiz}
      >
        Reiniciar
      </button>
    </div>
  )
}

export default ResultScreen
