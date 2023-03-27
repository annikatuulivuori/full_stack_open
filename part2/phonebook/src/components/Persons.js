import Person from "./Person"

const Persons = ({ persons, newFilter, deletePerson }) => {
    const personsToShow = persons.filter((person) =>
        person.name.toLowerCase().includes(newFilter.toLowerCase())
    )

    return (
        <div>
          {personsToShow.map((person) => 
            <Person 
              key={person.name}
              person={person}
              deletePerson={deletePerson}
            />
          )}
        </div>
    )
}

export default Persons