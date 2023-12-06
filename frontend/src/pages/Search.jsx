import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { createGoal } from '../features/goals/goalSlice'
import GoalItem from '../components/GoalItem';
import './Search.css';
import { Country, State, City } from 'country-state-city';
function Search({goals1,user,data}) {
    const [produc, setProduc] = useState('')
    const [plac, setPlac] = useState('')
    const id=0;
    const [weight, setWeight] = useState(0)
    const [price, setPrice] = useState(0)
    const fruits = ['Apple', 'Banana', 'Orange', 'Mango','Strawberry','Grapes','Guava','Pineapple','Watermelon','Kiwi'];
    const vegetables=['Broccoli','Brinjal','Carrot','Tomato','Beetroot','Raddish','Cabbage','Potato','Onion','Peas'];
    const city=['Madurai','Salem','Tuticorin','Chennai','Erode'];
    const [selectedItem, setSelectedItem] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const dispatch=useDispatch()
    const navigate=useNavigate()
     const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [cities, setCities] = useState([]);
    useEffect(() => {
        const filteredData = goals1.filter(
          (item) =>
         item.place.includes(selectedCity) && item.produce.toLowerCase().includes(produc.toLowerCase()) || 
            item.produce.toLowerCase().includes(produc.toLowerCase()) && item.place.includes(selectedCity)
        );
        console.log(selectedCity)
        setFilteredData(filteredData);
      }, [produc, selectedCity]);
      const handleStateChange = (event) => {
        setSelectedState(event.target.value);
      };
      const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
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
    
        <section className='form'>
      <form className='forms'>
        <div className='form-group'>
          <h3 className='lab'>Groceries</h3>
          <select id="dropdown" value={produc} onChange={(e)=>setProduc(e.target.value)}>
        <option value="">Select a Product</option>
        <optgroup label="Fruits">
          {fruits.map((fruit, index) => (
            <option key={index} value={fruit}>
              {fruit}
            </option>
          ))}
        </optgroup>
        <optgroup label="Vegetables">
          {vegetables.map((vegetable, index) => (
            <option key={index} value={vegetable} >
              {vegetable}
            </option>
          ))}
        </optgroup>
        </select>
          </div>
          <div className='form-group'>
          <h3 className='lab'>Select a State</h3>
      <select onChange={handleStateChange} value={selectedState}>
        <option value="" disabled>Select State</option>
        {State.getStatesOfCountry('IN').map((state) => (
          <option key={state.isoCode} value={state.isoCode}>{state.name}</option>
        ))}
      </select>
          </div>
          <div className="form-group">
      <h3 className='lab'>Select a City</h3>
      <select onChange={handleCityChange} value={selectedCity}>
        <option value="" disabled>Select City</option>
        {cities.map((city) => (
          <option key={city.name} value={city.name}>{city.name}</option>
        ))}
      </select>
          
          </div>
          
    
    </form>
    
    {filteredData.length > 0 ? (
          <div className='goals'>
            {filteredData.map((goal) => (
              
              <GoalItem key={goal._id} goal={goal} id={id} user={user} data={data} plac={plac}/>
            ))}
          </div>
        ) : (
          <h3 className='lab'>No items</h3>
        )}
        
    </section>

    
  )
}

export default Search