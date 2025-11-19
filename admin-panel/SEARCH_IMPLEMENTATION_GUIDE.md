# Hướng Dẫn Thêm Tìm Kiếm Cho Mọi Trang Admin

## Cấu Trúc Chung

Mỗi trang admin cần 3 phần để có chức năng tìm kiếm:

1. **Backend API** - Xử lý query search
2. **Service** - Gọi API với params
3. **Filter Component** - UI tìm kiếm

## 1. Backend API - Controller

### Pattern chung cho tất cả controllers:

```typescript
// backend/src/interfaces/controllers/[feature].controller.ts

async getAll(req: Request, res: Response): Promise<void> {
  try {
    const { 
      keyword,      // Tìm kiếm text
      status,       // Filter theo status
      category,     // Filter theo category
      sortBy,       // Sắp xếp theo field
      sortOrder,    // asc hoặc desc
      page,         // Phân trang
      limit         // Số items per page
    } = req.query;

    // Gọi service với filters
    const result = await this.service.getAll({
      keyword: keyword as string,
      status: status as string,
      category: category as string,
      sortBy: sortBy as string,
      sortOrder: sortOrder as 'asc' | 'desc',
      page: page ? parseInt(page as string) : 1,
      limit: limit ? parseInt(limit as string) : 10,
    });

    res.json({
      success: true,
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch data',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
```

## 2. Backend Service - Xử Lý Search

### Pattern chung:

```typescript
// backend/src/application/services/[Feature]Service.ts

async getAll(filters: FilterOptions) {
  let query = this.repository.query();

  // 1. Keyword search - Tìm trong nhiều fields
  if (filters.keyword) {
    query = query.where((builder) => {
      builder
        .where('name', 'like', `%${filters.keyword}%`)
        .orWhere('description', 'like', `%${filters.keyword}%`)
        .orWhere('email', 'like', `%${filters.keyword}%`);
    });
  }

  // 2. Status filter
  if (filters.status) {
    query = query.where('status', filters.status);
  }

  // 3. Category filter
  if (filters.category) {
    query = query.where('category', filters.category);
  }

  // 4. Date range filter
  if (filters.dateFrom) {
    query = query.where('created_at', '>=', filters.dateFrom);
  }
  if (filters.dateTo) {
    query = query.where('created_at', '<=', filters.dateTo);
  }

  // 5. Sorting
  const sortBy = filters.sortBy || 'created_at';
  const sortOrder = filters.sortOrder || 'desc';
  query = query.orderBy(sortBy, sortOrder);

  // 6. Pagination
  const page = filters.page || 1;
  const limit = filters.limit || 10;
  const offset = (page - 1) * limit;

  const total = await query.clone().count('* as count').first();
  const data = await query.limit(limit).offset(offset);

  return {
    data,
    pagination: {
      page,
      limit,
      total: total?.count || 0,
      totalPages: Math.ceil((total?.count || 0) / limit),
    },
  };
}
```

## 3. Frontend Service

### Pattern chung:

```typescript
// admin-panel/src/features/[feature]/services/[feature].service.ts

import http from '@/utils/http'
import type { Item, ItemFilter } from '../types/[feature].types'

export const itemsService = {
  async getItems(filters?: ItemFilter) {
    const params = new URLSearchParams()
    
    if (filters?.keyword) params.append('keyword', filters.keyword)
    if (filters?.status) params.append('status', filters.status)
    if (filters?.category) params.append('category', filters.category)
    if (filters?.dateFrom) params.append('dateFrom', filters.dateFrom)
    if (filters?.dateTo) params.append('dateTo', filters.dateTo)
    if (filters?.sortBy) params.append('sortBy', filters.sortBy)
    if (filters?.sortOrder) params.append('sortOrder', filters.sortOrder)
    if (filters?.page) params.append('page', filters.page.toString())
    if (filters?.limit) params.append('limit', filters.limit.toString())

    const queryString = params.toString()
    const url = `/admin/items${queryString ? `?${queryString}` : ''}`
    
    return http.get<Item[]>(url)
  }
}
```

## 4. Frontend Filter Component

### Pattern chung:

