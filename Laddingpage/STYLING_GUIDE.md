# Hướng dẫn Style cho Wedding Studio

## Container Width Standards

Tất cả components nên sử dụng container width đồng bộ:

```tsx
<div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  {/* Content */}
</div>
```

### Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md, lg)
- **Desktop**: > 1024px (xl, 2xl)

### Max Width Classes

- `max-w-7xl` - Sử dụng cho tất cả sections chính (1280px)
- `max-w-6xl` - Cho content hẹp hơn (1152px)
- `max-w-4xl` - Cho text content, forms (896px)
- `max-w-2xl` - Cho paragraphs (672px)

## Color Palette

### Primary Colors (Rose/Pink Theme)

```css
/* Backgrounds */
from-pink-50 to-rose-100    /* Gradient backgrounds */
bg-pink-100                  /* Light backgrounds */
bg-pink-50                   /* Very light backgrounds */

/* Borders */
border-pink-200             /* Default borders */
border-pink-300             /* Hover borders */
border-pink-400             /* Active borders */

/* Text & Icons */
text-pink-600               /* Primary text */
text-rose-600               /* Secondary text */

/* Gradients */
from-rose-500 to-pink-600   /* Primary gradient */
from-rose-600 to-pink-600   /* Text gradient */
```

## Component Structure

### Section Layout

```tsx
<section className="py-5 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-pink-50/30 to-white">
  <div className="container mx-auto max-w-7xl">
    {/* Section Header */}
    <div className="text-center mb-16 space-y-4">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100 rounded-full">
        <Icon className="w-4 h-4 text-pink-600" />
        <span className="text-sm font-medium text-pink-600">Badge Text</span>
      </div>

      {/* Title */}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
        Section Title
      </h2>

      {/* Subtitle */}
      <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
        Section subtitle
      </p>

      {/* Decorative line */}
      <div className="flex items-center justify-center gap-2 pt-4">
        <div className="w-12 h-1 bg-gradient-to-r from-transparent to-pink-300 rounded-full" />
        <div className="w-2 h-2 bg-pink-400 rounded-full" />
        <div className="w-8 h-1 bg-pink-400 rounded-full" />
        <div className="w-2 h-2 bg-pink-400 rounded-full" />
        <div className="w-12 h-1 bg-gradient-to-l from-transparent to-pink-300 rounded-full" />
      </div>
    </div>

    {/* Content */}
    {/* ... */}
  </div>
</section>
```

### Card Component

```tsx
<div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-500 border-2 border-pink-100 hover:border-pink-300">
  {/* Card content */}
</div>
```

### Button Styles

#### Primary Button
```tsx
<button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-pink-300 focus:ring-offset-2">
  Button Text
</button>
```

#### Secondary Button
```tsx
<button className="inline-flex items-center gap-2 px-8 py-4 bg-white text-pink-600 font-semibold rounded-full border-2 border-pink-300 hover:bg-pink-50 hover:border-pink-400 hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-pink-300 focus:ring-offset-2">
  Button Text
</button>
```

## Typography System

### Font Sizes (Đồng bộ)

#### Display Text (Hero, Landing)
```tsx
// Extra Large - Hero titles
<h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">

// Large - Main hero
<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">

// Medium - Sub hero
<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
```

#### Section Headings
```tsx
// H1 - Page titles
<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">

// H2 - Section titles (STANDARD)
<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-gray-900">

// H3 - Subsection titles
<h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug text-gray-900">

// H4 - Card titles
<h4 className="text-xl sm:text-2xl lg:text-3xl font-semibold leading-snug text-gray-900">

// H5 - Small headings
<h5 className="text-lg sm:text-xl lg:text-2xl font-semibold leading-normal text-gray-900">
```

#### Body Text
```tsx
// Extra Large - Intro paragraphs
<p className="text-xl leading-relaxed text-gray-600">

// Large - Section subtitles (STANDARD)
<p className="text-lg leading-relaxed text-gray-600">

// Base - Normal text
<p className="text-base leading-relaxed text-gray-600">

// Small - Helper text
<p className="text-sm leading-normal text-gray-500">

// Extra Small - Captions
<p className="text-xs leading-normal text-gray-500">
```

#### Labels & Badges
```tsx
// Large label
<label className="text-base font-semibold text-gray-900">

// Standard label
<label className="text-sm font-semibold text-gray-900">

// Badge text
<span className="text-xs font-semibold text-pink-600">
```

#### Buttons
```tsx
// Large button
<button className="text-lg font-semibold">

// Standard button (MOST COMMON)
<button className="text-base font-semibold">

// Small button
<button className="text-sm font-semibold">
```

#### Links
```tsx
// Standard link
<a className="text-base font-medium text-gray-600 hover:text-pink-600">

// Small link
<a className="text-sm font-medium text-gray-600 hover:text-pink-600">
```

### Typography Helper (Optional)

Import và sử dụng:
```tsx
import { typography, gradientText, textColors } from '@/src/styles/typography';

// Sử dụng
<h2 className={typography.heading.h2}>Section Title</h2>
<p className={typography.body.lg}>Description text</p>
<span className={gradientText}>Gradient Text</span>
```

## Spacing

### Section Padding
- `py-20` - Vertical padding cho sections
- `px-4 sm:px-6 lg:px-8` - Horizontal padding responsive

### Element Spacing
- `space-y-4` - Small spacing
- `space-y-6` - Medium spacing
- `space-y-8` - Large spacing
- `gap-8` - Grid gap

## Animations

### Fade Up
```tsx
<div className="animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
```

### Hover Effects
```tsx
hover:shadow-xl hover:scale-105 transition-all duration-300
```

## Accessibility

### Focus States
```tsx
focus:outline-none focus:ring-4 focus:ring-pink-300 focus:ring-offset-2
```

### ARIA Labels
```tsx
<button aria-label="Descriptive label">
<img alt="Descriptive alt text" />
```

## Responsive Design

### Grid Layouts
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
```

### Flex Layouts
```tsx
<div className="flex flex-col sm:flex-row gap-4">
```

## Icons

Sử dụng Lucide React icons:
```tsx
import { Heart, Phone, Mail } from 'lucide-react';

<Heart className="w-6 h-6 text-pink-600" />
```

## Best Practices

1. **Consistency**: Luôn sử dụng cùng một color palette
2. **Spacing**: Sử dụng spacing scale đồng bộ
3. **Typography**: Giữ hierarchy rõ ràng
4. **Accessibility**: Luôn thêm ARIA labels và focus states
5. **Performance**: Sử dụng Next.js Image component
6. **Responsive**: Test trên tất cả breakpoints
