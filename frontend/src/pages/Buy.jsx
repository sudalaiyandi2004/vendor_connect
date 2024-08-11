import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import BackArrow from './BackArrow'
import { useLocation,Link } from 'react-router-dom'
import Driver from './Driver'
function Buy(props) {
  const [weight,setWeight]=useState(0)
  const [ven,setVen]=useState(null)
  const location=useLocation()
  const {from}=location.state
  const {froms}=location.state
  const {froms1}=location.state
  const {froms2}=location.state
  useEffect(() => {
    // Fetch user from backend using the provided userId
    axios
      .get(`https://vendor-connect.onrender.com/api/users/${froms.user}`)
      .then((response) => {
        setVen(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user:', error.message);
      });
  }, [froms.user]);

  if (!ven) {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
      <BackArrow/>
      <div className='form-group'>
          <label htmlFor='text'>weight</label>
             <input
            type='number'
            name='text'
            id='weight'
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
          {console.log(froms._id)}
          </div>
          {console.log(from)}
          <div className="goals">
          {from.map((dat) => (
              froms.place===dat.city ? <Driver key={dat._id} dat={dat} ven={ven} froms2={froms2} froms={froms} froms1={froms1} weigh={weight}/>:''
            ))}
            </div>
          
      
      
   
      
    </div>
  )
}

export default Buy
