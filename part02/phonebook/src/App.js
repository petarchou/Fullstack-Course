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

  const updateContactNumber = () => {
    contactsService.getByName(newName)
          .then(contactEntity => {
            contactEntity.number = newNumber;
            return contactEntity;
          })
          .then(updatedContact => contactsService.update(
            updatedContact.id, updatedContact
          ))
          .then(updatedContact => setContacts(
            contacts.map(contact => contact.id !== updatedContact.id
              ? contact
              : updatedContact)
          ));
  }

  const submitNewContact = (e) => {
    e.preventDefault();

    if (contacts.map(person => person.name).includes(newName)) {
      const message = `${newName} already exists in the phonebook, replace the old number with a new one?`;
      if (window.confirm(message)) {
        updateContactNumber();
      }
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

  const handleDelete = (person) => {
    const message = `Are you sure you want to delete ${person.name}?`
    if (window.confirm(message)) {
      contactsService.remove(person.id)
        .then(() => {
          setContacts(contacts.filter(c => c.id !== person.id));
        })
    }
  }


  const handleFilterChange = (e) => {
    if (e.target.value === '') {
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

      <Filter value={nameFilter} handleChange={handleFilterChange} />

      <h2>Add new contact</h2>
      <FormComponent submit={submitNewContact}
        name={newName}
        nameChange={handleNameInputChange}
        number={newNumber}
        numberChange={handleNumberInputChange}
      />

      <h2>Contacts</h2>

      <Contacts handleDelete={handleDelete} personsToShow={personsToShow} />
    </div>
  )
}

export default App