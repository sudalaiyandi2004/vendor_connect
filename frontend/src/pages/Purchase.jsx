import React from 'react'
import { useLocation } from 'react-router-dom';
import PurItem from '../components/PurItem';
import BackArrow from './BackArrow';
import './Search.css'
function Purchase() {
    const location=useLocation()
    const {pur}=location.state
    const id=0;
    return (
      <div>
        <BackArrow/>
        <h1 className='hone'>Purchase</h1>
          {pur.map((pu) => (
                <PurItem key={pu._id} pu={pu} id={id}/>
              ))}
      </div>
    )
}

export default Purchase