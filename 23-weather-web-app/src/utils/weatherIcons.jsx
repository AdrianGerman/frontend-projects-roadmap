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

export const getWeatherIcon = (description) => {
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
