import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'

// Filter component
const Filter = ({search, searchChangeHandler, searchInputRef}) => {
  useEffect(()=> {
    // Set focus on the input field when the component is first rendered
    searchInputRef.current.focus()
  }, []) // Runs once on initial render with an empty array []
         // whereas [searchInputRef] runs on every state change
  
  return (
    <div>
      <label htmlFor='search'>filter shown with</label>
      <input 
              id="search"
              value={search}
              onChange={searchChangeHandler}
              // Connecting the ref to the input for managing focus
              ref={searchInputRef}
      />
    </div> 
  ) 
}

// Function to handle error messages for empty input values
const PersonForm =({ formData }) => {
  const { addPerson, newName, nameChangeHandler, 
        newNumber, numberChangeHandler } = formData
        
        // Additional message for empty input
        const handleSubmit = (event) => {
          event.preventDefault()
          if(!newName || !newNumber){
            alert('Name and number cannot be empty') // Input value is empty
            return 
          }
          addPerson(event)
        }

        return (
          <div>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">name:</label> 
                <input id="name"
                      name="name"
                      value={newName} 
                      onChange={nameChangeHandler}
                      autoComplete='name'
                      />
              </div>
              <div>
                <label htmlFor="number">number:</label>
                <input id="number"
                      name="number"
                      value={newNumber} 
                      onChange={numberChangeHandler}
                      autoComplete='tel'
                      />
              </div>
              <div>
                <button type="submit">add</button> {/* Submit button */}
              </div>
           </form>
          </div>
      )
    }

// Persons list component
const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map((person) => (
        <Person 
          key={person.id} // Unique key value
          person={person}
        />
      ))}
    </div>
  )
}

// Individual person component
const Person = ({ person }) => (
  <div>
    {person.name} {person.number}
  </div>
)

// Application root component
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  
  useEffect(()=>{
    // Fetch data from the server
    axios
      .get('http://localhost:3001/persons') // URL should be updated according to the backend 
      .then(response => {
        setPersons(response.data)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  },[]) // Empty dependency array means this runs once when the component is mounted
  
  // Creating a ref for managing focus
  const searchInputRef = useRef()

  // Function to handle changes in search input value
  const searchChangeHandler = (event) => {
    setSearch(event.target.value)
  }

  // Function to handle name input value change
  const nameChangeHandler = (event) => {
    setNewName(event.target.value)
  }

  // Function to handle number input value change
  const numberChangeHandler = (event) => {
    setNewNumber(event.target.value)
  } 

  // Function to handle adding a new person
  const addPerson = (event) => {
    event.preventDefault()

    const newNameLower = newName.toLowerCase()
    if(persons.some(person => person.name.toLowerCase() === newNameLower)){
      alert(`${newName} is already added to phonebook`) // Notification of already added names
      setNewName('')
      setNewNumber('')
      return   
    }

    axios 
      .post('http://localhost:3001/persons', {name: newName, number: newNumber})
      .then(response => {
        setPersons([...persons, response.data])
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        console.error('Error adding person:', error)
      })
  }

  // Filtered list of persons
  const filterPersons = persons.filter(person => 
    person.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      {/* Pass ref to the Filter component for focus management */}
      <Filter 
        search={search} 
        searchChangeHandler={searchChangeHandler}
        searchInputRef={searchInputRef}  
      />

      <h3>Add a new</h3>
      <PersonForm 
        formData={{
          addPerson,
          newName,
          nameChangeHandler,
          newNumber,
          numberChangeHandler
        }}
      />

      <h3>Numbers</h3>
      <Persons
        persons={filterPersons}
      />
    </div>
  )
}

export default App

