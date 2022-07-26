import axios from 'axios';
import { CountryDetails, CountryList } from './components/Country';
import { useEffect, useState } from 'react';

function App() {
  
  const [countries,setCountries] = useState([]);
  const [searchCountry, setSeatchCountry] = useState('');
  
  useEffect(()=>{
    axios.get('https://restcountries.com/v3.1/all').then(r => setCountries(r.data));
  },[]);
  
  const includeSearch = c => c.name.common.toLocaleLowerCase().includes(searchCountry.toLocaleLowerCase())

  const countriesFiltered = countries.filter(c =>  includeSearch(c));

  return (
    <div className="App">
      <p>Find Country: <input value={searchCountry} onChange={({target}) => setSeatchCountry(target.value)}/></p>
      {
        (()=>{
          switch(true){
            case countriesFiltered.length === 0:
              return <p>No Countries to Shown</p>
            case countriesFiltered.length === 1:
              return <CountryDetails country={countriesFiltered[0]} details={true}/>
            case countriesFiltered.length > 10:
              return <p>Too Many Countries to List.</p>
            default:
              return <CountryList countries={countriesFiltered} />
          }
        })()
      }
    </div>
  );
}

export default App;
