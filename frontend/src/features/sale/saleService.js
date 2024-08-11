import axios from 'axios'

const API_URL = 'https://vendor-connect.onrender.com/api/sales/'
const API_URLS = 'https://vendor-connect.onrender.com/api/sales/buy/'
const API_URLSS = 'https://vendor-connect.onrender.com/api/sales/driver/'
// Create new goal
const createSales = async (goalData, token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

  const response = await axios.post(API_URL, goalData, config)

  return response.data
}

// Get user goals
const getSales = async (token,fuser) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  
  const response = await axios.get(API_URL+fuser, config)

  return response.data
}
const getBuy = async (token,tuser) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URLS+tuser, config)

  return response.data
}
const getDri= async (token,duser) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  console.log("buy : "+duser)
  const response = await axios.get(API_URLSS+duser, config)

  return response.data
}
const saleService = {
    createSales,
    getSales,
    getBuy,
    getDri,
  }
  
  export default saleService
