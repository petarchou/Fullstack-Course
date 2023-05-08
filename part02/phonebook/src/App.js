import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')


  const handleNewName = (e) => {
    setNewName(e.target.value);
  }

  const submitNewContact = (e) => {
    e.preventDefault();
    const contact = {
      name: newName,
    }

    setPersons(persons.concat(contact));
    setNewName('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={submitNewContact}>
        <div>
          name: <input
            value={newName}
            placeholder='add new contact...'
            onChange={handleNewName}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => (
        <div key={person.name}>
          {person.name}
        </div>
      ))}
    </div>
  )
}

export default App