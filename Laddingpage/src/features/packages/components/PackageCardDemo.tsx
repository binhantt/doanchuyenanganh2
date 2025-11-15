'use client';

import PackageCard from './PackageCard';
import { Package } from '../types';

/**
 * PackageCardDemo - Standalone examples of PackageCard component
 */
export default function PackageCardDemo() {
  const basicPackage: Package = {
    id: 'demo-basic',
    name: 'Demo Basic',
    price: 25000000,
    currency: 'VNĐ',
    description: 'A simple package example',
    features: [
      'Feature 1',
      'Feature 2',
      'Feature 3',
    ],
    badge: 'Starter',
  };

  const popularPackage: Package = {
    id: 'demo-popular',
    name: 'Demo Popular',
    price: 75000000,
    currency: 'VNĐ',
    description: 'A popular package example',
    popular: true,
    features: [
      'All Basic features',
      'Feature 4',
      'Feature 5',
      'Feature 6',
      'Feature 7',
    ],
    badge: 'Most Popular',
  };

  const luxuryPackage: Package = {
    id: 'demo-luxury',
    name: 'Demo Luxury',
    price: 150000000,
    currency: 'VNĐ',
    description: 'A luxury package example',
    features: [
      'All Premium features',
      'Feature 8',
      'Feature 9',
      'Feature 10',
      'Feature 11',
      'Feature 12',
      'Feature 13',
    ],
    badge: 'Premium',
  };

  const handleClick = (id: string) => {
    console.log('Clicked package:', id);
    alert(`You clicked on package: ${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-rose-50/20 to-white py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold text-center mb-4">
          PackageCard Component Demo
        </h1>
        <p className="text-center text-gray-600 mb-16">
          Individual card examples with different configurations
        </p>

        {/* Single Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <PackageCard
            package={basicPackage}
            onViewDetails={handleClick}
          />
          <PackageCard
            package={popularPackage}
            onViewDetails={handleClick}
          />
          <PackageCard
            package={luxuryPackage}
            onViewDetails={handleClick}
          />
        </div>

        {/* Two Column Layout */}
        <h2 className="text-3xl font-bold text-center mb-8">
          Two Column Layout
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <PackageCard
            package={basicPackage}
            onViewDetails={handleClick}
          />
          <PackageCard
            package={popularPackage}
            onViewDetails={handleClick}
          />
        </div>
      </div>
    </div>
  );
}
