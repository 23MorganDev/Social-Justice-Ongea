const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Initialize Express
const app = express();

// Middleware
app.use(express.json());
app.use(cors());


const userRoutes = require('./routes/userSubmissionRoute'); 
const professionalRoutes = require('./routes/professionalListRoute'); 

// Use routes
app.use('/backend', userRoutes);
app.use('/backend', professionalRoutes);

// MongoDB URL and Port from environment variables
const mongoDBUrl = process.env.MONGO_URL;
const port = process.env.PORT || 5000;

// Validate MongoDB URL
if (!mongoDBUrl) {
  console.error('MONGO_URL is not defined in .env file');
  process.exit(1); // Exit the process if MONGO_URL is not set
}

// Connect to MongoDB
mongoose.connect(mongoDBUrl, {
  useUnifiedTopology: true, 
  useNewUrlParser: true, 
  writeConcern: {
    w: 'majority', 
    j: true, 
    wtimeout: 1000 
  }
})
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB', err);
  });

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed. Exiting...');
  process.exit(0);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});
