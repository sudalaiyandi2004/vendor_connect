import React from 'react'
import GoalItem from '../components/GoalItem'
import { useLocation } from 'react-router-dom'
import BackArrow from './BackArrow'
import './Search.css';
function Sale(props) {
    const location=useLocation()
  const {goals}=location.state
  const id=1;
  return (
    <div>
        <BackArrow/>
        {id===1 ? <h1 className='onsale'>On Sales</h1>: ''}
        {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} id={id}/>
            ))}
    </div>
  )
}

export default Sale