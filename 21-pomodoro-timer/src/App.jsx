import { useState } from "react"
import "./App.css"

import Timer from "./components/Timer"

function App() {
  const [time, setTime] = useState(25 * 60) // 25 minutes
  const [currentSession, setCurrentSession] = useState("Work")

  return (
    <>
      <h1 className="text-6xl font-bold">Pomodoro Timer</h1>
      <Timer time={time} session={currentSession} />
    </>
  )
}

export default App
