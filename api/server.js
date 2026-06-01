import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';
import fs from 'fs';
import dbConnect from './lib/db.js';
import authRoutes from './routes/auth.js';
import contactRoutes from './routes/contact.js';
import sliderUpdateRoutes from './routes/sliderUpdates.js';

// Configure __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
dbConnect();

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/slider-updates', sliderUpdateRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Serve static files from the dist directory (if it exists)
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  
  // For all other non-API routes, serve the index.html file
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  // If dist folder doesn't exist, provide a simple root route
  app.get('/', (req, res) => {
    res.json({ 
      message: 'Backend API is running', 
      endpoints: ['/api/health', '/api/auth', '/api/contact'],
      note: 'Frontend not built yet. Build frontend to serve full application.'
    });
  });
}

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`MongoDB Connected: ${process.env.MONGO_URI || 'localhost'}`);
  console.log(`Open http://localhost:${PORT} to view the application`);
  console.log(`Or access it from your network at: http://${getLocalIpAddress()}:${PORT}`);
});

// Function to get local IP address
function getLocalIpAddress() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      const { address, family, internal } = iface;
      if (family === 'IPv4' && !internal) {
        return address;
      }
    }
  }
  return 'localhost';
}
