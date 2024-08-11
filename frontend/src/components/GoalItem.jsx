import { useDispatch } from 'react-redux'
import { useState } from 'react';
import { useEffect } from 'react';
import { deleteGoal } from '../features/goals/goalSlice'
import { useNavigate } from 'react-router-dom'
import './GoalItem.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import {MdLocationOn} from 'react-icons/md';
import {AiOutlineInfoCircle,AiFillStar,AiOutlineStar} from 'react-icons/ai';
import jsonData from './images.json';
import pnImage from './pn.png';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
function GoalItem({ goal ,id,user,data,plac}) {
  const dispatch = useDispatch()
  const [rating,setRating]=useState(0)
  const [error, setError] = useState(null);
  const navigate=useNavigate()
  const ids=goal.user
  const [showPopup, setShowPopup] = useState(false);
  const getRating=()=>{
  axios.get(`https://vendor-connect.onrender.com/api/users/get/${ids}`)
      .then(response => {
        const data = response.data;
        console.log(data)
        if (data.error) {
          setError(`Error: ${data.error}`);
        } else {
          setRating(data.updatedData);
          console.log("rating",data.updatedData);
        }
      })
      .catch(error => {
        setError(`Fetch error: ${error.message}`);
      });
    }
   // Function to get the image URL by name
function getImageUrlByName(imageName) {
  console.log(imageName)
  const imag = jsonData.image.find(img => img.name === imageName);
  if (imag) {
    console.log(imag.url)
    return imag.url;
    
  } else {
    return ''; // Empty string if image not found
  }
}
  
    
  const openPopup = () => {
    console.log("open")
    getRating();
    console.log(rating)
    setShowPopup(true);
  };
  const nullRating=()=>{
    setRating(null)
  }
  const closePopup = () => {
    setShowPopup(false);
  };
  return (
    <div className='goal'>
      {id!==1 ?
      <button onClick={openPopup}><h3 className='top'><AiOutlineInfoCircle/></h3></button> :''}
      {showPopup && (
        <div className="modal">
          <div className="modal-content">
          <img src={pnImage} alt="Image Description" />

          <p className="closes" onClick={closePopup}>X</p>
            <p>Posted by {goal.name}<br/> on {new Date(goal.createdAt).toLocaleString('en-US')}</p>
            <br/>
            <p>Contact : {goal.phone}</p>
            {console.log(goal)}
            {console.log(rating===3)}
            {rating === 0 ? (
  <p>Rating : <span className='star'><AiOutlineStar /> <AiOutlineStar /> <AiOutlineStar /> <AiOutlineStar /> <AiOutlineStar /></span></p>
) : rating === 1 ? (
  <p>Rating : <span className='star'><AiFillStar /> <AiOutlineStar /> <AiOutlineStar /> <AiOutlineStar /> <AiOutlineStar /></span></p>
) : rating === 2 ? (
  <p>Rating : <span className='star'><AiFillStar /> <AiFillStar /> <AiOutlineStar /> <AiOutlineStar /> <AiOutlineStar /></span></p>
) : rating === 3 ? (
  <p>Rating : <span className='star'><AiFillStar /> <AiFillStar /> <AiFillStar /> <AiOutlineStar /> <AiOutlineStar /></span></p>
) : rating === 4 ? (
  <p>Rating : <span className='star'><AiFillStar /> <AiFillStar /> <AiFillStar /> <AiFillStar /> <AiOutlineStar /></span></p>
) : (
  <p>Rating : <span className='star'><AiFillStar /> <AiFillStar /> <AiFillStar /> <AiFillStar /> <AiFillStar /></span></p>
)}







          </div>
        </div>
      )}
      {/*<div>{new Date(goal.createdAt).toLocaleString('en-US')}</div>*/}
      <img src={getImageUrlByName(goal.produce)} alt={goal.produce} />

      <h3 className='hth'>{goal.produce}</h3>
      
      <h4 className='pr'> Rs.{goal.price} per Kg</h4>
      
     {/* <h2>{goal.name}</h2>*/}
      
      
      {id===1 ?
      <div><h4 className='dates'>{new Date(goal.createdAt).toLocaleString('en-US')}</h4><button onClick={() => {dispatch(deleteGoal(goal._id));toast('Product Deleted!', { autoClose: 1000 });}} className='close'>
        X
      </button> </div>:
      <button className='bt'><Link to='/buy' className='lin' state={{from:data,froms:goal,froms1:goal.weight,froms2:user}}>BUY</Link></button>}
      <h5 className='ri'>Available : {goal.weight} Kg</h5>
      <h6 className='le'><span className='rii'><MdLocationOn /></span> {goal.place}</h6>
  
    </div>
  )
}

export default GoalItem
