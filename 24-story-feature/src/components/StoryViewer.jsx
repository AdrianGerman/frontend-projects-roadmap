import { useEffect } from "react"
import { useSwipeable } from "react-swipeable"

import {
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlayIcon,
  PauseIcon
} from "@heroicons/react/24/solid"

const StoryViewer = ({
  story,
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

  return (
    <div
      {...handlers}
      className="fixed top-0 left-0 w-screen h-screen bg-black flex justify-center"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-300">
        <div
          className="h-full bg-blue-500 transition-all"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-red-500 w-10 h-10 rounded-full flex items-center justify-center transform transition duration-300 hover:bg-red-600 hover:scale-105"
      >
        <XMarkIcon className="w-8 h-6" />
      </button>
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 text-white text-xl w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/70"
        onClick={() => onNavigate("PREV")}
      >
        <ChevronLeftIcon className="w-6 h-6" />
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 text-white text-xl w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/70"
        onClick={() => onNavigate("NEXT")}
      >
        <ChevronRightIcon className="w-6 h-6" />
      </button>
      <img
        src={story.image}
        alt="Story"
        onClick={onPause}
        className="max-w-full max-h-full object-contain cursor-pointer"
      />
      {isPaused && (
        <button
          onClick={onPause}
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
