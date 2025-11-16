'use client';

import { useRouter } from 'next/navigation';
import { ShoppingBag } from 'lucide-react';
import ProductCard from './ProductCard';
import { ProductsListProps } from '../types';
import { useProducts } from '../../api/hooks';
export default function ProductsList({
  title = 'Sản Phẩm Cưới',
  subtitle = 'Khám phá các sản phẩm cưới chất lượng cao cho ngày trọng đại của bạn',
  products: defaultProductsParam,
  onViewDetails,
}: ProductsListProps) {
  const router = useRouter();
  const { products: apiProducts, loading, error } = useProducts({ autoFetch: true });

  // Use API products if available, otherwise use default
  const products = apiProducts.length > 0 ? apiProducts : (defaultProductsParam  || []);

  const handleViewDetails = (productId: string) => {
    if (onViewDetails) {
      onViewDetails(productId);
    } else {
      router.push(`/products/${productId}`);
    }
  };

  if (error) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-rose-50/20 to-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center py-12">
            <p className="text-red-600 font-semibold">Lỗi: {error}</p>
            <p className="text-gray-600 mt-2">Vui lòng thử lại sau</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="products"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-rose-50/20 to-white"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-100 rounded-full">
            <ShoppingBag className="w-4 h-4 text-rose-600" />
            <span className="text-sm font-medium text-rose-600">
              Sản phẩm cưới
            </span>
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

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600"></div>
          </div>
        )}

        {/* Empty State */}
        {!loading && products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">Không có sản phẩm nào</p>
          </div>
        )}

        {/* Products Grid */}
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={handleViewDetails}
                delay={index * 150}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
