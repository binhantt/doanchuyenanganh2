# Wedding Packages API Documentation

## Overview
API cho quản lý các gói tiệc cưới (Wedding Packages) với đầy đủ CRUD operations.

---

## Endpoints

### User Routes (Public)

#### 1. Get All Packages
```http
GET /api/user/packages
```

**Query Parameters:**
- `active=true` - Chỉ lấy packages đang active (mặc định)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Gói Basic",
      "slug": "goi-basic",
      "description": "Gói cơ bản cho tiệc cưới ấm cúng",
      "price": 50000000,
      "features": [
        "Trang trí sảnh tiệc cơ bản",
        "Backdrop chụp ảnh đơn giản",
        "Âm thanh ánh sáng cơ bản",
        "MC dẫn chương trình",
        "Hỗ trợ setup và dọn dẹp",
        "Tư vấn kế hoạch cơ bản"
      ],
      "isPopular": false,
      "isActive": true,
      "createdAt": "2025-11-15T10:00:00.000Z",
      "updatedAt": "2025-11-15T10:00:00.000Z"
    }
  ],
  "count": 4
}
```

#### 2. Get Popular Packages
```http
GET /api/user/packages/popular
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Gói Standard",
      "slug": "goi-standard",
      "description": "Gói tiêu chuẩn với đầy đủ tiện nghi",
      "price": 80000000,
      "features": [...],
      "isPopular": true,
      "isActive": true
    }
  ],
  "count": 1
}
```

#### 3. Get Package by ID
```http
GET /api/user/packages/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Gói Premium",
    "slug": "goi-premium",
    "description": "Gói cao cấp cho đám cưới hoàn hảo",
    "price": 120000000,
    "features": [
      "Trang trí sảnh tiệc sang trọng",
      "Backdrop 3D cao cấp",
      "Hệ thống âm thanh ánh sáng chuyên nghiệp",
      "MC + Ban nhạc sống",
      "Makeup artist + Hair stylist",
      "Chụp ảnh cưới (200 ảnh)",
      "Quay phim Full HD",
      "Album ảnh + Video highlights",
      "Bánh cưới 3 tầng",
      "Hoa tươi cao cấp",
      "Wedding planner chuyên nghiệp",
      "Hỗ trợ setup và dọn dẹp"
    ],
    "isPopular": false,
    "isActive": true,
    "createdAt": "2025-11-15T10:00:00.000Z",
    "updatedAt": "2025-11-15T10:00:00.000Z"
  }
}
```

#### 4. Get Package by Slug
```http
GET /api/user/packages/slug/:slug
```

**Example:**
```bash
curl http://localhost:4000/api/user/packages/slug/goi-basic
```

---

### Admin Routes (Requires Authentication)

#### 1. Get All Packages (Including Inactive)
```http
GET /api/admin/packages
Authorization: Bearer <token>
```

#### 2. Create Package
```http
POST /api/admin/packages
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Gói VIP",
  "slug": "goi-vip",
  "description": "Gói VIP đặc biệt",
  "price": 150000000,
  "features": [
    "Feature 1",
    "Feature 2",
    "Feature 3"
  ],
  "isPopular": false,
  "isActive": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Gói VIP",
    "slug": "goi-vip",
    "description": "Gói VIP đặc biệt",
    "price": 150000000,
    "features": ["Feature 1", "Feature 2", "Feature 3"],
    "isPopular": false,
    "isActive": true,
    "createdAt": "2025-11-15T10:00:00.000Z",
    "updatedAt": "2025-11-15T10:00:00.000Z"
  },
  "message": "Package created successfully"
}
```

#### 3. Update Package
```http
PUT /api/admin/packages/:id
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:** (all fields optional)
```json
{
  "price": 160000000,
  "isPopular": true
}
```

#### 4. Delete Package
```http
DELETE /api/admin/packages/:id
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Package deleted successfully"
}
```

---

## Available Packages

### 1. Gói Basic - 50.000.000 VNĐ
Gói cơ bản cho tiệc cưới ấm cúng

