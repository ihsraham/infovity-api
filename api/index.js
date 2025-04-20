// This file is the entry point for Vercel serverless function
// It imports our Express app and wraps it for serverless execution

const serverless = require("serverless-http");
const app = require("../src/app");

module.exports = serverless(app);
