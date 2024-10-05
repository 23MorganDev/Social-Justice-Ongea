const express = require("express");
const router = express.Router();
const ProfessionalList = require("../models/professionalListingModel");

router.post("/list-professional", async (req, res) => {
  const { username, service, description, contactInfo } = req.body;

  try {
    const newProfessional = new ProfessionalList({
      username,
      service,
      description,
      contactInfo,
    });
    await newProfessional.save();
    res.status(200).json({ message: "Professional added successfully!" }); // Return as JSON
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(400).json({ error: "There was an issue with adding the professional, please try again!" }); // JSON error response
  }
});



// GET route to fetch all professionals
router.get('/get-professionals', async (req, res) => {
  try {
    const professionals = await ProfessionalList.find();
    console.log("Fetched professionals:", professionals);
    res.status(200).json(professionals); // Ensure this returns JSON
  } catch (error) {
    console.error(error); // Log any errors for debugging
    res.status(400).json({ error: 'Error fetching professionals' }); // Return JSON error
  }
});



module.exports = router;
