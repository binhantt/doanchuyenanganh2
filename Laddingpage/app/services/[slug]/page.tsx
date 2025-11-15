import ServiceDetailPage from '@/src/features/services/pages/ServiceDetailPage';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ServiceDetailPage slug={slug} />;
}

// Generate static params
export async function generateStaticParams() {
  return [
    { slug: 'trang-tri-tiec-cuoi' },
    { slug: 'chup-anh-quay-phim' },
    { slug: 'trang-diem-co-dau' },
  ];
}

// Metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const serviceNames: Record<string, string> = {
    'trang-tri-tiec-cuoi': 'Trang Trí Tiệc Cưới',
    'chup-anh-quay-phim': 'Chụp Ảnh & Quay Phim',
    'trang-diem-co-dau': 'Trang Điểm Cô Dâu',
  };

  return {
    title: `${serviceNames[slug] || 'Dịch vụ'} - Wedding Paradise`,
    description: `Dịch vụ ${serviceNames[slug]} chuyên nghiệp với chất lượng cao và giá cả hợp lý`,
  };
}
