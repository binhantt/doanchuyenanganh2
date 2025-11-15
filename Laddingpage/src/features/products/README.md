# 🛍️ Products Feature - Wedding Paradise

Feature module cho quản lý và hiển thị các sản phẩm cưới trong ứng dụng Next.js.

## 📋 Tổng Quan

Module Products cung cấp đầy đủ chức năng hiển thị danh sách sản phẩm cưới và trang chi tiết sản phẩm với thiết kế đẹp mắt, responsive và tối ưu SEO.

## 📁 Cấu Trúc

```
products/
├── components/              # React components
│   ├── ProductCard.tsx     # Card hiển thị sản phẩm
│   ├── ProductsList.tsx    # Danh sách sản phẩm
│   └── index.ts            # Export components
│
├── pages/                   # Page components
│   └── ProductDetailPage.tsx  # Trang chi tiết sản phẩm
│
├── data/                    # Data & mock data
│   └── productDetails.ts   # Chi tiết sản phẩm
│
├── types.ts                 # TypeScript types
├── data.ts                  # Dữ liệu sản phẩm cơ bản
├── index.ts                 # Main export
└── README.md               # Documentation
```

## 🎯 Tính Năng

### 1. ProductCard Component
Card component hiển thị thông tin sản phẩm:
- ✅ Hình ảnh sản phẩm
- ✅ Badges: Popular, New, Premium
- ✅ Tên và mô tả
- ✅ Category badge
- ✅ Giá sản phẩm
- ✅ 4 đặc điểm nổi bật
- ✅ Button "Xem Chi Tiết"
- ✅ Hover effects

### 2. ProductsList Component
Component hiển thị danh sách sản phẩm:
- ✅ Section header với title và subtitle
- ✅ Grid layout 4 columns responsive
- ✅ Staggered animations
- ✅ Click vào card để xem chi tiết

### 3. ProductDetailPage
Trang chi tiết sản phẩm đầy đủ:
- ✅ Gallery ảnh với thumbnails
- ✅ Thông tin chi tiết
- ✅ Specifications (chất liệu, size, màu sắc, bảo hành)
- ✅ Detailed features theo categories
- ✅ Includes & Excludes
- ✅ CTA buttons
- ✅ Back navigation

## 🛍️ Sản Phẩm

### 1. Váy Cưới Cao Cấp
- **ID**: `wedding-dress`
- **Giá**: 15.000.000 VNĐ
- **Category**: Trang phục
- **Badge**: Bán chạy
- **Features**: Thiết kế độc quyền, vải cao cấp, đính kết thủ công

### 2. Nhẫn Cưới Vàng 18K
- **ID**: `wedding-ring`
- **Giá**: 8.000.000 VNĐ
- **Category**: Trang sức
- **Badge**: Cao cấp
- **Features**: Vàng 18K, kim cương thiên nhiên, bảo hành trọn đời

### 3. Thiệp Cưới Cao Cấp
- **ID**: `wedding-invitation`
- **Giá**: 50.000 VNĐ/bộ
- **Category**: Thiệp cưới
- **Features**: Thiết kế theo yêu cầu, giấy mỹ thuật, in offset

### 4. Album Ảnh Cưới
- **ID**: `wedding-album`
- **Giá**: 3.000.000 VNĐ
- **Category**: Album ảnh
- **Badge**: Mới
- **Features**: Bìa da cao cấp, 50 trang ảnh, layout chuyên nghiệp

## 📊 Types

```typescript
interface Product {
  id: string;
  name: string;
  price: number;
  currency?: string;
  description?: string;
  category: string;
  features: string[];
  popular?: boolean;
  badge?: string;
  image?: string;
}

interface ProductDetail extends Product {
  fullDescription: string;
  detailedFeatures: DetailedFeatureCategory[];
  includes: string[];
  excludes: string[];
  specifications: {
    material?: string;
    size?: string;
    color?: string;
    quantity?: string;
    warranty?: string;
  };
  images?: string[];
}
```

## 🚀 Usage

### Import Components
```tsx
import { ProductCard, ProductsList } from '@/src/features/products';
```

### ProductsList Component
```tsx
<ProductsList
  title="Sản Phẩm Cưới"
  subtitle="Khám phá các sản phẩm chất lượng cao"
  products={products}
/>
```

### ProductCard Component
```tsx
<ProductCard
  product={product}
  onViewDetails={(id) => router.push(`/products/${id}`)}
/>
```

## 🎨 Styling

### Theme Colors
- Primary: `from-rose-500 to-pink-600`
- Background: `from-rose-50/20`
- Border: `border-rose-100`, `border-rose-300`

### Layout
- Grid: 4 columns on desktop, 2 on tablet, 1 on mobile
- Card aspect ratio: Square for images
- Spacing: `gap-8`

## 🔗 Routes

### Danh sách sản phẩm
```
/products
```

### Chi tiết sản phẩm
```
/products/wedding-dress
/products/wedding-ring
/products/wedding-invitation
/products/wedding-album
```

## 📱 Responsive Design

- **Mobile** (< 768px): 1 column
- **Tablet** (768px - 1024px): 2 columns
- **Desktop** (> 1024px): 4 columns

## ✨ Animations

- Fade up on scroll
- Staggered card animations (150ms delay)
- Hover scale and shadow effects
- Image zoom on hover
- Smooth transitions

## 🎯 SEO

- Dynamic meta tags với `generateMetadata()`
- Semantic HTML structure
- Image alt texts
- Static generation với `generateStaticParams()`

## 🔄 Integration

### Thêm vào Landing Page
```tsx
// app/page.tsx
import { ProductsList } from '@/src/features/products';

export default function HomePage() {
  return (
    <main>
      {/* Other sections */}
      <ProductsList />
    </main>
  );
}
```

### Thêm vào Navbar
```tsx
<Link href="/products">Sản Phẩm</Link>
```

## 📝 Customization

### Thêm sản phẩm mới
1. Thêm vào `data.ts`:
```typescript
{
  id: 'new-product',
  name: 'Sản phẩm mới',
  price: 1000000,
  category: 'Category',
  features: ['Feature 1', 'Feature 2'],
  image: 'url',
}
```

2. Thêm chi tiết vào `data/productDetails.ts`

3. Thêm vào `generateStaticParams()` trong `app/products/[id]/page.tsx`

### Thay đổi layout
Sửa grid columns trong `ProductsList.tsx`:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
```

## 🎁 Features Nổi Bật

- ✅ Responsive design hoàn chỉnh
- ✅ Image gallery với thumbnails
- ✅ Detailed specifications
- ✅ Includes/Excludes lists
- ✅ Category badges
- ✅ Popular/New badges
- ✅ Smooth animations
- ✅ SEO optimized
- ✅ TypeScript support
- ✅ Easy to customize

## 📞 Support

Nếu có câu hỏi hoặc cần hỗ trợ, vui lòng liên hệ team development.

---

**Wedding Paradise Products** - Sản phẩm chất lượng cho ngày trọng đại! 💍✨
