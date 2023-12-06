const express = require('express')
const router = express.Router()
const {
  sendEmail

} = require('../controllers/mailController')

const { protect } = require('../middleware/authMiddleware')

router.get('/',protect,sendEmail)


module.exports = router
