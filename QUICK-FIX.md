# Quick Fix: Cloudflare Pages Repository Access

## Immediate Steps to Fix "Configure installation" Error

### Step 1: Grant Cloudflare Access to Your Repository

Go to this link (replace with your actual GitHub username/org):
```
https://github.com/settings/installations
```

1. Find **Cloudflare Pages** in the list
2. Click **Configure** (or click on it)
3. Under **Repository access**, you'll see options:
   - **All repositories** ← Select this if you want Cloudflare to access all repos
   - **Only select repositories** ← Select this if you want to limit access
   
4. If you chose "Only select repositories":
   - Click **Select repositories**
   - Search for `tabledadrian` or `ta_website`
   - Check the box next to it
   - Click **Add**

5. Click **Save**

### Step 2: Check Organization Settings (If repo is in organization)

If your repo is at `tabledadriandev/tabledadrian`, go to:
```
https://github.com/organizations/tabledadriandev/settings/installations
```

1. Find **Cloudflare Pages**
2. Click **Configure**
3. Make sure `tabledadrian` is in the selected repositories list
4. If not, add it using steps above

### Step 3: Make Repository Public (Temporary Fix)

If you can't configure the app permissions, temporarily make the repo public:

1. Go to: `https://github.com/tabledadriandev/tabledadrian/settings`
2. Scroll down to **Danger Zone**
3. Click **Change visibility** → **Make public**
4. Try connecting in Cloudflare Pages again
5. Once connected, you can make it private again (Cloudflare will retain access)

### Step 4: Re-connect in Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Pages**
2. If you have an existing project:
   - Go to **Settings** → **GitHub**
   - Click **Disconnect**
   - Click **Connect to Git** again
   
3. If creating new project:
   - Click **Create a project**
   - Click **Connect to Git**
   
4. Select **GitHub**
5. **IMPORTANT**: When authorizing, make sure to:
   - Grant access to `tabledadriandev` organization
   - Select repository: `tabledadrian`

### Step 5: Verify Repository is Selected

After connecting, in Cloudflare Pages:
1. Go to **Settings** → **GitHub**
2. Under **Connected repository**, it should show:
   - `tabledadriandev/tabledadrian` ✅

If it says "The repository cannot be accessed":
- Click **Configure installation**
- You'll be redirected to GitHub to grant permissions
- Follow Step 1 again

## Alternative: Use GitHub Actions (No App Permission Issues)

If the GitHub App integration keeps failing, use GitHub Actions to deploy:

1. Go to Cloudflare Dashboard → **Pages**
2. Create a new project (or use existing)
3. Instead of "Connect to Git", go to **Settings** → **Deployments**
4. Use **Direct Upload** or set up via **GitHub Actions**

The workflow file is already created: `.github/workflows/deploy-cloudflare.yml`

You'll need to:
1. Get Cloudflare API Token from Cloudflare Dashboard
2. Add it to GitHub Secrets: `Settings` → `Secrets and variables` → `Actions` → `New repository secret`
   - Name: `CLOUDFLARE_API_TOKEN`
   - Value: (your Cloudflare API token)
   
3. Add Account ID:
   - Name: `CLOUDFLARE_ACCOUNT_ID`
   - Value: (your Cloudflare Account ID)

This method doesn't require GitHub App permissions!
