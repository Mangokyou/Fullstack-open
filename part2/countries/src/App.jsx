import { useState, useEffect } from 'react'
import SearchForm from './components/SearchForm';
import countries from './services/countries'
import ShowCountries from './components/ShowCountries'


const App = () => {
  const [country, setCountry] = useState(null);
  const [countryList, setCountryList] = useState([])
  useEffect(() => {
    countries.getAll().then((countries) => {
      setCountryList(countries);
    });
  }, []);


  const handleChange = (event) => {
    //console.log(countryList)
    //console.log(event.target.value)
    setCountry(event.target.value)
  }




  return (
    <div>
      <div>
      <SearchForm onChange={handleChange} />
      </div>

      <div>
        <ShowCountries countryList={countryList} country={country} /> 
      </div>
    </div>
  );
};

export default App;

