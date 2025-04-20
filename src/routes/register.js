const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('../db/mongodb');
const { validateRegistration, createRegistration } = require('../models/registration');

// Registration endpoint
router.post('/', async (req, res) => {
  try {
    // Get the data from the request
    const data = req.body;
    
    // Validate the data
    const validation = validateRegistration(data);
    if (!validation.valid) {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation failed', 
        errors: validation.errors 
      });
    }
    
    // Connect to MongoDB
    const db = await connectToDatabase();
    const registrations = db.collection('registrations');
    
    // Check if email already exists for this webinar
    const existingRegistration = await registrations.findOne({
      email: data.email,
      'webinarInfo.title': data.topic
    });
    
    if (existingRegistration) {
      return res.status(409).json({ 
        success: false, 
        message: 'You are already registered for this webinar'
      });
    }
    
    // Create registration object
    const registration = createRegistration(data);
    
    // Insert into database
    await registrations.insertOne(registration);
    
    // Return success
    return res.status(200).json({ 
      success: true, 
      message: 'Registration successful',
      webinarInfo: registration.webinarInfo
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'An error occurred during registration' 
    });
  }
});

module.exports = router;