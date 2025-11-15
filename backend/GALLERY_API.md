# Gallery API Documentation

API endpoints cho quản lý thư viện ảnh (Gallery) - hỗ trợ upload và quản lý ảnh cho Products, Decorations, Services.

## Base URL
- User API: `http://localhost:4000/api/user/galleries`
- Admin API: `http://localhost:4000/api/admin/galleries`

---

## User Endpoints (Public)

### 1. Lấy danh sách ảnh
```http
GET /api/user/galleries
```

**Query Parameters:**
- `category` (optional): Lọc theo danh mục (product, decoration, service, general)
- `relatedId` (optional): Lọc theo ID liên quan
- `relatedType` (optional): Lọc theo loại liên quan (product, decoration, service)
- `isActive` (optional): Tự động set = true cho user

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "Nhẫn cưới vàng 18K - Ảnh chính",
      "altText": "Nhẫn cưới vàng 18K đính kim cương thiên nhiên",
      "fileName": "nhan-cuoi-vang-18k-1.jpg",
      "filePath": "/uploads/products/nhan-cuoi-vang-18k-1.jpg",
      "fileUrl": "https://example.com/image.jpg",
      "mimeType": "image/jpeg",
      "fileSize": 245678,
      "fileSizeKB": 240,
      "fileSizeMB": 0.23,
      "width": 800,
      "height": 800,
      "dimensions": "800x800",
      "category": "product",
      "relatedId": "product-uuid",
      "relatedType": "product",
      "displayOrder": 0,
      "isPrimary": true,
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### 2. Lấy chi tiết ảnh theo ID
```http
GET /api/user/galleries/:id
```

### 3. Lấy ảnh theo đối tượng liên quan
```http
GET /api/user/galleries/related/:relatedType/:relatedId
```

**Example:**
```http
GET /api/user/galleries/related/product/abc-123-uuid
```

**Response:** Trả về tất cả ảnh của product có ID = abc-123-uuid

### 4. Lấy ảnh chính (primary) của đối tượng
```http
GET /api/user/galleries/primary/:relatedType/:relatedId
```

**Example:**
```http
GET /api/user/galleries/primary/product/abc-123-uuid
```

**Response:** Trả về ảnh chính (isPrimary = true) của product

---

## Admin Endpoints (Requires Authentication)

### 1. Lấy tất cả ảnh (Admin)
```http
GET /api/admin/galleries
```

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `category` (optional): Lọc theo danh mục
- `relatedId` (optional): Lọc theo ID liên quan
- `relatedType` (optional): Lọc theo loại liên quan
- `isActive` (optional): Lọc theo trạng thái (true/false)

### 2. Tạo ảnh mới
```http
POST /api/admin/galleries
```

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Nhẫn cưới vàng 18K - Ảnh chính",
  "altText": "Nhẫn cưới vàng 18K đính kim cương thiên nhiên",
  "fileName": "nhan-cuoi-vang-18k-1.jpg",
  "filePath": "/uploads/products/nhan-cuoi-vang-18k-1.jpg",
  "fileUrl": "https://example.com/image.jpg",
  "mimeType": "image/jpeg",
  "fileSize": 245678,
  "width": 800,
  "height": 800,
  "category": "product",
  "relatedId": "product-uuid",
  "relatedType": "product",
  "displayOrder": 0,
  "isPrimary": true,
  "isActive": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Nhẫn cưới vàng 18K - Ảnh chính",
    ...
  }
}
```

### 3. Cập nhật thông tin ảnh
```http
PUT /api/admin/galleries/:id
```

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:** (Tất cả fields đều optional)
```json
{
  "title": "Nhẫn cưới vàng 18K - Ảnh đẹp nhất",
  "altText": "Ảnh đẹp nhất của nhẫn cưới",
  "displayOrder": 1,
  "isActive": true
}
```

### 4. Đặt ảnh làm ảnh chính
```http
PUT /api/admin/galleries/:id/primary
```

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "relatedId": "product-uuid",
  "relatedType": "product"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Primary image set successfully"
}
```

