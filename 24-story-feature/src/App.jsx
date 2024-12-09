import { useState, useEffect } from "react"
import moment from "moment"
import { v4 as uuidv4 } from "uuid"
import StoryList from "./components/StoryList"

function App() {
  const [stories, setStories] = useState([])
  const [currentStoryIndex, setCurrentStoryIndex] = useState(null)

  useEffect(() => {
    const storedStories = JSON.parse(localStorage.getItem("stories")) || []
    const validStories = storedStories.filter((story) =>
      moment().isBefore(moment(story.expiry))
    )
    setStories(validStories)
    localStorage.setItem("stories", JSON.stringify(validStories))
  }, [])

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

  return (
    <>
      <h1 className="font-bold text-[3rem]">24hr Story Feature</h1>
      <StoryList
        stories={stories}
        onStoryClick={setCurrentStoryIndex}
        onAddStory={handleAddStory}
      />
    </>
  )
}

export default App
