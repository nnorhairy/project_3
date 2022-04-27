//importing the library
import './App.css';
import { useState, useEffect } from 'react'
import Covid19 from './components/Covid19'
import axios from 'axios'




function App() {

  //define the useState
  const [displayResult, setDisplayResult] = useState(false)
  const [displaySummary, setDisplaySummary] = useState('')
  const [displayCountry, setDisplayCountry] = useState('')
  const [displayAbbreviation, setDisplayAbbreviation] = useState('')
  const [displayInput, setDisplayInput] = useState('')


  ///handle event for input text country
  function handleChange(event) {
    //value target 
    //getValue of target of event and assigned to display input state
    //pass the displayInput the state to the API call, 
    const userValue = event.target.value
    setDisplayInput(userValue)
    console.log('click happen', { displayInput })
  }

  ///handle toggle button details and back
  const toggleResult = () => {

    if (displayResult) {
      setDisplayResult(false)
    } else {
      setDisplayResult(true)
    }
  }

  useEffect(() => {
    const getSummary = async () => {

      //declaring the API URL
      //const res = await axios.get(`https://covid-api.mmediagroup.fr/v1/cases?country=Malaysia`)
      const res = await axios.get(`https://covid-api.mmediagroup.fr/v1/cases`)


      const URL = res.data.Malaysia.All
      setDisplaySummary(res.data.Global.All.confirmed)
      setDisplayCountry(URL.country)
      setDisplayAbbreviation(URL.abbreviation)

    }
    getSummary()
  }, [])

  //URL for flag country image based on code country
  let imageURL = `https://www.geonames.org/flags/x/${displayAbbreviation.toLowerCase()}.gif`

  //displaying the output
  return (

    <div className="App">
      <header className="covid19-header">

        <main>
          <div className="result-container">
            <h1>Covid-19 Cases</h1>
            {displayResult === false ?
              <>
                <h2>There's {displaySummary.toLocaleString()} confirmed cases of Coronavirus around the world today</h2>
                <h4>Kindly enter the Country Name (e.g. Brazil)</h4>
                <input type="text" value={displayInput} onChange={handleChange} />
              </>

              :
              <Covid19 displayResult={displayResult} displayInput={displayInput} />}
          </div>

          <button onClick={toggleResult}>{displayResult === true ? "Back" : "Details Result"}</button>

        </main>
      </header>

    </div>
  );
}

export default App;

