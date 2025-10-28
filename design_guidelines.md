# NOZEV - Design Guidelines
**Simulated Live Streaming Platform (Marketing Demo)**

## Design Approach

**Selected Approach:** Custom hybrid design drawing from Netflix's content-first streaming interface and Tinder's profile aesthetic, optimized for mobile-first demonstration purposes.

**Core Design Principles:**
1. **Content Primacy** - Video thumbnails and live content dominate the interface
2. **Gesture-Driven Navigation** - Minimal UI chrome, maximum immersion
3. **Perceived Authenticity** - Despite being simulated, every element should feel like a real live streaming platform
4. **Zero Friction** - Instant access, no barriers between user and content

## Typography System

**Font Stack:**
- Primary: Inter or SF Pro Display (via Google Fonts CDN)
- Fallback: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto

**Type Scale:**
- **Login Screen:** text-4xl (36px) for "NOZEV" logo, text-base (16px) for input labels
- **Live Thumbnails:** text-sm (14px) for titles, text-xs (12px) for metadata
- **Live Player:** text-2xl (24px) for viewer count, text-sm for "LIVE" badge
- **Profile Section:** text-lg (18px) for section headers, text-base for form labels
- **Navigation:** text-xs for tab labels

**Weight Distribution:**
- Bold (700): App name, section headers, "LIVE" badge
- Semibold (600): CTA buttons, active navigation items
- Medium (500): Body text, form labels
- Regular (400): Secondary text, metadata

## Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, and 8 (8px, 16px, 24px, 32px)
- Component padding: p-4 (consistent 16px internal spacing)
- Section spacing: space-y-6 between major sections
- Grid gaps: gap-4 for thumbnail grids
- Safe areas: px-4 horizontal margins on all screens

**Container Strategy:**
- Full viewport height screens (Login, Live Player): h-screen
- Scrollable content (Lives Grid, Profile): min-h-screen
- Bottom navigation: fixed bottom with h-16 (64px)

**Grid Systems:**
- **Lives Grid:** 2 columns on mobile (grid-cols-2), 3 columns on tablets (md:grid-cols-3)
- **Profile Form:** Single column, full width with max-w-md centered

## Component Library

### 1. Login Screen
**Structure:**
- Vertically centered single-column layout (max-w-sm mx-auto)
- Logo at top (mb-12)
- Email input field with intelligent autocorrection indicator
- Primary CTA button (w-full, h-12, rounded-lg)
- All elements within safe padding (px-6)

**Email Input:**
- Full width rounded input (rounded-lg, h-14)
- Floating label or persistent placeholder
- Autocorrection suggestion appears below input (text-xs, italic)

### 2. Live Thumbnail Cards
**Dimensions:** Aspect ratio 16:9 for thumbnails
**Structure:**
- Thumbnail image (rounded-lg overflow-hidden)
- Overlay gradient at bottom (for text readability)
- Title text (2 lines max, truncate with ellipsis)
- View count or category badge (absolute positioned, top-right)

**Layout Pattern:**
```
Grid container (gap-4, p-4)
  → Card (relative, overflow-hidden)
    → Image (w-full, aspect-video)
    → Gradient overlay (absolute bottom)
    → Text content (absolute bottom, p-3)
```

### 3. Live Player Interface
**Full-Screen Layout:**
- Video fills entire viewport (absolute inset-0)
- Top overlay bar: "LIVE" badge (top-left), viewer count (top-right)
- Both overlays with backdrop-blur background
- No bottom controls - clean, immersive experience

**LIVE Badge:**
- Pill shape (rounded-full, px-3, py-1)
- Pulsing red dot indicator (w-2 h-2 rounded-full)
- Text: "LIVE" in uppercase, semibold

**Viewer Counter:**
- Icon + number format
- Animated number transitions (not abrupt jumps)
- Updates every 3-5 seconds with ±3-15 variance

