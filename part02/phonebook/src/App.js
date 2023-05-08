import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import FormComponent from './components/FormComponent';
import Contacts from './components/Contacts';
import Notification from './components/Notification';
import ErrorBox from './components/Error';

import contactsService from './services/contactsService';

const App = () => {
  const [contacts, setContacts] = useState([]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [nameFilter, setNameFilter] = useState('');
  const [notification, setNotification] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    contactsService.getAll()
      .then(initialContacts => setContacts(initialContacts));
  }, []);

  const changeNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 5000);
  }


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
    const contactState = contacts.find(contact => contact.name === newName);

    const contact = {
      ...contactState,
      number: newNumber,
    } 

    contactsService.update(contact.id, contact)
      .then(updatedContact => {
        const message = `The number of '${newName}' was updated to ${newNumber}`;
        changeNotification(message);
        return setContacts(
          contacts.map(contact => contact.id !== updatedContact.id
            ? contact
            : updatedContact)
        )
      })
      .catch(err => {
        const message = `${contact.name} was already deleted from server`;
        setError(message);
        setTimeout(()=> setError(null),5000);
        setContacts(contacts.filter(c => c.id !== contact.id));
      })
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
        .then(createdContact => setContacts(contacts.concat(createdContact)))
        .then(() => {
          const message = `Contact created: '${contact.name} - ${contact.number}'`;
          changeNotification(message);
        })
    }
    setNewName('');
    setNewNumber('');
  }

  const handleDelete = (person) => {
    const message = `Are you sure you want to delete ${person.name}?`
    if (window.confirm(message)) {
      contactsService.remove(person.id)
        .then(() => {
          const notification = `Contact '${person.name}' was deleted`;
          changeNotification(notification);
        })
        .catch(err => {
          const message = `${person.name} was already deleted from server`;
          setError(message);
          setTimeout(()=> setError(null),5000);
        })
        .finally(()=> {
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
      <Notification message={notification} />
      <ErrorBox message={error} />
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