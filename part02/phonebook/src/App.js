import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: '0878342198',
    }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');


  const handleNameInputChange = (e) => {
    setNewName(e.target.value);
  }

  const handleNumberInputChange = (e) => {
    setNewNumber(e.target.value);
  }

  const submitNewContact = (e) => {
    e.preventDefault();

    if(
      persons.map(person => person.name.toLowerCase())
      .includes(newName.toLowerCase())
    ) {
      window.alert(
        `Contact with name ${newName} already exists`
      );
    }
    else {
    const contact = {
      name: newName,
      number: newNumber,
    }
    setPersons(persons.concat(contact));
  }
    setNewName('');
    setNewNumber('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={submitNewContact}>
        <div>
          name: <input
            value={newName}
            placeholder='add contact name...'
            onChange={handleNameInputChange}
          />
        </div>
        <div>
          number: <input
            value={newNumber}
            placeholder='add contact number...'
            onChange={handleNumberInputChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Contacts</h2>
      {persons.map(person => (
        <div key={person.name}>
          {person.name} - {person.number}
        </div>
      ))}
    </div>
  )
}

export default App