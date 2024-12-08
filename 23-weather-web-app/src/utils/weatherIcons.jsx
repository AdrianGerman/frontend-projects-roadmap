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
  const iconPriority = [
    { keyword: "Tormenta", icon: <WiThunderstorm /> },
    { keyword: "Lluvia", icon: <WiRain /> },
    { keyword: "Llovizna", icon: <WiShowers /> },
    { keyword: "Nieve", icon: <WiSnow /> },
    { keyword: "Granizo", icon: <WiHail /> },
    { keyword: "Niebla", icon: <WiFog /> },
    { keyword: "Nublado", icon: <WiCloudy /> },
    { keyword: "Parcialmente nublado", icon: <WiDayCloudy /> },
    { keyword: "Despejado", icon: <WiDaySunny /> },
    { keyword: "Noche despejada", icon: <WiNightClear /> },
    { keyword: "Noche nublada", icon: <WiNightCloudy /> }
  ]

  for (const { keyword, icon } of iconPriority) {
    if (description.includes(keyword)) {
      return icon
    }
  }

  return <WiDaySunny />
}
