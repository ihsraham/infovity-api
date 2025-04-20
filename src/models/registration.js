// Webinar topics and their details
const webinarTopics = {
    'uk-education': {
      title: 'Education in the UK',
      date: 'May 3, 2025',
      time: '7:00 PM IST'
    },
    'finance': {
      title: 'Financial Planning for International Education',
      date: 'May 10, 2025',
      time: '7:00 PM IST'
    },
    'salesforce': {
      title: 'Salesforce Careers: Skills & Opportunities',
      date: 'May 17, 2025',
      time: '7:00 PM IST'
    },
    'fig-regime': {
      title: 'Navigate the New UK Foreign Income and Gains (FIG) Regime in 2025',
      date: 'April 27, 2025',
      time: '8:00 PM UK'
    }
  };
  
  // Validate registration data
  function validateRegistration(data) {
    const errors = [];
    
    // Check required fields
    if (!data.name) errors.push('Name is required');
    if (!data.email) errors.push('Email is required');
    if (!data.phone) errors.push('Phone is required');
    if (!data.topic) errors.push('Topic is required');
    
    // Check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (data.email && !emailRegex.test(data.email)) {
      errors.push('Invalid email format');
    }
    
    // Check if topic is valid
    if (data.topic && !webinarTopics[data.topic]) {
      errors.push('Invalid topic selection');
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }
  
  // Create a registration document
  function createRegistration(data) {
    return {
      name: data.name,
      email: data.email,
      phone: data.phone,
      topic: data.topic,
      consentGiven: !!data.consentGiven,
      registrationDate: new Date(),
      webinarInfo: webinarTopics[data.topic],
      status: 'registered'
    };
  }
  
  module.exports = {
    webinarTopics,
    validateRegistration,
    createRegistration
  };