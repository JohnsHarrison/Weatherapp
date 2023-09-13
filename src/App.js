import axios from 'axios';
import { useState } from 'react';
import Dropdown from './Components/Dropdown';

function App() {
  const [region, setRegion] = useState([])
  const [country, setCountry] = useState([])
  const [state, setState] = useState([])
  const [inputText, setInputText] = useState("")
  const [city, setCity] = useState([])
  const [current, setCurrent] = useState([])

// apikey HzwyTyN4ch6hEmuLHxzFTfAn5WxP5fE5
// region list http://dataservice.accuweather.com/locations/v1/regions
//  NA ID NAM


// fix it so you can set the current weather right after the city is set
async function handleSubmit(){
  const response = await getCity()
  setCity(response)
  getCurrent(response[0].Key)
}

 async function getRegion(){
    const response = await axios.get(`https://dataservice.accuweather.com/locations/v1/regions?apikey=${process.env.REACT_APP_WEATHER_KEY}`)                                   
    return response.data
  }

  async function getCountry(){
    const response = await axios.get(`http://dataservice.accuweather.com/locations/v1/countries/${region.ID}?apikey=${process.env.REACT_APP_WEATHER_KEY}`)
    return response.data
  }

  async function getState(){
    const response = await axios.get(`http://dataservice.accuweather.com/locations/v1/adminareas/${country.ID}/?apikey=${process.env.REACT_APP_WEATHER_KEY}`)
    return response.data
  }

  async function getCity(){

    const response = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/${country.ID}/${state.ID}/search?apikey=${process.env.REACT_APP_WEATHER_KEY}&q=${inputText}`
    //                               `http://dataservice.accuweather.com/locations/v1/cities/${country.ID}/search?apikey=${process.env.REACT_APP_WEATHER_KEY}&q=${inputText}`                             
    )
    return response.data
  }

  async function getCurrent(stateKey){
    const response = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${stateKey}?apikey=${process.env.REACT_APP_WEATHER_KEY}`)
    console.log(response.data[0])
    setCurrent(response.data[0])
  }

  return (
    <div className="App">
      <div><Dropdown parentState={region} setParentState={setRegion} handleAPI={getRegion}/></div>
      {region.ID ? <div><Dropdown parentState={country} setParentState={setCountry} handleAPI={getCountry}/></div>: null}
      {country.ID ? <Dropdown parentState={state} setParentState={setState} handleAPI={getState}/> : null}
      {state.ID ? <input onKeyDown={(e)=>{if(e.key === "Enter"){handleSubmit()}}}  onChange={(event)=>{setInputText(event.target.value)}}></input> : city}
      {city.length > 0 ? <div>{city.map((result)=>{
      return <p>{result.LocalizedName}, {result.AdministrativeArea.LocalizedName}, {result.PrimaryPostalCode}</p>
      })}</div> : null}

      {current.Temperature ? 
      <div>
        <p>It is {current.WeatherText}</p>
        <p>and currently {current.Temperature.Imperial.Value}° fahrenheit or {current.Temperature.Metric.Value}° celsius</p>
      </div> : null}
    </div>
  );
}

export default App;
