import React from 'react'
import { useState } from 'react'

const CountrySimple= ({ country }) => {
    const [showOneCountry, setShowOneCountry] = useState(false)

    const handleClick = () => {
        if (showOneCountry === false) {
            setShowOneCountry(true)
        } else {
            setShowOneCountry(false)
        }
    }

    return (
        <div>
            {country.name.common} <button onClick={handleClick}>show</button>
            {showOneCountry && <OneCountry country={country}/>}
        </div>
    )
}

const OneCountry = ({ country }) => {
    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>capital: {country.capital}</p>
            <p>area: {country.area}</p>
            <h3>languages: </h3>
            <ul>
                {Object.values(country.languages).map((language) => (
                    <li key={language}>{language}</li>
                ))}
                <br></br>
                <img src={country.flags.png} />
            </ul>
        </div>
    )
}

export { CountrySimple, OneCountry }