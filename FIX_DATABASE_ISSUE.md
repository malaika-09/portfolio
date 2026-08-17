# URGENT: Database Column Missing - Run This Migration First!

## Problem
Admin panel se About/Profile save karte ho, temporary change dikhta hai, but actually save nahi ho raha.

## Root Cause
Database mein `resume_url` column missing hai, jis ki wajah se profile update query fail ho rahi hai.

## Solution - 2 Steps

### STEP 1: Run Migration (Add Missing Column)
Browser mein yeh URL open karo:
```
https://robotics-portfolio-seven.vercel.app/api/admin/migrate-resume-url
```

Yeh `resume_url` column add kar dega database mein.

### STEP 2: Sync Profile to Database
Browser mein yeh URL open karo:
```
https://robotics-portfolio-seven.vercel.app/api/admin/sync-profile
```

Yeh current profile data ko database mein sync kar dega.

## After Migration
1. Login: https://robotics-portfolio-seven.vercel.app/admin/login (mbj/javaid)
2. Edit: https://robotics-portfolio-seven.vercel.app/admin/about
3. Save - ab changes permanent save honge
4. Check: https://robotics-portfolio-seven.vercel.app/about - guest page pe dikhega

## Why This Happened
- Database schema mein `resume_url` column add karna tha
- Bina is column ke, profile UPDATE query fail ho rahi thi
- Admin panel mein temporary state change hota tha, but database write fail
- Guest page aur wapis admin page refresh karne pe old data aa jata tha

**IMPORTANT**: Pehle migration run karo (Step 1 & 2), phir test karo!
