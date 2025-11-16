# Quick Start Guide - Wedding Admin Panel

## Bắt đầu nhanh

### 1. Cài đặt

```bash
cd admin-panel
npm install
```

### 2. Chạy ứng dụng

```bash
npm run dev
```

Truy cập: http://localhost:3001

### 3. Đăng nhập

- Email: admin@example.com
- Password: (bất kỳ - mock login)

## Cấu trúc dự án

```
admin-panel/
├── src/
│   ├── components/common/     # Components dùng chung
│   ├── features/              # Các module chức năng
│   ├── hooks/                 # Composables
│   ├── layouts/               # Layouts
│   ├── pages/                 # Pages
│   ├── router/                # Router config
│   ├── types/                 # TypeScript types
│   └── utils/                 # Utilities
```

## Tính năng đã có

### ✅ Hoàn thành
- Login page
- Dashboard với thống kê
- Quản lý danh mục (Categories) - CRUD đầy đủ
- Layout admin với sidebar menu
- Common components (Input, Button, Modal)
- Pagination
- Filter & Search
- Image upload

### 🚧 Cần phát triển
- Services management
- Packages management
- Products management
- Orders management

## Tạo feature mới

### Ví dụ: Tạo Products Management

#### 1. Tạo types

```typescript
// src/features/products/types/product.types.ts
export interface Product {
  id: number
  name: string
  price: number
  image: string
  categoryId: number
  isActive: boolean
}
```

#### 2. Tạo service

```typescript
// src/features/products/services/products.service.ts
import http from '@/utils/http'

export const productsService = {
  async getProducts(params) {
    return http.get('/admin/products', { params })
  },
  async createProduct(data) {
    return http.post('/admin/products', data)
  }
}
```

#### 3. Tạo components

```vue
<!-- src/features/products/components/ProductTable.vue -->
<template>
  <a-table :columns="columns" :data-source="products" />
</template>
```

#### 4. Tạo page

```vue
<!-- src/features/products/pages/ProductListPage.vue -->
<template>
  <div>
    <h1>Quản lý sản phẩm</h1>
    <product-table :products="products" />
  </div>
</template>
```

#### 5. Thêm route

```typescript
// src/router/index.ts
{
  path: 'products',
  component: () => import('@/features/products/pages/ProductListPage.vue')
}
```

## Common Components Usage

### BaseInput

```vue
<base-input
  v-model="formData.name"
  label="Tên sản phẩm"
  placeholder="Nhập tên"
  required
  :error="errors.name"
/>
```

### BaseSelect

```vue
<base-select
  v-model="formData.categoryId"
  label="Danh mục"
  :options="categoryOptions"
  required
/>
```

### BaseImage

```vue
<base-image
  v-model="formData.image"
  label="Ảnh sản phẩm"
  :max-count="1"
/>
```

### BaseButton

```vue
<base-button type="primary" :icon="PlusOutlined" @click="handleCreate">
  Thêm mới
</base-button>
```

## Composables Usage

### usePagination

```typescript
const { pagination, setPage, setLimit, setTotal } = usePagination()

// Fetch data
const response = await api.getData({
  page: pagination.value.page,
  limit: pagination.value.limit
})

setTotal(response.pagination.total)
```

### useModal

```typescript
const { visible, loading, open, close, setLoading } = useModal()

const handleCreate = () => {
  open()
}

const handleSubmit = async () => {
  setLoading(true)
  await api.create(data)
  close()
}
```

## API Integration

### Cấu hình

```env
# .env
VITE_API_URL=http://localhost:3000/api
```

### Sử dụng

```typescript
import http from '@/utils/http'

// GET request
const data = await http.get('/admin/products')

// POST request
const result = await http.post('/admin/products', { name: 'Product 1' })

// PUT request
await http.put('/admin/products/1', { name: 'Updated' })

// DELETE request
await http.delete('/admin/products/1')
```

## Styling

### Tailwind Classes

```vue
<div class="flex justify-between items-center mb-6">
  <h1 class="text-2xl font-bold">Title</h1>
  <button class="px-4 py-2 bg-primary text-white rounded">Button</button>
</div>
```

### Ant Design Components

```vue
<a-button type="primary">Primary</a-button>
<a-table :columns="columns" :data-source="data" />
<a-modal :open="visible" title="Modal">Content</a-modal>
```

## Tips

1. **Sử dụng TypeScript**: Luôn định nghĩa types cho data
2. **Tách logic**: Sử dụng composables cho logic phức tạp
3. **Reuse components**: Tạo common components cho UI lặp lại
4. **Error handling**: Xử lý errors ở service layer
5. **Loading states**: Hiển thị loading khi fetch data

## Troubleshooting

### Lỗi "Cannot find module"
```bash
npm install
```

### Port bị chiếm
Đổi port trong `vite.config.ts`:
```typescript
server: { port: 3002 }
```

### API không kết nối được
- Kiểm tra backend đang chạy
- Kiểm tra VITE_API_URL trong .env
- Kiểm tra CORS ở backend

## Next Steps

1. Hoàn thiện các feature còn lại (Services, Packages, Products, Orders)
2. Thêm authentication thật với JWT
3. Thêm role-based access control
4. Thêm file upload thật (hiện tại mock)
5. Thêm charts và analytics
6. Thêm notifications
7. Thêm settings page

## Resources

- [Vue 3 Docs](https://vuejs.org/)
- [Ant Design Vue](https://antdv.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