**Note:** Khi set ảnh này làm primary, tất cả ảnh khác của cùng product sẽ tự động bỏ primary.

### 5. Cập nhật thứ tự hiển thị
```http
PUT /api/admin/galleries/:id/order
```

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "order": 2
}
```

**Response:**
```json
{
  "success": true,
  "message": "Display order updated successfully"
}
```

### 6. Xóa ảnh
```http
DELETE /api/admin/galleries/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Gallery deleted successfully"
}
```

### 7. Lấy chi tiết ảnh theo ID (Admin)
```http
GET /api/admin/galleries/:id
```

### 8. Lấy ảnh theo đối tượng liên quan (Admin)
```http
GET /api/admin/galleries/related/:relatedType/:relatedId
```

### 9. Lấy ảnh chính (Admin)
```http
GET /api/admin/galleries/primary/:relatedType/:relatedId
```

---

## Categories

- `product` - Ảnh sản phẩm
- `decoration` - Ảnh trang trí
- `service` - Ảnh dịch vụ
- `general` - Ảnh chung

## Related Types

- `product` - Liên kết với Products
- `decoration` - Liên kết với Decorations
- `service` - Liên kết với Services

---

## Tính năng

- ✅ Upload và quản lý ảnh
- ✅ Hỗ trợ nhiều ảnh cho một đối tượng
- ✅ Đặt ảnh chính (primary image)
- ✅ Sắp xếp thứ tự hiển thị
- ✅ Lưu thông tin kích thước ảnh
- ✅ Tính toán dung lượng file (KB, MB)
- ✅ Alt text cho SEO
- ✅ Phân loại theo category
- ✅ Liên kết với nhiều loại đối tượng

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Missing required fields"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Gallery not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## Testing với cURL

### Lấy tất cả ảnh của một product
```bash
curl "http://localhost:4000/api/user/galleries/related/product/PRODUCT_ID"
```

### Lấy ảnh chính của product
```bash
curl "http://localhost:4000/api/user/galleries/primary/product/PRODUCT_ID"
```

### Tạo ảnh mới (Admin)
```bash
curl -X POST http://localhost:4000/api/admin/galleries \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Nhẫn cưới - Ảnh đẹp",
    "fileName": "nhan-cuoi.jpg",
    "fileUrl": "https://example.com/image.jpg",
    "mimeType": "image/jpeg",
    "fileSize": 200000,
    "category": "product",
    "relatedId": "product-uuid",
    "relatedType": "product"
  }'
```

### Đặt làm ảnh chính
```bash
curl -X PUT http://localhost:4000/api/admin/galleries/GALLERY_ID/primary \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "relatedId": "product-uuid",
    "relatedType": "product"
  }'
```

---

## Use Cases

### 1. Hiển thị gallery cho product detail page
```bash
# Lấy tất cả ảnh của product
GET /api/user/galleries/related/product/{productId}

# Hoặc chỉ lấy ảnh chính
GET /api/user/galleries/primary/product/{productId}
```

### 2. Upload ảnh mới cho product
```bash
# 1. Upload file lên server/cloud storage (implement riêng)
# 2. Tạo record trong gallery
POST /api/admin/galleries
{
  "title": "Product Image",
  "fileUrl": "uploaded-url",
  ...
}
```

### 3. Thay đổi ảnh chính
```bash
PUT /api/admin/galleries/{newPrimaryId}/primary
{
  "relatedId": "product-id",
  "relatedType": "product"
}
```

### 4. Sắp xếp lại thứ tự ảnh
```bash
# Cập nhật từng ảnh
PUT /api/admin/galleries/{id1}/order { "order": 0 }
PUT /api/admin/galleries/{id2}/order { "order": 1 }
PUT /api/admin/galleries/{id3}/order { "order": 2 }
```
