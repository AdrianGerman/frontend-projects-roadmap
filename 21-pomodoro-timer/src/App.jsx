import { useState } from "react"
import "./App.css"

import Timer from "./components/Timer"
import Controls from "./components/Controls"

function App() {
  const [time, setTime] = useState(25 * 60) // 25 minutes
  const [currentSession, setCurrentSession] = useState("Work")
  const [isRunning, setIsRunning] = useState(false)

  const handleStartStop = () => setIsRunning(!isRunning)
  const handleReset = () => {
    setIsRunning(false)
    setCurrentSession("Work")
    setTime(25 * 60)
  }

  return (
    <>
      <h1 className="text-6xl font-bold">Pomodoro Timer</h1>
      <Timer time={time} session={currentSession} />
      <Controls
        onStartStop={handleStartStop}
        onReset={handleReset}
        isRunning={isRunning}
      />
    </>
  )
}

export default App
