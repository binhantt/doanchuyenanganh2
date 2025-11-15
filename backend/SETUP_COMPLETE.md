# 🚀 Setup Hoàn Chỉnh - Backend API

## ✅ Đã Fix

1. ✅ Package.json scripts đã được cập nhật
2. ✅ Entry point: `src/server.ts`
3. ✅ Knexfile đã được tạo
4. ✅ Config files đã được tạo
5. ✅ TypeScript config đã được tạo

---

## 📋 Bước Setup (Làm Theo Thứ Tự)

### Bước 1: Cài đặt MySQL

**Windows:**
1. Download MySQL: https://dev.mysql.com/downloads/installer/
2. Cài đặt MySQL Server
3. Nhớ password của root user

**Hoặc dùng XAMPP:**
1. Download XAMPP: https://www.apachefriends.org/
2. Cài đặt và khởi động MySQL từ XAMPP Control Panel

### Bước 2: Khởi động MySQL

**XAMPP:**
- Mở XAMPP Control Panel
- Click "Start" ở MySQL

**MySQL Service:**
```bash
# Windows
net start MySQL80

# Hoặc từ Services (services.msc)
```

### Bước 3: Tạo Database

```bash
# Mở MySQL command line
mysql -u root -p

# Nhập password, sau đó:
CREATE DATABASE wedding_service;
EXIT;
```

### Bước 4: Cấu hình .env

File `.env` đã được tạo. Cập nhật password nếu cần:

```env
PORT=4000
NODE_ENV=development

DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASS=your_mysql_password_here
DB_NAME=wedding_service

CORS_ORIGIN=http://localhost:3000
```

### Bước 5: Cài đặt Dependencies

```bash
npm install
```

### Bước 6: Chạy Migrations & Seeds

```bash
npm run db:setup
```

Lệnh này sẽ:
- Tạo tables: users, services, decorations, orders, order_items
- Seed data: 2 users, 5 services, 5 decorations

### Bước 7: Khởi động Server

```bash
npm run dev
```

Bạn sẽ thấy:
```
✅ Database connected successfully
🚀 Server running on port 4000
📍 Environment: development
📍 Health check: http://localhost:4000/health
📍 User API: http://localhost:4000/api/user
📍 Admin API: http://localhost:4000/api/admin
```

---

## 🧪 Test API

### Test 1: Health Check
```bash
curl http://localhost:4000/health
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-11-15T10:00:00.000Z",
  "environment": "development"
}
```

### Test 2: Get Decorations
```bash
curl http://localhost:4000/api/user/decorations
```

### Test 3: Get Services
```bash
curl http://localhost:4000/api/user/services
```

### Test 4: Admin Stats (với mock auth)
```bash
curl http://localhost:4000/api/admin/stats -H "Authorization: Bearer mock-token"
```

---

## 🔧 Troubleshooting

### Lỗi: ECONNREFUSED 127.0.0.1:3306

**Nguyên nhân:** MySQL chưa chạy

**Giải pháp:**
1. Kiểm tra MySQL đang chạy:
   ```bash
   # Windows
   netstat -an | findstr 3306
   ```

2. Khởi động MySQL:
   - XAMPP: Start MySQL từ Control Panel
   - Service: `net start MySQL80`

3. Test connection:
   ```bash
   mysql -u root -p
   ```

### Lỗi: Access denied for user 'root'@'localhost'

**Nguyên nhân:** Password sai

**Giải pháp:**
1. Cập nhật password trong `.env`:
   ```env
   DB_PASS=your_correct_password
   ```

2. Hoặc reset MySQL password

### Lỗi: Unknown database 'wedding_service'

**Nguyên nhân:** Database chưa được tạo

**Giải pháp:**
```bash
mysql -u root -p
CREATE DATABASE wedding_service;
EXIT;
```

### Lỗi: Port 4000 already in use

**Giải pháp:**
1. Đổi port trong `.env`:
   ```env
   PORT=4001
   ```

2. Hoặc kill process đang dùng port 4000:
   ```bash
   # Windows
   netstat -ano | findstr :4000
   taskkill /PID <PID> /F
   ```

---

## 📁 Cấu Trúc Project

```
backend/
├── src/
│   ├── application/          # Business logic
│   │   ├── dto/
│   │   ├── interfaces/
│   │   ├── services/
│   │   └── validators/
│   ├── domain/               # Entities & interfaces
│   │   ├── entities/
│   │   └── repositories/
│   ├── infrastructure/       # Database & config
│   │   ├── config/
│   │   ├── database/
│   │   │   ├── migrations/
│   │   │   └── seeds/
│   │   └── repositories/
│   ├── interfaces/           # Controllers & routes
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   │   ├── admin/
│   │   │   └── user/
│   │   └── serializers/
│   ├── shared/               # Utilities
│   │   ├── errors/
│   │   ├── types/
│   │   └── utils/
│   └── server.ts             # Entry point
├── .env                      # Environment variables
├── knexfile.ts               # Knex configuration
├── package.json
└── tsconfig.json
```

---

## 📚 Available Scripts

```bash
# Development
npm run dev              # Start dev server with hot reload

# Database
npm run migrate:make     # Create new migration
npm run migrate:latest   # Run migrations
npm run migrate:rollback # Rollback last migration
npm run seed:run         # Run seeds
npm run db:setup         # Run migrations + seeds

# Production
npm run build            # Build TypeScript
npm run start            # Start production server
```

---

## 🎯 API Endpoints

### User Routes (Public)
```
GET  /api/user/services
GET  /api/user/services/:id
GET  /api/user/services/slug/:slug
GET  /api/user/decorations
GET  /api/user/decorations?theme=Romantic
GET  /api/user/decorations/:id
GET  /api/user/decorations/slug/:slug
```

### Admin Routes (Auth Required)
```
GET    /api/admin/services
POST   /api/admin/services
PUT    /api/admin/services/:id
DELETE /api/admin/services/:id
GET    /api/admin/decorations
POST   /api/admin/decorations
PUT    /api/admin/decorations/:id
DELETE /api/admin/decorations/:id
GET    /api/admin/stats
```

---

## ✨ Features

✅ Clean Architecture
✅ TypeScript
✅ Knex.js ORM
✅ MySQL Database
✅ Route Grouping (user/admin)
✅ Authentication Middleware
✅ Input Validation
✅ Error Handling
✅ Migrations & Seeds
✅ 5 Services + 5 Decorations Sample Data

---

## 🎉 Hoàn Thành!

Sau khi setup xong, bạn có thể:
1. Test API với curl hoặc Postman
2. Xem data trong MySQL
3. Phát triển thêm features
4. Tích hợp với frontend

**Chúc bạn code vui vẻ! 🚀**
