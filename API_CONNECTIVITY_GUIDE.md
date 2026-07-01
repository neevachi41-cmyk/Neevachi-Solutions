# API Connectivity Guide - Neevachi Solutions

This guide explains how to connect the frontend to the backend API and establish full-stack connectivity with MongoDB.

---

## Table of Contents
1. [Backend Setup](#backend-setup)
2. [Frontend API Configuration](#frontend-api-configuration)
3. [Environment Variables](#environment-variables)
4. [File-by-File API Connections](#file-by-file-api-connections)
5. [Testing the Connections](#testing-the-connections)
6. [Troubleshooting](#troubleshooting)

---

## Backend Setup

### Step 1: MongoDB Connection
**File:** `api/lib/db.js`

```javascript
import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = "mongodb+srv://neevachi41_db_user:<YOUR_PASSWORD>@cluster0.qjxbfpz.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db = null;

const connectDB = async () => {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Connected to MongoDB!");
    db = client.db();
    return client;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const getDB = () => {
  if (!db) throw new Error('Database not connected');
  return db;
};

export default connectDB;
export { getDB, getClient };
```

**Action Required:** Replace `<YOUR_PASSWORD>` with your actual MongoDB Atlas password.

---

### Step 2: Backend Models
**Files:** `api/models/`

#### User Model (`api/models/User.js`)
- Handles user authentication
- Password hashing with bcryptjs
- User CRUD operations

#### Contact Model (`api/models/Contact.js`)
- Stores contact form submissions
- Retrieves all contacts

#### SliderUpdate Model (`api/models/SliderUpdate.js`)
- Manages slider content
- Active/inactive toggle functionality

---

### Step 3: Backend Routes
**Files:** `api/routes/`

#### Auth Routes (`api/routes/auth.js`)
```javascript
// POST /api/auth/register - Register new user
// POST /api/auth/login - Login user
// POST /api/auth/create-admin - Create admin user
```

#### Contact Routes (`api/routes/contact.js`)
```javascript
// POST /api/contact - Submit contact form
// GET /api/contact - Get all contacts
```

#### Slider Updates Routes (`api/routes/sliderUpdates.js`)
```javascript
// GET /api/slider-updates - Get active slider updates
// GET /api/slider-updates/admin/all - Get all slider updates
// POST /api/slider-updates - Create slider update
// PUT /api/slider-updates/:id - Update slider update
// DELETE /api/slider-updates/:id - Delete slider update
// PATCH /api/slider-updates/:id/toggle - Toggle active status
```

#### Users Management Routes (`api/routes/users.js`)
```javascript
// GET /api/admin/users - Get all users
// GET /api/admin/users/:id - Get single user
// POST /api/admin/users - Create user
// PUT /api/admin/users/:id - Update user
// DELETE /api/admin/users/:id - Delete user
```

#### Services Management Routes (`api/routes/services.js`)
```javascript
// GET /api/admin/services - Get active services (public)
// GET /api/admin/services/admin/all - Get all services (admin)
// GET /api/admin/services/:id - Get single service
// POST /api/admin/services - Create service
// PUT /api/admin/services/:id - Update service
// DELETE /api/admin/services/:id - Delete service
```

#### Blog Posts Routes (`api/routes/posts.js`)
```javascript
// GET /api/admin/posts - Get active posts (public)
// GET /api/admin/posts/admin/all - Get all posts (admin)
// GET /api/admin/posts/:id - Get single post
// POST /api/admin/posts - Create post
// PUT /api/admin/posts/:id - Update post
// DELETE /api/admin/posts/:id - Delete post
```

---

### Step 4: Express Server
**File:** `api/server.js`

The server:
- Connects to MongoDB on startup
- Configures CORS for frontend
- Implements rate limiting
- Serves API routes
- Runs on port 5000 (default)

---

## Frontend API Configuration

### Step 1: Central API Configuration
**File:** `src/lib/api/admin.ts`

```typescript
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

**Environment Variable:** Set `VITE_API_URL` in `.env` file
- Local development: `http://localhost:5000/api`
- Production: Your deployed API URL

---

## Environment Variables

### Backend (`.env` in `api/` directory)
```env
MONGODB_URI=mongodb+srv://neevachi41_db_user:YOUR_PASSWORD@cluster0.qjxbfpz.mongodb.net/?appName=Cluster0
PORT=5000
JWT_SECRET=your_jwt_secret_key
CORS_ORIGIN=http://localhost:5173
ADMIN_SECRET_KEY=neevachi-admin-setup-2024
```

### Frontend (`.env` in root directory)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## File-by-File API Connections

### 1. Authentication Files

#### `src/contexts/AuthContext.tsx`
**Purpose:** Manages authentication state across the app

**API Connections:**
```typescript
// Line 46: Login API call
const data = await authAPI.login(email, password);

// Uses: POST /api/auth/login
// Backend: api/routes/auth.js (line 36)
```

**How it works:**
1. User enters credentials
2. Calls `authAPI.login(email, password)`
3. Backend verifies credentials with MongoDB
4. Returns JWT token
5. Token stored in localStorage
6. User redirected to dashboard

---

#### `src/pages/Register.tsx`
**Purpose:** User registration page

**API Connections:**
```typescript
// Line 54: Register API call
await authAPI.register(data.email, data.password);

// Uses: POST /api/auth/register
// Backend: api/routes/auth.js (line 8)
```

**How it works:**
1. User fills registration form
2. Validates inputs with Zod
3. Calls `authAPI.register(email, password)`
4. Backend hashes password with bcrypt
5. Stores user in MongoDB
6. Returns success message
7. User redirected to login

---

### 2. Contact Form Files

#### `src/pages/Contact.tsx`
**Purpose:** Public contact form

**API Connections:**
```typescript
// Line 95: Contact submission
await contactAPI.submitContact({
  name: formData.name,
  email: formData.email,
  message: formData.message
});

// Uses: POST /api/contact
// Backend: api/routes/contact.js (line 7)
```

**How it works:**
1. User fills contact form
2. Validates required fields
3. Calls `contactAPI.submitContact()`
4. Backend stores in MongoDB contacts collection
5. Returns success message
6. Form resets

---

#### `src/pages/ContactAdmin.tsx`
**Purpose:** Admin view of contact submissions

**API Connections:**
```typescript
// Line 22: Get all contacts
const data = await contactAPI.getContacts();
// Uses: GET /api/contact

// Line 34: Delete contact
await contactAPI.deleteContact(id);
// Uses: DELETE /api/contact/:id
```

**How it works:**
1. Admin loads page → fetches all contacts
2. Displays contact list
3. Admin can delete contacts
4. Changes reflected immediately

---

### 3. Slider Updates Files

#### `src/components/LatestUpdatesSlider.tsx`
**Purpose:** Public slider displaying achievements

**API Connections:**
```typescript
// Line 25: Fetch slider updates
const response = await axios.get(`${API_URL}/slider-updates`);

// Uses: GET /api/slider-updates
// Backend: api/routes/sliderUpdates.js (line 8)
```

**How it works:**
1. Component mounts
2. Fetches active slider updates from MongoDB
3. Displays in carousel
4. Auto-rotates every 5 seconds
5. Falls back to hardcoded data if API fails

---

#### `src/pages/SliderUpdatesAdmin.tsx`
**Purpose:** Admin management of slider content

**API Connections:**
```typescript
// Line 46: Get all slider updates
const data = await sliderUpdatesAPI.getSliderUpdates();
// Uses: GET /api/slider-updates/admin/all

// Line 59: Update slider update
await sliderUpdatesAPI.updateSliderUpdate(editingUpdate._id, formData);
// Uses: PUT /api/slider-updates/:id

// Line 61: Create slider update
await sliderUpdatesAPI.createSliderUpdate(formData);
// Uses: POST /api/slider-updates

// Line 101: Delete slider update
await sliderUpdatesAPI.deleteSliderUpdate(id);
// Uses: DELETE /api/slider-updates/:id

// Line 111: Toggle active status
await sliderUpdatesAPI.toggleSliderUpdate(id);
// Uses: PATCH /api/slider-updates/:id/toggle
```

**How it works:**
1. Admin loads page → fetches all updates
2. Can create new updates
3. Can edit existing updates
4. Can delete updates
5. Can toggle active/inactive status
6. Changes immediately reflected in public slider

---

### 4. Admin Management Files

#### `src/pages/UsersAdmin.tsx`
**Purpose:** User management

**API Connections:**
```typescript
// Line 31: Get all users
const data = await usersAPI.getUsers();
// Uses: GET /api/admin/users

// Line 44: Update user
await usersAPI.updateUser(editingUser._id, formData);
// Uses: PUT /api/admin/users/:id

// Line 46: Create user
await usersAPI.createUser(formData);
// Uses: POST /api/admin/users

// Line 100: Delete user
await usersAPI.deleteUser(id);
// Uses: DELETE /api/admin/users/:id
```

**Backend:** `api/routes/users.js` and `api/models/User.js`

**How it works:**
1. Admin loads page → fetches all users (passwords excluded)
2. Can create new users
3. Can edit existing users
4. Can delete users
5. Changes immediately reflected

---

#### `src/pages/ServicesAdmin.tsx`
**Purpose:** Services management

**API Connections:**
```typescript
// Line 35: Get all services
const data = await servicesAPI.getServices();
// Uses: GET /api/admin/services/admin/all

// Line 48: Update service
await servicesAPI.updateService(editingService._id, formData);
// Uses: PUT /api/admin/services/:id

// Line 50: Create service
await servicesAPI.createService(formData);
// Uses: POST /api/admin/services

// Line 72: Delete service
await servicesAPI.deleteService(id);
// Uses: DELETE /api/admin/services/:id
```

**Backend:** `api/routes/services.js` and `api/models/Service.js`

**How it works:**
1. Admin loads page → fetches all services
2. Can create new services
3. Can edit existing services
4. Can delete services
5. Can toggle active/inactive status
6. Changes immediately reflected

---

#### `src/pages/BlogAdmin.tsx`
**Purpose:** Blog management

**API Connections:**
```typescript
// Line 35: Get all posts
const data = await blogAPI.getPosts();
// Uses: GET /api/admin/posts/admin/all

// Line 48: Update post
await blogAPI.updatePost(editingPost._id, formData);
// Uses: PUT /api/admin/posts/:id

// Line 50: Create post
await blogAPI.createPost(formData);
// Uses: POST /api/admin/posts

// Line 72: Delete post
await blogAPI.deletePost(id);
// Uses: DELETE /api/admin/posts/:id
```

**Backend:** `api/routes/posts.js` and `api/models/Post.js`

**How it works:**
1. Admin loads page → fetches all posts
2. Can create new posts
3. Can edit existing posts
4. Can delete posts
5. Can toggle active/inactive status
6. Changes immediately reflected

---

## Testing the Connections

### Step 1: Start MongoDB
Ensure your MongoDB Atlas cluster is running and accessible.

### Step 2: Start Backend Server
```bash
cd api
npm install
npm run dev
```

Expected output:
```
Server running on port 5000
Pinged your deployment. You successfully connected to MongoDB!
```

### Step 3: Start Frontend
```bash
npm install
npm run dev
```

### Step 4: Test Endpoints

#### Test Authentication
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test12345"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test12345"}'
```

#### Test Contact Form
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","message":"Test message"}'
```

#### Test Slider Updates
```bash
# Get active updates
curl http://localhost:5000/api/slider-updates

# Create update (requires auth token)
curl -X POST http://localhost:5000/api/slider-updates \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title":"Test","teamName":"Test Team","position":"1st","schoolName":"Test School","category":"Test","image":"https://example.com/image.jpg","icon":"Trophy"}'
```

#### Test Services
```bash
# Get active services
curl http://localhost:5000/api/admin/services

# Create service (requires auth token)
curl -X POST http://localhost:5000/api/admin/services \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title":"Test Service","description":"Test description","icon":"Settings","price":"100","category":"Test"}'
```

#### Test Blog Posts
```bash
# Get active posts
curl http://localhost:5000/api/admin/posts

# Create post (requires auth token)
curl -X POST http://localhost:5000/api/admin/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title":"Test Post","content":"Test content","author":"Test Author","category":"Test","image":"https://example.com/image.jpg"}'
```

---

## Troubleshooting

### Issue: "MongoDB connection failed"
**Solution:**
1. Verify MongoDB password in `api/lib/db.js`
2. Check IP whitelist in MongoDB Atlas
3. Ensure cluster is not paused
4. Test connection string in MongoDB Compass

### Issue: "405 Method Not Allowed"
**Solution:**
1. Ensure backend server is running on port 5000
2. Check `VITE_API_URL` in frontend `.env`
3. Verify CORS configuration in `api/server.js`

### Issue: "CORS error"
**Solution:**
1. Check `CORS_ORIGIN` in backend `.env`
2. Ensure it matches your frontend URL
3. Restart backend server after changing CORS settings

### Issue: "JWT_SECRET not set"
**Solution:**
1. Add `JWT_SECRET` to `api/.env`
2. Generate with: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`
3. Restart backend server

### Issue: "API returns 404"
**Solution:**
1. Check route paths in `api/routes/`
2. Ensure routes are registered in `api/server.js`
3. Verify URL includes `/api` prefix

---

## Deployment Checklist

### Backend Deployment (Render/Railway)
- [ ] Set `MONGODB_URI` environment variable
- [ ] Set `JWT_SECRET` environment variable
- [ ] Set `CORS_ORIGIN` to production frontend URL
- [ ] Set `PORT` (if required by platform)
- [ ] Deploy and test endpoints

### Frontend Deployment (Vercel)
- [ ] Set `VITE_API_URL` to deployed backend URL
- [ ] Build and deploy
- [ ] Test all API connections
- [ ] Verify authentication flow

---

## Summary

**Working API Connections:**
1. ✅ Authentication (Register, Login, Create Admin)
2. ✅ Contact Form (Submit, View, Delete)
3. ✅ Slider Updates (CRUD operations, Toggle active)
4. ✅ Users Management (CRUD operations)
5. ✅ Services Management (CRUD operations, Toggle active)
6. ✅ Blog Posts Management (CRUD operations, Toggle active)

**Backend Models:**
- `api/models/User.js` - User authentication and management
- `api/models/Contact.js` - Contact form submissions
- `api/models/SliderUpdate.js` - Slider content management
- `api/models/Service.js` - Services management
- `api/models/Post.js` - Blog posts management

**Backend Routes:**
- `api/routes/auth.js` - Authentication endpoints
- `api/routes/contact.js` - Contact form endpoints
- `api/routes/sliderUpdates.js` - Slider updates endpoints
- `api/routes/users.js` - Users management endpoints
- `api/routes/services.js` - Services management endpoints
- `api/routes/posts.js` - Blog posts endpoints

**Key Files:**
- Backend: `api/` directory
- Frontend API Config: `src/lib/api/admin.ts`
- Environment: `.env` files in both root and `api/`
