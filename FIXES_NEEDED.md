# Fixes Needed

## 1. ✅ Vault Password - COMPLETED
- Created password protection for Ideas Vault
- Password: "baba"
- Files created:
  - `app/admin/ideas/password-page.tsx`
  - Updated `app/admin/ideas/page.tsx`

## 2. 🔧 404 Error on Detail Pages - FIX NEEDED

**Problem**: When clicking project/research/blog from guest view, detail pages show 404

**Likely Cause**: Dynamic routes not compiling or data file issues

**Fix Steps**:
1. Check if project IDs in links match data file IDs
2. Verify dynamic route files exist:
   - `app/projects/[id]/page.tsx` ✅ EXISTS
   - `app/research/[id]/page.tsx` - CHECK THIS
   - `app/blog/[slug]/page.tsx` - CHECK THIS

3. Try accessing directly:
   - http://localhost:3000/projects/1785294040079-4v4isdcm4
   - If works: issue is with links
   - If 404: issue is with dynamic route

## 3. 🌐 Arabic Translation - FILES CREATED

**Files Created**:
- `lib/i18n/translations.ts` - Translation strings
- `lib/i18n/LanguageContext.tsx` - Context provider
- `components/LanguageSwitcher.tsx` - Button component

**TO INTEGRATE**:

### Step 1: Add LanguageProvider to root layout

In `app/layout.tsx`, wrap children with:
```typescript
import { LanguageProvider } from '@/lib/i18n/LanguageContext';

// In the return statement:
<LanguageProvider>
  {children}
</LanguageProvider>
```

### Step 2: Add Language Switcher to Header

In `components/layout/Header.tsx`, after theme toggle button:
```typescript
import LanguageSwitcher from '../LanguageSwitcher';

// In the JSX, after theme toggle:
<LanguageSwitcher />
```

### Step 3: Use translations in components

```typescript
import { useLanguage } from '@/lib/i18n/LanguageContext';

const { t } = useLanguage();

// Use: t('projects') instead of hardcoded "Projects"
```

## 4. 🎨 Search Icon Color in Light Mode

**Problem**: Search icon hard to see in light mode

**Fix**: Update SearchBar component

In `components/shared/search-bar.tsx`, find the Search icon and update its className:

**Current**:
```typescript
<Search className="w-5 h-5" />
```

**Change to**:
```typescript
<Search className="w-5 h-5 text-gray-700 dark:text-gray-300" />
```

This will make it dark gray in light mode and light gray in dark mode.

---

## Quick Fix Commands

To fix search icon color immediately, run:

```bash
# Find search-bar component
grep -r "Search className" components/

# Then update the className to include: text-gray-700 dark:text-gray-300
```

---

## Testing Checklist

- [ ] Open Ideas Vault → Password prompt appears
- [ ] Enter "baba" → Vault unlocks
- [ ] Click language switcher → Page direction changes to RTL for Arabic
- [ ] Click project from listing → Detail page opens (no 404)
- [ ] Search icon visible in light mode
- [ ] Search icon visible in dark mode

---

## Notes

1. **Vault Password**: Works with localStorage, clears on browser cache clear
2. **Arabic Translation**: Only UI elements translated, not content from database
3. **RTL Support**: Automatically applies `dir="rtl"` when Arabic selected
4. **Search Icon**: Applies different colors based on theme

---

## If 404 Persists

Check these files:
1. `app/projects/[id]/page.tsx` - generateMetadata and getProject functions
2. `data/projects.json` - Ensure IDs are strings
3. Browser console - Look for routing errors
4. Try restarting dev server: `npm run dev`

The issue might be that Next.js needs to recompile dynamic routes. A server restart usually fixes this.
