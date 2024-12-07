import { motion } from "framer-motion"
import {
  WiDaySunny,
  WiCloudy,
  WiDayCloudy,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiFog,
  WiShowers,
  WiHail,
  WiNightClear,
  WiNightCloudy
} from "react-icons/wi"

function WeatherDisplay({ data }) {
  const getWeatherIcon = (description) => {
    if (description.includes("Despejado")) return <WiDaySunny />
    if (description.includes("Parcialmente nublado")) return <WiDayCloudy />
    if (description.includes("Nublado")) return <WiCloudy />
    if (description.includes("Lluvia")) return <WiRain />
    if (description.includes("Llovizna")) return <WiShowers />
    if (description.includes("Nieve")) return <WiSnow />
    if (description.includes("Tormenta")) return <WiThunderstorm />
    if (description.includes("Granizo")) return <WiHail />
    if (description.includes("Niebla")) return <WiFog />
    if (description.includes("Noche despejada")) return <WiNightClear />
    if (description.includes("Noche nublada")) return <WiNightCloudy />
    return <WiDaySunny />
  }

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
    </motion.div>
  )
}

export default WeatherDisplay
