# HeroSection Component

A fully responsive, accessible hero section component for wedding service websites with beautiful rose-themed gradients, animations, and decorative elements.

## Features

✨ **Full-width responsive design** with soft rose blurred background gradient  
🎨 **Rose gradient theme** with customizable colors  
♿ **Accessibility compliant** with semantic HTML, ARIA labels, and keyboard navigation  
🎭 **Micro-animations** including fade-up, scale on hover, and floating decorations  
📱 **Mobile-first** responsive design  
🖼️ **Lazy-loaded images** with hover effects  
🎯 **Smooth scroll** navigation for anchor links  

## Usage

```tsx
import HeroSection from '@/features/landing/hero';

export default function HomePage() {
  return (
    <HeroSection
      heading="Your Dream Wedding"
      subheading="Transform your special day into an unforgettable celebration"
      primaryLabel="Explore Services"
      secondaryLabel="View Pricing"
      primaryHref="#services"
      secondaryHref="#packages"
      imageUrl="https://example.com/wedding-image.jpg"
      imageAlt="Beautiful wedding couple"
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `heading` | `string` | `"Your Dream Wedding"` | Main heading text |
| `subheading` | `string` | Default description | Subheading paragraph |
| `primaryHref` | `string` | `"#services"` | Primary CTA link |
| `secondaryHref` | `string` | `"#packages"` | Secondary CTA link |
| `primaryLabel` | `string` | `"Explore Services"` | Primary button text |
| `secondaryLabel` | `string` | `"View Pricing"` | Secondary button text |
| `imageUrl` | `string` | Unsplash placeholder | Hero image URL |
| `imageAlt` | `string` | `"Beautiful wedding couple"` | Image alt text |

## Components

### HeroSection (Main)
The main hero component with full layout and functionality.

### GradientText
A reusable component for gradient text styling:

```tsx
import { GradientText } from '@/features/landing/hero/components/GradientText';

<GradientText>Wedding</GradientText>
```

## Styling

The component uses Tailwind CSS with custom animations defined in `globals.css`:

- `animate-fade-up` - Fade in with upward motion
- `animate-fade-in` - Simple fade in
- `animate-float` - Floating animation for decorative elements

### Custom Gradient Classes

```css
.rose-primary - Rose to pink gradient background
.rose-text - Gradient text effect
.rose-hover - Hover state with rose colors
.rose-focus - Focus ring with rose colors
```

## Accessibility Features

- ✅ Semantic `<header>` element
- ✅ Proper heading hierarchy (h1)
- ✅ ARIA labels on interactive elements
- ✅ Keyboard focus rings (4px rose-300)
- ✅ `aria-hidden` on decorative SVGs
- ✅ Alt text for images
- ✅ Respects `prefers-reduced-motion`

## Animations

### Heading Animation
Fades up with staggered delays for each element

### Image Hover Effect
Scales to 110% on hover with smooth transition

### CTA Buttons
- Hover: Scale up + shadow increase
- Focus: 4px rose ring with offset
- Icon slides right on hover

### Decorative Elements
Floating circles and petals with different animation delays

## Demo

See `HeroSectionDemo.tsx` for multiple examples with different content and images.

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## Performance

- Images use Next.js Image component with lazy loading
- Priority loading for hero image
- Optimized animations with CSS transforms
- Backdrop blur for modern browsers
