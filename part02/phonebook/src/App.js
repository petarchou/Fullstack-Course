import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [nameFilter, setNameFilter] = useState('');


  const personsToShow = showAll
  ? persons
  : persons.filter(person => 
    person.name.toLowerCase().includes(nameFilter.toLowerCase()));


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


  const handleFilterChange = (e) => {
    if(e.target.value === '') {
      setShowAll(true);
    }
    else {
      setShowAll(false);
    }
    setNameFilter(e.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div style={{margin: 10+"px"}}>
        <input 
        value={nameFilter}
        onChange={handleFilterChange}
        />
      </div>
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
      {personsToShow.map(person => (
        <div key={person.id}>
          {person.name} - {person.number}
        </div>
      ))}
    </div>
  )
}

export default App