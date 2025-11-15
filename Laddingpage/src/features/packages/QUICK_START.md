# WeddingPackages - Quick Start Guide

## Installation

The component uses Radix UI Card primitives. Make sure you have the required dependencies:

```bash
npm install @radix-ui/react-slot clsx tailwind-merge
```

## Basic Implementation

### 1. Import and Use

```tsx
import { WeddingPackages } from '@/features/packages';

export default function PricingPage() {
  return (
    <main>
      <WeddingPackages />
    </main>
  );
}
```

### 2. With Click Handler

```tsx
'use client';

import { WeddingPackages } from '@/features/packages';
import { useRouter } from 'next/navigation';

export default function PricingPage() {
  const router = useRouter();

  const handleViewDetails = (packageId: string) => {
    router.push(`/packages/${packageId}`);
  };

  return <WeddingPackages onViewDetails={handleViewDetails} />;
}
```

### 3. Custom Packages

```tsx
import { WeddingPackages, Package } from '@/features/packages';

const packages: Package[] = [
  {
    id: 'basic',
    name: 'Basic Package',
    price: 50000000,
    features: ['Service 1', 'Service 2', 'Service 3'],
  },
  {
    id: 'premium',
    name: 'Premium Package',
    price: 100000000,
    popular: true, // Highlights this package
    features: ['Service 1', 'Service 2', 'Service 3', 'Service 4'],
  },
];

export default function PricingPage() {
  return <WeddingPackages packages={packages} />;
}
```

## File Structure

```
src/features/packages/
├── components/
│   ├── WeddingPackages.tsx    # Main component
│   ├── PackageCard.tsx         # Card component
│   ├── WeddingPackagesDemo.tsx # Demo examples
│   └── index.ts                # Exports
├── data.ts                     # Default packages data
├── types.ts                    # TypeScript types
├── index.ts                    # Main exports
├── README.md                   # Full documentation
└── QUICK_START.md             # This file
```

## Props Quick Reference

### WeddingPackages

```typescript
interface WeddingPackagesProps {
  title?: string;              // Section title
  subtitle?: string;           // Section subtitle
  packages?: Package[];        // Array of packages
  onViewDetails?: (id: string) => void; // Click handler
}
```

### Package

```typescript
interface Package {
  id: string;                  // Unique ID
  name: string;                // Package name
  price: number;               // Price in VNĐ
  currency?: string;           // Default: 'VNĐ'
  description?: string;        // Short description
  features: string[];          // List of services
  popular?: boolean;           // Highlight package
  badge?: string;              // Badge text
}
```

## Styling Customization

### Change Colors

Edit the Tailwind classes in `PackageCard.tsx`:

```tsx
// Change from rose to blue
className="border-blue-400 bg-gradient-to-r from-blue-500 to-indigo-600"
```

### Change Grid Layout

Edit the grid in `WeddingPackages.tsx`:

```tsx
// 4 columns on large screens
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
```

### Modify Card Spacing

```tsx
// Increase padding
<CardHeader className="pb-6">
<CardContent className="space-y-8">
```

## Common Use Cases

### 1. Link to Details Page

```tsx
const handleViewDetails = (id: string) => {
  router.push(`/packages/${id}`);
};
```

### 2. Open Modal

```tsx
const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

const handleViewDetails = (id: string) => {
  setSelectedPackage(id);
  // Open modal
};
```

### 3. Scroll to Contact Form

```tsx
const handleViewDetails = (id: string) => {
  const contactForm = document.getElementById('contact');
  contactForm?.scrollIntoView({ behavior: 'smooth' });
};
```

### 4. Track Analytics

```tsx
const handleViewDetails = (id: string) => {
  // Track event
  analytics.track('Package Viewed', { packageId: id });
  
  // Navigate
  router.push(`/packages/${id}`);
};
```

## Default Packages

The component includes 3 Vietnamese packages:

1. **Gói Basic** - 50,000,000 VNĐ (6 services)
2. **Gói Premium** - 100,000,000 VNĐ (9 services) - Popular
3. **Gói Luxury** - 200,000,000 VNĐ (12 services)

## Responsive Breakpoints

- **Mobile (< 768px)**: 1 column
- **Tablet (768px - 1024px)**: 2 columns
- **Desktop (> 1024px)**: 3 columns

## Accessibility

- ✅ Keyboard navigation
- ✅ Focus states
- ✅ Semantic HTML
- ✅ ARIA attributes (from Radix UI)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Troubleshooting

### Card component not found

Install the Card component:
```bash
npx shadcn@latest add card
```

Or use the included `components/ui/card.tsx`

### Styles not applying

Make sure Tailwind is configured correctly and `globals.css` includes the custom animations.

### TypeScript errors

Ensure all types are imported:
```tsx
import type { Package, WeddingPackagesProps } from '@/features/packages';
```

## Next Steps

- See `README.md` for full documentation
- Check `WeddingPackagesDemo.tsx` for more examples
- Customize `data.ts` with your packages
- Style with your brand colors

## Support

For issues or questions, refer to the full documentation in `README.md`.
