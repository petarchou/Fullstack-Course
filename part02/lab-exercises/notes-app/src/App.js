import Note from './components/Note'
import { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import NoteForm from './components/NoteForm'

import notesService from './services/notes'
import loginService from './services/login'

const App = () => {

  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const noteFormRef = useRef()

  const initialNotesHook = () => {
    notesService.getAll()
      .then(initialNotes => {
        setNotes(initialNotes);
      })
  }

  const loggedHook = () => {
    const userJson = window.localStorage.getItem('loggedUser')
    if (userJson) {
      const user = JSON.parse(userJson)
      setUser(user)
      notesService.setToken(user.token)
    }
  }

  useEffect(initialNotesHook, []);
  useEffect(loggedHook, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging with', username, password)
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      window.localStorage.setItem(
        'loggedUser',
        JSON.stringify(user)
      )
      notesService.setToken(user.token)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } finally {
      setUsername('')
      setPassword('')
    }
  }

  const logout = (e) => {
    e.preventDefault()
    window.localStorage.removeItem('loggedUser')
    notesService.setToken(null)
    window.location.reload()
  }



  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important);


    const createNote = async (noteObject) => {
      noteFormRef.current.toggleVisibility()
      const createdNote = await notesService.create(noteObject, user.token)
      setNotes(notes.concat(createdNote));
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

  const loginForm = () => {

    return (
      <Togglable buttonLabel='login'>
        <LoginForm handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}></LoginForm>
      </Togglable>
    )
  }

  const noteForm = () => (
    <Togglable buttonLabel='new note' ref={noteFormRef}>
      <NoteForm createNote={createNote} />
    </Togglable>
  )

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {!user && loginForm()}
      {user &&
        <div>
          <p>{user.name} logged in</p>
          <button onClick={logout}>logout</button>
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