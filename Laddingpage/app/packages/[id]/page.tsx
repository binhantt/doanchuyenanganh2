import PackageDetailPage from '@/src/features/packages/pages/PackageDetailPage';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PackageDetailPage packageId={id} />;
}

// Metadata
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  return {
    title: `Chi tiết gói dịch vụ - Wedding Paradise`,
    description: `Xem chi tiết gói dịch vụ tiệc cưới với thông tin đầy đủ và giá cả hợp lý`,
  };
}


