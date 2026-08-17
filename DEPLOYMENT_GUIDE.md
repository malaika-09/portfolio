# 🚀 Robotics Portfolio - Complete Deployment Guide

This guide will help you deploy your own version of this portfolio website with your personal details.

## 📋 Prerequisites

Before starting, make sure you have:

1. **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
2. **Git** - [Download here](https://git-scm.com/)
3. **Vercel Account** (free) - [Sign up here](https://vercel.com/signup)
4. **Neon Database Account** (free) - [Sign up here](https://neon.tech/)
5. **Code Editor** (VS Code recommended) - [Download here](https://code.visualstudio.com/)

---

## 🎯 Step 1: Copy the Project

1. **Copy the entire `robotics-portfolio` folder** to your Desktop
2. **Rename the folder** to something like `my-portfolio`
3. Open the folder in VS Code or your preferred editor

---

## 🔧 Step 2: Install Dependencies

Open terminal in the project folder and run:

```bash
npm install
```

This will install all required packages (may take 2-3 minutes).

---

## 📝 Step 3: Update Personal Information

### A. Contact Information

Update your email and phone in these files:

**1. `app/contact/page.tsx`** (Lines 64-77)
```typescript
const contactInfo = [
  {
    icon: <Mail className="w-6 h-6" />,
    label: 'Email',
    value: 'YOUR_EMAIL@gmail.com',              // ← Change this
    href: 'mailto:YOUR_EMAIL@gmail.com',        // ← Change this
  },
  {
    icon: <Phone className="w-6 h-6" />,
    label: 'Phone',
    value: '+92 XXX XXXXXXX',                   // ← Change this
    href: 'tel:+92XXXXXXXXXX',                  // ← Change this
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    label: 'Location',
    value: 'Your City/Country',                 // ← Change this
    href: null,
  },
];
```

**2. `app/collaboration/page.tsx`** (Lines 349 and 447-450)
```typescript
// Line 349 - Placeholder
placeholder="+92 XXX XXXXXXX"                   // ← Change this

// Lines 447-450 - Display
<span>YOUR_EMAIL@gmail.com</span>               // ← Change this
<span>+92 XXX XXXXXXX</span>                    // ← Change this
```

**3. `components/layout/Footer.tsx`** (Lines 65 and 72)
```typescript
href="mailto:YOUR_EMAIL@gmail.com"              // ← Change this
href="tel:+92XXXXXXXXXX"                        // ← Change this
```

**4. `data/settings.json`**
```json
{
  "socialMedia": {
    "email": "YOUR_EMAIL@gmail.com",            // ← Change this
    "github": "https://github.com/YOUR_USERNAME",
    "linkedin": "https://linkedin.com/in/YOUR_PROFILE"
  }
}
```

### B. Social Links

Update in `app/contact/page.tsx` (Lines 82-110):
```typescript
const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/YOUR_USERNAME',   // ← Change this
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/YOUR_PROFILE', // ← Change this
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/92XXXXXXXXXX',         // ← Change this
  },
];
```

### C. Name and Branding

**1. `components/layout/Header.tsx`**
```typescript
<span>Your Full Name</span>                     // ← Change name
```

**2. `components/layout/Footer.tsx`**
```typescript
<h3>Your Full Name</h3>                         // ← Change name
```

**3. `app/sitemap.ts`** (Line 8)
```typescript
const baseUrl = 'https://yourwebsite.com';      // ← Change domain
```

**4. `package.json`**
```json
{
  "name": "your-portfolio",                     // ← Change project name
  "description": "Your Name's Portfolio"
}
```

### D. Logo and Images

1. Replace `public/images/mbj-logo.jpg` with your own logo
2. Replace other images in `public/images/` folder
3. Update favicon: Replace `public/favicon.ico`

---

## 🗄️ Step 4: Setup Database (Neon)

1. Go to [neon.tech](https://neon.tech/) and sign in
2. Create a new project (name it "my-portfolio" or similar)
3. Copy your **Connection String** (looks like: `postgresql://user:pass@host/dbname`)
4. In your project, create a file `.env.local`:

```env
# Database
DATABASE_URL="YOUR_NEON_CONNECTION_STRING"

# Admin Credentials (for /admin login)
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="your_secure_password_here"
```

5. Initialize database:
```bash
npm run db:push
```

---

## ▶️ Step 5: Test Locally

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**Test these pages:**
- ✅ Homepage: Check if name displays correctly
- ✅ Contact: Verify email/phone are correct
- ✅ Collaboration: Check contact details
- ✅ Footer: Verify social links work
- ✅ Admin Login: Try logging in with your credentials

---

## 🌐 Step 6: Deploy to Vercel

### A. Create GitHub Repository (Optional but Recommended)

1. Create a new repository on [github.com](https://github.com/new)
2. Initialize git in your project:
```bash
git init
git add .
git commit -m "Initial commit - My Portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/your-portfolio.git
git push -u origin main
```

### B. Deploy to Vercel

**Option 1: Using Vercel CLI (Recommended)**

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel --prod
```

4. Follow the prompts:
   - Link to existing project? **No**
   - Project name? **your-portfolio**
   - Deploy? **Yes**

**Option 2: Using Vercel Dashboard**

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Configure:
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

4. Add Environment Variables:
   - Click "Environment Variables"
   - Add `DATABASE_URL` = Your Neon connection string
   - Add `ADMIN_USERNAME` = Your admin username
   - Add `ADMIN_PASSWORD` = Your admin password

5. Click **Deploy**

---

## ✅ Step 7: Post-Deployment Setup

After deployment:

1. **Update Domain** in `app/sitemap.ts`:
```typescript
const baseUrl = 'https://your-vercel-domain.vercel.app';
```

2. **Test Production Site:**
   - Visit your Vercel URL
   - Test all contact forms
   - Try admin login at `/admin`
   - Check all social links

3. **Custom Domain (Optional):**
   - Go to Vercel Dashboard → Your Project → Settings → Domains
   - Add your custom domain (e.g., yourname.com)
   - Follow DNS configuration instructions

---

## 🎨 Step 8: Customize Content

### Add Your Projects

1. Login to admin panel: `https://your-site.com/admin`
2. Go to **Projects** section
3. Add your projects with:
   - Title
   - Description
   - Technologies used
   - GitHub link
   - Images

### Add Research Papers

1. Go to **Research** section in admin
2. Add your publications:
   - Paper title
   - Authors
   - Conference/Journal
   - PDF link

### Update About Page

Edit `app/about/page.tsx` to add:
- Your bio
- Skills
- Experience
- Education

---

## 🔒 Security Checklist

Before going live, make sure:

- ✅ Changed default admin password
- ✅ Updated all email addresses
- ✅ Removed any test data
- ✅ Updated `.env.local` (never commit this file)
- ✅ `.env.local` is in `.gitignore`
- ✅ DATABASE_URL is set in Vercel environment variables
- ✅ All social links point to your profiles

---

## 🆘 Troubleshooting

### Build Fails on Vercel

**Error: "Module not found"**
- Solution: Run `npm install` locally and commit `package-lock.json`

**Error: "Database connection failed"**
- Solution: Check if `DATABASE_URL` is set in Vercel environment variables
- Make sure the Neon database is active (free tier sleeps after inactivity)

**Error: "Page timeout"**
- Solution: Check if sitemap is querying database correctly
- May need to simplify `app/sitemap.ts` to only include static pages

### Local Development Issues

**Port 3000 already in use:**
```bash
npx kill-port 3000
npm run dev
```

**Database errors:**
```bash
# Reset database
npm run db:push
```

**Module errors:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Neon Documentation](https://neon.tech/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

---

## 🎉 You're Done!

Your portfolio is now live! Share it with:
- LinkedIn
- GitHub profile
- Resume
- Email signature

---

## 📞 Need Help?

If you run into issues:
1. Check the Troubleshooting section above
2. Review Vercel deployment logs
3. Check browser console for errors
4. Review database connection in Neon dashboard

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
