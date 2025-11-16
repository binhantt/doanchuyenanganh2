# Wedding Admin Panel

Hệ thống quản trị cho website Wedding, được xây dựng với Vue 3 + TypeScript + Vite + Tailwind CSS + Ant Design Vue.

## Công nghệ sử dụng

- **Vue 3** - Progressive JavaScript Framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Next Generation Frontend Tooling
- **Tailwind CSS** - Utility-first CSS Framework
- **Ant Design Vue** - Enterprise-class UI components
- **Vue Router** - Official router for Vue.js
- **Pinia** - State management
- **Axios** - HTTP client

## Cấu trúc thư mục

```
admin-panel/
├── src/
│   ├── assets/              # Static assets (CSS, images)
│   ├── components/          # Global shared components
│   │   └── common/
│   │       ├── input/       # Input components (BaseInput, BaseSelect, etc.)
│   │       ├── button/      # Button components
│   │       └── modal/       # Modal components
│   ├── features/            # Feature-based modules
│   │   ├── categories/      # Category management
│   │   │   ├── components/  # Category-specific components
│   │   │   ├── pages/       # Category pages
│   │   │   ├── services/    # API services
│   │   │   └── types/       # TypeScript types
│   │   ├── services/        # Service management
│   │   ├── packages/        # Package management
│   │   ├── products/        # Product management
│   │   └── orders/          # Order management
│   ├── hooks/               # Composables (usePagination, useModal, etc.)
│   ├── layouts/             # Layout components
│   ├── pages/               # Global pages (Login, Dashboard)
│   ├── router/              # Vue Router configuration
│   ├── types/               # Global TypeScript types
│   ├── utils/               # Utility functions
│   ├── App.vue              # Root component
│   └── main.ts              # Application entry point
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Cài đặt

### 1. Cài đặt dependencies

```bash
cd admin-panel
npm install
```

### 2. Cấu hình môi trường

Tạo file `.env` và cấu hình:

```env
VITE_API_URL=http://localhost:3000/api
```

### 3. Chạy development server

```bash
npm run dev
```

Ứng dụng sẽ chạy tại: http://localhost:3001

### 4. Build production

```bash
npm run build
```

## Tính năng chính

### ✅ Đã hoàn thành

- **Authentication**: Đăng nhập, đăng xuất
- **Dashboard**: Tổng quan thống kê
- **Category Management**: Quản lý danh mục đầy đủ (CRUD)
  - Danh sách danh mục với phân trang
  - Thêm/sửa/xóa danh mục
  - Upload ảnh
  - Bật/tắt trạng thái
  - Tìm kiếm và lọc

### 🚧 Đang phát triển

- Service Management (Quản lý dịch vụ)
- Package Management (Quản lý gói dịch vụ)
- Product Management (Quản lý sản phẩm)
- Order Management (Quản lý đơn hàng)

## Components chính

### Common Components

#### Input Components
- **BaseInput**: Text input với validation
- **BaseTextarea**: Multi-line textarea
- **BaseSelect**: Dropdown select
- **BaseImage**: Image uploader với preview
- **BaseDatePicker**: Date/datetime picker

#### Button Components
- **BaseButton**: Button với nhiều variants
- **IconButton**: Icon-only button
- **SubmitButton**: Submit button cho forms

#### Modal Components
- **BaseModal**: Modal cơ bản
- **ConfirmModal**: Confirmation dialog
- **FormModal**: Modal cho forms

### Composables (Hooks)

- **usePagination**: Quản lý pagination state
- **useModal**: Quản lý modal visibility

### Utilities

- **http**: Axios instance với interceptors
- **formatDate**: Format date/datetime
- **formatCurrency**: Format tiền tệ VND

## API Integration

Tất cả API calls được thực hiện thông qua `src/utils/http.ts` với:

- Automatic token injection
- Error handling
- Response normalization
- Request/Response interceptors

### Example API Service

```typescript
import http from '@/utils/http'

export const categoriesService = {
  async getCategories(params) {
    return http.get('/admin/categories', { params })
  },
  
  async createCategory(data) {
    return http.post('/admin/categories', data)
  }
}
```

## Styling

### Tailwind CSS

Sử dụng utility classes cho layout và spacing:

```vue
<div class="flex justify-between items-center mb-6">
  <h1 class="text-2xl font-bold">Title</h1>
</div>
```

### Ant Design Vue

Sử dụng components từ Ant Design:

```vue
<a-button type="primary">Click me</a-button>
<a-table :columns="columns" :data-source="data" />
```

## Best Practices

1. **Feature-based organization**: Mỗi feature có components, services, types riêng
2. **Type safety**: Sử dụng TypeScript cho tất cả code
3. **Reusable components**: Tạo common components cho UI elements
4. **Composables**: Tách logic ra khỏi components
5. **Error handling**: Xử lý errors ở API layer
6. **Responsive design**: Sử dụng Tailwind responsive utilities

## Development Guidelines

### Thêm feature mới

1. Tạo folder trong `src/features/[feature-name]`
2. Tạo các subfolder: `components/`, `pages/`, `services/`, `types/`
3. Định nghĩa types trong `types/`
4. Tạo API service trong `services/`
5. Tạo components trong `components/`
6. Tạo page trong `pages/`
7. Thêm route trong `src/router/index.ts`

### Code style

- Sử dụng `<script setup>` syntax
- Sử dụng Composition API
- Đặt tên file theo PascalCase cho components
- Đặt tên file theo camelCase cho utilities

## Troubleshooting

### Port đã được sử dụng

Thay đổi port trong `vite.config.ts`:

```typescript
server: {
  port: 3002
}
```

### API connection error

Kiểm tra:
1. Backend server đang chạy
2. VITE_API_URL trong `.env` đúng
3. CORS được cấu hình đúng ở backend

## License

Private - Wedding Project
