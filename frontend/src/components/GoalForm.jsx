import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { createGoal } from '../features/goals/goalSlice'
import BackArrow from '../pages/BackArrow';
import { toast } from 'react-toastify';
import { Country, State, City } from 'country-state-city';
import './GoalForm.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
function GoalForm() {
  const [produce, setProduce] = useState('')
  
  const [weight, setWeight] = useState()
  const [price, setPrice] = useState()
  const fruits = ['Apple', 'Banana', 'Orange', 'Mango','Strawberry','Grapes','Guava','Pineapple','Watermelon','Kiwi'];
  const vegetables=['Broccoli','Brinjal','Carrot','Tomato','Beetroot','Raddish','Cabbage','Potato','Onion','Peas'];
  const [selectedItem, setSelectedItem] = useState('');
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [selectedState, setSelectedState] = useState('');
  const [place, setPlace] = useState('');
  const [cities, setCities] = useState([]);
  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(createGoal({ produce ,weight,price,place}))
    toast('Product Added!', { autoClose: 1000 });
    setProduce('')
    setPlace('')
    setWeight(0)
    setPrice(0)
    navigate('/')
  } 
  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };
  const handleCityChange = (event) => {
    setPlace(event.target.value);
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
      <BackArrow/>
      <Link to ='/' className='close'>X</Link>
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          
          <select id="dropdown" value={produce} onChange={(e)=>setProduce(e.target.value)}>
        <option value="">Select an option</option>
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
        
             <input
            type='number'
            name='text'
            id='weight'
            value={weight}
            placeholder='Weight'
            onChange={(e) => setWeight(e.target.value)}
          />
          </div>
          <div className='form-group'>
          <input
            type='number'
            name='text'
            placeholder='Price'
            id='price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className='form-group'>
      
      
      <select onChange={handleStateChange} value={selectedState}>
        <option value="" disabled>Select State</option>
        {State.getStatesOfCountry('IN').map((state) => (
          <option key={state.isoCode} value={state.isoCode}>{state.name}</option>
        ))}
      </select>
          </div>
          <div className="form-group">
      
      <select onChange={handleCityChange} value={place}>
        <option value="" disabled>Select City</option>
        {cities.map((city) => (
          <option key={city.name} value={city.name}>{city.name}</option>
        ))}
      </select>
    </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            ADD
          </button>
        </div>
      </form>
    </section>
    </div>
  )
}

export default GoalForm
