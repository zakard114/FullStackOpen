const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'

const getWeather = async (capital, api_key) => {
  try {
    const response = await fetch(`${baseUrl}?q=${capital}&units=metric&appid=${api_key}`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch weather data')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching weather data:', error)
    return null
  }
}

export default getWeather
