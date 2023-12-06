const express = require('express')
const Sale = require('../models/saleModel')
const router = express.Router()
const {
  getSales,
    createSales,
    getBuy,
    getDriver,
    
} = require('../controllers/saleController')

const { protect } = require('../middleware/authMiddleware')


router.get('/:id',protect,getSales)
router.get('/buy/:id',protect,getBuy)
router.get('/driver/:id',protect,getDriver)
router.post('/',protect,createSales)
router.get('/purchase/count/:id', async (req, res) => {
  const {id}=req.params;
  try {
    console.log(id)
    const count = await Sale.countDocuments({ tuser:id});
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});
router.get('/sold/count/:id', async (req, res) => {
  const {id}=req.params;
  try {
    console.log(id)
    const count = await Sale.countDocuments({ fuser:id});
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});
module.exports=router