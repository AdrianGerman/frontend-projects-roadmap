const API_KEY = import.meta.env.VITE_API_KEY

const translateDescription = (description) => {
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
  return translations[description] || description
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

    return {
      location: data.resolvedAddress,
      temperature: data.currentConditions.temp,
      description: translateDescription(data.currentConditions.conditions),
      humidity: data.currentConditions.humidity,
      windSpeed: data.currentConditions.windspeed
    }
  } catch (error) {
    console.error("Error al obtener los datos metereologicos:", error)
  }
}
