const express = require('express')
const Goal = require('../models/goalModel')
const router = express.Router()
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
  getOtherGoals,
} = require('../controllers/goalController')

const { protect } = require('../middleware/authMiddleware')

router.get('/',protect,getGoals)
router.get('/get',protect,getOtherGoals)
router.post('/',protect,setGoal)
router.route('/:id').delete(protect, deleteGoal)
router.put('/update/:id',protect,updateGoal)

router.put('/:id', async (req, res) => {
  const { weight } = req.body;
  const { id } = req.params;

  try {
    // Find the goal by ID
    const goal = await Goal.findByIdAndUpdate(
      id,
      { weight },
      { new: true } // Return the updated goal
    );

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    res.json(goal);
  } catch (error) {
    console.error('Error updating goal:', error.message);
    res.status(500).json({ message: 'Error updating goal' });
  }
});
router.get('/stock/count/:id', async (req, res) => {
  const {id}=req.params;
  try {
    console.log(id)
    const count = await Goal.countDocuments({ user:id});
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete the user by ID in the database
    const user = await Goal.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    res.json({ message: 'Goal deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error.message);
    res.status(500).json({ message: 'Error deleting user' });
  }
});

module.exports = router
