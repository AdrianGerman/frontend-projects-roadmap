import { reverseGeocode } from "./geocode"

const API_KEY = import.meta.env.VITE_API_KEY

export const translateDescription = (description) => {
  const translations = {
    Clear: "Despejado",
    "Partially cloudy": "Parcialmente nublado",
    Overcast: "Nublado",
    Rain: "Lluvia",
    Showers: "Llovizna",
    Snow: "Nieve",
    Thunderstorm: "Tormenta eléctrica",
    Hail: "Granizo",
    Fog: "Niebla",
    "Clear night": "Noche despejada",
    "Cloudy night": "Noche nublada"
  }

  const conditions = description.split(",").map((cond) => cond.trim())
  return conditions.map((cond) => translations[cond] || cond).join(", ")
}

export async function fetchWeather(location) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${API_KEY}&contentType=json`
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    const locationName = /^[0-9.,-]+$/.test(data.resolvedAddress)
      ? await reverseGeocode(location)
      : data.resolvedAddress

    const now = new Date()
    const hoursPast = data.days[0].hours.filter((hour) => {
      const hourDate = new Date(`${data.days[0].datetime}T${hour.datetime}`)
      return hourDate < now
    })
    const hoursFuture = data.days[0].hours.filter((hour) => {
      const hourDate = new Date(`${data.days[0].datetime}T${hour.datetime}`)
      return hourDate >= now
    })

    return {
      location: locationName,
      temperature: data.currentConditions.temp,
      description: translateDescription(data.currentConditions.conditions),
      humidity: data.currentConditions.humidity,
      windSpeed: data.currentConditions.windspeed,
      hoursPast: hoursPast.map((hour) => ({
        ...hour,
        description: translateDescription(hour.conditions)
      })),
      hoursFuture: hoursFuture.map((hour) => ({
        ...hour,
        description: translateDescription(hour.conditions)
      }))
    }
  } catch (error) {
    console.error("Error al obtener los datos meteorológicos:", error)
    throw error
  }
}
