import Note from './components/Note'
import { useState, useEffect } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'

import notesService from './services/notes'
import loginService from './services/login'

const App = () => {

  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const hook = () => {
    notesService.getAll()
      .then(initialNotes => {
        setNotes(initialNotes);
      })
  }

  useEffect(hook, []);

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging with', username, password)
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      setUsername('')
      setPassword('')
      notesService.setToken(user.token)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }



  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important);


  const addNote = (e) => {
    e.preventDefault();
    const noteObject = {
      content: newNote,
      important: false,
    }

    notesService.create(noteObject, user.token)
      .then(responseNote => {
        setNotes(notes.concat(responseNote));
        setNewNote('');
      })
  }

  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id);
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



  const noteForm = () => (
    <form onSubmit={addNote}>
      <input value={newNote}
        onChange={handleNoteChange}
        placeholder='add a new note...' />
      <button type="submit">save</button>
    </form>
  )

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {!user && <LoginForm handleLogin={handleLogin}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}></LoginForm>}
      {user &&
        <div>
          <p>{user.name} logged in</p>
          {noteForm()}
        </div>
      }

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
            toggleImportance={toggleImportanceOf.bind(null, note.id)} />
        )}
      </ul>

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