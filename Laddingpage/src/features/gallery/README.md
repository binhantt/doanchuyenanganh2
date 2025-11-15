# GallerySection Component

A beautiful, responsive gallery section with grid and carousel views, featuring hover zoom effects, pink highlight borders, and smooth animations.

## Features

✨ **Dual view modes** - Grid and Carousel layouts  
🎨 **Pink highlight borders** on hover  
🔍 **Hover zoom effect** with smooth transitions  
📱 **Fully responsive** design  
🎭 **Smooth animations** with staggered delays  
🖼️ **Lazy loading** with Next.js Image optimization  
🎯 **Auto-play carousel** with pause on hover  
♿ **Accessible** with keyboard navigation  
🎨 **Loading skeletons** for better UX  

## Components

### GallerySection (Main Component)
The main container with view mode toggle and section header.

### GalleryGrid
Grid layout component displaying images in a responsive grid.

### GalleryCarousel
Carousel/slider component with navigation and auto-play.

### GalleryItem
Individual gallery item with hover effects and zoom.

## Usage

### Basic Usage

```tsx
import { GallerySection } from '@/features/gallery';

export default function GalleryPage() {
  return <GallerySection />;
}
```

### With Custom Images

```tsx
import { GallerySection, GalleryImage } from '@/features/gallery';

const myImages: GalleryImage[] = [
  {
    id: '1',
    src: '/images/wedding-1.jpg',
    alt: 'Wedding ceremony',
    title: 'Beautiful Ceremony',
    category: 'Ceremony',
  },
  // ... more images
];

export default function GalleryPage() {
  return (
    <GallerySection
      title="Our Gallery"
      subtitle="Beautiful moments captured"
      images={myImages}
    />
  );
}
```

### With Click Handler

```tsx
'use client';

import { useState } from 'react';
import { GallerySection, GalleryImage } from '@/features/gallery';

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
    // Open lightbox, modal, or navigate
  };

  return (
    <>
      <GallerySection onImageClick={handleImageClick} />
      
      {/* Your lightbox/modal component */}
      {selectedImage && (
        <Lightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </>
  );
}
```

### Carousel Mode Only

```tsx
<GallerySection viewMode="carousel" />
```

### Grid Mode Only

```tsx
<GallerySection viewMode="grid" />
```

## Props

### GallerySectionProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `"Thư Viện Ảnh"` | Section title |
| `subtitle` | `string` | Default Vietnamese text | Section subtitle |
| `images` | `GalleryImage[]` | Default 9 images | Array of gallery images |
| `viewMode` | `'grid' \| 'carousel'` | `'grid'` | Initial view mode |
| `onImageClick` | `(image: GalleryImage) => void` | Opens in new tab | Click handler |

### GalleryImage Type

```typescript
interface GalleryImage {
  id: string;              // Unique identifier
  src: string;             // Image URL
  alt: string;             // Alt text for accessibility
  title?: string;          // Optional title shown on hover
  category?: string;       // Optional category badge
  width?: number;          // Optional width
  height?: number;         // Optional height
}
```

### GalleryItemProps

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `image` | `GalleryImage` | ✅ | Image data object |
| `onClick` | `(image: GalleryImage) => void` | ❌ | Click handler |
| `priority` | `boolean` | ❌ | Priority loading for LCP |

## Features in Detail

### Grid Layout
- **Mobile**: 1 column
- **Tablet (sm)**: 2 columns
- **Desktop (lg)**: 3 columns
- Responsive gap spacing
- Staggered fade-up animations

### Carousel Layout
- **Mobile**: 1 image per view
- **Tablet**: 2 images per view
- **Desktop**: 3 images per view
- Auto-play with 4-second intervals
- Pause on hover
- Navigation buttons
- Dot indicators
- Progress bar
- Smooth transitions

### Hover Effects
- **Image**: Scales to 110% (zoom effect)
- **Border**: Pink highlight (4px border-pink-400)
- **Overlay**: Gradient from black/70 to transparent
- **Content**: Eye icon, title, and category badge
- **Transform**: Smooth translate-y animations
- **Decorative**: Pink gradient blur in corner

