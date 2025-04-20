# Infovity Webinar API

A serverless Express API for handling webinar registrations, built to work with the Infovity Webinar Registration frontend.

<!-- ![Infovity API](https://via.placeholder.com/800x400?text=Infovity+API+Server) -->

## Features

- **Serverless Architecture**: Optimized for deployment to Vercel
- **Express.js**: Powerful and flexible Node.js web application framework
- **MongoDB Integration**: Persistent storage using MongoDB Atlas
- **Form Validation**: Server-side validation of registration data
- **Cross-Origin Support**: CORS configuration for frontend integration
- **Security**: Includes basic security headers with Helmet

## Tech Stack

- **Node.js**: JavaScript runtime
- **Express**: Web framework
- **MongoDB**: NoSQL database
- **Vercel**: Serverless deployment platform
- **Helmet**: Security middleware

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher
- MongoDB Atlas account (free tier is sufficient)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/infovity-api.git
   cd infovity-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the project root with the following content:
   ```
   # MongoDB Connection String - Replace with your MongoDB Atlas connection string
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
   
   # Server Configuration
   PORT=3001
   NODE_ENV=development
   ```

### Development

Start the development server:

```bash
npm run dev
```

The API will be available at `http://localhost:3001`.

### Testing the API

You can test the API using tools like Postman or cURL:

```bash
curl -X POST http://localhost:3001/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "1234567890",
    "topic": "uk-education",
    "consentGiven": true
  }'
```

## Project Structure

```
infovity-api/
├── api/
│   └── index.js           # Vercel serverless entry point
├── src/
│   ├── app.js             # Express application setup
│   ├── db/
│   │   └── mongodb.js     # MongoDB connection
│   ├── models/
│   │   └── registration.js # Registration model
│   └── routes/
│       └── register.js    # Registration routes
├── .env                   # Environment variables
├── package.json           # Dependencies and scripts
└── vercel.json            # Vercel configuration
```

## API Endpoints

### Register for a Webinar

**POST** `/api/register`

Register a user for a webinar.

**Request Body:**

```json
{
  "name": "User Name",
  "email": "user@example.com",
  "phone": "1234567890",
  "topic": "uk-education",
  "consentGiven": true
}
```

**Response (Success - 200):**

```json
{
  "success": true,
  "message": "Registration successful",
  "webinarInfo": {
    "title": "Education in the UK",
    "date": "May 3, 2025",
    "time": "7:00 PM IST"
  }
}
```

**Response (Error - 400, 409, 500):**

```json
{
  "success": false,
  "message": "Error message",
  "errors": ["List of validation errors"] // Only included for validation errors
}
```

### Health Check

**GET** `/api/health`

Check if the API is running.

**Response:**

```json
{
  "status": "ok",
  "message": "API is running"
}
```

## Database Schema

### Registration Collection

```javascript
{
  name: String,            // Full name of registrant
  email: String,           // Email address
  phone: String,           // Phone number
  topic: String,           // Webinar topic ID
  consentGiven: Boolean,   // Marketing consent
  registrationDate: Date,  // When they registered
  webinarInfo: {           // Webinar details
    title: String,         // Webinar title
    date: String,          // Event date
    time: String           // Event time
  },
  status: String           // registered, attended, no-show
}
```

## Deployment

### Deploying to Vercel

1. Push your code to a GitHub repository.
2. Import the project in Vercel.
3. Add the following environment variable:
   - `MONGODB_URI`: Your MongoDB connection string
4. Deploy!

### Important Vercel Configuration Notes

The `vercel.json` file contains important configuration for running Express.js in a serverless environment:

```json
{
  "version": 2,
  "builds": [{ "src": "api/index.js", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.*)", "dest": "/api/index.js" }]
}
```

## Admin Dashboard (Future Enhancement)

Plans for an admin dashboard include:

- **Authentication**: Secure login for administrators
- **Registration List**: View and filter registrations
- **Export**: Download registration data as CSV
- **Analytics**: Track registration trends
- **Email Integration**: Send reminders and follow-ups

## Frontend Integration

This API is designed to work with the Infovity Webinar Registration frontend. Ensure CORS is properly configured by updating the allowed origins in `src/app.js`:

```javascript
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://your-frontend-domain.com'
  ],
  // ...other options
};
```

## License

[MIT](LICENSE)

## Contributors

- Your Name - Initial work

## Acknowledgments

- MongoDB Atlas for database hosting
- Vercel for serverless hosting
- Express.js team for the excellent framework