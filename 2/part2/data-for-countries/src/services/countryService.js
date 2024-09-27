
import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getAllCountries = () => {
    return axios
            .get(baseUrl)
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching the countries:', error)
                alert('Failed to load countries. Please try again.')
                return []
            })
        }
        

export default { getAllCountries }

      