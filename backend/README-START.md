# Starting the Backend Server

## Quick Start

1. **Navigate to backend directory:**
   ```bash
   cd ta_website/backend
   ```

2. **Configure environment (if not done):**
   ```bash
   # Copy .env.example to .env and fill in your credentials
   cp .env.example .env
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:3001`

## Verify Server is Running

Test the health endpoint:
```bash
curl http://localhost:3001/health
```

Expected response:
```json
{"status":"ok","timestamp":"2024-01-09T..."}
```

## Required Environment Variables

Minimum required for server to start:
- `PORT` (defaults to 3001)
- `NODE_ENV` (defaults to development)
- `SUPABASE_URL` (placeholder OK for testing)
- `SUPABASE_SERVICE_ROLE_KEY` (placeholder OK for testing)
- `JWT_SECRET` (min 32 characters)

## Troubleshooting

If server fails to start:
1. Check that all dependencies are installed: `npm install`
2. Verify TypeScript compilation: `npm run build`
3. Check for missing environment variables
4. Review console output for specific errors

## API Endpoints

Once running, test these endpoints:
- `GET /health` - Health check
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get profile (requires auth)
