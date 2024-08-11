import { useEffect } from 'react'
import { useState } from 'react'
import Driver from './Driver'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import GoalForm from '../components/GoalForm'
import GoalItem from '../components/GoalItem'
import Spinner from '../components/Spinner'
import Adds from './Adds'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { getGoals, getOtherGoals,reset } from '../features/goals/goalSlice'
import Search from './Search'
import { getBuy, getDri, getSales } from '../features/sale/saleSlice'
import { getMe ,getAll} from '../features/auth/authSlice'
import Sidebar from '../components/Sidebar'
import axios from 'axios'
import MenuBar from './Menubar'
import './Dashboard.css'
import Header from '../components/Header'
import Header1 from '../components/Header1'
function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [file,setFile]=useState()
  const [selectedState, setSelectedState] = useState('');
  const [cities, setCities] = useState([]);
  const[selectedCity,setSelectedCity]=useState('');
  const { user, data} = useSelector((state) => state.auth)
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  )
  const { sales, isLoading2, isError2, message2 } = useSelector(
    (state) => state.sale
  )
  const { pur, isLoading3, isError3, message3 } = useSelector(
    (state) => state.sale
  )
 
  const { goals1, isLoading1, isError1, message1 } = useSelector(
    (state) => state.goals
  )
  useEffect(() => {
    if (isError1) {
      console.log("message:",message1)
      console.log("user:",user)
    }
    console.log("uyrs")
      if(!user){
      navigate('/login')
      return
      }
      

    dispatch(getGoals())
    dispatch(getOtherGoals())
    dispatch(getMe())
    dispatch(getAll())
    dispatch(getSales(user._id))
    dispatch(getBuy(user._id))
  
    {console.log(user._id)}
    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError1, message1, dispatch])
  useEffect(() => {
    if (isError2) {
      console.log(message2)
    }

    
      console.log("uyr")
      if(!user){
      navigate('/login')
      return
    }

    dispatch(getGoals())
    dispatch(getOtherGoals())
    dispatch(getMe())
    dispatch(getAll())
    dispatch(getSales(user._id))
    dispatch(getBuy(user._id))

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError2, message2, dispatch])
  useEffect(() => {
    if (isError) {
      console.log(message)
    }

      if(!user){
      navigate('/login')
      return 
      }
      
      

    dispatch(getGoals())
    dispatch(getOtherGoals())
    dispatch(getMe())
    dispatch(getAll())
    dispatch(getSales(user._id))
    dispatch(getBuy(user._id))
    
    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])
  useEffect(() => {
    if (isError3) {
      console.log(message3)
    }

      if(!user){
      navigate('/login')
      return
      }

    dispatch(getGoals())
    dispatch(getOtherGoals())
    dispatch(getMe())
    dispatch(getAll())
    dispatch(getSales(user._id))
    dispatch(getBuy(user._id))
    
    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError3, message3, dispatch])
  

  if (isLoading) {
    return <Spinner />
  }
  const id=0;
  
  const handleUpload=(e)=>{
    const formdata=new FormData()
    
    formdata.append('file',file)
    console.log(file)
    console.log("f:",formdata)
    axios.post('https://vendor-connect.onrender.com/api/users/upload',formdata)
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
  }
  

  return (
    <>
    
    <MenuBar user={user} goals={goals} sales={sales} pur={pur} />
    
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        
        
      </section>
      
      {console.log(data)}
      <Search goals1={goals1} user={user} data={data}/>
      
   
  
    


      
    </>
  )
}

export default Dashboard
