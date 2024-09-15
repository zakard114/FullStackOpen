import React, { useState, useRef, useEffect } from 'react'

const Filter = ({search, searchChangeHandler, searchInputRef}) => {
  useEffect(()=> {
    // To prevent future focus issues, set focus to the input element 
    // when the component renders
    searchInputRef.current.focus()
  }, [searchInputRef]) // Executed whenever searchInputRef changes
  
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

const PersonForm =({ formData }) => {
  const { addPerson, newName, nameChangeHandler, 
        newNumber, numberChangeHandler } = formData
        
        // 비어있는 입력값에 대한 오류메시지 추가
        const handleSubmit = (event) => {
          event.preventDefault()
          if(!newName || !newNumber){
            alert('Name and number cannot be empty') // 입력값이 비어있음
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
                <button type="submit">add</button>
              </div>
           </form>
          </div>
      )
    }

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map((person) => (
        <Person 
          key={person.id}
          person={person}
        />
      ))}
    </div>
  )
}

const Person = ({ person }) => (
  <div>
    {person.name} {person.number}
  </div>
)


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'zakard114', number: '12-34-567890', id: 3 },
    { name: 'Mac Lovin', number: '09-87-654321', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  
  // Creating a ref for managing focus
  const searchInputRef = useRef()

  const searchChangeHandler = (event) => {
    setSearch(event.target.value)
  }

  const nameChangeHandler = (event) => {
    setNewName(event.target.value)
  }

  const numberChangeHandler = (event) => {
    setNewNumber(event.target.value)
  } 

  const addPerson = (event) => {
    event.preventDefault()

    const newNameLower = newName.toLowerCase()
    if(persons.some(person => person.name.toLowerCase() === newNameLower)){
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
      return   
    }

    setPersons([...persons, {name: newName, number: newNumber, id:persons.length+1}])
    setNewName('') 
    setNewNumber('')
  }

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

