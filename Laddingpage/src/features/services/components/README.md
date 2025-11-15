# ServiceFeatures Component

A beautiful, responsive service features section for wedding service websites with elegant rose theme, smooth animations, and customizable content.

## Features

✨ **Elegant grid layout** (2-3 columns responsive)  
🎨 **Soft rose theme** with gradient backgrounds  
📱 **Fully responsive** design (mobile-first)  
🎭 **Smooth animations** with staggered delays  
♿ **Accessible** with semantic HTML  
🔧 **Highly customizable** with props  
🎯 **Hover effects** on cards with gradient overlays  

## Components

### ServiceFeatures (Main Component)
The main container component that displays a grid of service features.

### FeatureItem (Child Component)
Individual feature card with icon, title, and description.

## Usage

### Basic Usage

```tsx
import { ServiceFeatures } from '@/features/services/components';

export default function ServicesPage() {
  return <ServiceFeatures />;
}
```

### Custom Features

```tsx
import { ServiceFeatures } from '@/features/services/components';
import { Heart, Camera, Music } from 'lucide-react';

export default function ServicesPage() {
  return (
    <ServiceFeatures
      title="Our Services"
      subtitle="Everything you need for your perfect wedding"
      features={[
        {
          icon: Heart,
          title: 'Wedding Decoration',
          description: 'Beautiful and elegant decoration designs.',
        },
        {
          icon: Camera,
          title: 'Photography',
          description: 'Professional photography services.',
        },
        {
          icon: Music,
          title: 'Entertainment',
          description: 'Music and entertainment coordination.',
        },
      ]}
    />
  );
}
```

### Using Individual FeatureItem

```tsx
import { FeatureItem } from '@/features/services/components';
import { Sparkles } from 'lucide-react';

export default function CustomFeature() {
  return (
    <FeatureItem
      icon={Sparkles}
      title="Custom Service"
      description="Description of your custom service"
      delay={0}
    />
  );
}
```

## Props

### ServiceFeaturesProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `"Dịch Vụ Của Chúng Tôi"` | Section title |
| `subtitle` | `string` | Default Vietnamese text | Section subtitle |
| `features` | `FeatureItemProps[]` | Default 6 features | Array of feature items |

### FeatureItemProps

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `icon` | `LucideIcon` | ✅ | Icon component from lucide-react |
| `title` | `string` | ✅ | Feature title |
| `description` | `string` | ✅ | Feature description |
| `delay` | `number` | ❌ | Animation delay in milliseconds |

## Default Features

The component comes with 6 pre-configured Vietnamese wedding services:

1. **Trang trí tiệc cưới** (Wedding Decoration) - Sparkles icon
2. **Trang điểm – Make up** (Makeup) - Palette icon
3. **Quay phim – Chụp ảnh** (Photography & Videography) - Camera icon
4. **Backdrop – Photobooth** (Backdrop & Photobooth) - Image icon
5. **Wedding Planner** - ClipboardList icon
6. **Âm thanh – Ánh sáng** (Sound & Lighting) - Music icon

## Available Icons

The component uses [Lucide React](https://lucide.dev/) icons. Popular choices for wedding services:

```tsx
import {
  Sparkles,      // Decoration
  Palette,       // Makeup
  Camera,        // Photography
  Video,         // Videography
  Image,         // Photobooth
  ClipboardList, // Planning
  Music,         // Entertainment
  Mic,           // Audio
  Lightbulb,     // Lighting
  Heart,         // Love/Romance
  Flower,        // Floral
  Cake,          // Catering
  Gift,          // Gifts
  Users,         // Guest Management
  Car,           // Transportation
  MapPin,        // Venue
} from 'lucide-react';
```

## Styling

### Grid Layout
- **Mobile**: 1 column
- **Tablet (md)**: 2 columns
- **Desktop (lg)**: 3 columns

### Color Scheme
- Primary: Rose (rose-500, rose-600)
- Secondary: Pink (pink-500, pink-600)
- Background: White with rose-50 gradient
- Borders: rose-100 to rose-300 on hover

### Animations
- **Fade-up**: Cards fade in with upward motion
- **Staggered delays**: Each card animates 100ms after the previous
- **Hover effects**: 
  - Shadow increases (shadow-sm to shadow-xl)
  - Border color changes (rose-100 to rose-300)
  - Background gradient appears
  - Icon scales up (110%)
  - Title color changes to rose-600

## Customization Examples

### 4-Column Layout

```tsx
// Add custom CSS class
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
  {/* features */}
</div>
```

### Different Color Theme

```tsx
// Modify the gradient classes in FeatureItem.tsx
className="bg-gradient-to-br from-blue-100 to-indigo-100"
```

### Custom Animation Timing

```tsx
<FeatureItem
  icon={Heart}
  title="Service"
  description="Description"
  delay={500} // 500ms delay
/>
```

## Accessibility

- ✅ Semantic HTML structure
- ✅ Proper heading hierarchy
- ✅ Focus states on interactive elements
- ✅ Sufficient color contrast
- ✅ Keyboard navigation support
- ✅ Screen reader friendly

## Performance

- Optimized animations with CSS transforms
- Lazy rendering with React
- Minimal re-renders
- Lightweight icon library

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## Demo

See `ServiceFeaturesDemo.tsx` for multiple usage examples with different configurations.
