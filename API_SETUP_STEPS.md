# API Setup - Simple Steps

## Where to Put Your API URL

### Option 1: Default (No Changes Needed)
The API is already configured to use `http://localhost:5000/api`

**File:** `src/lib/api/admin.ts` (line 6)
```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
```

**No action needed** - this is already set correctly!

---

### Option 2: Using Environment Variable (For Production)

**Step 1:** Create `.env` file in project root (same folder as package.json)

**Step 2:** Add this line:
```env
VITE_API_URL=http://localhost:5000/api
```

**Step 3:** For production, change to your deployed URL:
```env
VITE_API_URL=https://your-backend-url.com/api
```

---

## Backend API URL

Your backend runs at: `http://localhost:5000`

All API endpoints are at: `http://localhost:5000/api`

**Examples:**
- Login: `http://localhost:5000/api/auth/login`
- Contact: `http://localhost:5000/api/contact`
- Slider Updates: `http://localhost:5000/api/slider-updates`

---

## Quick Summary

**For Local Development:**
- Nothing to change! API URL is already set to `http://localhost:5000/api`

**For Production:**
- Create `.env` file in root
- Add: `VITE_API_URL=https://your-backend-url.com/api`

---

## Testing Your API

After starting the backend, test it:

```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Expected response:
# {"status":"OK","message":"Server is running"}
```

If this works, your API is running correctly!
