# Arabic Translation Implementation Plan

## Overview
Currently, the language switcher button exists but components are NOT using translations. We need to update each component to use the `t()` translation function.

## What Will Be Translated

### ✅ UI Elements (Will Translate)
- Navigation menu items
- Button labels
- Form labels
- Section headings
- Status labels
- Common phrases

### ❌ Content (Won't Translate)
- Project titles and descriptions (from database)
- Blog post content
- Research paper titles
- User-generated content

---

## Components to Update

### 1. Header Component
**File**: `components/layout/Header.tsx`
**Current**: Hardcoded "Home", "About", etc.
**Update**: Use `t('home')`, `t('about')`, etc.

### 2. Projects Page
**File**: `app/projects/page.tsx`
**Elements to translate**:
- Page title "Projects"
- Subtitle text
- "View Details" button
- Status labels (Completed, In Progress)
- "All" filter option

### 3. Projects Detail Page
**File**: `components/projects/ProjectDetailClient.tsx`
**Elements**:
- "Back to Projects" link
- Section headings
- Button labels

### 4. Research Page
**File**: `app/research/page.tsx`
**Elements**:
- Page title
- Search placeholder
- Filter labels
- "Read More" buttons

### 5. Blog Page
**File**: `app/blog/page.tsx`
**Elements**:
- Page title
- Search/filter labels
- "Read More" buttons

### 6. Contact Page
**File**: `app/contact/page.tsx`
**Elements**:
- Form labels (Name, Email, Subject, Message)
- "Send Message" button
- Success/error messages

### 7. Footer Component
**File**: `components/layout/Footer.tsx`
**Elements**:
- Tagline
- "All rights reserved" text
- Section headings

### 8. Search Bar
**File**: `components/shared/search-bar.tsx`
**Elements**:
- Search placeholder text

---

## Translation Keys Available

Already defined in `lib/i18n/translations.ts`:

```typescript
{
  // Navigation
  home, about, projects, research, skills, experience,
  education, competitions, achievements, gallery, blog,
  contact, timeline, downloads
  
  // Common
  viewDetails, readMore, loadMore, search, filter, all,
  featured, status, category, date, title, description, tags
  
  // Projects
  projectsTitle, projectsSubtitle, completed, inProgress, planning
  
  // Research
  researchTitle, researchSubtitle, published, draft, conference
  
  // Blog
  blogTitle, blogSubtitle
  
  // Contact
  contactTitle, contactSubtitle, name, email, subject,
  message, send
  
  // Footer
  footerTagline, rights
}
```

---

## Implementation Steps

### Phase 1: Navigation (Priority 1)
- [x] Header navigation items
- [ ] Mobile menu items

### Phase 2: Main Pages (Priority 2)
- [ ] Home page
- [ ] Projects page
- [ ] Research page
- [ ] Blog page
- [ ] Contact page

### Phase 3: Components (Priority 3)
- [ ] Footer
- [ ] Search bar
- [ ] Buttons
- [ ] Form labels

### Phase 4: Detail Pages (Priority 4)
- [ ] Project detail
- [ ] Research detail
- [ ] Blog detail

---

## How to Update Each Component

### Example: Updating Header

**Before**:
```typescript
const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
];
```

**After**:
```typescript
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function Header() {
  const { t } = useLanguage();
  
  const navItems = [
    { name: t('home'), href: '/' },
    { name: t('about'), href: '/about' },
  ];
```

### Example: Updating Page Title

**Before**:
```typescript
<h1>Projects</h1>
```

**After**:
```typescript
import { useLanguage } from '@/lib/i18n/LanguageContext';

const { t } = useLanguage();
<h1>{t('projectsTitle')}</h1>
```

---

## Additional Translation Keys Needed

Some components might need additional keys not yet in translations.ts:

### Buttons
```typescript
en: {
  backToProjects: 'Back to Projects',
  backToResearch: 'Back to Research',
  backToBlog: 'Back to Blog',
  viewMore: 'View More',
  showLess: 'Show Less',
}
ar: {
  backToProjects: 'العودة إلى المشاريع',
  backToResearch: 'العودة إلى البحث',
  backToBlog: 'العودة إلى المدونة',
  viewMore: 'عرض المزيد',
  showLess: 'عرض أقل',
}
```

### Forms
```typescript
en: {
  required: 'Required',
  optional: 'Optional',
  submit: 'Submit',
  cancel: 'Cancel',
  save: 'Save',
  delete: 'Delete',
  edit: 'Edit',
}
ar: {
  required: 'مطلوب',
  optional: 'اختياري',
  submit: 'إرسال',
  cancel: 'إلغاء',
  save: 'حفظ',
  delete: 'حذف',
  edit: 'تعديل',
}
```

### Status
```typescript
en: {
  loading: 'Loading...',
  noResults: 'No results found',
  error: 'An error occurred',
  success: 'Success!',
}
ar: {
  loading: 'جاري التحميل...',
  noResults: 'لم يتم العثور على نتائج',
  error: 'حدث خطأ',
  success: 'نجح!',
}
```

---

## Testing Checklist

After implementation:
- [ ] Switch to Arabic
- [ ] Check header navigation (all items translated)
- [ ] Navigate to Projects page (title translated)
- [ ] Navigate to Research page (title translated)
- [ ] Navigate to Blog page (title translated)
- [ ] Navigate to Contact page (form labels translated)
- [ ] Check footer (text translated)
- [ ] Search bar (placeholder translated)
- [ ] All buttons (labels translated)
- [ ] RTL layout working properly
- [ ] Switch back to English (everything reverts)

---

## Notes

1. **Server Components**: Some pages are server components. They can't use hooks directly. For those:
   - Convert to client component ('use client')
   - OR pass translations as props from parent
   - OR use a wrapper client component

2. **Static Text**: Any hardcoded text in components needs to be replaced with `t()` calls

3. **Metadata**: Page titles in `metadata` objects can't use `t()` - they're server-side. We'll need a different approach for those.

4. **Admin Pages**: Should we translate admin dashboard too? (Currently English only)

---

## Estimated Work

- **Navigation**: 5 minutes
- **Main pages (5)**: 30 minutes  
- **Components**: 20 minutes
- **Detail pages**: 15 minutes
- **Testing**: 10 minutes

**Total**: ~1.5 hours for full implementation

---

## Current Status

✅ Infrastructure ready:
- LanguageContext created
- Translation files created
- Language switcher added
- RTL support enabled

❌ Components not yet updated:
- Need to import and use `useLanguage()` hook
- Need to replace hardcoded text with `t()` calls

**Next Step**: Update Header component first as proof of concept, then proceed to other components.