**Features:**
- Trang trí sảnh tiệc cơ bản
- Backdrop chụp ảnh đơn giản
- Âm thanh ánh sáng cơ bản
- MC dẫn chương trình
- Hỗ trợ setup và dọn dẹp
- Tư vấn kế hoạch cơ bản

### 2. Gói Standard - 80.000.000 VNĐ ⭐ (Popular)
Gói tiêu chuẩn với đầy đủ tiện nghi

**Features:**
- Trang trí sảnh tiệc cao cấp
- Backdrop chụp ảnh đẹp mắt
- Hệ thống âm thanh ánh sáng hiện đại
- MC chuyên nghiệp
- Makeup artist cho cô dâu
- Chụp ảnh cưới (100 ảnh)
- Album ảnh cưới
- Hỗ trợ setup và dọn dẹp
- Tư vấn kế hoạch chi tiết

### 3. Gói Premium - 120.000.000 VNĐ
Gói cao cấp cho đám cưới hoàn hảo

**Features:**
- Trang trí sảnh tiệc sang trọng
- Backdrop 3D cao cấp
- Hệ thống âm thanh ánh sáng chuyên nghiệp
- MC + Ban nhạc sống
- Makeup artist + Hair stylist
- Chụp ảnh cưới (200 ảnh)
- Quay phim Full HD
- Album ảnh + Video highlights
- Bánh cưới 3 tầng
- Hoa tươi cao cấp
- Wedding planner chuyên nghiệp
- Hỗ trợ setup và dọn dẹp

### 4. Gói Luxury - 200.000.000 VNĐ
Gói xa hoa đẳng cấp 5 sao

**Features:**
- Trang trí sảnh tiệc đẳng cấp 5 sao
- Backdrop pha lê + LED mapping
- Hệ thống âm thanh ánh sáng đẳng cấp
- MC + Ban nhạc + DJ
- Makeup artist + Hair stylist VIP
- Chụp ảnh cưới không giới hạn
- Quay phim 4K + Flycam
- Album ảnh cao cấp + Video cinematic
- Bánh cưới 5 tầng thiết kế độc đáo
- Hoa tươi nhập khẩu
- Wedding planner chuyên nghiệp
- Xe hoa sang trọng
- Phục vụ rượu champagne
- Pháo hoa nghệ thuật
- Hỗ trợ setup và dọn dẹp

---

## Testing

### Test with cURL

```bash
# Get all packages
curl http://localhost:4000/api/user/packages

# Get popular packages
curl http://localhost:4000/api/user/packages/popular

# Get by slug
curl http://localhost:4000/api/user/packages/slug/goi-basic

# Create package (Admin)
curl -X POST http://localhost:4000/api/admin/packages \
  -H "Authorization: Bearer mock-token" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Gói Test",
    "slug": "goi-test",
    "description": "Test package",
    "price": 100000000,
    "features": ["Feature 1", "Feature 2"],
    "isPopular": false,
    "isActive": true
  }'
```

---

## Error Responses

### 404 Not Found
```json
{
  "success": false,
  "message": "Package not found"
}
```

### 400 Bad Request
```json
{
  "success": false,
  "message": "Price must be non-negative"
}
```

### 409 Conflict
```json
{
  "success": false,
  "message": "Package with slug 'goi-basic' already exists"
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

## Database Schema

```sql
CREATE TABLE packages (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  price DECIMAL(15,2) NOT NULL,
  features TEXT NOT NULL, -- JSON array
  is_popular BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_slug (slug),
  INDEX idx_popular (is_popular),
  INDEX idx_active (is_active)
);
```

---

## Notes

- Tất cả giá được lưu dưới dạng VNĐ (Vietnamese Dong)
- `isPopular` flag để đánh dấu gói được đề xuất
- `isActive` để quản lý hiển thị gói
- Features được lưu dưới dạng JSON array
- Slug phải unique và chỉ chứa lowercase, numbers, và hyphens

---

**API Version:** 1.0.0  
**Last Updated:** 2025-11-15
