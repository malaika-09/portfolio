# 🎯 Quick Start Guide - Setup Your Portfolio

This is a complete portfolio website template. Follow these simple steps to make it yours!

---

## ⚡ Quick Setup (5 Minutes)

### Option 1: Automated Setup (Recommended)

Run this command in terminal:

```bash
node setup-new-user.js
```

It will ask you for:
- Your name
- Email
- Phone number
- Location
- GitHub username
- LinkedIn profile
- WhatsApp number
- Website domain (optional)

The script will automatically update all files with your information!

### Option 2: Manual Setup

Follow the detailed guide in **DEPLOYMENT_GUIDE.md**

---

## 📦 What's Included?

✅ **Portfolio Website** with:
- Homepage with introduction
- Projects showcase
- Research publications
- Blog system
- Contact form
- Collaboration portal
- Admin panel for content management
- Inventory management system
- Gallery
- Timeline
- Achievements section

✅ **Technologies:**
- Next.js 16 (React framework)
- TypeScript
- Tailwind CSS (styling)
- Framer Motion (animations)
- Neon Database (PostgreSQL)
- Vercel (hosting)

---

## 🚀 Installation Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Database

1. Create account on [neon.tech](https://neon.tech)
2. Create new project
3. Copy connection string
4. Update `.env.local`:

```env
DATABASE_URL="your_neon_connection_string_here"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="your_secure_password"
```

### 3. Initialize Database

```bash
npm run db:push
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 5. Deploy to Vercel

```bash
npm install -g vercel
vercel login
vercel --prod
```

---

## 📝 What to Update

### Personal Information
- ✅ Name and bio
- ✅ Email and phone
- ✅ Social media links
- ✅ Profile photo and logo

### Content
- Add your projects in admin panel (`/admin`)
- Add research papers
- Write blog posts
- Upload photos to gallery
- Update about page with your story

### Branding
- Replace logo: `public/images/mbj-logo.jpg`
- Update favicon: `public/favicon.ico`
- Add your photos: `public/images/`

---

## 🎨 Customization

### Colors (Theme)
Edit `tailwind.config.ts` to change the color scheme:

```typescript
colors: {
  primary: {
    50: '#f0fdf4',   // Lightest green
    500: '#22c55e',  // Main green
    950: '#052e16',  // Darkest green
  }
}
```

### Fonts
Update fonts in `app/layout.tsx`

### Layout
Modify components in `components/layout/` folder

---

## 🔐 Security

**Important:** Before deploying:

1. ✅ Change admin password in `.env.local`
2. ✅ Never commit `.env.local` to GitHub
3. ✅ Update all personal information
4. ✅ Remove test data from database

---

## 📱 Pages Included

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Main landing page |
| About | `/about` | Your bio and story |
| Projects | `/projects` | Project showcase |
| Research | `/research` | Publications |
| Blog | `/blog` | Blog posts |
| Gallery | `/gallery` | Photo gallery |
| Contact | `/contact` | Contact form |
| Collaboration | `/collaboration` | Project proposals |
| Admin | `/admin` | Content management |
| Inventory | `/admin/inventory` | Inventory system |

---

## 🆘 Common Issues

### "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### "Port 3000 in use"
```bash
npx kill-port 3000
```

### "Database connection failed"
- Check if `.env.local` has correct `DATABASE_URL`
- Verify Neon database is active

### Build fails on Vercel
- Make sure environment variables are set in Vercel dashboard
- Check build logs for specific errors

---

## 📚 Documentation

- **DEPLOYMENT_GUIDE.md** - Complete setup instructions
- **setup-new-user.js** - Automated setup script
- **DATABASE_SETUP.md** - Database configuration details

---

## 💡 Tips

1. **Test locally first** before deploying
2. **Backup your data** regularly
3. **Use version control** (Git) for tracking changes
4. **Monitor Vercel logs** for production issues
5. **Keep dependencies updated** with `npm update`

---

## 🎉 Ready to Launch!

Once setup is complete:

1. ✅ Test all pages locally
2. ✅ Add your content via admin panel
3. ✅ Deploy to Vercel
4. ✅ Share your portfolio!

---

## 📞 Support

If you need help:
1. Check **DEPLOYMENT_GUIDE.md** for detailed instructions
2. Review error messages carefully
3. Check Vercel deployment logs
4. Verify database connection in Neon dashboard

---

**Built with ❤️ - Ready to showcase your work to the world!**

*Last updated: 2026*
