const path = require('path');
const express = require('express');
const colors = require('colors');
const cors=require('cors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const Country=require('country-state-city').Country
const State=require('country-state-city').State
const City=require('country-state-city').City
const uri = 'mongodb+srv://sabari:assk3074@traversyclustet.kn9s3vp.mongodb.net/mernapp?retryWrites=true&w=majority'
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    // Continue with your code here
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });


const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
}

));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/sales', require('./routes/saleRoutes'));

// Serve frontend
if (process.env.NODE_ENV === 'production') {

  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
