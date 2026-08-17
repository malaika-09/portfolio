# Accessibility and Responsive Design Testing Guide

## Task 25.3 - Manual Testing Checklist

This document provides manual testing procedures to complement the automated tests in `responsive-accessibility.test.tsx`. While automated tests verify technical requirements, these manual tests ensure real-world usability.

---

## 1. Responsive Design Testing (Requirement 21.1)

### 1.1 Screen Size Testing

Test all pages at the following viewport widths:

- [ ] **320px** - iPhone SE, small phones
- [ ] **375px** - iPhone 12/13 Mini
- [ ] **414px** - iPhone 12/13 Pro Max
- [ ] **768px** - iPad Portrait
- [ ] **1024px** - iPad Landscape, small laptops
- [ ] **1280px** - Standard laptop
- [ ] **1920px** - Full HD desktop
- [ ] **2560px** - 2K monitor
- [ ] **3840px** - 4K monitor

#### How to Test:
1. Open Chrome DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select each device/resolution
4. Navigate through all pages

#### What to Check:
- ✅ No horizontal scrolling
- ✅ Text remains readable (no overflow)
- ✅ Images scale appropriately
- ✅ Navigation is accessible
- ✅ Buttons and interactive elements are visible
- ✅ No overlapping content

### 1.2 Pages to Test

Test responsive behavior on ALL pages:

**Public Pages:**
- [ ] Home (`/`)
- [ ] About (`/about`)
- [ ] Projects (`/projects`)
- [ ] Project Detail (`/projects/[id]`)
- [ ] Research (`/research`)
- [ ] Research Detail (`/research/[id]`)
- [ ] Gallery (`/gallery`)
- [ ] Skills (`/skills`)
- [ ] Experience (`/experience`)
- [ ] Education (`/education`)
- [ ] Competitions (`/competitions`)
- [ ] Achievements (`/achievements`)
- [ ] Blog (`/blog`)
- [ ] Blog Post (`/blog/[id]`)
- [ ] Timeline (`/timeline`)
- [ ] Downloads (`/downloads`)
- [ ] Contact (`/contact`)
- [ ] Collaboration (`/collaboration`)
- [ ] Search (`/search`)

**Admin Pages (Requirement 21.5 - Tablet+):**
- [ ] Admin Dashboard (`/admin/dashboard`)
- [ ] Admin Projects (`/admin/projects`)
- [ ] Admin Research (`/admin/research`)
- [ ] Admin Blog (`/admin/blog`)
- [ ] Admin Media (`/admin/media`)
- [ ] Admin Messages (`/admin/messages`)
- [ ] Admin Analytics (`/admin/analytics`)
- [ ] Admin Settings (`/admin/settings`)

---

## 2. Touch Interaction Testing (Requirement 21.2)

### 2.1 Touch Target Size

All interactive elements must be at least **44x44 pixels** (WCAG 2.1 guideline).

#### How to Test:
1. Use mobile device or tablet
2. Try tapping all buttons, links, form inputs
3. Check if elements are easy to tap without accidentally hitting adjacent items

#### Elements to Test:
- [ ] Navigation menu items
- [ ] Buttons (CTAs, form submits)
- [ ] Links in content
- [ ] Form inputs and selects
- [ ] Image thumbnails in gallery
- [ ] Project/research cards
- [ ] Social media icons

#### What to Check:
- ✅ Elements can be tapped accurately
- ✅ No accidental taps on nearby elements
- ✅ Sufficient spacing between interactive elements (8px minimum)
- ✅ Touch feedback (visual response on tap)

### 2.2 Touch Gestures

- [ ] **Swipe**: Test carousel/gallery swipe functionality
- [ ] **Pinch-to-zoom**: Verify images can be zoomed (if applicable)
- [ ] **Scroll**: Smooth scrolling on all pages
- [ ] **Long press**: Check if context menus appear where expected

---

