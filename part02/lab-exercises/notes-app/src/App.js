import Note from './components/Note'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Notification from './components/Notification'

import notesService from './services/notes'

const App = () => {

  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

    const hook = () => {
      notesService.getAll()
        .then(initialNotes => {
          setNotes(initialNotes);
        })
    }

  useEffect(hook, []);
  


  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important);


  const addNote = (e) => {
    e.preventDefault();
    const noteObject = {
      content: newNote,
      important: false,
    }

    notesService.create(noteObject)
    .then(responseNote => {
      setNotes(notes.concat(responseNote));
      setNewNote('');
    })
  }

  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n=> n.id === id);
    const changedNote = {
      ...note,
      important: !note.important,
    }

    notesService.update(id, changedNote)
    .then(responseNote => {
      setNotes(notes.map(note => note.id !== id ? note : responseNote));
    })
    .catch(err => {
      setErrorMessage(
        `Note '${note.content}' has been removed from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setNotes(notes.filter(n => n.id !== note.id));
    })
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note 
          key={note.id}
          note={note}
          toggleImportance={toggleImportanceOf.bind(null,note.id)} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote}
          onChange={handleNoteChange}
          placeholder='add a new note...' />
        <button type="submit">save</button>
      </form>
      <Footer />
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
      <em>Note app, Department of Computer Science, University of Helsinki 2022</em>
    </div>
  )
}

export default App