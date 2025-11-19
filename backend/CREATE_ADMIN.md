# Tạo Tài Khoản Admin

## Admin Mặc Định

Hệ thống đã có sẵn tài khoản admin:

```
Email: admin@weddingplanner.vn
Password: 123
```

## Cách 1: Sử dụng Script Tạo Admin Mới

### Chạy script:
```bash
cd backend
npm run create-admin
```

Script sẽ hỏi:
- Email
- Password
- Full Name
- Phone

## Cách 2: Tạo Admin Qua Database Seed

### Tạo file seed mới:

**File: `backend/src/infrastructure/database/seeds/011_new_admin.ts`**

```typescript
import { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
  const email = 'youremail@example.com'; // Thay đổi email
  const password = 'your-password'; // Thay đổi password
  
  // Check if admin already exists
  const existingAdmin = await knex('users').where({ email }).first();
  
  if (existingAdmin) {
    console.log(`Admin ${email} already exists`);
    return;
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert admin user
  await knex('users').insert({
    id: uuidv4(),
    email: email,
    password: hashedPassword,
    full_name: 'Your Name', // Thay đổi tên
    phone: '0987654321', // Thay đổi số điện thoại
    role: 'admin',
    is_active: true,
    email_verified_at: new Date(),
  });

  console.log(`Admin user created: ${email}`);
}
```

### Chạy seed:
```bash
cd backend
npm run seed:run
```

## Cách 3: Tạo Admin Trực Tiếp Qua SQL

### Kết nối MySQL:
```bash
mysql -u root -p
```

### Chạy query:
```sql
USE wedding;

-- Tạo admin mới
INSERT INTO users (
  id, 
  email, 
  password, 
  full_name, 
  phone, 
  role, 
  is_active, 
  email_verified_at,
  created_at,
  updated_at
) VALUES (
  UUID(),
  'newemail@example.com',
  '$2b$10$YourHashedPasswordHere', -- Cần hash password trước
  'New Admin Name',
  '0987654321',
  'admin',
  1,
  NOW(),
  NOW(),
  NOW()
);
```

**Lưu ý:** Password cần được hash bằng bcrypt. Sử dụng Cách 1 hoặc 2 để tự động hash.

## Cách 4: Sử dụng API (Nếu có endpoint register admin)

### Gọi API:
```bash
curl -X POST http://localhost:4000/api/admin/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "email": "newemail@example.com",
    "password": "your-password",
    "fullName": "New Admin",
    "phone": "0987654321",
    "role": "admin"
  }'
```

## Reset Password Admin

### Nếu quên password, reset qua SQL:

```sql
USE wedding;

-- Hash password mới: "newpassword123"
-- Bạn cần hash password trước bằng bcrypt online tool
-- Hoặc dùng script

UPDATE users 
SET password = '$2b$10$NewHashedPasswordHere'
WHERE email = 'admin@weddingplanner.vn';
```

## Kiểm Tra Admin Đã Tạo

### Xem danh sách admin:
```sql
USE wedding;

SELECT id, email, full_name, phone, role, is_active, created_at
FROM users
WHERE role = 'admin';
```

## Troubleshooting

### Lỗi: "Admin already exists"
- Email đã được sử dụng
- Thay đổi email khác

### Lỗi: "Cannot hash password"
- Kiểm tra bcrypt đã cài đặt: `npm list bcrypt`
- Cài lại: `npm install bcrypt`

### Lỗi: "Database connection failed"
- Kiểm tra MySQL đang chạy
- Kiểm tra config trong `.env`
- Test connection: `npm run migrate:status`
