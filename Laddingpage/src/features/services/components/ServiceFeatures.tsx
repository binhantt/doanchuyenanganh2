'use client';

import { 
  Sparkles, 
  Palette, 
  Camera, 
  Image as ImageIcon, 
  ClipboardList, 
  Music 
} from 'lucide-react';
import FeatureItem, { FeatureItemProps } from './FeatureItem';

export interface ServiceFeaturesProps {
  title?: string;
  subtitle?: string;
  features?: Omit<FeatureItemProps, 'delay'>[];
}

const defaultFeatures: Omit<FeatureItemProps, 'delay'>[] = [
  {
    icon: Sparkles,
    title: 'Trang trí tiệc cưới',
    description: 'Thiết kế và trang trí không gian tiệc cưới sang trọng, lãng mạn với phong cách độc đáo, phù hợp với chủ đề và sở thích của bạn.',
    slug: 'trang-tri-tiec-cuoi',
  },
  {
    icon: Palette,
    title: 'Trang điểm – Make up',
    description: 'Dịch vụ trang điểm chuyên nghiệp cho cô dâu, chú rể và gia đình, tôn lên vẻ đẹp tự nhiên và rạng rỡ nhất trong ngày trọng đại.',
    slug: 'trang-diem-co-dau',
  },
  {
    icon: Camera,
    title: 'Quay phim – Chụp ảnh',
    description: 'Ghi lại mọi khoảnh khắc đáng nhớ với đội ngũ nhiếp ảnh gia và quay phim chuyên nghiệp, mang đến những thước phim và bức ảnh nghệ thuật.',
    slug: 'chup-anh-quay-phim',
  },
  {
    icon: ImageIcon,
    title: 'Backdrop – Photobooth',
    description: 'Thiết kế backdrop độc đáo và photobooth sáng tạo, tạo không gian chụp ảnh vui nhộn và đầy màu sắc cho khách mời.',
  },
  {
    icon: ClipboardList,
    title: 'Wedding Planner',
    description: 'Tư vấn và lên kế hoạch chi tiết cho toàn bộ sự kiện, đảm bảo mọi khâu diễn ra suôn sẻ và hoàn hảo theo đúng mong muốn.',
  },
  {
    icon: Music,
    title: 'Âm thanh – Ánh sáng',
    description: 'Hệ thống âm thanh chất lượng cao và ánh sáng nghệ thuật, tạo nên không khí lãng mạn và ấn tượng cho buổi tiệc.',
  },
];

export default function ServiceFeatures({
  title = 'Dịch Vụ Của Chúng Tôi',
  subtitle = 'Mang đến trải nghiệm hoàn hảo cho ngày trọng đại của bạn với các dịch vụ chuyên nghiệp và tận tâm',
  features = defaultFeatures,
}: ServiceFeaturesProps) {
  return (
    <section id="services" className="py-5 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-rose-50/30 to-white">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-100 rounded-full">
            <Sparkles className="w-4 h-4 text-rose-600" />
            <span className="text-sm font-medium text-rose-600">Dịch vụ chuyên nghiệp</span>
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
            {title}
          </h2>

          {/* Subtitle */}
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-2 pt-4">
            <div className="w-12 h-1 bg-gradient-to-r from-transparent to-rose-300 rounded-full" />
            <div className="w-2 h-2 bg-rose-400 rounded-full" />
            <div className="w-8 h-1 bg-rose-400 rounded-full" />
            <div className="w-2 h-2 bg-rose-400 rounded-full" />
            <div className="w-12 h-1 bg-gradient-to-l from-transparent to-rose-300 rounded-full" />
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureItem
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              slug={feature.slug}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
