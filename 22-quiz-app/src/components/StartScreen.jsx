import useQuiz from "../context/useQuiz"

const StartScreen = () => {
  const nextQuestions = useQuiz((state) => state.nextQuestions)

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Bienvenidos al cuestionario</h1>
      <p className="text-lg mb-6">
        Pon a prueba tus conocimientos. ¡Buena suerte!
      </p>
      <button
        className="bg-purple-700 text-white py-2 px-4 rounded hover:bg-purple-900"
        onClick={nextQuestions}
      >
        Iniciar
      </button>
    </div>
  )
}

export default StartScreen
