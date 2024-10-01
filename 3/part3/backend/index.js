const express = require('express')
const app = express()

let notes = [
    {
      id: 1,
      content: "This is a note",
      important: true
    },
    {
      id: 2,
      content: "This is another note",
      important: false
    }
  ]
  
app.use(express.json())

const generatedId = () => {
  const maxId = notes.length > 0
  ? Math.max(...notes.map(n => Number(n.id)))
  : 0
  return String(maxId + 1)
}

app.post('/api/notes', (request, response) => {  
  const body = request.body

  if(!body.content) {
    return response.status(400).json({
      error:'content missing'
    })
  }

  const note = {
    content: body.content,
    important: Boolean(body.important) ||  false,
    id: generatedId(),
  }
  notes = notes.concat(note)
  response.json(note)
})

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes/:id', (request, response) => {
    const id = parseInt(request.params.id)
    const note = notes.find(note => note.id === id)
    
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  })
  
app.delete('/api/notes/:id', (request, response) => {
  const id = parseInt(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

  
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

