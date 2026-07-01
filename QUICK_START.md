# Quick Start Guide - Neevachi Solutions

This guide helps you get the project running quickly with minimal configuration.

---

## Step 1: Backend Setup (2 minutes)

### 1.1 Set MongoDB Connection
Open `api/lib/db.js` and replace the password on line 6:

```javascript
const uri = "mongodb+srv://neevachi41_db_user:<YOUR_PASSWORD>@cluster0.qjxbfpz.mongodb.net/?appName=Cluster0";
```

Replace `<YOUR_PASSWORD>` with your actual MongoDB Atlas password.

### 1.2 Create Environment File
```bash
cd api
```

Create a `.env` file with these values:

```env
PORT=5000
JWT_SECRET=your_secret_key_here
CORS_ORIGIN=http://localhost:5173
```

**Note:** You can generate a JWT_SECRET with:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 1.3 Install Dependencies & Start
```bash
npm install
npm run dev
```

Backend will start on `http://localhost:5000`

---

## Step 2: Frontend Setup (1 minute)

### 2.1 Install Dependencies
```bash
npm install
```

### 2.2 Set API URL (Optional)
The frontend is already configured to use `http://localhost:5000/api` by default.

If you need to change it, create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:5000/api
```

### 2.3 Start Frontend
```bash
npm run dev
```

Frontend will start on `http://localhost:5173`

---

## Step 3: Create Admin User

Once both servers are running, create an admin user:

```bash
curl -X POST http://localhost:5000/api/auth/create-admin \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@neevachi.in","password":"Admin12345","secretKey":"neevachi-admin-setup-2024"}'
```

Then login with these credentials at `http://localhost:5173/login`

---

## API Endpoints

All endpoints are available at `http://localhost:5000/api`

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/create-admin` - Create admin user

### Contact
- `POST /contact` - Submit contact form
- `GET /contact` - Get all contacts

### Slider Updates
- `GET /slider-updates` - Get active updates
- `GET /slider-updates/admin/all` - Get all updates
- `POST /slider-updates` - Create update
- `PUT /slider-updates/:id` - Update update
- `DELETE /slider-updates/:id` - Delete update
- `PATCH /slider-updates/:id/toggle` - Toggle active status

### Admin Management
- `GET /admin/users` - Get all users
- `POST /admin/users` - Create user
- `PUT /admin/users/:id` - Update user
- `DELETE /admin/users/:id` - Delete user

- `GET /admin/services` - Get active services
- `GET /admin/services/admin/all` - Get all services
- `POST /admin/services` - Create service
- `PUT /admin/services/:id` - Update service
- `DELETE /admin/services/:id` - Delete service

- `GET /admin/posts` - Get active posts
- `GET /admin/posts/admin/all` - Get all posts
- `POST /admin/posts` - Create post
- `PUT /admin/posts/:id` - Update post
- `DELETE /admin/posts/:id` - Delete post

---

## Troubleshooting

### Backend won't start
- Check MongoDB password in `api/lib/db.js`
- Ensure MongoDB Atlas cluster is running
- Check if port 5000 is already in use

### Frontend can't connect to backend
- Ensure backend is running on port 5000
- Check browser console for CORS errors
- Verify API URL in `src/lib/api/admin.ts`

### MongoDB connection fails
- Verify IP whitelist in MongoDB Atlas
- Check cluster is not paused
- Test connection string in MongoDB Compass

---

## Production Deployment

When deploying to production:

### Backend (Render/Railway)
1. Set environment variables:
   - `MONGODB_URI` - Your MongoDB connection string
   - `JWT_SECRET` - Your JWT secret
   - `CORS_ORIGIN` - Your frontend URL
   - `PORT` - Platform port (if required)

### Frontend (Vercel)
1. Set environment variable:
   - `VITE_API_URL` - Your deployed backend URL

2. Update `src/lib/api/admin.ts`:
   ```typescript
   const API_URL = import.meta.env.VITE_API_URL || 'https://your-backend-url.com/api';
   ```

---

## Summary

**You only need to configure 2 things:**

1. **MongoDB password** in `api/lib/db.js` (line 6)
2. **JWT_SECRET** in `api/.env` file

Everything else is pre-configured and ready to use!
