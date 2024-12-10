import { useEffect } from "react"
import { useSwipeable } from "react-swipeable"

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
        className="absolute top-4 right-4 bg-red-500 text-white text-lg w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-600"
      >
        X
      </button>
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 text-white text-xl w-12 h-12 rounded-full flex items-center justify-center hover:bg-black/70"
        onClick={() => onNavigate("PREV")}
      >
        &lt;
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 text-white text-xl w-12 h-12 rounded-full flex items-center justify-center hover:bg-black/70"
        onClick={() => onNavigate("NEXT")}
      >
        &gt;
      </button>
      <img
        src={story.image}
        alt="Story"
        onClick={onPause}
        className="max-w-full max-h-full object-contain cursor-pointer"
      />
      {isPaused && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-2xl font-bold">
          PAUSED
        </div>
      )}
    </div>
  )
}

export default StoryViewer
