import PackageDetailPage from '@/src/features/packages/pages/PackageDetailPage';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PackageDetailPage packageId={id} />;
}

// Generate static params for all packages
export async function generateStaticParams() {
  return [
    { id: 'basic' },
    { id: 'premium' },
    { id: 'luxury' },
  ];
}

// Metadata
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const packageNames: Record<string, string> = {
    basic: 'Gói Basic',
    premium: 'Gói Premium',
    luxury: 'Gói Luxury',
  };

  return {
    title: `${packageNames[id] || 'Chi tiết gói'} - Wedding Paradise`,
    description: `Xem chi tiết ${packageNames[id]} với đầy đủ dịch vụ và bảng giá`,
  };
}