### 4. Bottom Navigation Bar
**Structure:** Fixed bottom, full width, h-16
**Layout:** 3-column grid (grid-cols-3)
**Items:** Each centered (flex flex-col items-center justify-center)
- Icon (24x24px from Heroicons - solid style for active, outline for inactive)
- Label (text-xs, mt-1)

**Tab Order:** Lives | Messages | Profile

### 5. Profile Screen
**Layout:** Scrollable single column (max-w-md mx-auto, p-6)

**Photo Section:**
- Circular avatar (w-24 h-24 rounded-full, mx-auto)
- Upload trigger (absolute positioned, bottom-right of avatar circle)
- Name input below (mt-4, text-center layout initially)

**Preferences Section:**
- Section headers (text-lg font-semibold, mb-4)
- Radio button groups with custom styling
- Checkbox groups for communication preferences
- Each option row: h-12, flex items-center, border-b for separation

**Form Controls:**
- Radio buttons: Custom styled circles (w-5 h-5)
- Checkboxes: Rounded squares (w-5 h-5, rounded)
- Labels: ml-3 from control, full touch target

### 6. Messages Screen (Maintenance)
**Centered Layout:**
- Flex container (h-screen, items-center, justify-center)
- Icon (w-16 h-16 opacity-50)
- "Em Manutenção" text (text-xl, mt-4)
- Optional description (text-sm, opacity-75, mt-2)

## Screen-Specific Guidelines

### Login Screen Behavior
- Email input focuses automatically on mount
- Autocorrect displays with 300ms delay
- Button disabled until valid email format
- Transition to Lives Grid: fade + slide up (300ms)

### Lives Grid
- Infinite scroll loading pattern
- Skeleton screens while loading thumbnails
- Pull-to-refresh gesture
- Thumbnail tap: immediate full-screen transition (no fade)

### Live Player Gestures
**Swipe Up:** Next live (vertical carousel, snap scroll)
**Swipe Left:** Exit to grid (horizontal slide transition)
**No controls overlay** - video plays continuously
**Double tap:** Disabled (no like/pause)
**Long press:** Disabled (no download)

### Profile Persistence
- Photo stored in localStorage as base64
- Name and preferences in localStorage JSON
- Load on app mount, display immediately
- Auto-save on every change (debounced 500ms)

## Animation Guidelines

**Use Sparingly - Only These:**
1. **Page Transitions:** 200-300ms slide/fade
2. **Viewer Count:** Number increment animation (CountUp.js style)
3. **LIVE Badge Pulse:** 2s infinite animation on red dot
4. **Bottom Nav Active:** Icon scale 1.1 + weight change
5. **Button Press:** Scale 0.98 on active

**Forbidden:**
- Scroll-triggered animations
- Parallax effects
- Elaborate card hover states
- Loading spinners (use skeleton screens instead)

## Images

**Hero/Featured Images:** NOT applicable for this app - content is video thumbnails

**Profile Photos:** User-uploaded via device gallery picker

**Live Thumbnails:** External hosted images (configurable URLs)
- Recommend: 1280x720px JPG format
- Admin provides via configuration file/panel
- Lazy load below fold with blur-up placeholder

**Icon Library:** Heroicons (via CDN) - use solid variant for active states, outline for inactive

## Critical Mobile Optimizations

- Touch targets minimum 44x44px (iOS) / 48x48px (Android)
- Safe area insets respected (env(safe-area-inset-*))
- No horizontal scroll unless intentional
- Keyboard behavior: input scrolls into view automatically
- Video player: prevent device sleep during playback
- Status bar integration: overlap with blur on Live Player

## Accessibility Compliance

- All interactive elements have focus states (ring-2 on focus-visible)
- Form inputs have associated labels (for screen readers)
- Navigation tabs have aria-current on active tab
- Video player has aria-live region for viewer count changes
- Sufficient contrast ratios maintained (even with no color spec, structure ensures this)

**Note on Colors:** Color palette definition deferred to implementation phase. All structural specifications above remain color-agnostic while ensuring visual hierarchy through spacing, typography, and component relationships.