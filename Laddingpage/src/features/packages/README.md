# WeddingPackages Component

A beautiful, responsive wedding packages section with elegant card-based layout using Radix UI Card primitives and Tailwind v4.

## Features

✨ **Elegant grid layout** (1-3 columns responsive)  
🎨 **Rose-themed UI** with soft shadows and gradients  
💳 **Radix UI Card primitives** for accessible components  
📱 **Mobile responsive** design  
🎯 **Popular package highlighting** with special styling  
💰 **Price formatting** with Vietnamese currency  
✅ **Feature lists** with checkmarks  
🎭 **Smooth animations** with hover effects  
🔘 **CTA buttons** with "Xem Chi Tiết" action  

## Components

### WeddingPackages (Main Component)
The main container component that displays a grid of package cards with section header and additional info.

### PackageCard (Child Component)
Individual package card with price, features list, and CTA button.

## Usage

### Basic Usage

```tsx
import { WeddingPackages } from '@/features/packages';

export default function PricingPage() {
  return <WeddingPackages />;
}
```

### With Custom Handler

```tsx
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

### Custom Packages

```tsx
import { WeddingPackages } from '@/features/packages';
import type { Package } from '@/features/packages';

const myPackages: Package[] = [
  {
    id: 'basic',
    name: 'Basic Package',
    price: 50000000,
    currency: 'VNĐ',
    description: 'Perfect for small weddings',
    features: [
      'Venue decoration',
      'Photography',
      'Catering for 100 guests',
    ],
    badge: 'Popular',
  },
  // ... more packages
];

export default function PricingPage() {
  return (
    <WeddingPackages
      title="Our Packages"
      subtitle="Choose what fits your needs"
      packages={myPackages}
    />
  );
}
```

## Props

### WeddingPackagesProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `"Gói Dịch Vụ Tiệc Cưới"` | Section title |
| `subtitle` | `string` | Default Vietnamese text | Section subtitle |
| `packages` | `Package[]` | Default 3 packages | Array of package objects |
| `onViewDetails` | `(id: string) => void` | `undefined` | Callback when CTA is clicked |

### PackageCardProps

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `package` | `Package` | ✅ | Package data object |
| `onViewDetails` | `(id: string) => void` | ❌ | Callback for CTA button |
| `delay` | `number` | ❌ | Animation delay in ms |

### Package Type

```typescript
interface Package {
  id: string;              // Unique identifier
  name: string;            // Package name
  price: number;           // Price in VNĐ
  currency?: string;       // Currency symbol (default: 'VNĐ')
  description?: string;    // Short description
  features: string[];      // List of included services
  popular?: boolean;       // Highlight as popular
  badge?: string;          // Badge text (e.g., "Best Value")
}
```

## Default Packages

The component includes 3 pre-configured Vietnamese packages:

### 1. Gói Basic (50,000,000 VNĐ)
- Basic decoration
- Simple backdrop
- Basic sound & lighting
- MC services
- Setup & cleanup
- Basic planning

### 2. Gói Premium (100,000,000 VNĐ) - Popular
- Premium decoration
- Professional photobooth
- Modern sound & lighting
- MC & live band
- Makeup services
- Photography (300+ photos)
- Full HD videography
- Professional wedding planner
- Decorated wedding car

### 3. Gói Luxury (200,000,000 VNĐ)
- Luxury decoration
- Premium photobooth
- 5-star sound & lighting
- Professional MC & live band
- Family makeup services
- Photography (500+ photos)
- 4K videography + drone
- VIP wedding planner
- Luxury wedding car
- Custom invitations
- Guest gifts
- VIP accommodation

## Styling

### Grid Layout
- **Mobile**: 1 column
- **Tablet (md)**: 2 columns
- **Desktop (lg)**: 3 columns

### Popular Package Styling
- Larger scale (105%)
- Rose-400 border
- Enhanced shadow
- Gradient badge
- Gradient CTA button

### Regular Package Styling
- Rose-100 border
- Subtle shadow
- Simple badge
- Outline CTA button

### Hover Effects
- Card lifts up (-translate-y-2)
- Shadow increases (shadow-2xl)
- Border color intensifies
- Button scales up

## Radix UI Card Components

The component uses these Radix UI Card primitives:

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
```

## Price Formatting

Prices are automatically formatted using Vietnamese locale:

```typescript
// 50000000 → "50.000.000"
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN').format(price);
};
```

## Animations

### Card Animation
- Fade-up on mount with staggered delays
- Hover: lift and shadow increase
- Price: fade animation on mount

### Button Animation
- Hover: scale up + shadow
- Focus: 4px rose ring with offset

## Accessibility

- ✅ Semantic HTML with Radix UI primitives
- ✅ Keyboard navigation support
- ✅ Focus states on interactive elements
- ✅ ARIA attributes from Radix UI
- ✅ Sufficient color contrast

## Additional Features

### Trust Indicators
- Quality commitment
- 24/7 support
- Flexible payment

### CTA Section
- Contact consultation button
- Schedule appointment button
- Gradient background card

## Customization Examples

### Change Grid Columns

```tsx
// In WeddingPackages.tsx, modify the grid classes:
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
```

### Custom Colors

```tsx
// Change rose theme to blue:
className="border-blue-400 bg-gradient-to-r from-blue-500 to-indigo-600"
```

### Add More Features

```tsx
const myPackage: Package = {
  // ... other props
  features: [
    'Feature 1',
    'Feature 2',
    'Feature 3',
    // Add as many as needed
  ],
};
```

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## Demo

See `WeddingPackagesDemo.tsx` for multiple usage examples with different configurations.
