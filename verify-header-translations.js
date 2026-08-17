/**
 * Browser Console Verification Script for Header Translations
 * 
 * USAGE:
 * 1. Open http://localhost:3000 in your browser
 * 2. Open Developer Tools (F12)
 * 3. Go to Console tab
 * 4. Copy and paste this entire script
 * 5. Press Enter to run
 * 
 * This script will automatically verify:
 * - Navigation items in English
 * - Navigation items in Arabic
 * - RTL/LTR direction changes
 * - Document language attributes
 * - Console for errors
 */

(async function verifyHeaderTranslations() {
  console.log('🔍 Starting Header Translation Verification...\n');
  
  const results = {
    passed: [],
    failed: [],
  };
  
  function pass(test) {
    results.passed.push(test);
    console.log(`✅ PASS: ${test}`);
  }
  
  function fail(test, reason) {
    results.failed.push({ test, reason });
    console.error(`❌ FAIL: ${test}\n   Reason: ${reason}`);
  }
  
  // Expected translations
  const expectedTranslations = {
    en: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      research: 'Research',
      skills: 'Skills',
      experience: 'Experience',
      education: 'Education',
      competitions: 'Competitions',
      achievements: 'Achievements',
      gallery: 'Gallery',
      blog: 'Blog',
      contact: 'Contact',
    },
    ar: {
      home: 'الرئيسية',
      about: 'عني',
      projects: 'المشاريع',
      research: 'البحث',
      skills: 'المهارات',
      experience: 'الخبرة',
      education: 'التعليم',
      competitions: 'المسابقات',
      achievements: 'الإنجازات',
      gallery: 'المعرض',
      blog: 'المدونة',
      contact: 'اتصل بنا',
    },
  };
  
  // Helper to wait for changes
  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  
  // Get current language from localStorage
  function getCurrentLanguage() {
    return localStorage.getItem('language') || 'en';
  }
  
  // Find language switcher button
  function findLanguageSwitcher() {
    const buttons = Array.from(document.querySelectorAll('button'));
    return buttons.find(btn => 
      btn.textContent.includes('عربي') || 
      btn.textContent.includes('EN') ||
      btn.getAttribute('aria-label') === 'Toggle language'
    );
  }
  
  // Get all navigation links
  function getNavigationLinks() {
    const nav = document.querySelector('nav[role="navigation"]');
    if (!nav) return [];
    return Array.from(nav.querySelectorAll('a')).filter(link => {
      const href = link.getAttribute('href');
      return href && href.startsWith('/') && !href.startsWith('/admin');
    });
  }
  
  // Test 1: Check current language
  console.log('\n📋 Test 1: Initial Language State');
  const initialLang = getCurrentLanguage();
  const initialDir = document.documentElement.dir;
  const initialHtmlLang = document.documentElement.lang;
  
  console.log(`   Current language: ${initialLang}`);
  console.log(`   Document direction: ${initialDir}`);
  console.log(`   HTML lang attribute: ${initialHtmlLang}`);
  
  if (initialLang === 'en' || initialLang === 'ar') {
    pass('Valid language stored in localStorage');
  } else {
    fail('Invalid language in localStorage', `Expected 'en' or 'ar', got '${initialLang}'`);
  }
  
  // Test 2: Verify navigation items in current language
  console.log('\n📋 Test 2: Navigation Items in Current Language');
  const navLinks = getNavigationLinks();
  console.log(`   Found ${navLinks.length} navigation links`);
  
  if (navLinks.length >= 12) {
    pass(`Found ${navLinks.length} navigation links (expected ≥12)`);
  } else {
    fail('Insufficient navigation links', `Expected ≥12, found ${navLinks.length}`);
  }
  
  // Verify current language translations
  let translationsCorrect = 0;
  navLinks.forEach(link => {
    const text = link.textContent.trim();
    const isExpected = Object.values(expectedTranslations[initialLang]).includes(text);
    if (isExpected) {
      translationsCorrect++;
    }
  });
  
  if (translationsCorrect >= 10) {
    pass(`${translationsCorrect} navigation items have correct ${initialLang === 'en' ? 'English' : 'Arabic'} translations`);
  } else {
    fail('Navigation translations incorrect', `Only ${translationsCorrect} items matched expected translations`);
  }
  
  // Test 3: Verify RTL/LTR matches language
  console.log('\n📋 Test 3: RTL/LTR Direction');
  const expectedDir = initialLang === 'ar' ? 'rtl' : 'ltr';
  if (initialDir === expectedDir) {
    pass(`Document direction '${initialDir}' matches language '${initialLang}'`);
  } else {
    fail('Document direction mismatch', `Expected '${expectedDir}', got '${initialDir}'`);
  }
  
  if (initialHtmlLang === initialLang) {
    pass(`HTML lang attribute '${initialHtmlLang}' matches language`);
  } else {
    fail('HTML lang mismatch', `Expected '${initialLang}', got '${initialHtmlLang}'`);
  }
  
  // Test 4: Find and click language switcher
  console.log('\n📋 Test 4: Language Switcher Interaction');
  const switcher = findLanguageSwitcher();
  
  if (switcher) {
    pass('Language switcher button found');
    console.log('   Clicking language switcher...');
    
    const beforeLang = getCurrentLanguage();
    switcher.click();
    
    await wait(500); // Wait for state update
    
    const afterLang = getCurrentLanguage();
    const afterDir = document.documentElement.dir;
    const afterHtmlLang = document.documentElement.lang;
    
    console.log(`   Language changed from '${beforeLang}' to '${afterLang}'`);
    console.log(`   Direction changed to: ${afterDir}`);
    console.log(`   HTML lang changed to: ${afterHtmlLang}`);
    
    if (beforeLang !== afterLang) {
      pass('Language switched successfully');
    } else {
      fail('Language did not switch', `Still '${afterLang}'`);
    }
    
    // Test 5: Verify translations after switch
    console.log('\n📋 Test 5: Translations After Language Switch');
    await wait(300); // Wait for re-render
    
    const newNavLinks = getNavigationLinks();
    let newTranslationsCorrect = 0;
    
    newNavLinks.forEach(link => {
      const text = link.textContent.trim();
      const isExpected = Object.values(expectedTranslations[afterLang]).includes(text);
      if (isExpected) {
        newTranslationsCorrect++;
      }
    });
    
    if (newTranslationsCorrect >= 10) {
      pass(`${newTranslationsCorrect} navigation items updated to ${afterLang === 'en' ? 'English' : 'Arabic'}`);
    } else {
      fail('Translations not updated after switch', `Only ${newTranslationsCorrect} items matched`);
    }
    
    // Verify specific translations
    console.log('\n📋 Test 6: Specific Translation Verification');
    const homeLink = newNavLinks.find(link => link.getAttribute('href') === '/');
    const projectsLink = newNavLinks.find(link => link.getAttribute('href') === '/projects');
    const contactLink = newNavLinks.find(link => link.getAttribute('href') === '/contact');
    
    if (homeLink && homeLink.textContent.trim() === expectedTranslations[afterLang].home) {
      pass(`Home link shows '${expectedTranslations[afterLang].home}'`);
    } else {
      fail('Home link translation incorrect', `Expected '${expectedTranslations[afterLang].home}'`);
    }
    
    if (projectsLink && projectsLink.textContent.trim() === expectedTranslations[afterLang].projects) {
      pass(`Projects link shows '${expectedTranslations[afterLang].projects}'`);
    } else {
      fail('Projects link translation incorrect', `Expected '${expectedTranslations[afterLang].projects}'`);
    }
    
    if (contactLink && contactLink.textContent.trim() === expectedTranslations[afterLang].contact) {
      pass(`Contact link shows '${expectedTranslations[afterLang].contact}'`);
    } else {
      fail('Contact link translation incorrect', `Expected '${expectedTranslations[afterLang].contact}'`);
    }
    
    // Test 7: RTL/LTR after switch
    console.log('\n📋 Test 7: RTL/LTR After Language Switch');
    const expectedNewDir = afterLang === 'ar' ? 'rtl' : 'ltr';
    if (afterDir === expectedNewDir) {
      pass(`Direction '${afterDir}' correct for '${afterLang}'`);
    } else {
      fail('Direction not updated', `Expected '${expectedNewDir}', got '${afterDir}'`);
    }
    
    // Switch back to original language
    console.log('\n🔄 Switching back to original language...');
    switcher.click();
    await wait(500);
    
  } else {
    fail('Language switcher not found', 'Could not locate language toggle button');
  }
  
  // Test 8: Check for console errors
  console.log('\n📋 Test 8: Console Error Check');
  console.log('   ⚠️  Manual verification required');
  console.log('   Check above for any error messages or warnings');
  console.log('   Specifically look for "missing translation key" errors');
  
  // Test 9: Mobile menu test (if visible)
  console.log('\n📋 Test 9: Mobile Menu Check');
  const mobileMenuButton = document.querySelector('button[aria-label="Toggle menu"]');
  if (mobileMenuButton && window.innerWidth < 768) {
    pass('Mobile menu button found (on mobile view)');
    console.log('   Click the hamburger menu to verify mobile translations');
  } else {
    console.log('   ℹ️  Skipped (resize window to <768px width to test mobile menu)');
  }
  
  // Print Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 VERIFICATION SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Passed: ${results.passed.length} tests`);
  console.log(`❌ Failed: ${results.failed.length} tests`);
  
  if (results.passed.length > 0) {
    console.log('\n✅ Passed Tests:');
    results.passed.forEach(test => console.log(`   • ${test}`));
  }
  
  if (results.failed.length > 0) {
    console.log('\n❌ Failed Tests:');
    results.failed.forEach(({ test, reason }) => {
      console.log(`   • ${test}`);
      console.log(`     → ${reason}`);
    });
  }
  
  console.log('\n' + '='.repeat(60));
  if (results.failed.length === 0) {
    console.log('🎉 ALL TESTS PASSED! Header translations working correctly.');
  } else {
    console.log('⚠️  SOME TESTS FAILED. Review the failures above.');
  }
  console.log('='.repeat(60));
  
  return {
    passed: results.passed.length,
    failed: results.failed.length,
    total: results.passed.length + results.failed.length,
    success: results.failed.length === 0,
  };
})();
