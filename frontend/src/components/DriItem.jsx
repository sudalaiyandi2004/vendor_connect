import React from 'react'

function DriItem({dr}) {
  return (

        <div>
        <div>{new Date(dr.createdAt).toLocaleString('en-US')}</div>
        <h2>{dr.fname}</h2>
        <h2>{dr.fplace}</h2>
        <h2>{dr.tname}</h2>
        <h2>{dr.tplace}</h2>
          <h2>{dr.produce}</h2>
          <h2>{dr.weight} Kg</h2>
          
        </div>

  )
}

export default DriItem