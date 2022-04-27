//importing the library
import { useState, useEffect } from 'react'
import axios from 'axios'


const current = new Date();
const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

console.log('Date', date)



const Covid19 = ({ displayResult , displayInput }) => {

    console.log('Display', { displayResult })
    console.log('Input Text', { displayInput })
    console.log('Display Input',{displayInput})


    //set useState() for Malaysia and other country
    const [resultDateMalaysia, setResultDateMalaysia] = useState('')
    const [resultDeathMalaysia, setResultDeathMalaysia] = useState('')
    const [resultStateMalaysia, setResultStateMalaysia] = useState('')
    const [resultConfirmMalaysia, setResultConfirmMalaysia] = useState('')
    const [resultPopMalaysia, setResultPopMalaysia] = useState('')
    const [resultLocMalaysia, setResultLocMalaysia] = useState('')
    const [displayAbbreviation , setDisplayAbbreviation] = useState('')


    useEffect(() => {
        // here is where we'll invoke our axios call helper function later
        const getCovidResult = async (props) => {

            try {

                // AXIOS CALL HERE
                // const res = await axios.get(`https://covid-api.mmediagroup.fr/v1/cases?country=Malaysia`)
                const res = await axios.get(`https://covid-api.mmediagroup.fr/v1/cases`)

                //const URL = res.data.Malaysia.All
                const URL = res.data[`${displayInput}`].All
                console.log('URL:', res.data[`${displayInput}`])
                console.log('Response', res)

                // setQuote() HERE

                //Malaysia
               //setResultStateMalaysia(URL.All.country)
               setResultStateMalaysia([`${displayInput}`])
               console.log('To find country',URL.All)
                setResultDeathMalaysia(URL.deaths)
                setResultConfirmMalaysia(URL.confirmed)
                // setResultDateMalaysia(res.data.Johor.updated)
                setResultDateMalaysia(date)
                setResultPopMalaysia(URL.population)
                setResultLocMalaysia(URL.location)
                setDisplayAbbreviation(URL.abbreviation)

            } catch (err) {
                console.log(err)
            }
        }

        getCovidResult()
    }, [{ displayResult }])
    
//url for flag country image based on country code 
    let imageURL = `https://www.geonames.org/flags/x/${displayAbbreviation.toLowerCase()}.gif`

    //mapping array 
    const data = [`Death : ${(resultDeathMalaysia).toLocaleString()}`,
    `Population People : ${(resultPopMalaysia).toLocaleString()}`,
    `Location : ${resultLocMalaysia}`, `Date : ${resultDateMalaysia}`]
    //console.log(data.map(Math.sqrt))


    //return output display
    return (

        <>

            <img src = {imageURL} alt="Flag Country" width="100" height="40" />
            <h2 style={{ fontStyle: 'italic' }}>Country : {resultStateMalaysia}</h2>
            <h2 style={{ fontStyle: 'italic' }}>Confirmed Cases: {(resultConfirmMalaysia).toLocaleString()} </h2>
            {/* <h3>Recovered : {(resultRecoverMalaysia).toLocaleString()}</h3> */}
            {/* <h3>Death : {(resultDeathMalaysia).toLocaleString()}</h3>
            <h3>Population People : {(resultPopMalaysia).toLocaleString()}</h3>
            <h3>Location : {resultLocMalaysia}</h3>
            <h3>Date: {resultDateMalaysia}</h3> */}

          {/* mapping the array for the result */}
            {data.map((user) => (
                <h3 className="user">{user}</h3>
            ))}

        </>



    )
}

export default Covid19