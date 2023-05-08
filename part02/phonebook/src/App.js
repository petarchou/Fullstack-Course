import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import FormComponent from './components/FormComponent';
import Contacts from './components/Contacts';

import contactsService from './services/contactsService';

const App = () => {
  const [contacts, setContacts] = useState([]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [nameFilter, setNameFilter] = useState('');


  useEffect(() => {
    contactsService.getAll()
    .then(initialContacts => setContacts(initialContacts));
  }, []);
  

  const personsToShow = showAll
  ? contacts
  : contacts.filter(person => 
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
      contacts.map(person => person.name.toLowerCase())
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
    
    contactsService.create(contact)
    .then(createdContact => setContacts(contacts.concat(createdContact)));
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

      <Contacts personsToShow={personsToShow}/>
    </div>
  )
}

export default App