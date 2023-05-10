import { useState, useEffect } from 'react';
import countryService from './components/countryService';

const App = () => {
  const [countryInput, setCountry] = useState('');
  const [countriesToShow, setCountriesToShow] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (countryInput === '') {
      setCountriesToShow([])
    }
    else {
      countryService.getByName(countryInput)
        .then(countries => {
          setCountriesToShow(countries);
          setErrorMessage(null);
        })
        .catch(err => {
          setCountriesToShow([]);
          setErrorMessage(err.message);
        })
    }
  }, [countryInput]);



  const onChangeCountry = (e) => {
    setCountry(e.target.value);

  }
  return (
    <div>
      <div>
        find countries <input
          onChange={onChangeCountry} />
      </div>

      <CountriesInfo countries={countriesToShow} />
      <ErrorBox message={errorMessage} />
    </div>
  );
}

const ErrorBox = ({ message }) => {
  if (message === null) {
    return null;
  }

  return (
    <div>
      {message}
    </div>
  )
}

const CountriesInfo = ({ countries }) => {

  if (countries.length === 1) {
    return (
      <DetailedInfo country={countries[0]} />
    )
  }
  else if (countries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }

  return (
    <div>
      {countries.map(country => (
        <GeneralInfo key={country.name.common}
          country={country} />
      ))}
    </div>
  )
}

const GeneralInfo = ({ country }) => {

  const [showDetails, setShowDetails] = useState('show');
  const [countryDetails, setCountryDetails] = useState(null);
  // const detailsContainer = document.querySelector('.details-container');

  const toggleDetails = (e) => {
    if(showDetails === 'show') {
    setShowDetails('hide');
    setCountryDetails(<DetailedInfo country={country}/>);
    }
    else {
      setShowDetails('show');
      setCountryDetails(null);
    }
  }

  return (
    <div>
      {country.name.common} <input
      type='submit'
      value={showDetails}
      onClick={toggleDetails} />
      <div className='details-container'>
        {countryDetails}
      </div>
    </div>
  )
}

const DetailedInfo = ({ country }) => {
  return (
    <div>
      <h3>{country.name.common}</h3>
      <div>
        capital {country.capital}
        <br />
        area {country.area}
      </div>
      <div>
        <h4>languages</h4>
        <Languages languages={country.languages} />
      </div>
      <Flag img={country.flags.svg} />
    </div>
  )
}

const Flag = ({ img }) => {
  return (
    <img src={img} alt='flag' width={150} height={150} />
  )
}

const Languages = ({ languages }) => {
  return (
    <ul>
      {Object.values(languages).map(language => (
        <li key={language}>{language}</li>
      ))}
    </ul>
  )
}

export default App;