### Loading States
- Skeleton with gradient animation
- Smooth fade-in when loaded
- Priority loading for first 3 images

## Styling

### Color Scheme
- Primary: Pink (pink-400, pink-500, pink-600)
- Secondary: Rose (rose-500, rose-600)
- Overlay: Black with opacity
- Background: White with pink-50 gradient

### Animations
```css
/* Fade-up animation (from globals.css) */
.animate-fade-up {
  animation: fade-up 0.8s ease-out forwards;
}

/* Staggered delays */
style={{ animationDelay: `${index * 100}ms` }}
```

### Hover Zoom
```css
/* Image scales on hover */
group-hover:scale-110
transition-all duration-700
```

### Pink Border Highlight
```css
/* Border appears on hover */
border-4 border-transparent
group-hover:border-pink-400
transition-all duration-300
```

## Accessibility

- ✅ Semantic HTML structure
- ✅ Alt text for all images
- ✅ ARIA labels on buttons
- ✅ Keyboard navigation support
- ✅ Focus states on interactive elements
- ✅ Screen reader friendly
- ✅ Proper heading hierarchy

## Performance

- Next.js Image component with optimization
- Lazy loading for off-screen images
- Priority loading for above-the-fold images
- Responsive image sizes
- Efficient re-renders with React keys

## Carousel Features

### Auto-Play
- Automatically advances every 4 seconds
- Pauses on mouse hover
- Resumes on mouse leave

### Navigation
- Previous/Next buttons
- Dot indicators for direct access
- Keyboard arrow keys support
- Touch/swipe support (native scroll)

### Responsive
- Adjusts items per view based on screen size
- Smooth transitions between slides
- Progress bar shows current position

## Customization Examples

### Change Grid Columns

```tsx
// In GalleryGrid.tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
```

### Change Hover Color

```tsx
// In GalleryItem.tsx
// Change pink to blue
className="group-hover:border-blue-400"
className="bg-blue-500/80"
```

### Adjust Zoom Level

```tsx
// In GalleryItem.tsx
// Change from 110% to 120%
className="group-hover:scale-125"
```

### Custom Auto-Play Interval

```tsx
// In GalleryCarousel.tsx
const interval = setInterval(() => {
  goToNext();
}, 5000); // Change from 4000 to 5000ms
```

## Integration with Lightbox

```tsx
'use client';

import { useState } from 'react';
import { GallerySection, GalleryImage } from '@/features/gallery';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

export default function GalleryWithLightbox() {
  const [index, setIndex] = useState(-1);
  const [images, setImages] = useState<GalleryImage[]>([]);

  const handleImageClick = (image: GalleryImage) => {
    const imageIndex = images.findIndex((img) => img.id === image.id);
    setIndex(imageIndex);
  };

  return (
    <>
      <GallerySection
        images={images}
        onImageClick={handleImageClick}
      />
      
      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={images.map((img) => ({ src: img.src, alt: img.alt }))}
      />
    </>
  );
}
```

## Default Images

The component includes 9 placeholder images from Unsplash:
1. Wedding couple
2. Venue decoration
3. Reception
4. Table setting
5. Flowers
6. Wedding cake
7. Outdoor venue
8. Wedding rings
9. Bride and groom

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers
- ✅ Touch devices

## Common Use Cases

### 1. Portfolio Gallery
```tsx
<GallerySection
  title="Our Portfolio"
  images={portfolioImages}
  viewMode="grid"
/>
```

### 2. Wedding Album
```tsx
<GallerySection
  title="Wedding Album"
  images={weddingPhotos}
  viewMode="carousel"
/>
```

### 3. Category Filter
```tsx
const [category, setCategory] = useState('all');
const filteredImages = images.filter(
  (img) => category === 'all' || img.category === category
);

<GallerySection images={filteredImages} />
```

## Demo

See `GallerySectionDemo.tsx` for multiple usage examples with different configurations.
