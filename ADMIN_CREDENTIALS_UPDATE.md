# Admin Credentials Update Summary

## ✅ Changes Completed

### 1. Admin Login Credentials Changed
- **Old Username**: `admin`
- **Old Password**: `admin123`

- **New Username**: `mbj`
- **New Password**: `javaid`

### 2. Resume/CV Download Fix
Created database migration to add `resume_url` column to profile_settings table.

#### Migration Steps Required:
1. **Run the migration** by visiting this URL in your browser:
   ```
   https://robotics-portfolio-seven.vercel.app/api/admin/migrate-resume-url
   ```
   
2. **Upload your CV** at:
   ```
   https://robotics-portfolio-seven.vercel.app/admin/resume
   ```
   
   - Login with: username `mbj`, password `javaid`
   - Upload your CV file (PDF, DOC, or DOCX)
   - The file will be automatically converted to base64 data URL for Vercel
   
3. **Test the download** by clicking "Download CV" button on the homepage:
   ```
   https://robotics-portfolio-seven.vercel.app/
   ```

## 📝 Important Notes

### Login Credentials
- **Admin Panel URL**: `https://robotics-portfolio-seven.vercel.app/admin/login`
- **Username**: `mbj`
- **Password**: `javaid`

### Resume Download Behavior
- **Development (Local)**: Resume stored as file in `/public/media/documents/`
- **Production (Vercel)**: Resume stored as base64 data URL in database (Neon PostgreSQL)

### Why Re-upload is Needed
The current resume in the database is stored as a file path (`/media/documents/resume-1785920955118-CV_-_Robotics_and_AI_Student__2_.pdf`), which doesn't work on Vercel because Vercel doesn't support file storage in `/public`.

After re-uploading through the admin panel, it will be stored as a base64 data URL that works on Vercel production.

## 🚀 Deployment Status
✅ Deployed to: https://robotics-portfolio-seven.vercel.app
✅ Build Status: Success
✅ All changes are live

## 📂 Files Modified
1. `lib/auth/password.ts` - Updated admin credentials
2. `lib/db/schema.sql` - Added resume_url column
3. `app/api/admin/migrate-resume-url/route.ts` - Created migration API endpoint

## 🔐 Security
- Passwords are hashed using bcrypt with 10 salt rounds
- Plain password comparison for development
- Hashed password comparison for production
