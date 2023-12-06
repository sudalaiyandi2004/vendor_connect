const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')
const User = require('../models/userModel')

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
  const { id } = req.user;

  // Retrieve goals from the database excluding the goal with the given ID
  const goals = await Goal.find({ user:id } );

  // Send the goals as a JSON response with a status code of 200
  res.status(200).json(goals);
});

const getOtherGoals = asyncHandler(async (req, res) => {
  const { id } = req.user;

  // Retrieve goals from the database excluding the goal with the given ID
  const goals = await Goal.find({ user:{$ne:id }} );

  // Send the goals as a JSON response with a status code of 200
  res.status(200).json(goals);
});

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.produce || !req.body.weight || !req.body.price) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  const goal = await Goal.create({
    produce: req.body.produce,
    weight: req.body.weight,
    price: req.body.price,
    place:req.body.place,
    name:req.user.name,
    phone:req.user.phone,
    user: req.user.id,
    

  })

  res.status(200).json(goal)
})

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)

  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedGoal)
})

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)

  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await goal.deleteOne()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getGoals,
  getOtherGoals,
  setGoal,
  updateGoal,
  deleteGoal,
}
