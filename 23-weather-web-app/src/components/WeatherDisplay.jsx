import { motion } from "framer-motion"
import { getWeatherIcon } from "../utils/weatherIcons"

function WeatherDisplay({ data, onUpdate }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-lg mb-4">{data.location}</h2>
      <div className="flex justify-around items-center mb-4">
        <div className="text-7xl">{getWeatherIcon(data.description)}</div>
        <div className="text-5xl font-bold">{data.temperature}°C</div>
      </div>
      <p className="text-lg mb-4">{data.description}</p>
      <div className="flex justify-between text-sm">
        <span>Humedad: {data.humidity}%</span>
        <span>Viento: {data.windSpeed}km/h</span>
      </div>
      <button
        onClick={onUpdate}
        className="mt-4 px-4 py-2 bg-purple-800 rounded transform transition duration-300 hover:bg-purple-900 hover:scale-105"
      >
        Actualizar
      </button>
    </motion.div>
  )
}

export default WeatherDisplay
