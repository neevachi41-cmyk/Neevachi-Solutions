import dotenv from 'dotenv';
dotenv.config(); // ✅ MUST be first — before any other imports that read env vars

import express from 'express';
import cors from 'cors';
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

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Security Middleware ───────────────────────────────────────────────────
app.use(helmet({
  contentSecurityPolicy: false,
}));

// ─── CORS ─────────────────────────────────────────────────────────────────
const corsOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173,http://localhost:8080,http://172.20.10.7:8080')
  .split(',')
  .map(o => o.trim());

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, curl)
    if (!origin || corsOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked: ${origin}`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ─── Rate Limiting ─────────────────────────────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { message: 'Too many requests from this IP, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// Auth-specific rate limiting (stricter)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10, // raised from 5 to avoid lockouts during dev
  message: { message: 'Too many authentication attempts, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// ─── Body Parser ──────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ─── Session (for Passport OAuth) ─────────────────────────────────────────
app.use(session({
  secret: process.env.SESSION_SECRET || 'neevachi-session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// ─── Passport ─────────────────────────────────────────────────────────────
app.use(passport.initialize());
app.use(passport.session());

// ─── API Routes ───────────────────────────────────────────────────────────
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/slider-updates', sliderUpdateRoutes);
app.use('/api/admin/users', usersRoutes);
app.use('/api/admin/services', servicesRoutes);
app.use('/api/admin/posts', postsRoutes);
app.use('/api/admin/projects', projectsRoutes);
app.use('/api/print-orders', printOrdersRoutes);
app.use('/api/pcb-orders', pcbOrdersRoutes);
app.use('/api/custom-requests', customRequestsRoutes);

// ─── Health Check ─────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Server is running',
    mongodb: 'connected',
    timestamp: new Date().toISOString()
  });
});

// ─── Serve Frontend (production) ──────────────────────────────────────────
// The frontend dist is built into the ROOT dist folder (one level up from /api)
const distPath = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  // Note: SPA routing handled by frontend in production
} else {
  app.get('/', (req, res) => {
    res.json({
      message: '✅ Neevachi Backend API is running',
      version: '1.0.0',
      endpoints: {
        health: '/api/health',
        auth: '/api/auth',
        contact: '/api/contact',
        sliderUpdates: '/api/slider-updates',
        printOrders: '/api/print-orders',
        pcbOrders: '/api/pcb-orders',
        customRequests: '/api/custom-requests',
        admin: {
          users: '/api/admin/users',
          services: '/api/admin/services',
          posts: '/api/admin/posts',
          projects: '/api/admin/projects',
        }
      }
    });
  });
}

// ─── Global Error Handler ─────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

// ─── Start Server ─────────────────────────────────────────────────────────
const startServer = async () => {
  await dbConnect();

  app.listen(PORT, '0.0.0.0', () => {
    const localIP = getLocalIpAddress();
    console.log('\n🚀 Neevachi Backend Server Started');
    console.log(`   Local:   http://localhost:${PORT}`);
    console.log(`   Network: http://${localIP}:${PORT}`);
    console.log(`   API:     http://localhost:${PORT}/api/health\n`);
  });
};

startServer().catch(err => {
  console.error('❌ Failed to start server:', err.message);
  process.exit(1);
});

// Helper: get local IPv4 address
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
