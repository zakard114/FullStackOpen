import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'


// Application root component
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  
  useEffect(()=>{
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
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

    const existingPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())

    if(existingPerson){
      const confirmUpdate = window.confirm(`${newName} is already added to phonebook. Would you like to update ${newName}'s number?`)
      if(confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newNumber}
        personService.update(existingPerson.id, updatedPerson).then(returnedPerson => {
          setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
          setNewName('')
          setNewNumber('')
        })
      }
    } else {
      personService
      .create({name: newName, number: newNumber})
      .then(response => {
        setPersons([...persons, response])
        setNewName('')
        setNewNumber('')
      })
    }
  }

  // Filtered list of persons
  const filterPersons = persons.filter(person => 
    person.name.toLowerCase().includes(search.toLowerCase())
  )

  const deletePerson = (id, name) => {
    if(window.confirm(`Delete ${name} ?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          alert(`the person '${name}' was already deleted from the server`)
          setPersons(persons.filter(person => person.id !== id))
        }) 
    }
  }

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
        deletePerson={deletePerson}
      />
    </div>
  )
}

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
const Persons = ({ persons, deletePerson }) => {
  return (
    <div>
      {persons.map((person) => (
        <Person 
          key={person.id} // Unique key value
          person={person}
          deletePerson={deletePerson} // Passing the delete function
        />
      ))}
    </div>
  )
}

// Individual person component
const Person = ({ person, deletePerson }) => (
  <div>
    {person.name} {person.number}
    {/* Delete button */}
    <button onClick={() => deletePerson(person.id, person.name)}>delete</button>
  </div>
)

export default App