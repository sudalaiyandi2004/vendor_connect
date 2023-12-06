import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Adds from './pages/Adds'
import Buy from './pages/Buy'
import Me from './pages/Me'
import Sale from './pages/Sale'
import Sold from './pages/Sold'
import PurItem from './components/PurItem'
import Purchase from './pages/Purchase'
import DrivInfo from './pages/DrivInfo'
import Csc from './components/Csc'
import Pop from './pages/Pop'
import './App.css'
import Pops from './pages/Pops'
function App() {
 
 
 

  return (
    <>
      <Router>
        <div className='container'>
      <Header/>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/driver' element={<DrivInfo/>}/>
            <Route path='/add' element={<Adds/>} />
            <Route path='/sales' element={<Sale/>} />
            <Route path='/me' element={<Me/>} />
            <Route path='/home' element={<Pops/>}/>
            <Route path='/csc' element={<Csc/>} />
            <Route path='/buy' element={<Buy/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/sold' element={<Sold />} />
            <Route path='/purchase' element={<Purchase />} />
            <Route path='/register' element={<Register />} />
            <Route path='/feedback' element={<Pop/>}/>
            
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
