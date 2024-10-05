const express = require('express')
const router = express.Router()
const UserSubmission = require('../models/userSubmissionModel')

//POST route for users

router.post('/post-issue', async (req, res) => {
  const { username, title, description, contactInfo } = req.body;

  try {
      const newSubmission = new UserSubmission({
          username,
          title,
          description,
          contactInfo
      });
      await newSubmission.save();
      res.status(201).send('Issue submitted successfully');
  } catch (error) {
      console.error('Error details:', error); // Log the error details
      res.status(400).send('There was an issue posting the issue!, please try again');
  }
});


// GET route to fetch all user submissions
router.get('/get-submissions', async (req, res) => {
    try {
      const submissions = await UserSubmission.find();
      res.status(200).json(submissions);
    } catch (error) {
      res.status(400).send('Error fetching submissions');
    }
  });
  

module.exports = router