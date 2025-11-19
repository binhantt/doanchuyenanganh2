# Chạy Migration và Seed cho Testimonials

## Bước 1: Chạy Migration
```bash
cd backend
npm run migrate:latest
```

Hoặc:
```bash
npx knex migrate:latest --knexfile src/infrastructure/config/database.ts
```

## Bước 2: Chạy Seed (tùy chọn - để có dữ liệu mẫu)
```bash
npm run seed:run
```

Hoặc:
```bash
npx knex seed:run --knexfile src/infrastructure/config/database.ts
```

## Kiểm tra
Sau khi chạy migration, bảng `testimonials` sẽ được tạo với các cột:
- id (UUID, primary key)
- client_name (string, required)
- client_role (string, required)
- content (text, required)
- rating (integer, 1-5, required)
- event_date (date, required)
- location (string, required)
- language (string, default 'vi')
- is_active (boolean, default true)
- created_at (timestamp)
- updated_at (timestamp)

## Lưu ý
- Migration file: `20251119150000_create_testimonials.ts`
- Seed file: `011_testimonials.ts`
- Seed sẽ tạo 5 testimonials mẫu (4 tiếng Việt, 1 tiếng Anh)
