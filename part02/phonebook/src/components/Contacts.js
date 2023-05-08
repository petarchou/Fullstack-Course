import React from 'react'

const Contacts = ({ personsToShow }) => {

    return (
        <table>
            <tbody>
                {personsToShow.map(person => (
                    <ContactLine key={person.id} person={person}/>
            ))}
            </tbody>
        </table>
    )
}

const ContactLine = ({person}) => {

    return (
        <tr>
            <td>
                {person.name}
            </td>
            <td>
                {person.number}
            </td>
        </tr>
    );
}

export default Contacts