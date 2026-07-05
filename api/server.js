import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';
import fs from 'fs';
import session from 'express-session';
import passport from './lib/passport.js';
import dbConnect from './lib/db.js';
import authRoutes from './routes/auth.js';
import contactRoutes from './routes/contact.js';
import sliderUpdateRoutes from './routes/sliderUpdates.js';
import usersRoutes from './routes/users.js';
import servicesRoutes from './routes/services.js';
import postsRoutes from './routes/posts.js';
import projectsRoutes from './routes/projects.js';
import printOrdersRoutes from './routes/printOrders.js';
import pcbOrdersRoutes from './routes/pcbOrders.js';
import customRequestsRoutes from './routes/customRequests.js';

// Configure __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet({
  contentSecurityPolicy: false, // Disable CSP for now, configure properly in production
}));

// Configure CORS
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';
app.use(cors({
  origin: corsOrigin,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api/', limiter);

// Auth-specific rate limiting (stricter)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 auth requests per windowMs
  message: 'Too many authentication attempts, please try again later.',
});

app.use(express.json());

// Session middleware for Passport
app.use(session({
  secret: process.env.SESSION_SECRET || 'neevachi-session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// API Routes
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/slider-updates', sliderUpdateRoutes);
app.use('/api/admin/users', usersRoutes);
app.use('/api/admin/services', servicesRoutes);
app.use('/api/admin/posts', postsRoutes);
app.use('/api/admin/projects', projectsRoutes);
// New order routes
app.use('/api/print-orders', printOrdersRoutes);
app.use('/api/pcb-orders', pcbOrdersRoutes);
app.use('/api/custom-requests', customRequestsRoutes);

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
      endpoints: ['/api/health', '/api/auth', '/api/contact', '/api/slider-updates', '/api/admin/users', '/api/admin/services', '/api/admin/posts'],
      note: 'Frontend not built yet. Build frontend to serve full application.'
    });
  });
}

// Start the server
const startServer = async () => {
  // Connect to MongoDB
  await dbConnect();
  
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`MongoDB Connected: ${process.env.MONGODB_URI || 'localhost'}`);
    console.log(`Open http://localhost:${PORT} to view the application`);
    console.log(`Or access it from your network at: http://${getLocalIpAddress()}:${PORT}`);
  });
};

startServer();

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
