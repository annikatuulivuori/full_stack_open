import React from 'react'
import Person from "./Person"

const Persons = ({ persons, newFilter }) => {
    const personsToShow = persons.filter((person) =>
        person.id.toString().includes(newFilter.toLowerCase())
    )
    return (
        <div>
          {personsToShow.map((person) => 
            <Person key={person.name.toLowerCase()} person={person}/>
          )}
        </div>
    )
}

export default Persons