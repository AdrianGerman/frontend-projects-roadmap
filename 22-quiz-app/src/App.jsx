import StartScreen from "./components/StartScreen"
import useQuiz from "./context/useQuiz"
import QuestionCard from "./components/QuestionCard"
import questions from "./data/questions.json"
import "./App.css"

function App() {
  const { currentQuestionIndex } = useQuiz()
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center">
        {currentQuestionIndex === 0 ? (
          <StartScreen />
        ) : currentQuestionIndex <= questions.length ? (
          <QuestionCard />
        ) : (
          <p>Resultados</p>
        )}
      </div>
    </>
  )
}

export default App
