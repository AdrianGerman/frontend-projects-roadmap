import { useState } from "react"
import { motion } from "framer-motion"

function WeatherSearch({ onSearch }) {
  const [location, setLocation] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (location.trim()) {
      onSearch(location)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex mb-6">
      <input
        className="flex-grow p-2 px-4 border-none rounded-l-2xl text-base"
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Ingresa una ubicación"
      />
      <motion.button
        className="p-2 px-4 border-none bg-[#76428a] text-white rounded-r-2xl cursor-pointer text-base"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 1 }}
        type="submit"
      >
        Buscar
      </motion.button>
    </form>
  )
}

export default WeatherSearch
