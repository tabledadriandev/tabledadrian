# Cloudflare Pages Setup Guide

## Repository Setup

### 1. Rename Repository on GitHub

1. Go to your repository: `https://github.com/tabledadriandev/ta_website`
2. Click **Settings** → **General**
3. Scroll down to **Repository name**
4. Change from `ta_website` to `tabledadrian`
5. Click **Rename**

### 2. Update Local Git Remote

After renaming, update your local repository:

```bash
cd ta_website
git remote set-url origin https://github.com/tabledadriandev/tabledadrian.git
git remote -v  # Verify the change
```

## Cloudflare Pages Configuration

### 3. Connect Repository to Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Pages** → **Create a project**
3. Click **Connect to Git**
4. Select **GitHub** and authorize Cloudflare
5. Select the repository: `tabledadriandev/tabledadrian`
6. Click **Begin setup**

### 4. Build Settings

Use these settings in Cloudflare Pages:

- **Project name**: `tabledadrian`
- **Production branch**: `main`
- **Framework preset**: `Next.js`
- **Build command**: `npm run build`
- **Build output directory**: `.next`
- **Root directory**: `/` (leave empty)

### 5. Environment Variables (if needed)

If you have environment variables, add them in:
- **Settings** → **Environment variables**

Common variables:
- `NODE_VERSION`: `18` or `20`
- Any API keys or secrets your app needs

### 6. Custom Domain (Optional)

1. Go to **Custom domains** in your Pages project
2. Add your domain
3. Follow DNS configuration instructions

## Troubleshooting

### Cloudflare Can't Access Repository

If Cloudflare says it can't access the repo:

1. **Check Repository Visibility**:
   - Make sure the repo is **public**, OR
   - Grant Cloudflare access to your private repo

2. **Re-authorize GitHub**:
   - Go to Cloudflare Dashboard → **Pages** → **Account settings**
   - Click **Manage GitHub access**
   - Revoke and re-authorize access
   - Make sure to grant access to the `tabledadriandev` organization

3. **Check GitHub Permissions**:
   - Go to GitHub → **Settings** → **Applications** → **Authorized OAuth Apps**
   - Find **Cloudflare Pages**
   - Ensure it has access to your repositories
   - Click **Configure** and grant access to `tabledadriandev` organization

4. **Organization Settings** (if using GitHub Organization):
   - Go to GitHub Organization → **Settings** → **Third-party access**
   - Ensure Cloudflare Pages has access
   - May need organization owner approval

### Build Fails

- Check build logs in Cloudflare Pages dashboard
- Ensure `package.json` has all dependencies
- Verify Node.js version (set `NODE_VERSION=18` or `20` in environment variables)

## Next.js Static Export (Alternative)

If you need static export for Cloudflare Pages:

1. Update `next.config.js`:
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  }
}
```

2. Build command becomes: `npm run build`
3. Output directory: `out`
