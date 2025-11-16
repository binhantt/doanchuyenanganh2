# API Integration Guide - Complete Setup

Hướng dẫn hoàn chỉnh để tích hợp API backend vào landing page.

---

## 📁 Cấu Trúc Thư Mục API

```
src/features/api/
├── config.ts                    # API configuration
├── client.ts                    # Axios client instance
├── types.ts                     # TypeScript types
├── packages.ts                  # Packages API
├── services.ts                  # Services API
├── products.ts                  # Products API
├── testimonials.ts              # Testimonials API
├── gallery.ts                   # Gallery API
├── faq.ts                       # FAQ API
├── consultations.ts             # Consultations API
├── index.ts                     # Main export
└── hooks/
    ├── usePackages.ts           # Packages hook
    ├── useServices.ts           # Services hook
    ├── useProducts.ts           # Products hook
    ├── useTestimonials.ts       # Testimonials hook
    └── index.ts                 # Hooks export
```

---

## 🚀 Quick Start

### 1. Cài Đặt Dependencies

```bash
npm install axios
# hoặc
yarn add axios
```

### 2. Cấu Hình Environment

Tạo file `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### 3. Sử Dụng API trong Components

#### Option A: Sử dụng Custom Hooks (Recommended)

```tsx
'use client';

import { usePackages } from '@/src/features/api/hooks';

export default function MyComponent() {
  const { packages, loading, error } = usePackages();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {packages.map(pkg => (
        <div key={pkg.id}>{pkg.name}</div>
      ))}
    </div>
  );
}
```

#### Option B: Sử dụng API Directly

```tsx
'use client';

import { useEffect, useState } from 'react';
import { packagesApi } from '@/src/features/api';

export default function MyComponent() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    packagesApi.getAll().then(response => {
      if (response.success) {
        setPackages(response.data);
      }
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {packages.map(pkg => (
        <div key={pkg.id}>{pkg.name}</div>
      ))}
    </div>
  );
}
```

---

## 📚 API Services

### Packages API

```typescript
import { packagesApi } from '@/src/features/api';

// Get all packages
const response = await packagesApi.getAll();

// Get popular packages
const popular = await packagesApi.getPopular();

// Get by ID
const pkg = await packagesApi.getById('package-id');

// Get by slug
const pkg = await packagesApi.getBySlug('goi-basic');

// Create (admin)
const newPkg = await packagesApi.create({
  name: 'Gói Mới',
  slug: 'goi-moi',
  description: 'Mô tả',
  price: 100000000,
  features: ['Feature 1', 'Feature 2'],
  isActive: true,
});

// Update (admin)
const updated = await packagesApi.update('package-id', {
  price: 120000000,
});

// Delete (admin)
await packagesApi.delete('package-id');
```

### Services API

```typescript
import { servicesApi } from '@/src/features/api';

// Get all services
const response = await servicesApi.getAll();

// Get available services
const available = await servicesApi.getAvailable();

// Get by ID
const service = await servicesApi.getById('service-id');

// Get by slug
const service = await servicesApi.getBySlug('wedding-decoration');
```

### Products API

```typescript
import { productsApi } from '@/src/features/api';

// Get all products
const response = await productsApi.getAll();

// Get featured products
const featured = await productsApi.getFeatured();

// Get by category
const products = await productsApi.getByCategory('Nhẫn Cưới');

// Get by ID
const product = await productsApi.getById('product-id');

// Get by slug
const product = await productsApi.getBySlug('nhan-cuoi-vang-18k');
```

### Testimonials API

```typescript
import { testimonialsApi } from '@/src/features/api';

// Get all testimonials
const response = await testimonialsApi.getAll();

// Get by service
const testimonials = await testimonialsApi.getByService('service-id');

// Get by ID
const testimonial = await testimonialsApi.getById('testimonial-id');
```

### Gallery API

```typescript
import { galleryApi } from '@/src/features/api';

// Get all gallery items
const response = await galleryApi.getAll();

// Get related to object
const images = await galleryApi.getRelated('product', 'product-id');

// Get primary image
const primary = await galleryApi.getPrimary('product', 'product-id');
```

### FAQ API

```typescript
import { faqApi } from '@/src/features/api';

// Get all FAQs
const response = await faqApi.getAll();

// Get by category
const faqs = await faqApi.getByCategory('general');
```

### Consultations API

```typescript
import { consultationsApi } from '@/src/features/api';

