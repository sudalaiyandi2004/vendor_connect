import axios from 'axios'

const API_URL = 'https://vendor-connect.onrender.com/api/users/'

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}
// get me
const getMe = async (token) => {
  console.log(token)
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  console.log("Config: ",config)

  const response = await axios.get(API_URL, config)

  return response.data
}
const getAll = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL+'getAll', config)

  return response.data
}
const authService = {
  register,
  logout,
  login,
  getMe,
  getAll,
}

export default authService
