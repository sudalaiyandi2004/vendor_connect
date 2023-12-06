import React from 'react'
import { useLocation } from 'react-router-dom';
import SoldItem from '../components/SoldItem';
import BackArrow from './BackArrow';
import './Search.css'
function Sold() {
    const location=useLocation()
    const {sales}=location.state
    const id=0;
    return (
      
      <div>
        <BackArrow/>
        <h1 className='hone'>Sold</h1>
          {sales.map((sale) => (
                <SoldItem key={sale._id} sale={sale} id={id}/>
              ))}
      </div>
    )
}

export default Sold