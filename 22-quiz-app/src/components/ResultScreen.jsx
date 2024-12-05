import useQuiz from "../context/useQuiz"

const ResultScreen = () => {
  const { score, resetQuiz } = useQuiz()

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Resultados finales</h1>
      <p className="text-lg mb-6">
        Tu puntuación final: <strong className="font-bold">{score}</strong>
      </p>
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
