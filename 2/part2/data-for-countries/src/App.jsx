import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'




const App = (props) => {
  const [ countries, setCountries ] = useState([])
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    axios.get()
  })

  return (
    <div>
      <h1>Country Data</h1>
      <div>
        <input 
          type="text"
          value={filter}
          onChange={handleFilterChange}
          placeholder="find countries"
          />
      </div>

    </div>
  
  )
}

export default App
