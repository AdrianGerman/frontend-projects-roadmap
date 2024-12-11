import { useState, useEffect } from "react"
import dayjs from "dayjs"
import "dayjs/locale/es"
import relativeTime from "dayjs/plugin/relativeTime"
import StoryList from "./components/StoryList"
import StoryViewer from "./components/StoryViewer"

dayjs.extend(relativeTime)
dayjs.locale("es")

function App() {
  const [stories, setStories] = useState([])
  const [currentStoryIndex, setCurrentStoryIndex] = useState(null)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const storedStories = JSON.parse(localStorage.getItem("stories")) || []
    const validStories = storedStories.filter((story) =>
      dayjs().isBefore(dayjs(story.expiry))
    )
    setStories(validStories)
    localStorage.setItem("stories", JSON.stringify(validStories))
  }, [])

  useEffect(() => {
    let timer
    if (
      currentStoryIndex !== null &&
      currentStoryIndex < stories.length &&
      !isPaused
    ) {
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setCurrentStoryIndex((prevIndex) => prevIndex + 1)
            setProgress(0)
            return 0
          }
          return prev + 1
        })
      }, 30)
    }
    return () => clearInterval(timer)
  }, [currentStoryIndex, stories.length, isPaused])

  const handleAddStory = (newStory) => {
    const storyWithExpiry = {
      ...newStory,
      expiry: dayjs().add(24, "hours").toISOString()
    }
    const updatedStories = [...stories, storyWithExpiry]
    setStories(updatedStories)
    localStorage.setItem("stories", JSON.stringify(updatedStories))
  }

  const handleNavigation = (direction) => {
    if (direction === "NEXT" && currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1)
      setProgress(0)
      setIsPaused(false)
    } else if (direction === "PREV" && currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1)
      setProgress(0)
      setIsPaused(false)
    }
  }

  const handlePause = () => {
    setIsPaused(!isPaused)
  }

  const closeStoryViewer = () => {
    setCurrentStoryIndex(null)
    setProgress(0)
    setIsPaused(false)
  }

  const handleComplete = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1)
      setProgress(0)
      setIsPaused(false)
    } else {
      closeStoryViewer()
    }
  }

  return (
    <div className="max-w-screen-md mx-auto">
      <div className="p-4 bg-gradient-to-b from-[#242424] to-[#282828] min-h-screen">
        <div>
          <h1 className="font-bold text-3xl mb-4">Historias</h1>
          <StoryList
            stories={stories}
            onStoryClick={setCurrentStoryIndex}
            onAddStory={handleAddStory}
          />
          {currentStoryIndex !== null && (
            <StoryViewer
              stories={stories}
              currentStoryIndex={currentStoryIndex}
              progress={progress}
              onNavigate={handleNavigation}
              onPause={handlePause}
              onComplete={handleComplete}
              onClose={closeStoryViewer}
              isPaused={isPaused}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default App
