import Flights from '../Flights';
import { useState } from 'react';
import './journeyInput.css';

function JourneyInput({ text, chosenAirport, state }) {
  const [city, setCity] = useState('');
  const [airports, setAirports] = useState([]);

  function handleChange(event) {
    setCity(event.target.value);
    getAiportByCity(city);
  }

  async function getAiportByCity(city) {
    const response = await fetch(`http://localhost:5000/airports?city=${city}`);
    const { payload } = await response.json();
    console.log(payload);
    if (payload.length === 0) {
      setAirports([
        { airport_name: 'No valid aiports', city_name: 'Check spelling' },
      ]);
    } else {
      setAirports(payload);
    }
  }
  return (
    <>
      <h3 className="journey-input-header">{text}</h3>
      <input
        className="journey-input"
        type="text"
        name="city"
        placeholder="Enter City"
        onChange={handleChange}
        value={city}
        required
      ></input>

      <Flights airports={airports} chosenAirport={chosenAirport} />
      {state ? (
        <h4 className="airport-choice">You have chosen {state.name}</h4>
      ) : (
        ''
      )}
    </>
  );
}

export default JourneyInput;