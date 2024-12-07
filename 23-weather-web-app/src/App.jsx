import { useState } from "react"
import { motion } from "framer-motion"
import { fetchWeather } from "./utils/api"
import WeatherSearch from "./components/WeatherSearch"
import "./App.css"
import WeatherDisplay from "./components/WeatherDisplay"

function App() {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSearch = async (location) => {
    setLoading(true)
    setError("")
    try {
      const data = await fetchWeather(location)
      setWeatherData(data)
    } catch (error) {
      setError(
        "Error al obtener los datos del clima. Por favor, intente de nuevo."
      )
    }
    setLoading(false)
  }
  return (
    <div className="text-center text-white">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-md max-w-md w-full"
      >
        <h1 className="font-bold text-xl mb-6">Aplicación del clima</h1>
        <WeatherSearch onSearch={handleSearch} />

        {loading && <p className="mb-4">Cargando...</p>}
        {error && <p className="mb-4">{error}</p>}
        {weatherData && <WeatherDisplay data={weatherData} />}
      </motion.div>
    </div>
  )
}

export default App