```vue
<!-- admin-panel/src/features/[feature]/components/[Feature]Filter.vue -->
<template>
  <pink-card class="mb-6">
    <a-form layout="inline" class="flex flex-wrap gap-4">
      <!-- Keyword Search -->
      <a-form-item label="Tìm kiếm">
        <a-input
          v-model:value="filters.keyword"
          placeholder="Nhập từ khóa..."
          style="width: 300px"
          @pressEnter="handleFilter"
        >
          <template #prefix>
            <search-outlined />
          </template>
        </a-input>
      </a-form-item>

      <!-- Status Filter -->
      <a-form-item label="Trạng thái">
        <a-select
          v-model:value="filters.status"
          placeholder="Tất cả"
          style="width: 150px"
          @change="handleFilter"
          allowClear
        >
          <a-select-option value="active">Hoạt động</a-select-option>
          <a-select-option value="inactive">Không hoạt động</a-select-option>
        </a-select>
      </a-form-item>

      <!-- Date Range -->
      <a-form-item label="Từ ngày">
        <a-date-picker
          v-model:value="filters.dateFrom"
          format="DD/MM/YYYY"
          @change="handleFilter"
        />
      </a-form-item>

      <a-form-item label="Đến ngày">
        <a-date-picker
          v-model:value="filters.dateTo"
          format="DD/MM/YYYY"
          @change="handleFilter"
        />
      </a-form-item>

      <!-- Action Buttons -->
      <a-form-item>
        <a-button type="primary" @click="handleFilter">
          <search-outlined /> Tìm kiếm
        </a-button>
      </a-form-item>

      <a-form-item>
        <a-button @click="handleReset">
          <reload-outlined /> Đặt lại
        </a-button>
      </a-form-item>
    </a-form>
  </pink-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons-vue'
import PinkCard from '@/components/common/card/PinkCard.vue'
import type { ItemFilter } from '../types/[feature].types'

const emit = defineEmits<{
  filter: [filters: ItemFilter]
}>()

const filters = ref<ItemFilter>({
  keyword: '',
  status: undefined,
  dateFrom: undefined,
  dateTo: undefined
})

const handleFilter = () => {
  emit('filter', filters.value)
}

const handleReset = () => {
  filters.value = {
    keyword: '',
    status: undefined,
    dateFrom: undefined,
    dateTo: undefined
  }
  handleFilter()
}
</script>
```

## 5. Ví Dụ Cụ Thể

### Ví dụ 1: FAQs (Đã có)

✅ Backend: `backend/src/interfaces/controllers/faq.controller.ts`
✅ Service: `admin-panel/src/features/faqs/services/faqs.service.ts`
✅ Filter: `admin-panel/src/features/faqs/components/FAQFilter.vue`

### Ví dụ 2: Consultations (Đã có)

✅ Backend: `backend/src/interfaces/controllers/consultation.controller.ts`
✅ Service: `admin-panel/src/features/consultations/services/consultations.service.ts`
✅ Filter: `admin-panel/src/features/consultations/components/ConsultationFilter.vue`

### Ví dụ 3: Thêm Search cho Products

#### Step 1: Update Backend Controller

```typescript
// backend/src/interfaces/controllers/product.controller.ts

async getAllProducts(req: Request, res: Response): Promise<void> {
  try {
    const { keyword, category, status, minPrice, maxPrice, sortBy, sortOrder } = req.query;

    const products = await this.productService.getAll({
      keyword: keyword as string,
      category: category as string,
      status: status as string,
      minPrice: minPrice ? parseFloat(minPrice as string) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice as string) : undefined,
      sortBy: sortBy as string,
      sortOrder: sortOrder as 'asc' | 'desc',
    });

    res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    // Handle error
  }
}
```

#### Step 2: Update Service

```typescript
// backend/src/application/services/ProductService.ts

async getAll(filters: ProductFilter) {
  let query = this.repository.query();

  if (filters.keyword) {
    query = query.where((builder) => {
      builder
        .where('name', 'like', `%${filters.keyword}%`)
        .orWhere('description', 'like', `%${filters.keyword}%`);
    });
  }

  if (filters.category) {
    query = query.where('category_id', filters.category);
  }

  if (filters.minPrice) {
    query = query.where('price', '>=', filters.minPrice);
  }

  if (filters.maxPrice) {
    query = query.where('price', '<=', filters.maxPrice);
  }

  return await query.orderBy(filters.sortBy || 'created_at', filters.sortOrder || 'desc');
}
```

#### Step 3: Update Frontend Service

```typescript
// admin-panel/src/features/products/services/products.service.ts

async getProducts(filters?: ProductFilter) {
  const params = new URLSearchParams()
  
  if (filters?.keyword) params.append('keyword', filters.keyword)
  if (filters?.category) params.append('category', filters.category)
  if (filters?.minPrice) params.append('minPrice', filters.minPrice.toString())
  if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice.toString())

  const queryString = params.toString()
  return http.get<Product[]>(`/admin/products${queryString ? `?${queryString}` : ''}`)
}
```

## 6. Checklist Khi Thêm Search

- [ ] Backend controller nhận query params
- [ ] Service xử lý filters
- [ ] Repository có query builder
- [ ] Frontend service gửi params
- [ ] Filter component có UI
- [ ] Page component gọi filter
- [ ] Test search hoạt động
- [ ] Test pagination
- [ ] Test sorting

## 7. Tips & Best Practices

### Performance
- Thêm index cho các columns thường search
- Limit số results trả về
- Sử dụng pagination

### UX
- Debounce cho keyword search
- Loading state khi search
- Clear filters button
- Show số kết quả tìm được

### Security
- Validate input
- Sanitize SQL queries
- Limit query length
- Rate limiting

## 8. Common Search Fields

### Tất cả các trang nên có:
- `keyword` - Tìm kiếm text chung
- `sortBy` - Sắp xếp theo field
- `sortOrder` - asc/desc
- `page` - Phân trang
- `limit` - Items per page

### Tùy theo feature:
- `status` - active/inactive
- `category` - Danh mục
- `dateFrom/dateTo` - Khoảng thời gian
- `minPrice/maxPrice` - Khoảng giá
- `userId` - Theo user
- `isActive` - Boolean filter

Áp dụng pattern này cho tất cả các trang admin để có chức năng tìm kiếm thống nhất!