## 3. Keyboard Navigation Testing (Requirement 21.4)

### 3.1 Tab Navigation

Test keyboard-only navigation on every page.

#### How to Test:
1. Use only keyboard (no mouse)
2. Press `Tab` to move forward through interactive elements
3. Press `Shift+Tab` to move backward
4. Press `Enter` or `Space` to activate elements

#### What to Check:
- [ ] All interactive elements can be reached with Tab
- [ ] Tab order is logical (top to bottom, left to right)
- [ ] Focus indicator is clearly visible on all elements
- [ ] Skip links available for main content (for screen readers)
- [ ] Modal dialogs trap focus appropriately
- [ ] Dropdown menus can be navigated with arrow keys

### 3.2 Focus Indicators

- [ ] Focus ring is visible on all focusable elements
- [ ] Focus indicator has sufficient contrast (3:1 minimum)
- [ ] Focus state is not removed by custom CSS
- [ ] Focus persists when navigating through forms

### 3.3 Keyboard Shortcuts

Test these common shortcuts:
- [ ] `Esc` closes modals and dialogs
- [ ] `Enter` submits forms
- [ ] `Space` toggles checkboxes
- [ ] Arrow keys navigate dropdowns and lists

---

## 4. Color Contrast Testing

### 4.1 WCAG AA Standards

Minimum contrast ratios:
- **Normal text**: 4.5:1
- **Large text** (18pt+ or 14pt+ bold): 3:1
- **UI components**: 3:1

