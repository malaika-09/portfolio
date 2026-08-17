# Complete Arabic Translation Implementation Spec

## Goal
Implement full Arabic translation across the entire website - both public pages AND admin dashboard. When user clicks language button, EVERYTHING should translate.

## Scope
- ✅ All public pages (Home, Projects, Research, Blog, Contact, etc.)
- ✅ All admin pages (Dashboard, CRUD interfaces, Forms, Modals)
- ✅ All buttons, labels, headings, placeholders
- ✅ Navigation menu
- ✅ Footer
- ✅ Search components
- ✅ Form labels and validation messages

## Files to Update

### 1. Header/Navigation Components
**File**: `components/layout/Header.tsx`
- Update navItems array to use `t()` for each item
- Update search placeholder
- Already has LanguageSwitcher ✅

### 2. Footer Component
**File**: `components/layout/Footer.tsx`
- Tagline text
- "All rights reserved"
- Social media labels

### 3. Public Pages (Guest View)

#### Home Page
**File**: `app/page.tsx`
- Hero section title/subtitle
- CTA button text
- Section headings

#### Projects Page
**File**: `app/projects/page.tsx`
- Page title and subtitle
- "View Details" button
- Filter labels (All, Completed, In Progress)
- Search placeholder

#### Projects Detail Page
**File**: `components/projects/ProjectDetailClient.tsx`
- "Back to Projects" link
- Section headings (Problem, Solution, Skills Used, etc.)

#### Research Page
**File**: `app/research/page.tsx`
- Page title and subtitle
- "Read More" button
- Filter labels
- Status labels (Published, Draft, Conference)

#### Research Detail Page
**File**: Check if exists at `app/research/[id]/page.tsx`
- "Back to Research" link
- Section headings

#### Blog Page
**File**: `app/blog/page.tsx`
- Page title and subtitle
- "Read More" button
- Search/filter labels

#### Blog Detail Page
**File**: Check at `app/blog/[id]/page.tsx`
- "Back to Blog" link
- Section headings

#### Skills Page
**File**: `app/skills/page.tsx`
- Page title
- Category headings

#### Experience Page
**File**: `app/experience/page.tsx`
- Page title
- "Present" label for current jobs

#### Education Page
**File**: `app/education/page.tsx`
- Page title
- "Present" label

#### Competitions Page
**File**: `app/competitions/page.tsx`
- Page title
- Category labels

#### Achievements Page
**File**: `app/achievements/page.tsx`
- Page title
- Category labels

#### Gallery Page
**File**: `app/gallery/page.tsx`
- Page title
- Category filters

#### Timeline Page
**File**: `app/timeline/page.tsx`
- Page title
- Category labels

#### Downloads Page
**File**: `app/downloads/page.tsx`
- Page title
- Category labels
- "Download" button

#### Contact Page
**File**: `app/contact/page.tsx`
- Page title and subtitle
- Form labels: Name, Email, Subject, Message
- "Send Message" button
- Success/error messages

#### Collaboration Page
**File**: `app/collaboration/page.tsx`
- Page title and subtitle
- Form labels
- "Submit" button

#### About Page
**File**: `app/about/page.tsx`
- Section headings

### 4. Admin Pages

#### Admin Sidebar
**File**: `components/admin/AdminSidebar.tsx`
- All menu items
- "Admin Panel" text
- "View Site" button

#### Admin Dashboard
**File**: `app/admin/dashboard/page.tsx`
- Page title
- Statistics labels
- Action button text

#### Projects Admin
**File**: `app/admin/projects/page.tsx`
- "Add Project" button
- "Edit", "Delete" buttons
- Column headings
- Status labels

#### Research Admin
**File**: `app/admin/research/page.tsx`
- Same pattern as projects

#### Blog Admin
**File**: `app/admin/blog/page.tsx`
- "Add Post" button
- "Publish", "Draft" labels
- Form labels

#### Ideas Vault (Already has password ✅)
**File**: `app/admin/ideas/page.tsx`
- All labels
- Statistics headings
- Form labels

**File**: `app/admin/ideas/password-page.tsx`
- "Ideas Vault Locked" heading
- "Enter password" label
- "Unlock Vault" button

#### Knowledge Base
**File**: `app/admin/knowledge-base/page.tsx`
- Page title
- Category labels
- "Add Entry" button

#### Engineering Notebook
**File**: `app/admin/notebook/page.tsx`
- Page title
- "Add Entry" button
- Calendar view labels
- Mood labels

#### Experiments
**File**: `app/admin/experiments/page.tsx`
- Page title
- Status labels
- Form field labels

