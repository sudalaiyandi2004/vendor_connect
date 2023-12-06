const asyncHandler = require('express-async-handler')
const mongoose=require('mongoose')
const Sales = require('../models/saleModel')
const User = require('../models/userModel')

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getSales = asyncHandler(async (req, res) => {
  const fuser = req.params.id; // Assuming the 'fuser' is passed in the request body
  console.log(fuser)
  console.log('k')
  
  if (fuser !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }
  // Retrieve sales from the database based on the 'fuser' field
  const sales = await Sales.find({ fuser});

  // Send the goals as a JSON response with a status code of 200
  res.status(200).json(sales);
});
const getBuy = asyncHandler(async (req, res) => {
  const tuser = req.params.id; // Assuming the 'fuser' is passed in the request body
  console.log(tuser)
  console.log('t')
  
  if (tuser !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }
  // Retrieve sales from the database based on the 'fuser' field
  const pur = await Sales.find({ tuser});

  // Send the goals as a JSON response with a status code of 200
  res.status(200).json(pur);
});
const getDriver = asyncHandler(async (req, res) => {
  const duser = req.params.id; // Assuming the 'fuser' is passed in the request body
  console.log(duser)
  console.log('t')
  if (duser !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  // Retrieve sales from the database based on the 'fuser' field
  const dri = await Sales.find({ duser});

  // Send the goals as a JSON response with a status code of 200
  res.status(200).json(dri);
});
const createSales = asyncHandler(async (req, res) => {
    if (!req.body.produce || !req.body.weight) {
      res.status(400)
      throw new Error('Please add a text field')
    }
    console.log(req.body.produce)
    const sale = await Sales.create({
      produce: req.body.produce,
      weight: req.body.weight,
      price: req.body.price,
      fplace:req.body.fplace,
      tplace:req.body.tplace,
      fname:req.body.fname,
      fuser: req.body.fuser,
      duser:req.body.duser,
      tname:req.body.tname,
      tuser: req.body.tuser,
      driver:req.body.driver,
    })
  
    res.status(200).json(sale)
  })
module.exports = {
    getSales,
    getBuy,
    createSales,
    getDriver,
  }