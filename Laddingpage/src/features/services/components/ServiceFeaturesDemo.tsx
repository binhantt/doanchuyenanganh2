'use client';

import ServiceFeatures from './ServiceFeatures';
import { 
  Heart, 
  Cake, 
  Gift, 
  Users, 
  Car, 
  Flower 
} from 'lucide-react';

/**
 * ServiceFeaturesDemo - Example usage of the ServiceFeatures component
 * 
 * This demo showcases different configurations of the ServiceFeatures component
 */
export default function ServiceFeaturesDemo() {
  return (
    <div className="space-y-20">
      {/* Example 1: Default Features */}
      <ServiceFeatures />

      {/* Example 2: Custom Features (English) */}
      <ServiceFeatures
        title="Our Premium Services"
        subtitle="Everything you need to make your wedding day perfect and memorable"
        features={[
          {
            icon: Heart,
            title: 'Wedding Decoration',
            description: 'Elegant and romantic decoration designs tailored to your unique style and theme preferences.',
          },
          {
            icon: Cake,
            title: 'Catering Services',
            description: 'Exquisite culinary experiences with customized menus to delight your guests.',
          },
          {
            icon: Gift,
            title: 'Gift Registry',
            description: 'Convenient gift registry management and coordination for your special day.',
          },
          {
            icon: Users,
            title: 'Guest Management',
            description: 'Comprehensive guest list management, invitations, and RSVP tracking.',
          },
          {
            icon: Car,
            title: 'Transportation',
            description: 'Luxury transportation services for the wedding party and guests.',
          },
          {
            icon: Flower,
            title: 'Floral Arrangements',
            description: 'Beautiful custom floral designs for bouquets, centerpieces, and venue decoration.',
          },
        ]}
      />

      {/* Example 3: Minimal Features (4 items) */}
      <ServiceFeatures
        title="Core Services"
        subtitle="Essential services for your perfect wedding day"
        features={[
          {
            icon: Heart,
            title: 'Trang trí',
            description: 'Thiết kế không gian tiệc cưới đẹp mắt và sang trọng.',
          },
          {
            icon: Cake,
            title: 'Ẩm thực',
            description: 'Thực đơn đa dạng với món ăn ngon và chất lượng.',
          },
          {
            icon: Users,
            title: 'Tổ chức',
            description: 'Quản lý và điều phối sự kiện chuyên nghiệp.',
          },
          {
            icon: Gift,
            title: 'Quà tặng',
            description: 'Tư vấn và chuẩn bị quà tặng cho khách mời.',
          },
        ]}
      />
    </div>
  );
}
