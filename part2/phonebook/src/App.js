import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const checkPerson = (event) => {
    event.preventDefault()
    if(personFound) {
      alertUser()
    } else {
      addPerson()
    }
  }

  const personFound = persons.find((person) => person.name.toLowerCase() === newName.toLowerCase()) 

  const addPerson = (event) => {
    const personObject = {
      name: newName,
    }
    setPersons(persons.concat(personObject))
    setNewName('')
  }

  const alertUser = () => {
    window.alert(`${newName} is already added to phonebook`)
  }

  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={checkPerson}>
        <div>
          name: <input 
            value={newName}
            onChange={handlePersonChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <li key={person.name}>{person.name}</li>
        )}
      </ul>
      <div>debug: {newName}</div>
    </div>
    
  )

}

export default App