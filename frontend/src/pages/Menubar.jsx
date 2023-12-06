import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { logout, reset } from '../features/auth/authSlice'
import { useSelector, useDispatch } from 'react-redux'
import './Menubar.css'; // Import your CSS file for styling
import { BrowserRouter as Router, Switch, Route, Link, useParams } from 'react-router-dom';
const Menubar = ({user,goals,sales,pur}) => {
  const [isActive, setIsActive] = useState(false); // State to manage the active state of the menu
  const navigate=useNavigate()
  const toggleMenu = () => {
    setIsActive(!isActive);
  };
  const id=3;
  const [PurchaseCount, setPurchaseCount] = useState(null);
  const [SoldCount, setSoldCount] = useState(null);
  const [StockCount, setStockCount] = useState(null);
  const dispatch = useDispatch()

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }
  useEffect(() => {
    // Make an API request to your backend to get the count
    fetch(`http://localhost:5000/api/sales/purchase/count/${user._id}`)
      .then((response) => response.json())
      .then((data) => setPurchaseCount(data.count))
      .catch((error) => console.error('Error:', error));
      
  }, []);
  useEffect(() => {
    // Make an API request to your backend to get the count
    fetch(`http://localhost:5000/api/sales/sold/count/${user._id}`)
      .then((response) => response.json())
      .then((data) => setSoldCount(data.count))
      .catch((error) => console.error('Error:', error));
  }, []);
  useEffect(() => {
    // Make an API request to your backend to get the count
    fetch(`http://localhost:5000/api/goals/stock/count/${user._id}`)
      .then((response) => response.json())
      .then((data) => setStockCount(data.count))
      .catch((error) => console.error('Error:', error));
      
  }, []);
  console.log(PurchaseCount)
  return (
    <nav className={`menu-bar ${isActive ? 'active' : ''}`}>
      <button onClick={toggleMenu} >
      <div className='toggle-button'></div>
      <div className='toggle-button'></div>
      <div className='toggle-button'></div>
      </button>
      {console.log(sales)}
      <ul className="menu-items">
        <li><Link to='/'>Home</Link></li>
       <li><Link to='/me' state={{from:user,purchase:PurchaseCount,sold:SoldCount,stock:StockCount}}>
  Profile
</Link></li>
        <li><Link to='/sales' state={{goals:goals}}>On sales</Link></li>
        <li><Link to='/sold' state={{sales:sales}}>Sold</Link></li>
        <li><Link to='/purchase' state={{pur:pur}}>Purchased</Link></li>
        <li><Link to='/add' className='close'>Add</Link></li>
       
        
        {/* Add more menu items as needed */}
      </ul>
     
    </nav>
  );
};

export default Menubar;
