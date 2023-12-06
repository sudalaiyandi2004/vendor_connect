import React from 'react';
import './Pop.css';
import { FaStar } from "react-icons/fa";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import {FcFeedback} from 'react-icons/fc';
const Pop = () => {
    const navigate = useNavigate();
    const location=useLocation();
    
    console.log(location);
    const {ven}=location.state;
    const id=ven._id
    const colors = {
        orange: "#FFBA5A",
        grey: "#a9a9a9",
    };

    

    const handleClose = () => {
        navigate('/');
    };

    const [updatedData, setUpdatedData] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);
    const stars = Array(5).fill(0);

    const handleClick = (value) => {
        setUpdatedData(value);
    };

    const handleMouseOver = (newHoverValue) => {
        setHoverValue(newHoverValue);
    };

    const handleMouseLeave = () => {
        setHoverValue(undefined);
    };
    const Skip=()=>{
        navigate('/')
    }
    
    const updateData = async (id, updatedData) => {
        updatedData=Math.round((updatedData+ven.updatedData)/2)
        console.log(updatedData)
        try {
          const response = await axios.put(`http://localhost:5000/api/users/update/${id}`, {updatedData:updatedData});
          // Handle the response, e.g., show a success message
          console.log(response.data.message);
        } catch (error) {
          // Handle errors, e.g., show an error message
          console.error('Error updating data:', error);
        }
      };
    const Submits=()=>{
        console.log(updatedData)
        updateData(id,updatedData)
        navigate('/')
    }
    return (
        
        
        <div className='container'>
        <h2 className='htwo'> Feedback </h2>
        <h3 className='hthree'>Give Your Ratings</h3>
        <br/>
        <div className='stars'>
          {stars.map((_, index) => {
            return (
              <FaStar
                key={index}
                size={window.innerWidth >= 768 ? 64 : 32}
                onClick={() => handleClick(index + 1)}
                onMouseOver={() => handleMouseOver(index + 1)}
                onMouseLeave={handleMouseLeave}
                color={(hoverValue || updateData) > index ? colors.orange : colors.grey}
                style={{
                  marginRight: 30,
                  cursor: "pointer"
                }}
              />
            )
          })}
        </div>
        <br/>
        <br/>
        <div className="btss">
        <button
            onClick={Skip}
          className='button'
        >
          Skip
        </button>
        <button
            onClick={Submits}
          className='button'
        >
          Submit
        </button>
        </div>
      </div>
      
      
    );
};

export default Pop;
