import React from 'react'
import { CountrySimple, OneCountry } from './Country'


const CountryList = ({ countries, newFilter }) => {
    const countriesToShow = countries.filter((country) =>
        country.name.common.toLowerCase().includes(newFilter.toLowerCase())
    )
    
    let count = countriesToShow.length

    if (count > 10) {
        return 'Too many matches, specify another filter'
    } else if (count == 1) {
        return (
            <OneCountry country={countriesToShow[0]} />
        )
    } else if (count > 0) {
        return (
            <div>
                {countriesToShow.map((country) =>
                <CountrySimple key={country.name.official} country={country} />
                )}
            </div>
        )

    }
    
}

export default CountryList