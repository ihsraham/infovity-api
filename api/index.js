// This file is the entry point for Vercel serverless function
// It imports our Express app and wraps it for serverless execution

const app = require('../src/app');

// Export a module that can be used by Vercel
module.exports = app;