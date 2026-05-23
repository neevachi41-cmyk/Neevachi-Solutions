# Backend API Server

This is the backend API server for Neevachi Tech web application.

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   - Copy the `.env` file and update the values as needed:
   - `PORT`: Server port (default: 5000)
   - `MONGODB_URI`: MongoDB connection string
   - `JWT_SECRET`: Secret key for JWT tokens
   - `FRONTEND_URL`: Frontend application URL

3. **Start the Server**
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Health Check
- `GET /api/health` - Check if server is running

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (admin)

## Features

- ✅ Express.js server with ES modules
- ✅ MongoDB database integration
- ✅ JWT authentication
- ✅ CORS enabled
- ✅ Static file serving
- ✅ Health check endpoint
- ✅ Auto-restart in development (nodemon)

## Default Configuration

- Server runs on port 5000
- MongoDB connection: `mongodb://localhost:27017/your-web-dream`
- Frontend URL: `http://localhost:5173`

## Troubleshooting

1. **MongoDB Connection Error**
   - Make sure MongoDB is running on your system
   - Check the MONGODB_URI in .env file

2. **Port Already in Use**
   - Change the PORT in .env file
   - Or kill the process using the port

3. **Module Import Errors**
   - Ensure you're using Node.js v18+ with ES module support
   - Check that "type": "module" is in package.json
