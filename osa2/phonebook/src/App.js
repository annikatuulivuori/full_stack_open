import { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'

const App = (props) => {
  const [persons, setPersons] = useState(props.persons)
  const [newName, setNewName] = useState ('')
  const [newNumber, setNewNumber] = useState ('')
  const [newFilter, setNewFilter] = useState ('')
  
  const checkPerson = (event) => {
    event.preventDefault()
    if (personFound) {
      alertUser()
    } else {
      addPerson()
    }
  }

  const addPerson = (event) => {
    const personObject = {
      id: newName.toLowerCase,
      name: newName,
      number: newNumber,
    }

    setPersons(persons.concat(personObject))
    setNewName('')
  }

  const personFound = persons.find((person) => person.id === newName.toLowerCase) 

  const alertUser = () => {
    window.alert(`${newName} is already added to phonebook`)
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
          filter shown with <input 
              value={newFilter}
              onChange={handleFilterChange} 
            />
        </div>
      <h2>add a new</h2>
      <form onSubmit={checkPerson}>
        <div>
          name: <input 
              value={newName}
              onChange={handleNameChange} 
            />
        </div>
        <div>
          number: <input
              value={newNumber}
              onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter} />
    </div>
  )
}

export default App;
