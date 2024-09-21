import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios
        .get(baseUrl)
        .then(response => {
            return response.data
        })
        .catch(error => {
            console.error('Error fetching data:', error)
            alert('Failed to add person. Please try again.')
            return []
        })
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
                  .catch(error => {
                    console.error('Error adding person:', error)
                    return null
                  })
                  .catch(error => {
                    console.error('Error adding person:', error)
                  })
}

const remove = id => {
  return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
              .then(response => response.data)
}

export default { getAll, create, remove, update };

