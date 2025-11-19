# Service Images Management - Hướng dẫn cập nhật

## ✅ Đã hoàn thành

Backend đã được cập nhật để hỗ trợ quản lý hình ảnh (URLs) cho services thông qua admin panel.

## Cách hoạt động

### 1. Tạo Service mới với Images

Khi tạo service mới, bạn có thể gửi mảng `images` trong request body:

```json
POST /api/admin/services
{
  "name": "Trang trí tiệc cưới",
  "slug": "trang-tri-tiec-cuoi",
  "shortDescription": "Dịch vụ trang trí tiệc cưới chuyên nghiệp",
  "fullDescription": "Mô tả chi tiết...",
  "icon": "Flower",
  "basePrice": 5000000,
  "features": {
    "included": ["Trang trí sân khấu", "Hoa tươi"],
    "excluded": ["Âm thanh"],
    "highlights": ["Thiết kế độc đáo"]
  },
  "images": [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg",
    "https://example.com/image3.jpg"
  ],
  "isActive": true
}
```

**Lưu ý:**
- Hình ảnh đầu tiên trong mảng sẽ tự động được đánh dấu là `isPrimary = true`
- Mỗi hình ảnh sẽ có `displayOrder` tự động theo thứ tự trong mảng

### 2. Cập nhật Service với Images

Khi cập nhật service, bạn có thể cập nhật lại toàn bộ danh sách images:

```json
PUT /api/admin/services/:id
{
  "name": "Trang trí tiệc cưới (Updated)",
  "images": [
    "https://example.com/new-image1.jpg",
    "https://example.com/new-image2.jpg"
  ]
}
```

**Cách hoạt động:**
- Khi gửi `images` trong request, hệ thống sẽ:
  1. Xóa tất cả images cũ của service
  2. Thêm lại images mới từ mảng
- Nếu không gửi `images`, danh sách images cũ sẽ được giữ nguyên
- Nếu gửi `images: []` (mảng rỗng), tất cả images sẽ bị xóa

### 3. Thêm một Image đơn lẻ

```json
POST /api/admin/services/:id/images
{
  "imageUrl": "https://example.com/new-image.jpg",
  "altText": "Mô tả hình ảnh",
  "isPrimary": false,
  "displayOrder": 5
}
```

### 4. Xóa một Image

```
DELETE /api/admin/services/:id/images/:imageId
```

### 5. Lấy danh sách Images của Service

```
GET /api/admin/services/:id/images
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "entityId": "service-id",
      "entityType": "service",
      "url": "https://example.com/image1.jpg",
      "altText": null,
      "displayOrder": 0,
      "isPrimary": true,
      "createdAt": "2024-11-19T...",
      "updatedAt": "2024-11-19T..."
    }
  ],
  "count": 1
}
```

## Admin Panel Integration

Admin panel đã có sẵn form để quản lý images:

1. Vào trang **Services** trong admin panel
2. Click **Tạo mới** hoặc **Chỉnh sửa** một service
3. Cuộn xuống phần **"Hình ảnh (URLs)"**
4. Nhập URL hình ảnh (ví dụ: `https://example.com/image.jpg`)
5. Click **"+ Thêm hình ảnh"** để thêm nhiều ảnh
6. Click **"Xóa"** để xóa ảnh không cần
7. Click **"Cập nhật"** - images sẽ được lưu/cập nhật tự động

## Database Structure

Images được lưu trong bảng `images`:

```sql
CREATE TABLE images (
  id UUID PRIMARY KEY,
  entity_id UUID NOT NULL,
  entity_type VARCHAR(50) NOT NULL, -- 'service', 'package', 'product', 'decoration'
  url TEXT NOT NULL,
  alt_text VARCHAR(255),
  display_order INTEGER DEFAULT 0,
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## Code Changes

### ServiceService.ts
- ✅ Thêm `ImageRepository` và `FeatureRepository` vào constructor
- ✅ Cập nhật `createService()` để lưu images
- ✅ Cập nhật `updateService()` để cập nhật images
- ✅ Thêm phương thức `saveImages()` và `saveFeatures()`
- ✅ Cập nhật `addImage()`, `removeImage()`, `getImages()` để dùng ImageRepository

### Routes (user/index.ts & admin/index.ts)
- ✅ Inject `ImageRepository` và `FeatureRepository` vào ServiceService

## Testing

Test API với curl hoặc Postman:

```bash
# Tạo service với images
curl -X POST http://localhost:3000/api/admin/services \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Service",
    "slug": "test-service",
    "shortDescription": "Test",
    "fullDescription": "Test description",
    "icon": "Heart",
    "basePrice": 1000000,
    "features": {
      "included": ["Feature 1"],
      "excluded": [],
      "highlights": []
    },
    "images": [
      "https://picsum.photos/800/600?random=1",
      "https://picsum.photos/800/600?random=2"
    ]
  }'

# Cập nhật images
curl -X PUT http://localhost:3000/api/admin/services/{service-id} \
  -H "Content-Type: application/json" \
  -d '{
    "images": [
      "https://picsum.photos/800/600?random=3",
      "https://picsum.photos/800/600?random=4",
      "https://picsum.photos/800/600?random=5"
    ]
  }'

# Lấy images
curl http://localhost:3000/api/admin/services/{service-id}/images
```

## Hoàn thành! 🎉

Tính năng quản lý hình ảnh cho services đã sẵn sàng sử dụng trong admin panel.
