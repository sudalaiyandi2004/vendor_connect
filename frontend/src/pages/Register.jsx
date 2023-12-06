import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import './Register.css';
import { Country, State, City } from 'country-state-city';
import Header from '../components/Header'
function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    place:'',
    cost:0,
    selectedCity:'',
    selectedState:'',
    file:null,
    
  })
  
  const roles=['merchant','driver']
  const [role,setRole]=useState('')
  const { name, email, password, password2,place,cost,phone,file} = formData
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [cities, setCities] = useState([]);

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };
  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  useEffect(() => {
    // Fetch cities of the selected state when the state changes
    if (selectedState) {
      const selectedStateObject = State.getStatesOfCountry('IN').find(
        (state) => state.isoCode === selectedState
      );
      if (selectedStateObject) {
        const citiesOfState = City.getCitiesOfState('IN', selectedState);
        setCities(citiesOfState);
      }
    }
  }, [selectedState]);
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  const formdatas=new FormData()
  formdatas.append('file',file)
    console.log(file)
    console.log("f:",formdatas)
    
  
  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        name,
        email,
        password,
        role,
        place,
        cost,
        phone,
        state:selectedState,
        city:selectedCity,
        
      }

      dispatch(register(userData))
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
    
      <section className='heading'>
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className='form'>
        
        <form onSubmit={onSubmit}>
        <div className="formss">
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              value={name}
              placeholder='Enter your name'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password2'
              name='password2'
              value={password2}
              placeholder='Confirm password'
              onChange={onChange}
            />
          </div>
          
          
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='place'
              name='place'
              value={place}
              placeholder='Address'
              onChange={onChange}
            />
          </div>
          
          <div className='form-group'>
      
      
      <select onChange={handleStateChange} value={selectedState} >
        <option value="" disabled>Select State</option>
        {State.getStatesOfCountry('IN').map((state) => (
          <option key={state.isoCode} value={state.isoCode}>{state.name}</option>
        ))}
      </select>
          </div>
          <div className="form-group">
      
      <select onChange={handleCityChange} value={selectedCity}>
        <option value="" disabled>Select City</option>
        {cities.map((city) => (
          <option key={city.name} value={city.name}>{city.name}</option>
        ))}
      </select>
    </div>
    <div className='form-group'>
            <input
              type='Number'
              className='form-control'
              id='phone'
              name='phone'
              value={phone}
              placeholder='Phone Number'
              onChange={onChange}
            />
          </div> 
          <div className='form-group'>
      
          <select id="dropdown" value={role} onChange={(e)=>setRole(e.target.value)}>
        <option value="">Select a Role</option>
        <optgroup label="">
          {roles.map((rol, index) => (
            <option key={index} value={rol}>
              {rol}
            </option>
          ))}
        </optgroup>
        </select>
          </div>
          {role==='driver' ?<div className='form-group'>
            <input
              type='Number'
              className='form-control'
              id='cost'
              name='cost'
              value={cost}
              placeholder='Cost per Km'
              onChange={onChange}
            />
          </div> :''}
          </div>
          {/*<input type="file" name="photo" onChange={e=>setFile(e.target.files[0])}/>*/}
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
          
          
        </form>
      </section>
    </>
  )
}

export default Register
