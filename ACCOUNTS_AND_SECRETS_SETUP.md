# Accounts and Secrets Setup Guide

This guide walks you through setting up Vercel, Render, and GitHub accounts with the required secrets for deploying the Neevachi project.

---

## 1. Vercel Account Setup and Secrets

### 1.1 Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click **Sign Up**
3. Sign up using GitHub, GitLab, Bitbucket, or email
4. Verify your email address
5. Complete your profile setup

### 1.2 Create Vercel Project

1. After signing in, click **Add New** → **Project**
2. Import your GitHub repository: `ppranit0009/neevachi`
3. Configure project settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**

### 1.3 Get Vercel Credentials

You need three values for GitHub secrets:

#### Get VERCEL_TOKEN
1. Go to [vercel.com/account/tokens](https://vercel.com/account/tokens)
2. Click **Create Token**
3. Name it: `GitHub Actions Deploy`
4. Scope: Select **Full Account**
5. Click **Create**
6. **Copy and save** the token (you won't see it again)

#### Get VERCEL_ORG_ID
1. Go to your Vercel dashboard
2. Click on your team/project
3. Look at the URL: `https://vercel.com/[org-id]/[project-name]`
4. The **org-id** is the first part after vercel.com/
5. Alternatively, run: `vercel whoami` (requires Vercel CLI)

#### Get VERCEL_PROJECT_ID
1. Go to your project settings in Vercel
2. Click **General** tab
3. Scroll to **Project ID**
4. Copy the Project ID

### 1.4 Set Vercel Environment Variables

1. Go to your project in Vercel
2. Click **Settings** → **Environment Variables**
3. Add the following:

| Name | Value | Environment |
|------|-------|-------------|
| `VITE_API_URL` | Your Render backend URL (e.g., `https://neevachi-backend.onrender.com/api`) | Production, Preview, Development |

---

## 2. Render Account Setup and Secrets

### 2.1 Create Render Account

1. Go to [render.com](https://render.com)
2. Click **Sign Up**
3. Sign up with GitHub (recommended)
4. Authorize Render to access your GitHub repositories
5. Verify your email if prompted

### 2.2 Create Render Web Service

1. After signing in, click **New** → **Web Service**
2. Connect your GitHub repository: `ppranit0009/neevachi`
3. Configure service settings:
   - **Name**: `neevachi-backend`
   - **Region**: Choose nearest region (e.g., Oregon)
   - **Branch**: `main`
   - **Root Directory**: `api`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Click **Advanced** → **Add Environment Variable**

### 2.3 Set Render Environment Variables

Add these environment variables in Render:

| Name | Value |
|------|-------|
| `MONGODB_URI` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | Generate with: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"` |
| `CORS_ORIGIN` | `https://neevachi-solutions.vercel.app` (your Vercel frontend URL) |
| `PORT` | `10000` |
| `ADMIN_SECRET_KEY` | `neevachi-admin-setup-2024` (or generate your own) |

### 2.4 Get Render Credentials

#### Get RENDER_API_KEY
1. Go to [dashboard.render.com/user/settings](https://dashboard.render.com/user/settings)
2. Scroll to **API Keys** section
3. Click **Create API Key**
4. Name it: `GitHub Actions Deploy`
5. **Copy and save** the key

#### Get RENDER_SERVICE_ID
1. Go to your Render service dashboard
2. Look at the URL: `https://dashboard.render.com/web/srv-[service-id]`
3. The **service-id** is the part after `srv-`
4. Alternatively, go to Settings → General → Service ID

---

## 3. GitHub Repository Secrets Setup

### 3.1 Access Repository Settings

1. Go to your repository: [github.com/ppranit0009/neevachi](https://github.com/ppranit0009/neevachi)
2. Click **Settings** tab
3. Click **Secrets and variables** → **Actions**
4. Click **New repository secret**

### 3.2 Add GitHub Secrets

Add the following secrets one by one:

#### Vercel Secrets

| Secret Name | Value | Source |
|-------------|-------|--------|
| `VERCEL_TOKEN` | Your Vercel token | Section 1.3 |
| `VERCEL_ORG_ID` | Your Vercel org ID | Section 1.3 |
| `VERCEL_PROJECT_ID` | Your Vercel project ID | Section 1.3 |
| `VITE_API_URL` | Your Render backend URL | Your Render service URL + `/api` |

#### Render Secrets

| Secret Name | Value | Source |
|-------------|-------|--------|
| `RENDER_API_KEY` | Your Render API key | Section 2.4 |
| `RENDER_SERVICE_ID` | Your Render service ID | Section 2.4 |

### 3.3 Verify Secrets

1. After adding all secrets, verify they appear in the list
2. Make sure there are no typos in the secret names
3. Secrets should not be visible after adding (security feature)

---

## 4. MongoDB Atlas Setup (Required for Backend)

### 4.1 Create MongoDB Atlas Account

1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Click **Try Free**
3. Sign up with email or Google
4. Choose **Free** plan (M0 cluster)
5. Select cloud provider and region (closest to Render region)

### 4.2 Create Database Cluster

1. Click **Build a Database**
2. Choose **M0 Sandbox** (Free)
3. Name your cluster: `Cluster0` (or custom name)
4. Click **Create**
5. Wait for cluster to be created (2-5 minutes)

### 4.3 Create Database User

1. Go to **Database Access** → **Add New Database User**
2. Choose **Password Authentication**
3. Username: `neevachi41_db_user` (or your choice)
4. Password: Create a strong password
5. Database User Privileges: **Read and write to any database**
6. Click **Create User**

### 4.4 Whitelist IP Addresses

1. Go to **Network Access** → **Add IP Address**
2. Choose **Allow Access from Anywhere** (0.0.0.0/0)
3. Click **Confirm**

### 4.5 Get Connection String

1. Go to **Database** → **Connect** → **Connect your application**
2. Choose **Node.js** and version
3. Copy the connection string
4. Replace `<password>` with your actual password
5. Format: `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?appName=Cluster0`

---

## 5. Deployment Workflow

### 5.1 Initial Deployment

1. Push all changes to GitHub main branch
2. GitHub Actions will automatically trigger:
   - **deploy-frontend.yml** → Deploys to Vercel
   - **deploy-backend.yml** → Deploys to Render
3. Monitor deployment in GitHub Actions tab

### 5.2 Verify Deployment

1. **Frontend**: Visit your Vercel URL (e.g., `https://neevachi-solutions.vercel.app`)
2. **Backend**: Visit your Render URL (e.g., `https://neevachi-backend.onrender.com`)
3. Test API endpoints and frontend functionality

### 5.3 Update CORS Origins

After deployment:
1. Update `CORS_ORIGIN` in Render with your actual Vercel URL
2. Update `VITE_API_URL` in Vercel with your actual Render URL
3. Redeploy both services

---

## 6. Troubleshooting

### Common Issues

**Vercel deployment fails**
- Check that `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` are correct
- Verify Vercel project exists and is linked to GitHub

**Render deployment fails**
- Check that `RENDER_API_KEY` and `RENDER_SERVICE_ID` are correct
- Verify Render service exists and is accessible
- Check MongoDB connection string is valid

**CORS errors**
- Ensure `CORS_ORIGIN` in Render matches your Vercel domain exactly
- Update environment variables and redeploy

**MongoDB connection fails**
- Verify IP whitelist includes 0.0.0.0/0
- Check username and password are correct
- Ensure cluster is active (not paused)

---

## 7. Security Best Practices

1. **Never commit secrets to Git** - Always use environment variables
2. **Rotate API keys regularly** - Update secrets periodically
3. **Use strong passwords** - For MongoDB and JWT secrets
4. **Limit API key scopes** - Only grant necessary permissions
5. **Monitor deployment logs** - Check for unauthorized access
6. **Enable 2FA** - On all accounts (Vercel, Render, GitHub, MongoDB)

---

## 8. Quick Reference

### Required Secrets Summary

| Platform | Secret Name | Where to Set |
|----------|-------------|--------------|
| Vercel | `VERCEL_TOKEN` | GitHub Secrets |
| Vercel | `VERCEL_ORG_ID` | GitHub Secrets |
| Vercel | `VERCEL_PROJECT_ID` | GitHub Secrets |
| Vercel | `VITE_API_URL` | GitHub Secrets + Vercel Env Vars |
| Render | `RENDER_API_KEY` | GitHub Secrets |
| Render | `RENDER_SERVICE_ID` | GitHub Secrets |
| Render | `MONGODB_URI` | Render Env Vars |
| Render | `JWT_SECRET` | Render Env Vars |
| Render | `CORS_ORIGIN` | Render Env Vars |
| Render | `PORT` | Render Env Vars |
| Render | `ADMIN_SECRET_KEY` | Render Env Vars |

### Useful Links

- Vercel Dashboard: [vercel.com/dashboard](https://vercel.com/dashboard)
- Render Dashboard: [dashboard.render.com](https://dashboard.render.com)
- GitHub Repo Settings: [github.com/ppranit0009/neevachi/settings](https://github.com/ppranit0009/neevachi/settings)
- MongoDB Atlas: [cloud.mongodb.com](https://cloud.mongodb.com)

---

**Need Help?**
- Check existing guides: `DEPLOYMENT_GUIDE.md`, `API_SETUP_STEPS.md`
- Review workflow files in `.github/workflows/`
- Check Render and Vercel deployment logs
