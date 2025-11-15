# Test API - Trang trí tiệc cưới

## Setup & Run

```bash
cd backend
npm install
npm run db:setup
npm run dev
```

Server chạy tại: http://localhost:4000

---

## Test User Routes (Public)

### 1. Lấy tất cả decorations (chỉ active)
```bash
curl http://localhost:4000/api/user/decorations
```

### 2. Lấy decorations theo theme
```bash
# Romantic
curl http://localhost:4000/api/user/decorations?theme=Romantic

# Vintage
curl http://localhost:4000/api/user/decorations?theme=Vintage

# Modern
curl http://localhost:4000/api/user/decorations?theme=Modern

# Garden
curl http://localhost:4000/api/user/decorations?theme=Garden

# Luxury
curl http://localhost:4000/api/user/decorations?theme=Luxury
```

### 3. Lấy decorations theo style
```bash
# Sang trọng
curl http://localhost:4000/api/user/decorations?style=Sang%20tr%E1%BB%8Dng

# Hiện đại
curl http://localhost:4000/api/user/decorations?style=Hi%E1%BB%87n%20%C4%91%E1%BA%A1i
```

### 4. Lấy decoration theo slug
```bash
curl http://localhost:4000/api/user/decorations/slug/trang-tri-tiec-cuoi-romantic
```

### 5. Lấy decoration theo ID
```bash
curl http://localhost:4000/api/user/decorations/YOUR_DECORATION_ID
```

---

## Test Admin Routes (Requires Auth)

### 1. Lấy tất cả decorations (bao gồm inactive)
```bash
curl http://localhost:4000/api/admin/decorations \
  -H "Authorization: Bearer mock-token"
```

### 2. Tạo decoration mới
```bash
curl -X POST http://localhost:4000/api/admin/decorations \
  -H "Authorization: Bearer mock-token" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Trang trí tiệc cưới Beach",
    "slug": "trang-tri-tiec-cuoi-beach",
    "description": "Phong cách biển xanh, thoáng mát với không gian mở",
    "theme": "Beach",
    "style": "Tự nhiên",
    "basePrice": 16000000,
    "features": [
      "Concept biển xanh",
      "Trang trí vỏ sò và san hô",
      "Backdrop biển",
      "Ánh sáng xanh biển",
      "Bàn ghế gỗ tự nhiên"
    ],
    "images": [
      "/images/decorations/beach-1.jpg",
      "/images/decorations/beach-2.jpg"
    ],
    "isActive": true
  }'
```

### 3. Cập nhật decoration
```bash
curl -X PUT http://localhost:4000/api/admin/decorations/YOUR_DECORATION_ID \
  -H "Authorization: Bearer mock-token" \
  -H "Content-Type: application/json" \
  -d '{
    "basePrice": 17000000,
    "isActive": true
  }'
```

### 4. Xóa decoration
```bash
curl -X DELETE http://localhost:4000/api/admin/decorations/YOUR_DECORATION_ID \
  -H "Authorization: Bearer mock-token"
```

### 5. Lấy dashboard stats
```bash
curl http://localhost:4000/api/admin/stats \
  -H "Authorization: Bearer mock-token"
```

---

## Response Examples

### Success Response - List
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Trang trí tiệc cưới Romantic",
      "slug": "trang-tri-tiec-cuoi-romantic",
      "description": "Thiết kế và trang trí không gian tiệc cưới...",
      "theme": "Romantic",
      "style": "Sang trọng",
      "basePrice": 15000000,
      "features": ["Thiết kế concept độc đáo", "..."],
      "images": ["/images/decorations/romantic-1.jpg"],
      "isActive": true,
      "createdAt": "2025-11-15T10:00:00.000Z",
      "updatedAt": "2025-11-15T10:00:00.000Z"
    }
  ],
  "count": 5
}
```

### Success Response - Create
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Trang trí tiệc cưới Beach",
    "slug": "trang-tri-tiec-cuoi-beach",
    "description": "Phong cách biển xanh...",
    "theme": "Beach",
    "style": "Tự nhiên",
    "basePrice": 16000000,
    "features": ["Concept biển xanh", "..."],
    "images": ["/images/decorations/beach-1.jpg"],
    "isActive": true,
    "createdAt": "2025-11-15T10:00:00.000Z",
    "updatedAt": "2025-11-15T10:00:00.000Z"
  },
  "message": "Decoration created successfully"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Decoration not found"
}
```

---

## Available Themes
- Romantic
- Vintage
- Modern
- Garden
- Luxury
- Beach (custom)

## Available Styles
- Sang trọng
- Cổ điển
- Hiện đại
- Thiên nhiên
- Xa hoa
- Tự nhiên

---

## Quick Test Script

Tạo file `test-decorations.sh`:

```bash
#!/bin/bash

echo "=== Testing Decorations API ==="

echo "\n1. Get all decorations (User)"
curl -s http://localhost:4000/api/user/decorations | jq

echo "\n2. Get Romantic theme"
curl -s "http://localhost:4000/api/user/decorations?theme=Romantic" | jq

echo "\n3. Get by slug"
curl -s http://localhost:4000/api/user/decorations/slug/trang-tri-tiec-cuoi-romantic | jq

echo "\n4. Admin stats"
curl -s http://localhost:4000/api/admin/stats \
  -H "Authorization: Bearer mock-token" | jq

echo "\n=== Tests Complete ==="
```

Chạy:
```bash
chmod +x test-decorations.sh
./test-decorations.sh
```
