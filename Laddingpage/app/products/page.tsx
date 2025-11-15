import { ProductsList } from '@/src/features/products';

export const metadata = {
  title: 'Sản Phẩm Cưới - Wedding Paradise',
  description: 'Khám phá các sản phẩm cưới chất lượng cao: váy cưới, nhẫn cưới, thiệp cưới, album ảnh và nhiều hơn nữa',
};

export default function ProductsPage() {
  return (
    <main className="min-h-screen">
      <ProductsList />
    </main>
  );
}
