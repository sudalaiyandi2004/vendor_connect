import React from 'react'
import './SoldItem.css'
function SoldItem({sale}) {
  return (
    <div className='goal'>
    <div className='datt'><h3>{new Date(sale.createdAt).toLocaleString('en-US')}</h3></div>
    <h2 className='pro'>{sale.produce}</h2>
    <h2 className='nam'>To : {sale.tname}</h2>
      
      <h2 className='wei'>Sold : {sale.weight} Kg</h2>
      <h2 className='rup'>Rs. {sale.price*sale.weight}</h2>
    </div>
    
  )
}

export default SoldItem