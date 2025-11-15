# Integration Guide

## Adding WeddingPackages to Your Page

### Option 1: Add to Home Page

```tsx
// app/page.tsx
import { WeddingPackages } from '@/features/packages';
import HeroSection from '@/features/landing/hero';
import { ServiceFeatures } from '@/features/services/components';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ServiceFeatures />
      <WeddingPackages />
    </main>
  );
}
```

### Option 2: Create Dedicated Pricing Page

```tsx
// app/pricing/page.tsx
'use client';

import { WeddingPackages } from '@/features/packages';
import { useRouter } from 'next/navigation';

export default function PricingPage() {
  const router = useRouter();

  const handleViewDetails = (packageId: string) => {
    router.push(`/packages/${packageId}`);
  };

  return (
    <main className="min-h-screen">
      <WeddingPackages onViewDetails={handleViewDetails} />
    </main>
  );
}
```

### Option 3: With Package Details Page

```tsx
// app/packages/[id]/page.tsx
import { defaultPackages } from '@/features/packages';
import { notFound } from 'next/navigation';

export default function PackageDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const pkg = defaultPackages.find((p) => p.id === params.id);

  if (!pkg) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold mb-4">{pkg.name}</h1>
      <p className="text-2xl text-rose-600 mb-8">
        {new Intl.NumberFormat('vi-VN').format(pkg.price)} {pkg.currency}
      </p>
      <div className="prose max-w-none">
        <h2>Dịch vụ bao gồm:</h2>
        <ul>
          {pkg.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}

// Generate static params for all packages
export function generateStaticParams() {
  return defaultPackages.map((pkg) => ({
    id: pkg.id,
  }));
}
```

## With Contact Form Integration

```tsx
'use client';

import { useState } from 'react';
import { WeddingPackages } from '@/features/packages';

export default function PricingWithContact() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const handleViewDetails = (packageId: string) => {
    setSelectedPackage(packageId);
    
    // Scroll to contact form
    const contactForm = document.getElementById('contact-form');
    contactForm?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main>
      <WeddingPackages onViewDetails={handleViewDetails} />
      
      <section id="contact-form" className="py-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold mb-8">Liên hệ tư vấn</h2>
          {selectedPackage && (
            <p className="mb-4 text-rose-600">
              Bạn đã chọn gói: {selectedPackage}
            </p>
          )}
          {/* Your contact form here */}
        </div>
      </section>
    </main>
  );
}
```

## With Modal/Dialog

```tsx
'use client';

import { useState } from 'react';
import { WeddingPackages, defaultPackages } from '@/features/packages';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function PricingWithModal() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  const selectedPackage = defaultPackages.find((p) => p.id === selectedId);

  return (
    <>
      <WeddingPackages onViewDetails={setSelectedId} />
      
      <Dialog open={!!selectedId} onOpenChange={() => setSelectedId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedPackage?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-2xl font-bold text-rose-600">
              {selectedPackage && 
                new Intl.NumberFormat('vi-VN').format(selectedPackage.price)
              } VNĐ
            </p>
            <div>
              <h3 className="font-semibold mb-2">Dịch vụ bao gồm:</h3>
              <ul className="space-y-2">
                {selectedPackage?.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-rose-500">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-lg font-semibold">
              Đặt lịch tư vấn
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
```

## With Analytics Tracking

```tsx
'use client';

import { WeddingPackages } from '@/features/packages';

export default function PricingWithAnalytics() {
  const handleViewDetails = (packageId: string) => {
    // Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'view_package', {
        package_id: packageId,
        event_category: 'engagement',
      });
    }

    // Facebook Pixel
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'ViewContent', {
        content_name: packageId,
        content_category: 'wedding_package',
      });
    }

    // Navigate or show details
    console.log('Package viewed:', packageId);
  };

  return <WeddingPackages onViewDetails={handleViewDetails} />;
}
```

## Custom Package Data from API

```tsx
'use client';

import { useEffect, useState } from 'react';
import { WeddingPackages } from '@/features/packages';
import type { Package } from '@/features/packages';

export default function DynamicPricing() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/packages')
      .then((res) => res.json())
      .then((data) => {
        setPackages(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading packages:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-20">Loading packages...</div>;
  }

  return <WeddingPackages packages={packages} />;
}
```

## Styling Customization

### Custom Theme Colors

```tsx
// Create a custom version with different colors
// src/features/packages/components/WeddingPackagesBlue.tsx

// Change all rose/pink colors to blue/indigo:
// - rose-500 → blue-500
// - pink-600 → indigo-600
// - rose-100 → blue-100
// etc.
```

### Custom Layout

```tsx
// 4-column layout for desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {packages.map((pkg, index) => (
    <PackageCard key={pkg.id} package={pkg} />
  ))}
</div>
```

## SEO Optimization

```tsx
// app/pricing/page.tsx
import { Metadata } from 'next';
import { WeddingPackages } from '@/features/packages';

export const metadata: Metadata = {
  title: 'Bảng Giá Dịch Vụ Tiệc Cưới | Wedding Services',
  description: 'Xem bảng giá các gói dịch vụ tổ chức tiệc cưới từ Basic đến Luxury. Cam kết chất lượng, giá cả hợp lý.',
  keywords: 'tiệc cưới, bảng giá, dịch vụ cưới, tổ chức tiệc',
};

export default function PricingPage() {
  return <WeddingPackages />;
}
```

## Accessibility Enhancements

```tsx
// Add skip link for keyboard users
<a
  href="#packages"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-rose-600 text-white px-4 py-2 rounded"
>
  Skip to packages
</a>

<WeddingPackages />
```

## Performance Optimization

```tsx
// Use dynamic import for code splitting
import dynamic from 'next/dynamic';

const WeddingPackages = dynamic(
  () => import('@/features/packages').then((mod) => mod.WeddingPackages),
  {
    loading: () => <div className="text-center py-20">Loading...</div>,
  }
);

export default function PricingPage() {
  return <WeddingPackages />;
}
```

## Testing

```tsx
// __tests__/packages.test.tsx
import { render, screen } from '@testing-library/react';
import { WeddingPackages } from '@/features/packages';

describe('WeddingPackages', () => {
  it('renders all packages', () => {
    render(<WeddingPackages />);
    expect(screen.getByText('Gói Basic')).toBeInTheDocument();
    expect(screen.getByText('Gói Premium')).toBeInTheDocument();
    expect(screen.getByText('Gói Luxury')).toBeInTheDocument();
  });

  it('calls onViewDetails when button clicked', () => {
    const handleClick = jest.fn();
    render(<WeddingPackages onViewDetails={handleClick} />);
    
    const buttons = screen.getAllByText('Xem Chi Tiết');
    buttons[0].click();
    
    expect(handleClick).toHaveBeenCalledWith('basic');
  });
});
```

## Common Issues

### Issue: Cards not responsive
**Solution**: Ensure container has proper padding and max-width

### Issue: Animations not working
**Solution**: Check that `globals.css` includes animation keyframes

### Issue: TypeScript errors
**Solution**: Import types correctly:
```tsx
import type { Package, WeddingPackagesProps } from '@/features/packages';
```

## Next Steps

1. Customize package data in `data.ts`
2. Adjust colors to match your brand
3. Add your own click handlers
4. Integrate with your backend API
5. Add analytics tracking
6. Test on different devices
