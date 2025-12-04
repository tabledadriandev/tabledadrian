# Cloudflare Pages Setup Guide

## Steps to Migrate from Netlify to Cloudflare Pages

### 1. Configure Custom Domain in Cloudflare Pages

1. Go to your **Cloudflare Dashboard** → **Pages**
2. Select your project
3. Go to **Custom domains** tab
4. Click **Set up a custom domain**
5. Enter your domain: `tabledadrian.com`
6. Cloudflare will provide you with DNS records to configure

### 2. Update DNS Records

You need to update your DNS records to point to Cloudflare Pages instead of Netlify.

#### Option A: If your domain is managed by Cloudflare DNS

1. Go to **Cloudflare Dashboard** → **DNS** → **Records**
2. Remove or update any Netlify-specific records (like CNAME records pointing to Netlify)
3. Cloudflare Pages will automatically create the necessary DNS records when you add the custom domain

#### Option B: If your domain is managed elsewhere (e.g., GoDaddy, Namecheap)

1. Log into your domain registrar's DNS management
2. Remove any Netlify CNAME records (usually pointing to `your-site.netlify.app`)
3. Add the DNS records provided by Cloudflare Pages:
   - **CNAME** record: `tabledadrian.com` → `your-project.pages.dev` (or the value Cloudflare provides)
   - **CNAME** record: `www.tabledadrian.com` → `your-project.pages.dev` (or the value Cloudflare provides)

### 3. Remove Domain from Netlify (Important!)

1. Go to your **Netlify Dashboard**
2. Select your site
3. Go to **Site settings** → **Domain management**
4. **Remove** the custom domain `tabledadrian.com` from Netlify
5. This will prevent DNS conflicts

### 4. Wait for DNS Propagation

- DNS changes can take 24-48 hours to fully propagate
- You can check propagation status using tools like `whatsmydns.net`
- Cloudflare typically propagates faster (often within minutes)

### 5. Verify SSL Certificate

- Cloudflare will automatically provision an SSL certificate for your domain
- This usually happens automatically within a few minutes after DNS is configured
- Check in **Cloudflare Dashboard** → **SSL/TLS** to verify

### 6. Environment Variables

Make sure to add your environment variables in Cloudflare Pages:

1. Go to **Cloudflare Dashboard** → **Pages** → Your project
2. Go to **Settings** → **Environment variables**
3. Add all your EmailJS variables:
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
   - `NEXT_PUBLIC_EMAILJS_WAITLIST_SERVICE_ID`
   - `NEXT_PUBLIC_EMAILJS_WAITLIST_TEMPLATE_ID`
4. **Redeploy** your site after adding variables

## Notes

- The `netlify.toml` file can remain in your repo (it won't affect Cloudflare)
- The `_redirects` file has been created for Cloudflare Pages redirects
- Your API routes are now configured with Edge Runtime for Cloudflare compatibility

## Troubleshooting

If you still see Netlify's 404 page:
1. Clear your browser cache
2. Check DNS propagation: `nslookup tabledadrian.com`
3. Verify the domain is removed from Netlify
4. Ensure DNS records point to Cloudflare Pages


