import { useState, useEffect } from "react"
import moment from "moment"
import { v4 as uuidv4 } from "uuid"
import StoryList from "./components/StoryList"
import StoryViewer from "./components/StoryViewer"

function App() {
  const [stories, setStories] = useState([])
  const [currentStoryIndex, setCurrentStoryIndex] = useState(null)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const storedStories = JSON.parse(localStorage.getItem("stories")) || []
    const validStories = storedStories.filter((story) =>
      moment().isBefore(moment(story.expiry))
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

  const handleAddStory = (imageData) => {
    const newStory = {
      id: uuidv4(),
      image: imageData,
      expiry: moment().add(24, "hours").toISOString()
    }
    const updatedStories = [...stories, newStory]
    setStories(updatedStories)
    localStorage.setItem("stories", JSON.stringify(updatedStories))
  }

  // new

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
    <>
      <h1 className="font-bold text-[3rem]">24hr Story Feature</h1>
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
    </>
  )
}

export default App
