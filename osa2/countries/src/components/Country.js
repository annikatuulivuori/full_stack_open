import React from 'react'

const CountrySimple = ({ country }) => {
    return (
        <div>
            {country.name.common} 
        </div>
    )
}

const OneCountry = ({ country }) => {
    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>capital: {country.capital}</p>
            <p>area: {country.area}</p>
            <br></br>
            <h3>languages: </h3>
            <ul>
                {Object.values(country.languages).map((language) => (
                    <li key={language}>{language}</li>
                ))}
            </ul>
            <br></br>
            <img src={country.flags.png} />
        </div>
    )
}

export { CountrySimple, OneCountry }