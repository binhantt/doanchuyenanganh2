import ProductDetailPage from '@/src/features/products/pages/ProductDetailPage';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ProductDetailPage productId={id} />;
}

// Generate static params for all products
export async function generateStaticParams() {
  return [
    { id: 'wedding-dress' },
    { id: 'wedding-ring' },
    { id: 'wedding-invitation' },
    { id: 'wedding-album' },
    { id: 'wedding-menu-basic' },
    { id: 'wedding-menu-premium' },
    { id: 'wedding-cake' },
    { id: 'wedding-drinks' },
  ];
}

// Metadata
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const productNames: Record<string, string> = {
    'wedding-dress': 'Váy Cưới Cao Cấp',
    'wedding-ring': 'Nhẫn Cưới Vàng 18K',
    'wedding-invitation': 'Thiệp Cưới Cao Cấp',
    'wedding-album': 'Album Ảnh Cưới',
    'wedding-menu-basic': 'Thực Đơn Tiệc Cưới Cơ Bản',
    'wedding-menu-premium': 'Thực Đơn Tiệc Cưới Cao Cấp',
    'wedding-cake': 'Bánh Cưới 3 Tầng',
    'wedding-drinks': 'Gói Đồ Uống Tiệc Cưới',
  };

  return {
    title: `${productNames[id] || 'Chi tiết sản phẩm'} - Wedding Paradise`,
    description: `Xem chi tiết ${productNames[id]} với thông tin đầy đủ và giá cả hợp lý`,
  };
}
