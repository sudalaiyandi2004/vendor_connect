import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Country, State, City } from 'country-state-city';
function Csc() {
    
        const [selectedState, setSelectedState] = useState('');
        const [cities, setCities] = useState([]);
      
        const handleStateChange = (event) => {
          setSelectedState(event.target.value);
        };
      
        useEffect(() => {
          // Fetch cities of the selected state when the state changes
          if (selectedState) {
            const selectedStateObject = State.getStatesOfCountry('IN').find(
              (state) => state.isoCode === selectedState
            );
            if (selectedStateObject) {
              const citiesOfState = City.getCitiesOfState('IN', selectedState);
              setCities(citiesOfState);
            }
          }
        }, [selectedState]);
      
        return (
          <div>
            <h3>Country: India</h3>
      
            <h3>Select a State:</h3>
            <select onChange={handleStateChange} value={selectedState}>
              <option value="" disabled>Select State</option>
              {State.getStatesOfCountry('IN').map((state) => (
                <option key={state.isoCode} value={state.isoCode}>{state.name}</option>
              ))}
            </select>
      
            <h3>Select a City:</h3>
            <select>
              <option value="" disabled>Select City</option>
              {cities.map((city) => (
                <option key={city.name} value={city.name}>{city.name}</option>
              ))}
            </select>
          </div>
        );


};




export default Csc