import axios from 'axios';
import { useEffect, useState } from 'react';

const weatherURL = city => `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_KEY}&units=metric`

export const WeatherDetails = ({city}) =>{

    const [weather,setWeather] = useState([]);

    useEffect(()=>{
        axios
            .get(weatherURL(city))
            .then(r => setWeather(r.data))
            .catch( _ => setWeather([]));
    },[city]);

    return(
        <div>
            {
                weather.length === 0 ? 
                    <p>No Weather Information Available for {city}</p>
                : 
                    <>
                        <h3>Weather in {city}</h3>
                        <p>Temperature {weather.main.temp} Celsius</p>
                        <img 
                            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} 
                            alt={`Weather in ${city}`}
                        />
                        <p>Wind {weather.wind.speed} m/s</p>
                    </>
            }
        </div>
    )
}
export const CountryDetails = ({country,details}) =>{

    const [show,setShow] = useState(details);
  
    if(!show){
      return <p>{country.name.common} {country.flag} 
                <button onClick={()=> setShow(true)}>Show {country.demonyms.eng.m} Details</button>
              </p>
    }else{
  
      return(
        <>
           <h2>{country.name.common}</h2>
           <p>Capital {country.capital}</p>
           <p>Area {country.area}</p>
    
           <h3>Languages</h3>
           <ul>{Object.values(country.languages).map(l => <li key={l}>{l}</li>)}</ul>
    
           <img src={country.flags.png} alt={`Flag of ${country.name.common}`}/>

           <WeatherDetails city={country.capital} />
  
           <div><button onClick={()=> setShow(false)}>Hide {country.demonyms.eng.m} Details</button></div>
        </>
       
      );
    }
  }
  
export const CountryList = ({countries}) =>{
  
    return(
        <div>
            {countries.map(c => <CountryDetails key={c.name.common} country={c}  details={false}/>)}
        </div>
    );
}