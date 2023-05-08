import React from 'react'
import contactsService from '../services/contactsService'

const Contacts = ({ personsToShow, handleDelete }) => {

    return (
        <table>
            <tbody>
                {personsToShow.map(person => (
                    <ContactLine key={person.id}
                        person={person}
                        handleDelete={handleDelete} />
                ))}
            </tbody>
        </table>
    )
}

const ContactLine = ({ person, handleDelete }) => {


    return (
        <tr>
            <td>
                {person.name}
            </td>
            <td>
                {person.number}
            </td>
            <td>
                <button onClick={handleDelete.bind(null,person)}>
                    delete
                </button>
            </td>
        </tr>
    );
}

export default Contacts