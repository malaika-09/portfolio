# 🤖 Robotics Portfolio Platform

Advanced portfolio platform for robotics engineers and researchers, built with Next.js 16, React 19, and TypeScript.

## ✨ Features

### 📁 Project Management
- ✅ Multiple image upload (cover + gallery)
- ✅ Code snippets with syntax highlighting (Arduino, Python, C++, etc.)
- ✅ Technical stack management (Skills, Hardware, Software)
- ✅ Research background documentation
- ✅ Project categorization and status tracking

### 🎨 User Interface
- Modern, responsive design with dark/light mode
- Tabbed project detail pages (Overview, Gallery, Technical, Code)
- Smooth animations with Framer Motion
- Optimized images with Next.js Image component

### 🔐 Admin Panel
- Secure authentication with JWT
- Complete CRUD operations for projects
- Tag-based skill/hardware/software management
- File upload with validation

### 🚀 Performance
- Server-side rendering (SSR)
- Static generation where possible
- Image optimization
- Code splitting

## 🛠️ Tech Stack

- **Framework**: Next.js 16.2.11 (Turbopack)
- **UI Library**: React 19.2.4
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 4.x
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Testing**: Vitest + React Testing Library

## 📦 Installation

### Prerequisites
- Node.js 18.17+ (20.x LTS recommended)
- npm 9.0+

### Setup

```bash
# Clone the repository
git clone https://github.com/mbj8467-a1ly/robotics-portfolio.git
cd robotics-portfolio

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Edit .env.local with your configuration
# Required variables:
# - SESSION_SECRET (generate with: openssl rand -base64 32)
# - ADMIN_EMAIL
# - ADMIN_PASSWORD

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deployment

### First-Time Deployment to GitHub + Vercel

**Step 1: Create GitHub Repository**
1. Go to https://github.com/new
2. Repository name: `robotics-portfolio`
3. Don't initialize with README
4. Click "Create repository"

**Step 2: Create GitHub Personal Access Token**
1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Name: `Vercel Portfolio Deployment`
4. Select scope: `repo` (full control)
5. Generate and **copy the token**

**Step 3: Run Deployment Script**
```powershell
# Navigate to project folder
cd C:\Users\LEXI\OneDrive\Desktop\MBJ\robotics-portfolio

# Run deployment script
.\deploy-to-github.ps1
```

The script will:
- ✅ Configure Git with your credentials
- ✅ Initialize Git repository
- ✅ Commit all files
- ✅ Push to GitHub

**Step 4: Connect to Vercel**
1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select `robotics-portfolio`
4. Add Environment Variables:
   ```
   NODE_ENV=production
   NEXT_PUBLIC_APP_URL=https://your-project.vercel.app
   NEXT_PUBLIC_APP_NAME=Robotics Portfolio
   SESSION_SECRET=[Generate random 32-char string]
   ADMIN_EMAIL=admin@yourdomain.com
   ADMIN_PASSWORD=[Your secure password]
   ```
5. Click "Deploy"

**Done!** Every `git push` will now auto-deploy to Vercel! 🎉

### Future Updates

After initial setup, use the quick push script:

```powershell
# Make your code changes, then run:
.\push-updates.ps1
```

This will:
- ✅ Stage all changes
- ✅ Create commit with your message
- ✅ Push to GitHub
- ✅ Auto-trigger Vercel deployment

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start dev server with Turbopack
npm run build        # Create production build
npm start            # Start production server

# Testing
npm test             # Run tests with Vitest
npm run test:ui      # Run tests with UI
npm run test:coverage # Generate coverage report

# Linting
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues

# Type Checking
npm run type-check   # Run TypeScript compiler
```

## 📂 Project Structure

```
robotics-portfolio/
├── app/                    # Next.js app directory
│   ├── (public)/          # Public pages (home, projects, etc.)
│   ├── admin/             # Admin panel pages
│   └── api/               # API routes
├── components/            # React components
│   ├── home/             # Homepage components
│   ├── projects/         # Project components
│   ├── layout/           # Layout components
│   └── ui/               # Reusable UI components
├── lib/                   # Utility libraries
│   ├── actions/          # Server actions
│   ├── data/             # Data repositories
│   └── i18n/             # Internationalization
├── public/               # Static assets
│   └── media/           # Uploaded images
├── data/                 # JSON data storage
├── types/                # TypeScript type definitions
└── tests/                # Test files
```

## 🔒 Environment Variables

Create `.env.local` file with these variables:

```env
# Application
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Robotics Portfolio

# Authentication (CRITICAL - Change these!)
SESSION_SECRET=your-super-secret-session-key-change-this
SESSION_EXPIRE_TIME=604800
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your-secure-password

# File Upload
MAX_FILE_UPLOAD_SIZE=10485760
ALLOWED_FILE_EXTENSIONS=jpg,jpeg,png,gif,webp,svg,mp4,pdf

# Optional: Data Directory (custom location)
# DATA_DIR=/custom/path/to/data
```

**Security Notes:**
- Generate `SESSION_SECRET` with: `openssl rand -base64 32`
- Use strong admin password (min 12 characters)
- Never commit `.env.local` to Git

## 🎯 Key Features Detail

### Multiple Image Upload
- **Cover Image**: First image used as project card thumbnail and hero image
- **Gallery Images**: Additional images shown in Gallery tab
- All images optimized with Next.js Image component

### Code Snippets
- Support for multiple languages: Arduino, Python, C++, JavaScript, Java, MATLAB
- Syntax highlighting in guest view
- Optional field - skip if not needed

### Technical Stack
Three categories displayed in project sidebar:
1. **Skills/Languages** (purple badges) - e.g., C++, Python
2. **Hardware** (blue badges) - e.g., Arduino Uno, ESP32
3. **Software/Tools** (purple badges) - e.g., VS Code, MATLAB

## 📱 Admin Panel Features

### Projects Management (`/admin/projects`)
- Create/Edit/Delete projects
- Upload cover image and multiple gallery images
- Add code snippets with language selection
- Manage technical stack (skills, hardware, software)
- Set project status (completed, in-progress, planned)
- Mark projects as featured

### Dashboard (`/admin/dashboard`)
- Overview of all content
- Quick stats
- Recent activity

## 🌐 Multi-Language Support

Currently supports:
- English (en)
- Arabic (ar) - Coming soon
- Urdu (ur) - Coming soon

## 📊 Testing

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run with UI (browser interface)
npm run test:ui

# Run specific test file
npm test -- projects.test.tsx
```

## 🐛 Troubleshooting

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### Git Issues
```bash
# Reset Git configuration
git config --global --unset user.name
git config --global --unset user.email

# Re-run deployment script
.\deploy-to-github.ps1
```

### Vercel Deployment Fails
1. Check environment variables are set correctly
2. Verify `SESSION_SECRET` is generated
3. Check build logs in Vercel dashboard

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

- **GitHub**: [@mbj8467-a1ly](https://github.com/mbj8467-a1ly)
- **Website**: [Your deployed Vercel URL]

---

**Built with ❤️ using Next.js and React**
