'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, Check, X, Package, Sparkles, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/src/features/order/store/useCartStore';
import { productsApi } from '@/src/features/api';
import { useState, useEffect } from 'react';

interface ProductDetailPageProps {
  productId: string;
}

interface ProductDetail {
  id: string;
  name: string;
  price: number;
  currency: string;
  description: string;
  fullDescription?: string;
  image?: string;
  images?: string[];
  category?: string;
  popular?: boolean;
  badge?: string;
  specifications?: {
    material?: string;
    size?: string;
    color?: string;
    warranty?: string;
  };
  detailedFeatures: Array<{ category: string; items: string[] }>;
  includes: string[];
  excludes: string[];
}

export default function ProductDetailPage({ productId }: ProductDetailPageProps) {
  const router = useRouter();
  const { addItem } = useCartStore();
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const [productDetail, setProductDetail] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await productsApi.getById(productId);
        
        if (response.success && response.data) {
          const apiProduct = response.data;
          
          // Process images - convert relative paths to absolute URLs
          const processedImages = (apiProduct.images || []).map((img: string) => {
            if (img.startsWith('http')) {
              return img;
            }
            // Convert relative path to absolute URL
            return `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}${img}`;
          });
          
          const transformedProduct: ProductDetail = {
            id: apiProduct.id,
            name: apiProduct.name,
            price: apiProduct.price,
            currency: 'VNĐ',
            description: apiProduct.description,
            fullDescription: apiProduct.description,
            images: processedImages,
            category: apiProduct.category,
            popular: apiProduct.isFeatured,
            badge: apiProduct.isFeatured ? 'Nổi bật' : 'Phổ biến',
            specifications: {
              material: apiProduct.material,
            },
            detailedFeatures: [
              {
                category: 'Thông Tin Sản Phẩm',
                items: apiProduct.features || ['Chất lượng cao', 'Thiết kế đẹp', 'Giá cả hợp lý'],
              },
            ],
            includes: apiProduct.features || [],
            excludes: ['Phí vận chuyển', 'Bảo hiểm hàng hóa'],
          };
          
          setProductDetail(transformedProduct);
        }
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (!productDetail) return;

    addItem({
      id: productDetail.id,
      type: 'product',
      name: productDetail.name,
      price: productDetail.price,
      currency: productDetail.currency,
      image: productDetail.images?.[0] || productDetail.image,
      description: productDetail.description,
    });

    setShowAddedMessage(true);
    setTimeout(() => setShowAddedMessage(false), 3000);
  };

  if (!productDetail) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy sản phẩm</h1>
          <button
            onClick={() => router.back()}
            className="text-rose-600 hover:text-rose-700 font-medium"
          >
            ← Quay lại
          </button>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-pink-50/30 to-white">
      {/* Back Button */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-rose-600 transition-colors font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Quay lại
        </button>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={productDetail.images?.[0] || productDetail.image || 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800'}
                alt={productDetail.name}
                fill
                className="object-cover"
                priority
              />
              {productDetail.popular && (
                <div className="absolute top-6 right-6 bg-gradient-to-r from-rose-500 to-pink-600 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 shadow-lg">
                  <Sparkles className="w-5 h-5" />
                  {productDetail.badge}
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {productDetail.images && productDetail.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {productDetail.images.slice(1, 5).map((img, idx) => (
                  <div key={idx} className="relative aspect-square rounded-xl overflow-hidden shadow-lg cursor-pointer hover:opacity-75 transition-opacity">
                    <Image
                      src={img}
                      alt={`${productDetail.name} ${idx + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div className="space-y-6">
            {/* Category */}
            <div className="inline-flex items-center px-4 py-2 bg-rose-100 text-rose-600 rounded-full font-medium text-sm">
              {productDetail.category}
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
              {productDetail.name}
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-600 leading-relaxed">
              {productDetail.fullDescription}
            </p>

            {/* Specifications */}
            {productDetail.specifications && (
              <div className="grid grid-cols-2 gap-4 py-6 border-y border-rose-100">
                {productDetail.specifications.material && (
                  <div>
                    <div className="text-sm text-gray-600">Chất liệu</div>
                    <div className="font-semibold text-gray-900">{productDetail.specifications.material}</div>
                  </div>
                )}
                {productDetail.specifications.size && (
                  <div>
                    <div className="text-sm text-gray-600">Kích thước</div>
                    <div className="font-semibold text-gray-900">{productDetail.specifications.size}</div>
                  </div>
                )}
                {productDetail.specifications.color && (
                  <div>
                    <div className="text-sm text-gray-600">Màu sắc</div>
                    <div className="font-semibold text-gray-900">{productDetail.specifications.color}</div>
                  </div>
                )}
                {productDetail.specifications.warranty && (
                  <div>
                    <div className="text-sm text-gray-600">Bảo hành</div>
                    <div className="font-semibold text-gray-900">{productDetail.specifications.warranty}</div>
                  </div>
                )}
              </div>
            )}

            {/* Price */}
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-8 border-2 border-rose-200">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-5xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                  {formatPrice(productDetail.price)}
                </span>
                <span className="text-2xl text-gray-600">{productDetail.currency}</span>
              </div>
              <p className="text-gray-600 mb-6">Giá đã bao gồm VAT</p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Thêm Vào Giỏ
                </button>
                <button
                  onClick={() => router.push('/order')}
                  className="flex-1 px-8 py-4 bg-white text-rose-600 font-semibold rounded-full border-2 border-rose-300 hover:bg-rose-50 hover:border-rose-400 transition-all duration-300"
                >
                  Mua Ngay
                </button>
              </div>

              {/* Added Message */}
              {showAddedMessage && (
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-green-700 font-medium">Đã thêm vào giỏ hàng!</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Features */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">
          Thông Tin Chi Tiết
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productDetail.detailedFeatures.map((category, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-8 shadow-lg border-2 border-rose-100 hover:border-rose-300 transition-colors"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
                {category.category}
              </h3>
              <ul className="space-y-3">
                {category.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-3 text-gray-700">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-rose-600" strokeWidth={3} />
                    </div>
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Includes & Excludes */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-b from-white to-pink-50/30">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Includes */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full flex items-center justify-center">
                <Check className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Bao Gồm</h3>
            </div>
            <ul className="space-y-3">
              {productDetail.includes.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-rose-600 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Excludes */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center">
                <X className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Không Bao Gồm</h3>
            </div>
            <ul className="space-y-3">
              {productDetail.excludes.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <X className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-3xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Quan Tâm Đến Sản Phẩm Này?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Liên hệ với chúng tôi ngay để được tư vấn chi tiết và nhận ưu đãi đặc biệt
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/#booking')}
              className="px-8 py-4 bg-white text-rose-600 font-semibold rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Đặt Hàng Ngay
            </button>
            <button
              onClick={() => router.push('/#products')}
              className="px-8 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white hover:bg-white/10 transition-all duration-300"
            >
              Xem Sản Phẩm Khác
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
