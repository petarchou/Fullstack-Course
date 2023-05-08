import { useState } from 'react'
import Filter from './components/Filter'
import FormComponent from './components/FormComponent';
import Contacts from './components/Contacts';

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
  
  //render persons
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
      id: persons.length+1,
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
      <h1>Phonebook</h1>

      <Filter value={nameFilter} handleChange={handleFilterChange}/>
      
      <h2>Add new contact</h2>
      <FormComponent submit={submitNewContact}
      name={newName}
      nameChange={handleNameInputChange}
      number={newNumber}
      numberChange={handleNumberInputChange}
      />

      <h2>Contacts</h2>
      {/* Contacts component */}

      <Contacts personsToShow={personsToShow}/>
    </div>
  )
}

export default App