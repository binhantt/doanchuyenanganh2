# 🚀 Chạy API Ngay - Trang Trí Tiệc Cưới

## Bước 1: Cài đặt (1 phút)

```bash
cd backend
npm install
```

## Bước 2: Tạo database (30 giây)

```bash
# Mở MySQL
mysql -u root -p

# Tạo database
CREATE DATABASE wedding_service;
EXIT;
```

## Bước 3: Cấu hình .env (30 giây)

Tạo file `.env`:
```env
PORT=4000
NODE_ENV=development

DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASS=your_password_here
DB_NAME=wedding_service

CORS_ORIGIN=http://localhost:3000
```

## Bước 4: Chạy migrations & seeds (30 giây)

```bash
npm run db:setup
```

## Bước 5: Khởi động server (10 giây)

```bash
npm run dev
```

✅ Server chạy tại: **http://localhost:4000**

---

## 🧪 Test API Ngay

### Test 1: Health Check
```bash
curl http://localhost:4000/health
```

### Test 2: Lấy tất cả decorations
```bash
curl http://localhost:4000/api/user/decorations
```

### Test 3: Lấy theo theme Romantic
```bash
curl "http://localhost:4000/api/user/decorations?theme=Romantic"
```

### Test 4: Lấy theo slug
```bash
curl http://localhost:4000/api/user/decorations/slug/trang-tri-tiec-cuoi-romantic
```

---

## 📋 API Endpoints Có Sẵn

### User Routes (Public)
```
GET  /api/user/decorations              # Tất cả decorations (active)
GET  /api/user/decorations?theme=X      # Lọc theo theme
GET  /api/user/decorations?style=X      # Lọc theo style
GET  /api/user/decorations/slug/:slug   # Lấy theo slug
GET  /api/user/decorations/:id          # Lấy theo ID
GET  /api/user/services                 # Tất cả services
```

### Admin Routes (Cần auth)
```
GET    /api/admin/decorations           # Tất cả (bao gồm inactive)
POST   /api/admin/decorations           # Tạo mới
PUT    /api/admin/decorations/:id       # Cập nhật
DELETE /api/admin/decorations/:id       # Xóa
GET    /api/admin/stats                 # Dashboard stats
```

---

## 🎨 Themes Có Sẵn

1. **Romantic** - Lãng mạn, sang trọng
2. **Vintage** - Cổ điển, hoài niệm
3. **Modern** - Hiện đại, tối giản
4. **Garden** - Vườn xanh, thiên nhiên
5. **Luxury** - Xa hoa, đẳng cấp

---

## 💡 Ví Dụ Response

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Trang trí tiệc cưới Romantic",
      "slug": "trang-tri-tiec-cuoi-romantic",
      "description": "Thiết kế và trang trí không gian tiệc cưới sang trọng...",
      "theme": "Romantic",
      "style": "Sang trọng",
      "basePrice": 15000000,
      "features": [
        "Thiết kế concept độc đáo",
        "Backdrop sân khấu cao cấp",
        "Trang trí bàn tiệc",
        "Hoa tươi cao cấp",
        "Ánh sáng nghệ thuật"
      ],
      "images": [
        "/images/decorations/romantic-1.jpg",
        "/images/decorations/romantic-2.jpg"
      ],
      "isActive": true,
      "createdAt": "2025-11-15T10:00:00.000Z",
      "updatedAt": "2025-11-15T10:00:00.000Z"
    }
  ],
  "count": 5
}
```

---

## 🔧 Troubleshooting

### Lỗi: Database connection failed
```bash
# Kiểm tra MySQL đang chạy
mysql -u root -p

# Kiểm tra credentials trong .env
```

### Lỗi: Port 4000 đã được sử dụng
```bash
# Đổi port trong .env
PORT=4001
```

### Lỗi: Migration failed
```bash
# Reset database
npm run migrate:rollback
npm run migrate:latest
npm run seed:run
```

---

## 📚 Tài Liệu Chi Tiết

- [TEST_API.md](./TEST_API.md) - Hướng dẫn test API đầy đủ
- [API_ROUTES.md](./API_ROUTES.md) - Tài liệu API routes
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Kiến trúc hệ thống
- [QUICK_START.md](./QUICK_START.md) - Hướng dẫn setup chi tiết

---

## ✨ Tính Năng

✅ Clean Architecture với Knex.js
✅ TypeScript strict mode
✅ Route grouping (user/admin)
✅ Authentication middleware
✅ Input validation
✅ Error handling
✅ Database migrations & seeds
✅ 5 decorations mẫu có sẵn

**Chúc bạn code vui vẻ! 🎉**
