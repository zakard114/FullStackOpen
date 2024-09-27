import React, { useEffect, useState } from 'react'
import countryService from './services/countryService'
import './App.css'

const App = (props) => {
  const [ countries, setCountries ] = useState([])
  const [ search, setSearch ] = useState('')
  const [ filteredCountries, setFilteredCountries ] = useState([])

  useEffect(() => {
    // Get country data from the service
    countryService
      .getAllCountries()
      .then(loadedCountries => {
        console.log('fetched countries: ',loadedCountries)
        
        setCountries(loadedCountries)
      })
  },[])

  const handleSearchChange = (event) => {
    
    const searchValue = event.target.value; 
    setSearch(searchValue);

    if (searchValue.trim() === '') {
      setFilteredCountries([]);
      return;
    }
    
    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchValue.toLowerCase().trim())
    );
  
    const exactMatch = filtered.filter((country) =>
      country.name.common.toLowerCase().trim() === searchValue.toLowerCase().trim()
    );
  
    console.log("Filtered Countries:", filtered);
    console.log("Exact Match:", exactMatch);
  
    if (exactMatch.length === 1) {
      setFilteredCountries(exactMatch)
      return
    } 
    else {
      setFilteredCountries(filtered)
    }
  }
  
  const renderTooManyMatches = () => 
    <p>Too many matches, specify another filter</p>

  const renderSingleCountry = (prop) => {
    console.log("renderSingleCountry")
    return (
      <div>
        <h1>{prop.name.common}</h1>
        <p>captial {prop.capital}</p>
        <p>area {prop.area}</p>
        
        <h3>languages:</h3>
        <ul>
          {Object.values(prop.languages).map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
        <img src={prop.flags.png} alt={prop.flags.alt} width="150px"></img>
      </div>
    )
  }

  const renderCountryList = (counryList) => {
    if(countries.length === 0) {
      return <p>No countries found</p>
    } 

    
    const renderCountries = counryList.map((country) => (
      <div key={country.name.common}>
        <p>{country.name.common}
          <button onClick={()=> setFilteredCountries([country])}>show</button>
      </p>
      </div>
    ))
    return (
      <div>{renderCountries}</div>
    )
  }
  
  return (
    <div>
      <div>
        find countries: <input 
            type="text"
            value={search}
            onChange={handleSearchChange}
            />
      </div>
      <div>
        {/* renderCountryList */}
        {filteredCountries.length > 10
        ? renderTooManyMatches()
        : filteredCountries.length === 1
        ? renderSingleCountry(filteredCountries[0])
        : filteredCountries.length >= 2 
        ? renderCountryList(filteredCountries)
        : <div>No countries found</div>} 
      </div>
    </div>
  )
}

export default App
