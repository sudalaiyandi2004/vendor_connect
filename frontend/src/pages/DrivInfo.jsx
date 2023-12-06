import React from 'react'
import { getDri } from '../features/sale/saleSlice'
import { useDispatch,useSelector} from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'
import { getGoals, getOtherGoals,reset } from '../features/goals/goalSlice'
import { getMe ,getAll} from '../features/auth/authSlice'
import Menubar from './Menubar'
import DriItem from '../components/DriItem'
function DrivInfo() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user, data} = useSelector((state) => state.auth)
    const { dri, isLoading4, isError4, message4 } = useSelector(
        (state) => state.sale
      )
      useEffect(() => {
        if (isError4) {
          console.log(message4)
        }
    
        if (!user) {
          navigate('/login')
          return 
        }
    
        
        dispatch(getDri(user._id))
        {console.log(user._id)}
        return () => {
          dispatch(reset())
        }
      }, [user, navigate, isError4, message4, dispatch])
      if (isLoading4) {
        return <Spinner />
      }
  return (
    <div>
        
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Service DashBoard</p>
      </section>
      {dri.map((dr) => (
                <DriItem key={dr._id} dr={dr}/>
              ))}
    </div>
  )
}

export default DrivInfo