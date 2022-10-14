import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

const persons = [
  { 
    id: 'arto hellas',
    name: 'Arto Hellas', 
    number: '040-123456' 
  },
  { 
    id: 'ada lovelace',
    name: 'Ada Lovelace', 
    number: '39-44-5323523' },
  { 
    id: 'dan abramov',
    name: 'Dan Abramov', 
    number: '12-43-234345' },
  { 
    id: 'mary poppendieck',
    name: 'Mary Poppendieck', 
    number: '39-23-6423122' 
  }
]

ReactDOM.createRoot(document.getElementById('root')).render(<App persons={persons}/>)
