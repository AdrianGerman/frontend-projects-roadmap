const GEO_KEY = import.meta.env.VITE_API_GEO_KEY

export async function reverseGeocode(coords) {
  try {
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${coords}&key=${GEO_KEY}`
    )

    if (!response.ok) {
      throw new Error(`Error de geocodificación inversa: ${response.status}`)
    }

    const data = await response.json()

    if (data.results && data.results.length > 0) {
      const components = data.results[0].components
      const city =
        components.city ||
        components.town ||
        components.village ||
        components.hamlet
      const state = components.state_code
      const country = components.country

      return `${city}, ${state}, ${country}`
    }

    return coords
  } catch (error) {
    console.error("Error al obtener la ubicación inversa:", error)
    return coords
  }
}
