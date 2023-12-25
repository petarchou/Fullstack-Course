import { useState } from 'react'

const NoteForm = ({ createNote }) => {

    const [newNote, setNewNote] = useState('')

    const handleNoteChange = (e) => {
        setNewNote(e.target.value);
      }

      const addNote = (e) => {
        e.preventDefault();
        const content = newNote
        const noteObject = {
          content,
          important: true,
        }
    
        setNewNote('')
        createNote(noteObject)
      }
    
return (
    <form onSubmit={addNote}>
      <input value={newNote}
        onChange={handleNoteChange}
        placeholder='add a new note...' />
      <button type="submit">save</button>
    </form>
)
}

export default NoteForm