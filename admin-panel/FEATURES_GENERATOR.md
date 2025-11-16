# Features Generator Guide

## 🚀 Quick Feature Generation

Để tạo nhanh các features còn lại, copy pattern từ Services:

### 1. Services (✅ Done)
- Types: `service.types.ts`
- Service: `services.service.ts`
- Components: Table, Form, Filter
- Page: ServiceListPage.vue

### 2. Packages (To Generate)
```bash
# Copy Services structure
cp -r src/features/services src/features/packages
# Replace "Service" with "Package" in all files
# Update types and API endpoints
```

### 3. Products (To Generate)
```bash
cp -r src/features/services src/features/products
# Update for Product model
```

### 4. Decorations (To Generate)
```bash
cp -r src/features/services src/features/decorations
# Update for Decoration model
```

### 5. Orders (To Generate)
```bash
cp -r src/features/services src/features/orders
# Update for Order model with status
```

### 6. Testimonials (To Generate)
```bash
cp -r src/features/services src/features/testimonials
# Update for Testimonial model
```

### 7. FAQs (To Generate)
```bash
cp -r src/features/services src/features/faqs
# Update for FAQ model
```

### 8. Consultations (To Generate)
```bash
cp -r src/features/services src/features/consultations
# Update for Consultation model with status
```

### 9. Promotions (To Generate)
```bash
cp -r src/features/services src/features/promotions
# Update for Promotion model
```

### 10. Vouchers (To Generate)
```bash
cp -r src/features/services src/features/vouchers
# Update for Voucher model
```

### 11. Galleries (To Generate)
```bash
cp -r src/features/services src/features/galleries
# Update for Gallery model with image management
```

## 📝 Pattern for Each Feature

### Types File
```typescript
export interface FeatureName {
  id: string
  // ... fields
  createdAt: string
  updatedAt: string
}

export interface FeatureNameFormData {
  // ... editable fields
}

export interface FeatureNameFilter {
  keyword?: string
  // ... filter fields
}
```

### Service File
```typescript
import http from '@/utils/http'

export const featureService = {
  async getAll(params?) { return http.get('/admin/features', { params }) },
  async getById(id) { return http.get(`/admin/features/${id}`) },
  async create(data) { return http.post('/admin/features', data) },
  async update(id, data) { return http.put(`/admin/features/${id}`, data) },
  async delete(id) { return http.delete(`/admin/features/${id}`) }
}
```

### Table Component
- Display data in a-table
- Actions: Edit, Delete
- Pagination
- Status toggle if applicable

### Form Component
- All input fields
- Validation
- Submit/Cancel buttons

### List Page
- Header with title and "Add" button
- Filter component
- Table component
- Modal for create/edit

## 🎯 Priority Order

1. **Services** ✅ (Template done)
2. **Packages** (High priority - main product)
3. **Products** (High priority - inventory)
4. **Orders** (High priority - business critical)
5. **Decorations** (Medium priority)
6. **Testimonials** (Medium priority - marketing)
7. **FAQs** (Medium priority - support)
8. **Consultations** (Medium priority - leads)
9. **Promotions** (Low priority - marketing)
10. **Vouchers** (Low priority - discounts)
11. **Galleries** (Low priority - media management)

## 🔧 Customizations Needed

### Orders
- Status badges (pending, confirmed, completed, cancelled)
- Customer info display
- Order items list
- Total calculation
- Status update actions

### Consultations
- Status workflow (new, contacted, scheduled, completed)
- Contact information
- Notes field
- Follow-up reminders

### Promotions & Vouchers
- Date range picker
- Discount type (percentage/fixed)
- Usage limits
- Active/expired status

### Galleries
- Multiple image upload
- Image preview
- Set primary image
- Reorder images
- Related entity selection

## 📊 Dashboard Integration

Once features are done, update Dashboard with:
- Total counts for each entity
- Recent items
- Status summaries
- Quick actions

## 🎨 UI Enhancements

- Loading skeletons
- Empty states
- Error boundaries
- Success toasts
- Confirmation dialogs
- Bulk actions
- Export functionality
- Search and filters
- Sorting
- Pagination

---

**Next**: Start with Packages feature as it's the most important for the wedding business.
