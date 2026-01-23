import ShowCountry from "./ShowCountry";
import { useState } from "react";

const ShowCountries = ({ countryList, country }) => {
  const [openCountries, setopenCountries] = useState([]);

  const toggleCountry = (event) => {
    if (openCountries.includes(event.target.value)) {
      setopenCountries(openCountries.filter((c) => c !== event.target.value));
    } else {
      setopenCountries(openCountries.concat(event.target.value));
    }
  };

  if (country === null || country === "") {  //Empty filter case
    return <div></div>;
  }

  const validCountries = countryList.filter((c) =>
    c.name.common.toLowerCase().includes(country.toLowerCase()),
  );

  if (validCountries.length > 10) { //More than 10 countries case
    return <div>Too many countries</div>;
  }

  if (validCountries.length === 1) { //Only 1 country case
    return <ShowCountry country={validCountries[0]} />;
  }

  return (
    <div>
      {validCountries.map((country) => (
        <div key={country.name.common}>
          {country.name.common}
          <button value={country.name.common} onClick={toggleCountry}>
            show
          </button>

          {openCountries.includes(country.name.common) && (
            <ShowCountry country={country} />
          )}
        </div>
      ))}
    </div>
  );
};

export default ShowCountries;
