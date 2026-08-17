#!/usr/bin/env node

/**
 * ============================================
 * PORTFOLIO SETUP SCRIPT
 * ============================================
 * 
 * This script automatically updates personal information
 * throughout the portfolio for a new user.
 * 
 * Usage:
 *   node setup-new-user.js
 * 
 * The script will ask for:
 * - Full Name
 * - Email
 * - Phone Number
 * - Location
 * - GitHub Username
 * - LinkedIn Profile
 * - WhatsApp Number
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Helper function to ask questions
function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

// Helper function to update file content
function updateFile(filePath, oldContent, newContent) {
  try {
    const fullPath = path.join(__dirname, filePath);
    let content = fs.readFileSync(fullPath, 'utf8');
    
    if (Array.isArray(oldContent)) {
      // Multiple replacements
      oldContent.forEach((old, index) => {
        content = content.replace(new RegExp(old, 'g'), newContent[index]);
      });
    } else {
      // Single replacement
      content = content.replace(new RegExp(oldContent, 'g'), newContent);
    }
    
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✅ Updated: ${filePath}`);
    return true;
  } catch (error) {
    console.log(`❌ Failed to update: ${filePath} - ${error.message}`);
    return false;
  }
}

// Main setup function
async function setup() {
  console.log('\n' + '='.repeat(50));
  console.log('🎨 PORTFOLIO SETUP - Personal Information Update');
  console.log('='.repeat(50) + '\n');

  console.log('Please provide your personal information:\n');

  // Collect user information
  const userInfo = {
    fullName: await question('📝 Full Name (e.g., John Doe): '),
    email: await question('📧 Email (e.g., john@example.com): '),
    phone: await question('📱 Phone with country code (e.g., +92 300 1234567): '),
    phoneClean: '', // Will be set after phone input
    location: await question('📍 Location (e.g., Pakistan): '),
    github: await question('🐙 GitHub Username (e.g., johndoe): '),
    linkedin: await question('💼 LinkedIn Profile (e.g., john-doe): '),
    whatsapp: '', // Will be set after phone input
    domain: await question('🌐 Website Domain (e.g., yoursite.com) [Optional, press Enter to skip]: '),
  };

  // Clean phone number (remove spaces and dashes)
  userInfo.phoneClean = userInfo.phone.replace(/[\s-]/g, '');
  
  // Format WhatsApp number (remove + and spaces)
  userInfo.whatsapp = userInfo.phoneClean.replace('+', '');

  console.log('\n' + '='.repeat(50));
  console.log('🔄 Updating files with your information...\n');

  let successCount = 0;
  let failCount = 0;

  // Update Contact Page
  const contactUpdates = [
    {
      file: 'app/contact/page.tsx',
      old: ['javaidm267@gmail.com', '\\+92 326 4789640', 'Pakistan', '923264789640'],
      new: [userInfo.email, userInfo.phone, userInfo.location, userInfo.whatsapp]
    }
  ];

  contactUpdates.forEach(update => {
    if (updateFile(update.file, update.old, update.new)) {
      successCount++;
    } else {
      failCount++;
    }
  });

  // Update Collaboration Page
  const collabUpdates = [
    {
      file: 'app/collaboration/page.tsx',
      old: ['javaidm267@gmail.com', '\\+92 326 4789640'],
      new: [userInfo.email, userInfo.phone]
    }
  ];

  collabUpdates.forEach(update => {
    if (updateFile(update.file, update.old, update.new)) {
      successCount++;
    } else {
      failCount++;
    }
  });

  // Update Footer
  const footerUpdates = [
    {
      file: 'components/layout/Footer.tsx',
      old: ['Muhammad Bin Javaid', 'javaidm267@gmail.com', '\\+923264789640', 'mbjavaid'],
      new: [userInfo.fullName, userInfo.email, userInfo.phoneClean, userInfo.github]
    }
  ];

  footerUpdates.forEach(update => {
    if (updateFile(update.file, update.old, update.new)) {
      successCount++;
    } else {
      failCount++;
    }
  });

  // Update Settings JSON
  try {
    const settingsPath = path.join(__dirname, 'data/settings.json');
    const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
    
    settings.socialMedia.email = userInfo.email;
    settings.socialMedia.github = `https://github.com/${userInfo.github}`;
    settings.socialMedia.linkedin = `https://linkedin.com/in/${userInfo.linkedin}`;
    
    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2), 'utf8');
    console.log('✅ Updated: data/settings.json');
    successCount++;
  } catch (error) {
    console.log(`❌ Failed to update: data/settings.json - ${error.message}`);
    failCount++;
  }

  // Update Sitemap (if domain provided)
  if (userInfo.domain) {
    const sitemapUpdates = [
      {
        file: 'app/sitemap.ts',
        old: 'muhammadbinjavaid.com',
        new: userInfo.domain
      }
    ];

    sitemapUpdates.forEach(update => {
      if (updateFile(update.file, update.old, update.new)) {
        successCount++;
      } else {
        failCount++;
      }
    });
  }

  // Update Package.json
  try {
    const packagePath = path.join(__dirname, 'package.json');
    const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    
    pkg.name = userInfo.fullName.toLowerCase().replace(/\s+/g, '-') + '-portfolio';
    pkg.description = `${userInfo.fullName}'s Professional Portfolio`;
    
    fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2), 'utf8');
    console.log('✅ Updated: package.json');
    successCount++;
  } catch (error) {
    console.log(`❌ Failed to update: package.json - ${error.message}`);
    failCount++;
  }

  // Create .env.local template
  try {
    const envContent = `# Database Configuration
DATABASE_URL="YOUR_NEON_DATABASE_URL_HERE"

# Admin Credentials (Change these!)
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="change_this_secure_password"

# Optional: Add your environment-specific variables below
`;
    
    const envPath = path.join(__dirname, '.env.local');
    if (!fs.existsSync(envPath)) {
      fs.writeFileSync(envPath, envContent, 'utf8');
      console.log('✅ Created: .env.local (Please update with your database URL)');
      successCount++;
    } else {
      console.log('ℹ️  .env.local already exists - skipped');
    }
  } catch (error) {
    console.log(`❌ Failed to create: .env.local - ${error.message}`);
    failCount++;
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 SETUP SUMMARY');
  console.log('='.repeat(50));
  console.log(`✅ Successfully updated: ${successCount} files`);
  if (failCount > 0) {
    console.log(`❌ Failed to update: ${failCount} files`);
  }
  console.log('\n' + '='.repeat(50));
  console.log('📋 NEXT STEPS:');
  console.log('='.repeat(50));
  console.log('\n1. Update .env.local with your Neon database URL');
  console.log('2. Replace logo: public/images/mbj-logo.jpg');
  console.log('3. Add your photos to: public/images/');
  console.log('4. Run: npm install');
  console.log('5. Test locally: npm run dev');
  console.log('6. Initialize database: npm run db:push');
  console.log('7. Deploy to Vercel: vercel --prod');
  console.log('\n📖 For detailed instructions, see DEPLOYMENT_GUIDE.md\n');

  rl.close();
}

// Run setup
setup().catch(error => {
  console.error('❌ Setup failed:', error);
  rl.close();
  process.exit(1);
});
