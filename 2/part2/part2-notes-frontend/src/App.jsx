import { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'


// #3
const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('') // #7
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('some error happened...')

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])
  console.log('render', notes.length, 'notes')

  //#4, #6
  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
      // id: String(notes.length + 1)
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })

    // axios 
    //   .post('http://localhost:3001/notes', noteObject)
    //   .then(response => {
    //     setNotes(notes.concat(response.data))
    //     setNewNote('')
    //   })
    
  }

  const Notification = ({ message }) => {
    if(message === null){
      return null
    }

    return (
      <div className='error'>
        {message}
      </div>
    )
  }

  const Footer = () => {
    const footerStyle = {
      color: 'green',
      fontStyle: 'italic',
      fontSize: 16
    }
    return (
      <div style={footerStyle}>
        <br />
        <em>Note app, Department of Computer Science, University of Helsinki 2024</em>
      </div>
    )
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n=> n.id == id)
    const changedNote = {...note, important: !note.important}
    console.log(changedNote);

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id? note:returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)

        setNotes(notes.filter(n => n.id !== id))
      })
    }


  // #6
  const handleInputChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value); // #7
  }

  // #10
  const notesToShow = showAll ? 
  notes : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
      {/* #8 */}
      <div>
        <button onClick={()=>
        setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      {/* #9 */}
      <ul>
        {notesToShow.map(note => 
          <Note 
            key={note.id} 
            note={note}
            toggleImportance={
             () => toggleImportanceOf(note.id) 
            } /> // #11
        )}
        {/* #5 */}
      </ul>
      <form onSubmit={addNote}>
        <input 
        value={newNote}
        onChange={handleInputChange}
        />
        <button type="submit">save</button>
      </form>

      <Footer />
    </div>
  )
}



export default App