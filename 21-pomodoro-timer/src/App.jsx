import { useEffect, useState, useRef } from "react"
import "./App.css"

import Timer from "./components/Timer"
import Controls from "./components/Controls"
import SessionTracker from "./components/SessionTracker"

function App() {
  const [time, setTime] = useState(25 * 60)
  const [currentSession, setCurrentSession] = useState("Work")
  const [isRunning, setIsRunning] = useState(false)
  const [workSessions, setWorkSessions] = useState(0)

  const audioRef = useRef(new Audio("/notification.mp3"))

  const handleStartStop = () => {
    if (!isRunning) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    setIsRunning(!isRunning)
  }

  const handleReset = () => {
    setIsRunning(false)
    setCurrentSession("Work")
    setTime(25 * 60)
    setWorkSessions(0)

    audioRef.current.pause()
    audioRef.current.currentTime = 0
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
    audioRef.current.play()

    if (currentSession === "Work") {
      const newWorkSessions = workSessions + 1
      setWorkSessions(newWorkSessions)

      if (newWorkSessions % 4 === 0) {
        setCurrentSession("Long Break")
        setTime(15 * 60)
      } else {
        setCurrentSession("Short Break")
        setTime(5 * 60)
      }
    } else {
      setCurrentSession("Work")
      setTime(25 * 60)
    }

    setIsRunning(false)
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
