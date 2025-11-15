'use client';

import WeddingPackages from './WeddingPackages';
import { Package } from '../types';

/**
 * WeddingPackagesDemo - Example usage of the WeddingPackages component
 */
export default function WeddingPackagesDemo() {
  const handleViewDetails = (packageId: string) => {
    console.log('View details for package:', packageId);
    // Navigate to package details page or open modal
    // router.push(`/packages/${packageId}`);
  };

  // Custom packages example
  const customPackages: Package[] = [
    {
      id: 'starter',
      name: 'Starter Package',
      price: 30000000,
      currency: 'VNĐ',
      description: 'Perfect for intimate weddings',
      features: [
        'Basic venue decoration',
        'Simple backdrop',
        'Sound system',
        'MC services',
        'Setup and cleanup',
      ],
      badge: 'Budget Friendly',
    },
    {
      id: 'deluxe',
      name: 'Deluxe Package',
      price: 150000000,
      currency: 'VNĐ',
      description: 'Complete wedding experience',
      popular: true,
      features: [
        'Premium venue decoration',
        'Professional photobooth',
        'Advanced sound & lighting',
        'MC & live band',
        'Makeup for bride & groom',
        'Photography (400+ photos)',
        'Full HD videography',
        'Wedding planner',
        'Decorated wedding car',
        'Custom invitations',
      ],
      badge: 'Best Value',
    },
    {
      id: 'royal',
      name: 'Royal Package',
      price: 300000000,
      currency: 'VNĐ',
      description: 'The ultimate luxury experience',
      features: [
        'Luxury venue decoration',
        'Premium photobooth & backdrop',
        '5-star sound & lighting system',
        'Celebrity MC & orchestra',
        'Makeup for entire family',
        'Photography (1000+ photos)',
        '4K videography + drone',
        'VIP wedding planner',
        'Luxury wedding car fleet',
        'Custom designed invitations',
        'Guest gifts & favors',
        'VIP guest accommodation',
        'Honeymoon package included',
      ],
      badge: 'Ultimate Luxury',
    },
  ];

  return (
    <div className="space-y-20">
      {/* Example 1: Default Packages */}
      <WeddingPackages onViewDetails={handleViewDetails} />

      {/* Example 2: Custom Packages */}
      <WeddingPackages
        title="Wedding Packages"
        subtitle="Choose the perfect package for your special day"
        packages={customPackages}
        onViewDetails={handleViewDetails}
      />

      {/* Example 3: Minimal Packages (2 options) */}
      <WeddingPackages
        title="Simple Choices"
        subtitle="Two great options to get started"
        packages={customPackages.slice(0, 2)}
        onViewDetails={handleViewDetails}
      />
    </div>
  );
}
