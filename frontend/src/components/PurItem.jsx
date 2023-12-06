import React from 'react'

function PurItem({pu}) {
  
    return (
        <div className='goal'>
        <div className='datt'><h3>{new Date(pu.createdAt).toLocaleString('en-US')}</h3></div>
        <h2 className='pro'>{pu.produce}</h2>
        <h2 className='nam'> From : {pu.fname}</h2>
          
          <h2 className='wei'>Purchased : {pu.weight} Kg</h2>
          <h2 className='rup'>Rs. {pu.price*pu.weight}</h2>
        </div>
      )
}

export default PurItem