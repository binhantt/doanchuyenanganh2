# Setup Guide - Wedding Admin Panel

## 🚀 Cài đặt và chạy

### Bước 1: Cài đặt dependencies

```bash
cd admin-panel
npm install
```

### Bước 2: Chạy development server

```bash
npm run dev
```

Ứng dụng sẽ chạy tại: **http://localhost:3001**

### Bước 3: Đăng nhập

- Truy cập: http://localhost:3001/login
- Email: bất kỳ
- Password: bất kỳ
- (Mock login - chưa kết nối API thật)

## ✅ Đã hoàn thành

### 1. Theme màu hồng
- Primary: `#FF4D8A` (pinkPrimary)
- Light: `#FFB3CF` (pinkLight)
- Soft: `#FFF0F6` (pinkSoft)
- Dark: `#D93672` (pinkDark)
- Shadow: `#FFD9E6` (pinkShadow)

### 2. Components
- ✅ BaseInput, BaseTextarea, BaseSelect
- ✅ BaseImage, BaseDatePicker
- ✅ BaseButton, IconButton, SubmitButton
- ✅ BaseModal, ConfirmModal, FormModal

### 3. Features
- ✅ Login Page (màu hồng)
- ✅ Dashboard với thống kê
- ✅ Category Management (CRUD đầy đủ)
- ✅ Admin Layout với sidebar

### 4. Utilities
- ✅ HTTP client với interceptors
- ✅ usePagination hook
- ✅ useModal hook
- ✅ formatDate, formatCurrency

## 🎨 Sử dụng màu hồng

### Trong Tailwind

```vue
<div class="bg-pinkPrimary text-white">Primary</div>
<div class="bg-pinkLight">Light</div>
<div class="bg-pinkSoft">Soft</div>
<div class="text-pinkDark">Dark text</div>
```

### Trong Ant Design

Các component Ant Design đã được override với màu hồng:
- Buttons (primary)
- Menu items (selected)
- Switch (checked)
- Input (focus)
- Pagination (active)

## 📁 Cấu trúc

```
admin-panel/
├── src/
│   ├── components/common/    # Components dùng chung
│   ├── features/
│   │   └── categories/       # ✅ Hoàn thành
│   ├── hooks/                # Composables
│   ├── layouts/              # AdminLayout
│   ├── pages/                # Login, Dashboard, ComingSoon
│   ├── router/               # Routes
│   ├── types/                # TypeScript types
│   └── utils/                # Utilities
```

## 🔧 Cấu hình

### Tailwind (tailwind.config.js)
```js
colors: {
  primary: '#FF4D8A',
  pinkPrimary: '#FF4D8A',
  pinkLight: '#FFB3CF',
  pinkSoft: '#FFF0F6',
  pinkDark: '#D93672',
  pinkShadow: '#FFD9E6',
}
```

### API URL (.env)
```env
VITE_API_URL=http://localhost:3000/api
```

## 📝 Tính năng Categories

Đã hoàn thành đầy đủ:
- ✅ Danh sách với pagination
- ✅ Thêm mới
- ✅ Chỉnh sửa
- ✅ Xóa (với confirm)
- ✅ Toggle status
- ✅ Filter & search
- ✅ Upload ảnh
- ✅ Validation

## 🚧 Cần phát triển

Các trang sau đang hiển thị "Coming Soon":
- Services Management
- Packages Management
- Products Management
- Orders Management

Để phát triển, copy pattern từ `features/categories/`

## 💡 Tips

1. **Thêm feature mới**: Copy folder `features/categories` và đổi tên
2. **Đổi màu**: Sửa trong `tailwind.config.js`
3. **API**: Cấu hình trong `.env`
4. **Components**: Tất cả đã có sẵn trong `components/common/`

## 🐛 Troubleshooting

### Port đã được sử dụng
```typescript
// vite.config.ts
server: { port: 3002 }
```

### Lỗi import
```bash
npm install
```

### API không kết nối
- Kiểm tra backend đang chạy
- Kiểm tra VITE_API_URL
- Kiểm tra CORS

## 📚 Documentation

- README.md - Hướng dẫn đầy đủ
- QUICK_START.md - Bắt đầu nhanh
- SETUP.md - File này

## ✨ Features nổi bật

1. **Type-safe**: Full TypeScript
2. **Modern UI**: Ant Design Vue + Tailwind
3. **Responsive**: Mobile-friendly
4. **Reusable**: Common components
5. **Scalable**: Feature-based structure
6. **Pink Theme**: Màu hồng đẹp mắt
