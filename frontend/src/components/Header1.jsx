import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { useState } from 'react'
import './Header1.css';
import Menubar from '../pages/Menubar';
function Header1({user,goals,sales,pur}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  

  
  const [isActive, setIsActive] = useState(false); // State to manage the active state of the menu

  const toggleMenu = () => {
    setIsActive(!isActive);
  };
  const id=3;
  
  

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }
  return (
    <header className='header1'>
        <nav className={`menu-bar ${isActive ? 'active' : ''}`}>
      <button onClick={toggleMenu} >
      <div className='toggle-button'></div>
      <div className='toggle-button'></div>
      <div className='toggle-button'></div>
      </button>
      {console.log(sales)}
      <ul className="menu-items">
        <li><Link to='/'>Home</Link></li>
       <li><Link to='/me' state={{from:user}}>
  Profile
</Link></li>
        <li><Link to='/sales' state={{goals:goals}}>On sales</Link></li>
        <li><Link to='/sold' state={{sales:sales}}>Sold</Link></li>
        <li><Link to='/purchase' state={{pur:pur}}>Purchased</Link></li>
        <li><Link to='/add' className='close'>Add</Link></li>
       
        
        {/* Add more menu items as needed */}
      </ul>
     
    </nav>
      <div className='logo1'>
        <h1><Link to='/'>VENDOR CONNECT</Link></h1>
        
      </div>
      <ul>
      <li>
            
            <button className='btn1' onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
      </ul>
    </header>
  )
}

export default Header1
