import { useRef } from "react"
import dayjs from "dayjs"
import "dayjs/locale/es"
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)
dayjs.locale("es")

const StoryList = ({ stories, onStoryClick, onAddStory }) => {
  const inputRef = useRef(null)

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const imageData = reader.result
        onAddStory({
          id: Date.now().toString(),
          image: imageData,
          timestamp: dayjs().toISOString()
        })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="flex items-start space-x-4 py-4 overflow-x-auto">
      <div className="flex space-x-4 flex-nowrap">
        <div className="flex flex-col items-center space-y-3">
          <button
            className="w-16 h-16 flex justify-center items-center border border-dashed border-purple-700 text-white text-2xl rounded-full shadow-md transform transition duration-300 hover:border-purple-800 hover:scale-105"
            onClick={() => inputRef.current.click()}
          >
            +
          </button>
          <span className="text-[11px] text-gray-500 text-center">
            Añadir estado
          </span>
        </div>

        {stories.map((story, index) => (
          <div
            key={story.id}
            className="flex flex-col items-center space-y-3 w-16 flex-shrink-0"
          >
            <div
              onClick={() => onStoryClick(index)}
              className="w-16 h-16 rounded-full bg-cover bg-center cursor-pointer shadow-md transform transition duration-300 hover:scale-110"
              style={{ backgroundImage: `url(${story.image})` }}
            ></div>
            <span className="text-[11px] text-gray-500 text-center break-words">
              {dayjs(story.timestamp).fromNow().charAt(0).toUpperCase() +
                dayjs(story.timestamp).fromNow().slice(1)}
            </span>
          </div>
        ))}
      </div>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  )
}

export default StoryList
