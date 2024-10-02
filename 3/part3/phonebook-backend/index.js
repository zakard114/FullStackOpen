const express = require('express')
const app = express()

app.use(express.json()) // Required for parsing JSON in POST requests

let persons = [
    { 
      id: "1",
      name: "Arto Hellas", 
      number: "040-123456"
    },
    { 
      id: "2",
      name: "Ada Lovelace", 
      number: "39-44-5323523"
    },
    { 
      id: "3",
      name: "Dan Abramov", 
      number: "12-43-234345"
    },
    { 
      id: "4",
      name: "Mary Poppendieck", 
      number: "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
  const currentTime = new Date().toString()
  const numOfPersons = persons.length

  response.send(`
    <p>Phonebook has info for ${numOfPersons} people</p>
    <p>${currentTime}</p>
    `)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(p => p.id === id)

  if(person) {
    response.json(person)
  } else {
    response.status(404).send({error: 'Person not found'})
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()  // 204: No Content
})

const generatedId = () => {
  return Math.floor(Math.random() * 1000000)
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if(!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number doesn't exist"
    })
  }

  const validName = persons.some(person => person.name === body.name)
  if(validName) {
    return response.status(400).json({
      error:'name must be unique'
    })
  }

  const person = {
    id: generatedId(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)
  response.json(person)
  
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})



