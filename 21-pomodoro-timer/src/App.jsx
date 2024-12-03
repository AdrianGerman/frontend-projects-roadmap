import { useEffect, useState } from "react"
import "./App.css"

import Timer from "./components/Timer"
import Controls from "./components/Controls"
import SessionTracker from "./components/SessionTracker"

function App() {
  const [time, setTime] = useState(0.2 * 60) // 25 minutes
  const [currentSession, setCurrentSession] = useState("Work")
  const [isRunning, setIsRunning] = useState(false)
  const [workSessions, setWorkSessions] = useState(0)

  const handleStartStop = () => setIsRunning(!isRunning)
  const handleReset = () => {
    setIsRunning(false)
    setCurrentSession("Work")
    setTime(25 * 60)
  }

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(interval)
            handleSessionEnd()
            return 0
          }
          return prevTime - 1
        })
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [isRunning])

  const handleSessionEnd = () => {
    const audio = new Audio("/notification.mp3")
    audio.play()

    if (currentSession === "Work") {
      setWorkSessions((prev) => prev + 1)
      setCurrentSession(workSessions % 4 === 3 ? "Long Break" : "Short Break")
      setTime(workSessions % 4 === 3 ? 15 * 60 : 5 * 60)
    } else {
      setCurrentSession("Work")
      setTime(25 * 60)
    }
  }

  return (
    <>
      <h1 className="text-4xl font-bold text-center mb-6">Pomodoro Timer</h1>
      <div className="bg-[#323232] p-4 rounded-md shadow-xl">
        <Timer time={time} session={currentSession} />
        <Controls
          onStartStop={handleStartStop}
          onReset={handleReset}
          isRunning={isRunning}
        />
        <SessionTracker workSessions={workSessions} />
      </div>
    </>
  )
}

export default App
