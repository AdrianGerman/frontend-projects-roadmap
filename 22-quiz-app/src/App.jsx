import StartScreen from "./components/StartScreen"
import useQuiz from "./context/useQuiz"
import QuestionCard from "./components/QuestionCard"
import questions from "./data/questions.json"
import "./App.css"
import ResultScreen from "./components/ResultScreen"

function App() {
  const { currentQuestionIndex } = useQuiz()
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center p-2">
        {currentQuestionIndex === 0 ? (
          <StartScreen />
        ) : currentQuestionIndex <= questions.length ? (
          <QuestionCard />
        ) : (
          <ResultScreen />
        )}
      </div>
    </>
  )
}

export default App
