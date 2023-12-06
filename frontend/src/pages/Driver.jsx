import { useDispatch } from 'react-redux';
import { deleteGoal } from '../features/goals/goalSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState, useEffect, useRef } from 'react';
import { updateGoal } from '../features/goals/goalSlice';
import Spinner from '../components/Spinner';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';
import {BsFillTelephoneFill} from 'react-icons/bs';
import {MdLocationOn} from 'react-icons/md';
import Chan from './Chan';
import Pop from './Pop';
import { createSales } from '../features/sale/saleSlice';
function Driver({ dat, ven, froms, froms2,froms1,weigh }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let recipientEmail=dat.email
  let subject='Order Came'
  let message='You have order on monday!'
  const [status, setStatus] = useState('');
  const [loading,setLoading]=useState(false)
  const isMounted = useRef(true); // Create a ref to track the mounted state

  useEffect(() => {
    // Cleanup function to prevent state updates on an unmounted component
    return () => {
      isMounted.current = false;
      {console.log(froms._id)}
    };
  }, []);

  const changes = () => {
    console.log(message)
    
  };
  const [showPopup, setShowPopup] = useState(false);
  
const openPopup = () => {
  setShowPopup(true);
};

const closePopup = () => {
  setShowPopup(false);
  navigate('/')
};
  const update = async (newWeight) => {
    try {
      // Send PUT request to update the goal weight
      await axios.put(`http://localhost:5000/api/goals/${froms._id}`, {
        weight: froms.weight - newWeight,
      });

      // Handle successful update, if needed
      console.log('Goal updated successfully');
    } catch (error) {
      // Handle update error, if needed
      console.error('Error updating goal:', error.message);
    }
    
    dispatch(createSales({ produce:froms.produce,weight:newWeight,price:froms.price,fuser:ven._id,fplace:ven.place,fname:ven.name,tuser:froms2._id,tplace:froms2.place,tname:froms2.name,driver:dat.name,duser:dat._id}))
  };
  const deletes = () => {
    // Send DELETE request to delete the user
    axios
      .delete(`http://localhost:5000/api/goals/delete/${froms._id}`)
      .then((response) => {
        console.log(response.data.message); // User deleted successfully
        // Perform any additional actions after deletion if needed
      })
      .catch((error) => {
        console.error('Error deleting Goal:', error.message);
      });
    }
  const check = async(e) => {
    // Ensure the value is not less than 1
    if (weigh < 1 || weigh>froms.weight) {
      toast('Please enter valid weight', { autoClose: 1000 });
    } else if(recipientEmail || subject || message) {
      setLoading(true)
      toast('It takes a few minutes!', { autoClose: 1500 });
      changes(); // Update the states
      // Trigger the API call after the state is updated
      await fetch('http://localhost:5000/api/users/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recipientEmail, subject, message }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (isMounted.current) {
            // Only update state if the component is still mounted
            setStatus(data.message);
          }
        })
        .catch((error) => {
          if (isMounted.current) {
            // Only update state if the component is still mounted
            setStatus('Error sending email');
          }
          console.error('Error sending email:', error);
        });
        recipientEmail=ven.email
      subject='Sold'
      message='You sold your product'
      await fetch('http://localhost:5000/api/users/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recipientEmail, subject, message }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (isMounted.current) {
            // Only update state if the component is still mounted
            setStatus(data.message);
          }
        })
        .catch((error) => {
          if (isMounted.current) {
            // Only update state if the component is still mounted
            setStatus('Error sending email');
          }
          console.error('Error sending email:', error);
        });
        
        setLoading(false)
      toast('Order Placed!', { autoClose: 1000 });
      
      if(froms.weight-weigh==0){
      deletes()
    }
    else{
      update(weigh)
    }

      console.log(froms.weight-weigh)
      openPopup();
    }
  };
  if (loading) {
    return <Spinner />
  }
  
  const vens=ven._id
  return (
    <div className='goal'>
      {console.log(ven)}
      {showPopup && navigate('/feedback',  {replace:true, state:{ven}})}
      <h2>{dat.name}</h2>
      
      <h3>Cost per Km : Rs.{dat.cost}</h3>
      <h5 className='le'><span className='rii'><MdLocationOn /></span> {dat.place}</h5>
      <h5 className='ri'><span className='rii'><BsFillTelephoneFill/></span> {dat.phone}</h5>
      <button onClick={check} className='bts'>Place order</button>
    </div>
  );
}

export default Driver;
