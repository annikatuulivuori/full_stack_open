import { useState,useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import { ErrorNotification, SuccessNotification } from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const clearInputs = () => {
    setNewName('')
    setNewNumber('')
  }

  const checkPerson = (event) => {
    event.preventDefault()
    
    if(personFound) {
      const confirmUpdate = window.confirm(`${newName} is already added to phonebook. Replace the old nubmer with a new one?`)
      const previousPerson = persons.find(person => person.name === newName)
      const updatedPerson = {...previousPerson, number: newNumber}
      
      if (persons.find(person => person.number === newNumber)) {
        alertUser()
      } else {
        if (confirmUpdate) {
          personService
            .update(updatedPerson.id, updatedPerson)
            .then(returnedPerson => {
              setPersons(persons.map(p => p.id === returnedPerson.id ? returnedPerson : p))
              clearInputs()
              setSuccessMessage(`Person's ${previousPerson.name} number changed`)
              setTimeout(() => {
                setSuccessMessage(null)
              }, 5000)
            })
            .catch(error => {
              setErrorMessage(`Information of ${previousPerson.name} has already been removed from server`)
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
            })
        }
      }
    } else {
      addPerson()
    }
  }

  const personFound = persons.find((person) => person.name.toLowerCase() === newName.toLowerCase()) 

  const addPerson = () => {
    const personObject = {
      name: newName,
      number: newNumber,
    }
    
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        clearInputs()
        setSuccessMessage(`Person ${personObject.name} added`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch(error => console.log("Error in adding person"))
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    const confirmDelete = window.confirm(`Delete ${person.name} ?`)

    if (confirmDelete) {
      personService
        .remove(id)
        .then(() => {
          const updatedPersons = persons.filter(person => person.id !== id)
          setPersons(updatedPersons)
          clearInputs()
          setSuccessMessage(`Person ${person.name} deleted`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch(error => console.log("Error in removing person"))
    }
  }

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
      <ErrorNotification message={errorMessage} />
      <SuccessNotification message={successMessage} />
      <Filter value={newFilter} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm 
        onSubmit={checkPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons 
        persons={persons}
        newFilter={newFilter}
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App