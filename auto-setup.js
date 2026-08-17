const fs = require("fs");
const path = require("path");

console.log("\n" + "=".repeat(60));
console.log("🚀 PORTFOLIO AUTO-SETUP FROM CSV");
console.log("=".repeat(60) + "\n");

// Read CSV file
const csvPath = path.join(__dirname, "user-details.csv");
if (!fs.existsSync(csvPath)) {
  console.error("❌ Error: user-details.csv not found!");
  console.log("Please fill the user-details.csv file first.\n");
  process.exit(1);
}

const csvContent = fs.readFileSync(csvPath, "utf8");
const lines = csvContent.split("\n").slice(1); // Skip header

const userData = {};
lines.forEach(line => {
  const match = line.match(/^([^,]+),([^,]*),/);
  if (match) {
    const field = match[1].trim();
    let value = match[2].trim().replace(/^"|"$/g, "");
    
    if (value) {
      const key = field.toLowerCase().replace(/\s+/g, "_").replace(/[()]/g, "");
      userData[key] = value;
    }
  }
});

// Validate required fields
const required = ["full_name", "email", "phone_with_country_code", "location"];
const missing = required.filter(f => !userData[f]);

if (missing.length > 0) {
  console.error("❌ Missing required fields in CSV:");
  missing.forEach(f => console.log(`   - ${f}`));
  console.log("\nPlease fill all required fields in user-details.csv\n");
  process.exit(1);
}

console.log("✅ CSV file loaded successfully!\n");
console.log("📋 User Information:");
console.log(`   Name: ${userData.full_name}`);
console.log(`   Email: ${userData.email}`);
console.log(`   Phone: ${userData.phone_with_country_code}`);
console.log(`   Location: ${userData.location}\n`);

// Helper function
function updateFile(filePath, replacements) {
  try {
    const fullPath = path.join(__dirname, filePath);
    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  Skipped: ${filePath} (file not found)`);
      return false;
    }

    let content = fs.readFileSync(fullPath, "utf8");
    let changed = false;

    replacements.forEach(({ old, new: newVal }) => {
      if (content.includes(old)) {
        content = content.replace(new RegExp(old, "g"), newVal);
        changed = true;
      }
    });

    if (changed) {
      fs.writeFileSync(fullPath, content, "utf8");
      console.log(`✅ Updated: ${filePath}`);
      return true;
    } else {
      console.log(`⏭️  No changes: ${filePath}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Failed: ${filePath} - ${error.message}`);
    return false;
  }
}

console.log("🔄 Updating files...\n");

let successCount = 0;

// Update Contact Page
if (updateFile("app/contact/page.tsx", [
  { old: "javaidm267@gmail.com", new: userData.email },
  { old: "\\+92 326 4789640", new: userData.phone_with_country_code },
  { old: "Pakistan", new: userData.location },
  { old: "923264789640", new: userData.whatsapp_number_no__sign || userData.phone_with_country_code.replace(/[\s\-\+]/g, "") }
])) successCount++;

// Update Collaboration Page
if (updateFile("app/collaboration/page.tsx", [
  { old: "javaidm267@gmail.com", new: userData.email },
  { old: "\\+92 326 4789640", new: userData.phone_with_country_code }
])) successCount++;

// Update Footer
if (updateFile("components/layout/Footer.tsx", [
  { old: "Muhammad Bin Javaid", new: userData.full_name },
  { old: "javaidm267@gmail.com", new: userData.email },
  { old: "\\+923264789640", new: userData.phone_with_country_code.replace(/[\s\-]/g, "") },
  { old: "mbjavaid", new: userData.github_username || "yourusername" }
])) successCount++;

// Update Settings JSON
try {
  const settingsPath = path.join(__dirname, "data/settings.json");
  const settings = JSON.parse(fs.readFileSync(settingsPath, "utf8"));
  
  settings.socialMedia.email = userData.email;
  if (userData.github_username) {
    settings.socialMedia.github = `https://github.com/${userData.github_username}`;
  }
  if (userData.linkedin_profile) {
    settings.socialMedia.linkedin = `https://linkedin.com/in/${userData.linkedin_profile}`;
  }
  
  fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2), "utf8");
  console.log("✅ Updated: data/settings.json");
  successCount++;
} catch (error) {
  console.log(`❌ Failed: data/settings.json - ${error.message}`);
}

// Update Sitemap
if (userData.website_domain_optional) {
  if (updateFile("app/sitemap.ts", [
    { old: "muhammadbinjavaid.com", new: userData.website_domain_optional }
  ])) successCount++;
}

// Update Package.json
try {
  const packagePath = path.join(__dirname, "package.json");
  const pkg = JSON.parse(fs.readFileSync(packagePath, "utf8"));
  
  pkg.name = userData.full_name.toLowerCase().replace(/\s+/g, "-") + "-portfolio";
  pkg.description = `${userData.full_name} Professional Portfolio`;
  
  fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2), "utf8");
  console.log("✅ Updated: package.json");
  successCount++;
} catch (error) {
  console.log(`❌ Failed: package.json - ${error.message}`);
}

// Create .env.local
try {
  const envContent = `# Database Configuration
DATABASE_URL="YOUR_NEON_DATABASE_URL_HERE"

# Admin Credentials
ADMIN_USERNAME="${userData.admin_username || "admin"}"
ADMIN_PASSWORD="${userData.admin_password || "change_this_password"}"

# Generated on: ${new Date().toISOString()}
`;

  const envPath = path.join(__dirname, ".env.local");
  fs.writeFileSync(envPath, envContent, "utf8");
  console.log("✅ Created: .env.local");
  successCount++;
} catch (error) {
  console.log(`❌ Failed: .env.local - ${error.message}`);
}

console.log("\n" + "=".repeat(60));
console.log(`✅ Successfully updated ${successCount} files!`);
console.log("=".repeat(60));

console.log("\n📋 NEXT STEPS:\n");
console.log("1. Update .env.local with Neon database URL");
console.log("2. Replace logo: public/images/mbj-logo.jpg");
console.log("3. Run: npm install");
console.log("4. Test: npm run dev");
console.log("5. Deploy: vercel --prod\n");
