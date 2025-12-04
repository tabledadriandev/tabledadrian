# Cloudflare Pages Configuration for Next.js 16

## The 522 Error Issue

A 522 error on Cloudflare Pages means the build process is timing out or failing. For Next.js 16, the `@cloudflare/next-on-pages` adapter doesn't support Next.js 16 yet, but we can still deploy using Edge Runtime API routes.

## Solution: Manual Cloudflare Pages Configuration

### Step 1: Configure Build Settings in Cloudflare Dashboard

1. Go to **Cloudflare Dashboard** → **Pages** → Your project
2. Go to **Settings** → **Builds & deployments**
3. Configure the following:

   **Build command:**
   ```
   npm run build
   ```

   **Build output directory:**
   ```
   .next
   ```

   **Root directory (if your project is in a subdirectory):**
   ```
   / (or leave empty if root)
   ```

   **Node.js version:**
   ```
   22
   ```

### Step 2: Environment Variables

Make sure all environment variables are set in Cloudflare Pages:

1. Go to **Settings** → **Environment variables**
2. Add these variables:
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
   - `NEXT_PUBLIC_EMAILJS_WAITLIST_SERVICE_ID`
   - `NEXT_PUBLIC_EMAILJS_WAITLIST_TEMPLATE_ID`

### Step 3: Alternative Solution - Use Static Export (If API Routes Can Be Moved)

If the 522 error persists, you have two options:

#### Option A: Wait for Adapter Support
Wait for `@cloudflare/next-on-pages` to support Next.js 16, then install it:
```bash
npm install --save-dev @cloudflare/next-on-pages
```

#### Option B: Use Vercel or Netlify (Recommended for Next.js)
These platforms have native Next.js support and will work better:
- **Vercel**: Native Next.js support, zero configuration
- **Netlify**: Has `@netlify/plugin-nextjs` which works with Next.js 16

### Step 4: Check Build Logs

If you still get 522 errors:

1. Check **Cloudflare Dashboard** → **Pages** → **Deployments** → Click on the failed deployment
2. Look at the build logs to see what's failing
3. Common issues:
   - Build timeout (increase timeout in settings)
   - Missing environment variables
   - Node.js version mismatch
   - Memory limits

### Step 5: Increase Build Timeout

1. Go to **Settings** → **Builds & deployments**
2. Increase the **Build timeout** (default is usually 15 minutes)
3. For Next.js builds, 20-30 minutes is recommended

## Current Configuration

- **Framework**: Next.js 16
- **API Routes**: Using Edge Runtime (`export const runtime = 'edge'`)
- **Build Tool**: Webpack (via `--webpack` flag)
- **Output**: `.next` directory

## Troubleshooting

### If build times out:
- Check if dependencies are installing correctly
- Verify Node.js version matches (22.x)
- Check for large files or slow build steps

### If deployment fails:
- Check build logs in Cloudflare dashboard
- Verify all environment variables are set
- Ensure `package.json` has correct build script

### If API routes don't work:
- Verify Edge Runtime is set: `export const runtime = 'edge'`
- Check Cloudflare Pages Functions documentation
- Consider moving to Vercel/Netlify for better Next.js support

## Recommended: Switch to Vercel

For the best Next.js 16 experience, consider deploying to **Vercel**:
- Native Next.js support
- Automatic Edge Runtime support
- Zero configuration needed
- Better performance and reliability

To deploy to Vercel:
1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy (automatic)

