const Persons = ({ persons, newFilter }) => {
    const personsToShow = persons.filter((person) =>
        person.id.includes(newFilter)
    )
    return (
        <div>
          {personsToShow.map((person) => (
            <p key={person.id}>{person.name} {person.number}</p>
          ))}
        </div>
    )
}

export default Persons