# Deployment Guide - Neevachi Solutions

This guide explains how to deploy the frontend and backend using CI/CD pipelines.

---

## CI/CD Pipelines Created

### 1. Frontend Deployment (Vercel)
**File:** `.github/workflows/deploy-frontend.yml`

**Triggers:**
- Push to `main` branch with changes in `src/`, `public/`, or config files
- Manual trigger via GitHub Actions

**Process:**
1. Checks out code
2. Sets up Node.js 18
3. Installs dependencies
4. Builds frontend
5. Deploys to Vercel production

---

### 2. Backend Deployment (Render)
**File:** `.github/workflows/deploy-backend.yml`

**Triggers:**
- Push to `main` branch with changes in `api/` folder
- Manual trigger via GitHub Actions

**Process:**
1. Checks out code
2. Triggers Render deployment
3. Waits for successful deployment

---

## Setup Instructions

### Step 1: GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions

**For Frontend (Vercel):**
- `VERCEL_TOKEN` - Your Vercel authentication token
- `VERCEL_ORG_ID` - Your Vercel organization ID
- `VERCEL_PROJECT_ID` - Your Vercel project ID
- `VITE_API_URL` - Your backend API URL (e.g., `https://neevachi-backend.onrender.com/api`)

**For Backend (Render):**
- `RENDER_SERVICE_ID` - Your Render service ID
- `RENDER_API_KEY` - Your Render API key

---

### Step 2: Vercel Setup

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Link project:**
   ```bash
   vercel link
   ```

4. **Get your IDs:**
   ```bash
   vercel whoami
   vercel inspect
   ```

5. **Add IDs to GitHub Secrets:**
   - Copy `VERCEL_ORG_ID` from `.vercel/project.json`
   - Copy `VERCEL_PROJECT_ID` from `.vercel/project.json`
   - Get `VERCEL_TOKEN` from Vercel dashboard → Settings → Tokens

---

### Step 3: Render Setup

1. **Create Render account:** https://render.com

2. **Create new Web Service:**
   - Connect your GitHub repository
   - Select "Node.js" as runtime
   - Set build command: `cd api && npm install`
   - Set start command: `cd api && npm start`

3. **Add Environment Variables:**
   - `MONGODB_URI` - Your MongoDB connection string
   - `JWT_SECRET` - Generate a random secret
   - `CORS_ORIGIN` - Your frontend URL (e.g., `https://neevachi-solutions.vercel.app`)
   - `PORT` - `10000` (or whatever Render assigns)

4. **Get Service ID:**
   - Go to your Render service dashboard
   - Copy the service ID from the URL

5. **Get API Key:**
   - Go to Render dashboard → Account Settings → API Keys
   - Create a new API key

6. **Add to GitHub Secrets:**
   - `RENDER_SERVICE_ID` - Your Render service ID
   - `RENDER_API_KEY` - Your Render API key

---

### Step 4: Update Frontend API URL

After deploying backend, update the frontend API URL:

**Option 1: GitHub Secret**
- Set `VITE_API_URL` in GitHub Actions secrets
- This will be used during build

**Option 2: Environment Variable**
- Create `.env` in root:
  ```env
  VITE_API_URL=https://your-backend-url.onrender.com/api
  ```

---

## Manual Deployment

### Deploy Frontend Manually
```bash
npm run build
vercel --prod
```

### Deploy Backend Manually
Push to `main` branch, Render will auto-deploy
Or use Render dashboard to trigger manual deployment

---

## Testing Deployment

### Test Backend
```bash
curl https://your-backend-url.onrender.com/api/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

### Test Frontend
1. Open your Vercel URL
2. Try logging in
3. Check browser console for API errors

---

## Troubleshooting

### Frontend Deployment Fails
- Check `VERCEL_TOKEN` is valid
- Ensure `VITE_API_URL` is set correctly
- Check build logs in GitHub Actions

### Backend Deployment Fails
- Check `RENDER_API_KEY` is valid
- Ensure `RENDER_SERVICE_ID` is correct
- Check Render service logs

### API Connection Issues
- Verify `CORS_ORIGIN` matches frontend URL
- Check backend is running on Render
- Test backend health endpoint

### MongoDB Connection Issues
- Verify `MONGODB_URI` in Render environment variables
- Check IP whitelist in MongoDB Atlas
- Ensure cluster is not paused

---

## Summary

**Pipelines Created:**
- ✅ `.github/workflows/deploy-frontend.yml` - Auto-deploys frontend to Vercel
- ✅ `.github/workflows/deploy-backend.yml` - Auto-deploys backend to Render
- ✅ `api/render.yaml` - Render configuration

**What You Need to Do:**
1. Set up GitHub Secrets (VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID, RENDER_SERVICE_ID, RENDER_API_KEY)
2. Deploy backend to Render first
3. Update `VITE_API_URL` with backend URL
4. Push to `main` branch to trigger deployments

**Deployment Flow:**
1. Push code to `main` branch
2. GitHub Actions detects changes
3. Backend deploys to Render automatically
4. Frontend deploys to Vercel automatically
5. Both services are live and connected
