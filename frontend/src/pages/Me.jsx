import React from 'react';
import './Me.css'; // Import your CSS file for styling
import users from './user.jpg'
import { useState } from 'react';
import { useEffect } from 'react';
import { Country, State, City } from 'country-state-city';
import BackArrow from './BackArrow';
import { PieChart,Pie,Sector,Cell } from "recharts";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Me(props) {

  const location=useLocation()
  const {from}=location.state
  const {purchase}=location.state
  const {sold}=location.state
  const {stock}=location.state
  const [formData, setFormData] = useState({
    place:'',
    cost:0,
    selectedCity:'',
    selectedState:'',
    
  })
  
  const roles=['merchant','driver']
  const [role,setRole]=useState('')
  const { name, email, password, password2,place,cost,phone,file} = formData
  
  const total=purchase+sold+stock
  const [show,setShow]=useState(false)
    const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [cities, setCities] = useState([]);
  const navigate=useNavigate()
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
  
  const data = [
    { name: 'Geeksforgeeks', students: purchase ,color:"green"},
    { name: 'Technical scripter', students: stock,color:"blue" },
    { name: 'Geek-i-knack', students: sold , color:"red"}
];
const open= () => {
  console.log("open")
  setShow(true);
};
const onChange = (e) => {
  setFormData((prevState) => ({
    ...prevState,
    [e.target.name]: e.target.value,
  }))
}
const close = () => {
  setShow(false);
};
console.log(from._id)
const sub = (e) => {
  e.preventDefault();
  const updatedData={
    place:formData.place,
    phone:formData.phone,
    cost:formData.cost,
    city:selectedCity,
    state:selectedState
  }
  axios.put(`https://vendor-connect.onrender.com/api/users/update/${from._id}`, updatedData)
  .then(response => {
      console.log('User updated:', response.data);
      setShow(false)
      navigate('/me',{ state: { from:from,purchase:purchase,sold:sold,stock:stock } })
      
      // You can handle the success response here
  })
  .catch(error => {
      console.error('Error updating user:', error.response.data.message);
      // Handle the error response here
  });

}
  return (
    <div className='me'>
      {show && (
        <div className="modals">
          <div className="modal-contents">
            <h3>Edit</h3>
            <form onSubmit={sub}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='place'
              name='place'
              value={place}
              placeholder='Address'
              onChange={onChange}
            />
          </div>
          
          <div className='form-group'>
      
      
      <select onChange={handleStateChange} value={selectedState} >
        <option value="" disabled>Select State</option>
        {State.getStatesOfCountry('IN').map((state) => (
          <option key={state.isoCode} value={state.isoCode}>{state.name}</option>
        ))}
      </select>
          </div>
          <div className="form-group">
      
      <select onChange={handleCityChange} value={selectedCity}>
        <option value="" disabled>Select City</option>
        {cities.map((city) => (
          <option key={city.name} value={city.name}>{city.name}</option>
        ))}
      </select>
    </div>
    <div className='form-group'>
            <input
              type='Number'
              className='form-control'
              id='phone'
              name='phone'
              value={phone}
              placeholder='Phone Number'
              onChange={onChange}
            />
          </div> 
          <div className='form-group'>
      
          
          </div>
          {role==='driver' ?<div className='form-group'>
            <input
              type='Number'
              className='form-control'
              id='cost'
              name='cost'
              value={cost}
              placeholder='Cost per Km'
              onChange={onChange}
            />
          </div> :''}
          <div className='form-group'>
            <button type='submit' className='btn btn-block ' id='bt'>
              Submit
            </button>
          </div></form>
          <h5 className="closess" onClick={close}>X</h5>
            </div>
            </div>)}
            
      <BackArrow/>
      <h1 className='h'>Who am I ?</h1>
    <div className="flex-container">
      
      <div class="horizontal-box1">
      <img src={users} alt="Profile" className="profile-image" />
      <br/>
      <br/>
      <h1 >{from.name}</h1>
          <br />
          <h2>{from.role}</h2><br />
          <h2>{from.city}</h2>

        </div>
        <div class="horizontal-box2">
            <div class="vertical-box">
            <div className="box-horizontal">
              <button onClick={open}>Edit</button>
            <h3>Address</h3>
            <h4>{from.place},{from.city},{from.state}</h4>
            <br />
            <h3>Phone</h3>
            <h4>{from.phone}</h4><br />
            </div>
            <div className="box-horizontal">
            <h3>Email</h3>
            <h4>{from.email}
            </h4><br/>
            {from.role==='driver'?<div><h3>Cost per Km</h3>
            <h4>Rs.{from.cost}</h4></div>:''}
          </div>
            </div>
            <div class="vertical-box">
                <div className="box-horizontal1">
                  
          <PieChart width={220} height={220} className='pie'>
          <Pie data={data} dataKey="students" outerRadius={100}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
        </PieChart>
                </div>
                <div className="box-horizontal1">
                <h3>Purchase - {purchase} <span className='spa1'>[{Math.round((purchase/total)*100)}%]</span></h3>
        <h3>Sold - {sold} <span className='spa2'>[{Math.round((sold/total)*100)}%]</span></h3>
        <h3>Stock - {stock} <span className='spa3'>[{Math.round((stock/total)*100)}%]</span></h3>
                </div>
            </div>
        </div>
    </div>
    </div>
  );
}

export default Me;
