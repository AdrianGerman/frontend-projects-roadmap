import { useRef } from "react"

const StoryList = ({ stories, onStoryClick, onAddStory }) => {
  const inputRef = useRef(null)

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        onAddStory(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }
  return (
    <div className="flex items-center space-x-4 p-4">
      <button
        className="w-16 h-16 flex justify-center items-center bg-blue-500 text-white text-2xl rounded-full shadow-md hover:bg-blue-600 transition"
        onClick={() => inputRef.current.click()}
      >
        +
      </button>
      {stories.map((story, index) => (
        <div
          key={story.id}
          onClick={() => onStoryClick(index)}
          className="w-16 h-16 rounded-full bg-cover bg-center cursor-pointer shadow-md"
          style={{ backgroundImage: `url(${story.image})` }}
        ></div>
      ))}
      <input
        type="file"
        accept="image/"
        ref={inputRef}
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  )
}

export default StoryList