#### Career Management
**File**: `app/admin/career/page.tsx`
- Page title
- Company names (keep English)
- Status labels
- Form labels

#### Other Admin Pages
- Skills admin
- Experience admin
- Education admin
- Competitions admin
- Achievements admin
- Gallery admin
- Timeline admin
- Downloads admin
- Messages admin
- Collaboration admin
- Media Library
- Analytics
- Settings

### 5. Shared Components

#### Search Bar
**File**: `components/shared/search-bar.tsx`
- Search placeholder text

#### Buttons
Check all Button components for hardcoded text

#### Modals
Check Modal components for titles and button text

## Additional Translation Keys Needed

Expand `lib/i18n/translations.ts` with:

```typescript
// Admin specific
adminPanel: 'Admin Panel' / 'لوحة الإدارة',
dashboard: 'Dashboard' / 'لوحة التحكم',
addNew: 'Add New' / 'إضافة جديد',
edit: 'Edit' / 'تعديل',
delete: 'Delete' / 'حذف',
save: 'Save' / 'حفظ',
cancel: 'Cancel' / 'إلغاء',
confirm: 'Confirm' / 'تأكيد',

// Forms
name: 'Name' / 'الاسم',
email: 'Email' / 'البريد الإلكتروني',
password: 'Password' / 'كلمة المرور',
required: 'Required' / 'مطلوب',

// Status
active: 'Active' / 'نشط',
inactive: 'Inactive' / 'غير نشط',
pending: 'Pending' / 'قيد الانتظار',
completed: 'Completed' / 'مكتمل',

// Messages
success: 'Success' / 'نجح',
error: 'Error' / 'خطأ',
loading: 'Loading...' / 'جاري التحميل...',
noResults: 'No results found' / 'لم يتم العثور على نتائج',

// Vault
vaultLocked: 'Ideas Vault Locked' / 'قبو الأفكار مقفل',
enterPassword: 'Enter password' / 'أدخل كلمة المرور',
unlockVault: 'Unlock Vault' / 'فتح القبو',
incorrectPassword: 'Incorrect password' / 'كلمة مرور خاطئة',
```

## Implementation Pattern

For each component:

1. **Add import**:
```typescript
import { useLanguage } from '@/lib/i18n/LanguageContext';
```

2. **Get translation function**:
```typescript
const { t } = useLanguage();
```

3. **Replace hardcoded text**:
```typescript
// Before
<h1>Projects</h1>

// After
<h1>{t('projects')}</h1>
```

4. **For arrays with text**:
```typescript
// Before
const navItems = [
  { name: 'Home', href: '/' },
];

// After  
const navItems = [
  { name: t('home'), href: '/' },
];
```

## Special Cases

### Server Components
Some pages are server components and can't use hooks. Solutions:
1. Convert to client component: Add `'use client'` at top
2. Create wrapper client component that uses `t()`
3. For metadata, keep English or use accept-language header

### Dynamic Content
Database content (project titles, descriptions) won't translate. This is expected.

### RTL Layout
Already handled by LanguageContext - sets `dir="rtl"` automatically.

## Testing Checklist

After implementation:

**English Mode**:
- [ ] All pages show English text
- [ ] LTR layout
- [ ] Buttons show English labels

**Arabic Mode**:
- [ ] All pages show Arabic text
- [ ] RTL layout (content flips)
- [ ] Buttons show Arabic labels
- [ ] Forms align right
- [ ] Navigation menu flips

**Admin Dashboard**:
- [ ] All admin pages translate
- [ ] Forms translate
- [ ] Buttons translate
- [ ] Modals translate
- [ ] Vault password screen translates

## Priority Order

1. **High Priority** (Do First):
   - Header navigation
   - Home page
   - Projects page
   - Contact page
   - Admin sidebar

2. **Medium Priority**:
   - Other public pages
   - Common components (buttons, search)
   - Footer

3. **Low Priority**:
   - Detail pages
   - Less-used admin pages
   - Modal contents

## Estimated Files to Touch
- ~30-40 files total
- ~500-800 lines of changes
- ~2-3 hours implementation time

## Success Criteria
✅ User clicks عربي → Everything translates to Arabic
✅ User clicks EN → Everything reverts to English  
✅ Layout flips correctly in both modes
✅ All buttons, labels, headings translated
✅ Forms work in both languages
✅ Admin dashboard fully functional in both languages

## Notes
- Database content stays in original language
- Some proper nouns (company names, project names) stay English
- Admin functionality should work identically in both languages
- LocalStorage persists language choice
