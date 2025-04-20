const { MongoClient, ServerApiVersion } = require('mongodb');

// MongoDB connection URI (from environment variable)
const uri = process.env.MONGODB_URI;

// Connection options
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
};

// Create a MongoClient
const client = new MongoClient(uri, options);

// Variable to cache the database connection
let dbConnection;

async function connectToDatabase() {
  if (dbConnection) return dbConnection;
  
  try {
    await client.connect();
    dbConnection = client.db('infovity');
    console.log('Successfully connected to MongoDB Atlas');
    return dbConnection;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  try {
    await client.close();
    console.log('MongoDB connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
    process.exit(1);
  }
});

module.exports = { connectToDatabase };