#### How to Test:
1. Use browser extension: **WAVE** or **Axe DevTools**
2. Or use online tool: [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

#### Elements to Check:
- [ ] Body text on light background
- [ ] Body text on dark background
- [ ] Navigation text
- [ ] Button text and backgrounds
- [ ] Link text (both default and hover states)
- [ ] Form labels and inputs
- [ ] Error messages
- [ ] Success messages
- [ ] Footer text

### 4.2 Color Scheme Verification

Test both themes:
- [ ] **Light mode**: All text meets contrast requirements
- [ ] **Dark mode**: All text meets contrast requirements
- [ ] **Green theme elements**: Primary green (#22c55e) has sufficient contrast on dark backgrounds

---

## 5. Screen Reader Testing

### 5.1 Screen Readers to Test

- **Windows**: NVDA (free) or JAWS
- **macOS**: VoiceOver (built-in, press Cmd+F5)
- **iOS**: VoiceOver (Settings > Accessibility)
- **Android**: TalkBack (Settings > Accessibility)

### 5.2 What to Test

#### Navigation
- [ ] Page title is announced on page load
- [ ] Heading structure is logical (H1 → H2 → H3)
- [ ] Landmark regions announced (header, nav, main, footer)
- [ ] Links have descriptive text (not just "click here")

#### Forms
- [ ] Form labels are associated with inputs
- [ ] Error messages are announced
- [ ] Required fields are indicated
- [ ] Form submission success/error is announced

#### Images
- [ ] All images have alt text
- [ ] Decorative images have empty alt (`alt=""`)
- [ ] Complex images have detailed descriptions

#### Interactive Elements
- [ ] Buttons indicate their purpose
- [ ] Toggle states announced (expanded/collapsed)
- [ ] Current page in navigation is indicated
- [ ] Loading states announced with `aria-live`

#### Dynamic Content
- [ ] Form validation errors announced
- [ ] Search results announced
- [ ] Modal opening/closing announced
- [ ] Toast notifications announced

### 5.3 ARIA Attributes to Verify

Check these in DevTools:
- [ ] `aria-label` on icon-only buttons
- [ ] `aria-labelledby` for complex UI
- [ ] `aria-describedby` for help text
- [ ] `aria-live="polite"` for status messages
- [ ] `aria-live="assertive"` for errors
- [ ] `aria-expanded` on dropdowns/accordions
- [ ] `aria-current="page"` on active nav link
- [ ] `role` attributes where appropriate

---

## 6. Animation and Motion Testing (Requirement 24.6)

### 6.1 Prefers-Reduced-Motion

#### How to Enable:
- **Windows**: Settings > Ease of Access > Display > Show animations in Windows
- **macOS**: System Preferences > Accessibility > Display > Reduce motion
- **Chrome DevTools**: Cmd/Ctrl+Shift+P → "Emulate CSS prefers-reduced-motion"

#### What to Test:
- [ ] Page transitions are reduced or removed
- [ ] Scroll animations are minimal or disabled
- [ ] Parallax effects are removed
- [ ] Auto-playing animations are paused
- [ ] Hover effects remain (they're user-initiated)

### 6.2 Animation Performance

- [ ] Animations run at 60fps (no jank)
- [ ] No layout thrashing during scroll
- [ ] Loading animations don't block interaction
- [ ] Transitions are smooth on mid-range devices

---

## 7. Mobile Performance Testing (Requirement 21.6)

### 7.1 Network Throttling

Test on simulated slow networks:

#### How to Test:
1. Open Chrome DevTools
2. Go to Network tab
3. Select throttling: "Slow 3G" or "Fast 3G"

#### What to Check:
- [ ] Initial content visible within 2 seconds (Requirement 23.5)
- [ ] Page is usable before full load (progressive enhancement)
- [ ] Images lazy load appropriately
- [ ] No blocking resources

### 7.2 Real Device Testing

Test on actual devices:
- [ ] Budget Android phone (2-3 years old)
- [ ] iPhone (older model)
- [ ] Tablet (iPad or Android)

#### What to Check:
- [ ] Smooth scrolling
- [ ] No lag on interactions
- [ ] Images load properly
- [ ] Forms work correctly
- [ ] Navigation is responsive

---

## 8. Lighthouse Audits (Requirement 23.1)

### 8.1 Performance Target: 95+

#### How to Run:
1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Select "Performance" and "Accessibility"
4. Click "Analyze page load"

#### Pages to Audit:
- [ ] Home page
- [ ] About page
- [ ] Projects listing
- [ ] Project detail
- [ ] Contact page
- [ ] Blog listing

#### Metrics to Check:
- [ ] **Performance Score**: ≥ 95
- [ ] **Accessibility Score**: ≥ 95
- [ ] **First Contentful Paint**: < 1.8s
- [ ] **Time to Interactive**: < 3.8s
- [ ] **Speed Index**: < 3.4s
- [ ] **Cumulative Layout Shift**: < 0.1

---

## 9. Cross-Browser Testing

Test in major browsers:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## 10. Automated Accessibility Scan

### 10.1 Browser Extensions

Install and run:
- [ ] **Axe DevTools** (most comprehensive)
- [ ] **WAVE** (visual feedback)
- [ ] **Lighthouse** (built into Chrome)

### 10.2 What to Check

Run on all major pages and fix:
- [ ] No critical violations
- [ ] No serious violations
- [ ] Address moderate violations where possible
- [ ] Document any false positives

---

## Summary Checklist

### ✅ All Tests Completed

- [ ] Responsive design tested at all viewport sizes
- [ ] Touch interactions verified on mobile devices
- [ ] Keyboard navigation works on all pages
- [ ] Color contrast meets WCAG AA standards
- [ ] Screen reader testing completed
- [ ] Animations respect prefers-reduced-motion
- [ ] Mobile performance meets 2-second target
- [ ] Lighthouse scores ≥ 95 for Performance and Accessibility
- [ ] Cross-browser compatibility verified
- [ ] Automated accessibility scans show no critical issues

---

## Notes

- **WCAG 2.1 Level AA** is the target compliance level
- Focus on **critical user journeys** for manual testing
- Document any issues found with screenshots
- Prioritize fixes: Critical → High → Medium → Low
- Consider hiring accessibility consultant for professional audit
- Re-test after major UI changes

---

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
