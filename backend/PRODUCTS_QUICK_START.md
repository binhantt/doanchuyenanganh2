# Products API - Quick Start

## ✅ Đã hoàn thành

Hệ thống Products API đã được tạo thành công với đầy đủ chức năng CRUD.

## 📁 Files đã tạo

### Database
- `src/infrastructure/database/migrations/20251115044000_create_products.ts` - Migration tạo bảng products
- `src/infrastructure/database/seeds/005_products.ts` - Seed data với 5 sản phẩm mẫu

### Domain Layer
- `src/domain/entities/Product.ts` - Entity Product
- `src/domain/repositories/IProductRepository.ts` - Interface Repository

### Application Layer
- `src/application/dto/ProductDTO.ts` - DTOs (Create, Update, Response)
- `src/application/interfaces/IProductService.ts` - Interface Service
- `src/application/services/ProductService.ts` - Business logic

### Infrastructure Layer
- `src/infrastructure/repositories/ProductRepository.ts` - Repository implementation

### Interface Layer
- `src/interfaces/controllers/product.controller.ts` - Controller
- Routes đã được thêm vào:
  - `src/interfaces/routes/user/index.ts` - User routes (public)
  - `src/interfaces/routes/admin/index.ts` - Admin routes (protected)

### Documentation
- `PRODUCTS_API.md` - Tài liệu API đầy đủ

## 🚀 API Endpoints

### User (Public)
```
GET    /api/user/products                    - Lấy tất cả sản phẩm
GET    /api/user/products/featured           - Sản phẩm nổi bật
GET    /api/user/products/category/:category - Lọc theo danh mục
GET    /api/user/products/slug/:slug         - Chi tiết theo slug
GET    /api/user/products/:id                - Chi tiết theo ID
```

### Admin (Protected)
```
GET    /api/admin/products                   - Lấy tất cả (có filters)
POST   /api/admin/products                   - Tạo mới
PUT    /api/admin/products/:id               - Cập nhật
PUT    /api/admin/products/:id/stock         - Cập nhật tồn kho
DELETE /api/admin/products/:id               - Xóa
GET    /api/admin/products/slug/:slug        - Chi tiết theo slug
GET    /api/admin/products/:id               - Chi tiết theo ID
```

## 🧪 Test nhanh

```bash
# Lấy tất cả sản phẩm
curl http://localhost:4000/api/user/products

# Lấy sản phẩm nổi bật
curl http://localhost:4000/api/user/products/featured

# Lấy theo slug
curl http://localhost:4000/api/user/products/slug/nhan-cuoi-vang-18k-dinh-kim-cuong

# Lọc theo danh mục
curl "http://localhost:4000/api/user/products/category/Nhẫn Cưới"
```

## 📦 Dữ liệu mẫu

5 sản phẩm đã được seed:
1. **Nhẫn cưới vàng 18K đính kim cương** - 8,000,000 VNĐ (Featured)
2. **Nhẫn cưới vàng trắng 18K** - 6,500,000 VNĐ (Featured)
3. **Dây chuyền vàng 24K** - 12,000,000 VNĐ
4. **Vòng tay bạc 925** - 1,500,000 VNĐ
5. **Nhẫn kim cương 1 carat** - 45,000,000 VNĐ (Featured)

## 🎯 Tính năng

- ✅ CRUD đầy đủ
- ✅ Lọc theo category, isActive, isFeatured
- ✅ Quản lý tồn kho (stock quantity)
- ✅ Upload nhiều ảnh
- ✅ Features list
- ✅ Slug-based routing
- ✅ Validation đầy vào
- ✅ Error handling

## 📝 Ví dụ tạo sản phẩm mới

```bash
curl -X POST http://localhost:4000/api/admin/products \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Nhẫn cưới vàng 18K đính kim cương",
    "slug": "nhan-cuoi-vang-18k-dinh-kim-cuong",
    "description": "Nhẫn cưới cao cấp",
    "price": 8000000,
    "category": "Nhẫn Cưới",
    "material": "Vàng 18K",
    "features": ["Vàng 18K nguyên chất", "Kim cương thiên nhiên"],
    "images": ["/images/product.jpg"],
    "stockQuantity": 50,
    "isFeatured": true
  }'
```

## 🔗 Xem thêm

- Chi tiết API: `PRODUCTS_API.md`
- Architecture: `ARCHITECTURE.md`
    