// Create consultation (public)
const consultation = await consultationsApi.create({
  customerName: 'Nguyễn Văn A',
  email: 'email@example.com',
  phone: '0123456789',
  message: 'Tôi muốn tư vấn',
  serviceType: 'wedding-decoration',
  preferredDate: '2025-12-25',
});
```

---

## 🪝 Custom Hooks

### usePackages

```typescript
const {
  packages,        // Package[]
  loading,         // boolean
  error,           // string | null
  fetchPackages,   // () => Promise<void>
  fetchPopular,    // () => Promise<void>
  fetchById,       // (id: string) => Promise<Package>
  fetchBySlug,     // (slug: string) => Promise<Package>
} = usePackages({
  autoFetch: true,  // Tự động fetch khi component mount
  onError: (err) => console.error(err),
});
```

### useServices

```typescript
const {
  services,
  loading,
  error,
  fetchServices,
  fetchAvailable,
  fetchById,
} = useServices();
```

### useProducts

```typescript
const {
  products,
  loading,
  error,
  fetchProducts,
  fetchFeatured,
  fetchByCategory,
} = useProducts();
```

### useTestimonials

```typescript
const {
  testimonials,
  loading,
  error,
  fetchTestimonials,
  fetchByService,
} = useTestimonials();
```

---

## 🔄 Sử Dụng API Components

### WeddingPackagesWithAPI

Thay thế `WeddingPackages` bằng `WeddingPackagesWithAPI` để tự động fetch từ API:

```tsx
// app/page.tsx
import WeddingPackagesWithAPI from '@/src/features/packages/components/WeddingPackagesWithAPI';

export default function HomePage() {
  return (
    <main>
      <WeddingPackagesWithAPI
        title="Gói Dịch Vụ Tiệc Cưới"
        subtitle="Lựa chọn gói phù hợp"
        onViewDetails={(id) => console.log(id)}
      />
    </main>
  );
}
```

### ProductsListWithAPI

```tsx
import ProductsListWithAPI from '@/src/features/products/components/ProductsListWithAPI';

export default function HomePage() {
  return (
    <main>
      <ProductsListWithAPI
        title="Sản Phẩm Cưới"
        subtitle="Khám phá sản phẩm"
      />
    </main>
  );
}
```

### TestimonialsSectionWithAPI

```tsx
import TestimonialsSectionWithAPI from '@/src/features/testimonials/components/TestimonialsSectionWithAPI';

export default function HomePage() {
  return (
    <main>
      <TestimonialsSectionWithAPI
        title="Khách Hàng Nói Gì"
        layout="carousel"
      />
    </main>
  );
}
```

---

## 🛠️ Error Handling

### Global Error Handler

```typescript
import { useCallback } from 'react';

const handleApiError = useCallback((error: any) => {
  if (error.response?.status === 401) {
    // Unauthorized
    console.error('Vui lòng đăng nhập');
  } else if (error.response?.status === 403) {
    // Forbidden
    console.error('Bạn không có quyền truy cập');
  } else if (error.response?.status === 404) {
    // Not found
    console.error('Không tìm thấy dữ liệu');
  } else if (error.response?.status === 500) {
    // Server error
    console.error('Lỗi máy chủ');
  } else {
    console.error('Lỗi không xác định');
  }
}, []);
```

### Try-Catch Pattern

```typescript
try {
  const response = await packagesApi.getAll();
  if (response.success) {
    setPackages(response.data);
  } else {
    setError(response.message);
  }
} catch (error: any) {
  const message = error.response?.data?.message || error.message;
  setError(message);
}
```

---

## 🔐 Authentication

### Thêm Token vào Requests

Token được tự động thêm từ localStorage:

```typescript
// Lưu token sau khi login
localStorage.setItem('auth_token', token);

// Token sẽ tự động được gửi trong header:
// Authorization: Bearer <token>
```

### Logout

```typescript
// Xóa token
localStorage.removeItem('auth_token');

// Redirect to login
window.location.href = '/login';
```

---

## 📊 Response Format

Tất cả API responses tuân theo format:

```json
{
  "success": true,
  "data": {},
  "message": "Optional message",
  "count": 10,
  "errors": []
}
```

---

## 🧪 Testing API

### Với cURL

```bash
# Get packages
curl http://localhost:4000/api/user/packages

# Get products
curl http://localhost:4000/api/user/products

# Get testimonials
curl http://localhost:4000/api/user/testimonials
```

### Với Postman

1. Import collection từ backend
2. Set environment variable: `{{BASE_URL}}` = `http://localhost:4000`
3. Test endpoints

---

## 🚨 Troubleshooting

### CORS Error

Nếu gặp lỗi CORS, kiểm tra backend config:

```typescript
// backend/src/server.ts
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));
```

### API Not Responding

1. Kiểm tra backend đang chạy: `http://localhost:4000/api/health`
2. Kiểm tra `.env.local` có `NEXT_PUBLIC_API_URL` đúng
3. Kiểm tra network tab trong DevTools

### Token Expired

Token sẽ tự động xóa khi hết hạn (401 response), user sẽ được redirect to login.

---

## 📝 Checklist

- [ ] Cài đặt axios
- [ ] Tạo `.env.local` với `NEXT_PUBLIC_API_URL`
- [ ] Kiểm tra backend đang chạy
- [ ] Test API endpoints với cURL
- [ ] Thay thế components bằng API versions
- [ ] Test loading states
- [ ] Test error states
- [ ] Test authentication flow
- [ ] Deploy to production

---

## 🔗 Liên Kết

- [API Routes Documentation](../backend/API_ROUTES.md)
- [Backend Architecture](../backend/ARCHITECTURE.md)
- [API Development Guide](../backend/API_DEVELOPMENT_GUIDE.md)

---

**Last Updated:** 2025-11-16
