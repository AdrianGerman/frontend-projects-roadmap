import { useEffect } from "react"
import { useSwipeable } from "react-swipeable"
import {
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlayIcon,
  PauseIcon
} from "@heroicons/react/24/solid"
import dayjs from "dayjs"

const StoryViewer = ({
  stories,
  currentStoryIndex,
  progress,
  onNavigate,
  onPause,
  onComplete,
  onClose,
  isPaused
}) => {
  const handlers = useSwipeable({
    onSwipedLeft: () => onNavigate("NEXT"),
    onSwipedRight: () => onNavigate("PREV")
  })

  useEffect(() => {
    if (progress >= 100) {
      onComplete()
    }
  }, [progress, onComplete])

  const handleScreenClick = (e) => {
    const screenWidth = e.currentTarget.offsetWidth
    const clickPosition = e.clientX

    if (clickPosition < screenWidth / 2) {
      onNavigate("PREV")
    } else {
      onNavigate("NEXT")
    }
  }

  return (
    <div
      {...handlers}
      onClick={handleScreenClick}
      className="fixed top-0 left-0 w-screen h-screen bg-black flex justify-center"
    >
      <div className="absolute top-0 left-0 w-full flex">
        {stories.map((story, index) => (
          <div
            key={index}
            className="h-1 flex-1 mx-0.5 bg-gray-300 relative overflow-hidden"
          >
            {index < currentStoryIndex && (
              <div className="absolute top-0 left-0 h-full bg-purple-700 w-full"></div>
            )}
            {index === currentStoryIndex && (
              <div
                className="absolute top-0 left-0 h-full bg-purple-700"
                style={{
                  width: `${progress}%`,
                  transition: progress === 0 ? "none" : "width 0.1s linear"
                }}
              ></div>
            )}
          </div>
        ))}
      </div>

      <div className="absolute top-5 left-2 bg-black/50 text-white px-3 py-1 rounded-md text-sm shadow-md">
        {dayjs(stories[currentStoryIndex]?.timestamp).format("hh:mm A")}
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
        className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transform transition duration-300 hover:scale-105"
      >
        <XMarkIcon className="w-8 h-6" />
      </button>

      {currentStoryIndex > 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onNavigate("PREV")
          }}
          className="hidden md:flex absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 text-white text-xl w-10 h-10 rounded-full items-center justify-center hover:bg-black/70"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
      )}

      {currentStoryIndex < stories.length - 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onNavigate("NEXT")
          }}
          className="hidden md:flex absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 text-white text-xl w-10 h-10 rounded-full items-center justify-center hover:bg-black/70"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      )}

      <div className="transition-opacity duration-300 flex items-center justify-center w-full h-full">
        <img
          src={stories[currentStoryIndex]?.image}
          alt="Story"
          onClick={(e) => {
            e.stopPropagation()
            onPause()
          }}
          className="max-w-full max-h-full object-contain cursor-pointer"
        />
      </div>

      {isPaused && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onPause()
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white w-12 h-12 rounded-full flex items-center justify-center bg-black/70"
        >
          {isPaused ? (
            <PlayIcon className="w-6 h-6" />
          ) : (
            <PauseIcon className="w-6 h-6" />
          )}
        </button>
      )}
    </div>
  )
}

export default StoryViewer
