import useQuiz from "../context/useQuiz"

const StartScreen = () => {
  const nextQuestion = useQuiz((state) => state.nextQuestion)

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Bienvenidos al cuestionario</h1>
      <p className="text-lg mb-6">
        Pon a prueba tus conocimientos. ¡Buena suerte!
      </p>
      <button
        className="bg-purple-800 text-white py-2 px-4 rounded 
        transform transition duration-300 hover:bg-purple-900 hover:scale-105"
        onClick={() => nextQuestion()}
      >
        Iniciar
      </button>
    </div>
  )
}

export default StartScreen
