import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { fetchWeather } from "./utils/api"
import WeatherSearch from "./components/WeatherSearch"
import WeatherDisplay from "./components/WeatherDisplay"
import Loader from "./components/Loader"
import "./App.css"

function App() {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const fetchWeatherByCurrentLocation = async () => {
    setLoading(true)
    setError("")
    setWeatherData(null)

    try {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords
            const location = `${latitude},${longitude}`
            const data = await fetchWeather(location)
            setWeatherData(data)
            setLoading(false)
          },
          (err) => {
            console.error("Error obteniendo la ubicación")
            setError(
              "No se pudo obtener la ubicación. Intente buscar manualmente"
            )
            setLoading(false)
          }
        )
      } else {
        setError("La geolocalización no es soportada en tu navegador")
        setLoading(false)
      }
    } catch (error) {
      setError("Error al obtener el clima de la ubicación actual")
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWeatherByCurrentLocation()
  }, [])

  const handleSearch = async (location) => {
    setLoading(true)
    setError("")
    setWeatherData(null)

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

  const handleUpdate = async () => {
    if (weatherData && weatherData.location) {
      setLoading(true)
      setError("")
      setWeatherData(null)

      try {
        const data = await fetchWeather(weatherData.location)
        setWeatherData(data)
      } catch (error) {
        setError("Error al actualizar los datos del clima.")
      }
      setLoading(false)
    }
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

        {loading && (
          <div className="flex justify-center">
            <Loader />
          </div>
        )}
        {error && <p className="mb-4">{error}</p>}
        {weatherData && (
          <WeatherDisplay data={weatherData} onUpdate={handleUpdate} />
        )}
      </motion.div>
    </div>
  )
}

export default App
