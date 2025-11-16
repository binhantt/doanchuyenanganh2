# Admin Panel - API Integration Plan

## 🎯 Available Backend APIs

Based on `backend/src/interfaces/routes/admin/index.ts`, we have these endpoints:

### 1. Services (`/api/admin/services`)
- ✅ GET / - List all services
- ✅ GET /:id - Get by ID
- ✅ GET /slug/:slug - Get by slug
- ✅ POST / - Create service
- ✅ PUT /:id - Update service
- ✅ DELETE /:id - Delete service

### 2. Decorations (`/api/admin/decorations`)
- ✅ GET / - List all decorations
- ✅ GET /:id - Get by ID
- ✅ GET /slug/:slug - Get by slug
- ✅ POST / - Create decoration
- ✅ PUT /:id - Update decoration
- ✅ DELETE /:id - Delete decoration

### 3. Packages (`/api/admin/packages`)
- ✅ GET / - List all packages
- ✅ GET /:id - Get by ID
- ✅ GET /slug/:slug - Get by slug
- ✅ POST / - Create package
- ✅ PUT /:id - Update package
- ✅ DELETE /:id - Delete package

### 4. Products (`/api/admin/products`)
- ✅ GET / - List all products
- ✅ GET /:id - Get by ID
- ✅ GET /slug/:slug - Get by slug
- ✅ POST / - Create product
- ✅ PUT /:id - Update product
- ✅ PUT /:id/stock - Update stock
- ✅ DELETE /:id - Delete product

### 5. Galleries (`/api/admin/galleries`)
- ✅ GET / - List all galleries
- ✅ GET /:id - Get by ID
- ✅ GET /related/:relatedType/:relatedId - Get by related
- ✅ GET /primary/:relatedType/:relatedId - Get primary image
- ✅ POST / - Create gallery
- ✅ PUT /:id - Update gallery
- ✅ PUT /:id/primary - Set primary image
- ✅ PUT /:id/order - Update display order
- ✅ DELETE /:id - Delete gallery

### 6. Testimonials (`/api/admin/testimonials`)
- ✅ GET / - List all testimonials
- ✅ GET /:id - Get by ID
- ✅ POST / - Create testimonial
- ✅ PUT /:id - Update testimonial
- ✅ DELETE /:id - Delete testimonial

### 7. FAQs (`/api/admin/faqs`)
- ✅ GET / - List all FAQs
- ✅ GET /:id - Get by ID
- ✅ POST / - Create FAQ
- ✅ PUT /:id - Update FAQ
- ✅ DELETE /:id - Delete FAQ

### 8. Consultations (`/api/admin/consultations`)
- ✅ GET / - List all consultations
- ✅ GET /:id - Get by ID
- ✅ GET /status/:status - Get by status
- ✅ PUT /:id - Update consultation
- ✅ DELETE /:id - Delete consultation

### 9. Orders (`/api/admin/orders`)
- ✅ GET / - List all orders
- ✅ GET /:id - Get by ID
- ✅ GET /status/:status - Get by status
- ✅ PUT /:id - Update order
- ✅ DELETE /:id - Delete order

### 10. Promotions (`/api/admin/promotions`)
- ✅ GET / - List all promotions
- ✅ GET /:id - Get by ID
- ✅ GET /code/:code - Get by code
- ✅ GET /service/:serviceId - Get by service
- ✅ GET /package/:packageId - Get by package
- ✅ POST / - Create promotion
- ✅ PUT /:id - Update promotion
- ✅ DELETE /:id - Delete promotion

### 11. Vouchers (`/api/admin/vouchers`)
- ✅ GET / - List all vouchers
- ✅ GET /active - Get active vouchers
- ✅ GET /code/:code - Get by code
- ✅ GET /:id - Get by ID
- ✅ POST / - Create voucher
- ✅ PUT /:id - Update voucher
- ✅ DELETE /:id - Delete voucher

## 📋 Admin Panel Features to Build

### Phase 1: Core Management (Priority High)
1. ✅ **Services Management** - CRUD for services
2. ✅ **Packages Management** - CRUD for wedding packages
3. ✅ **Products Management** - CRUD for products with stock
4. ✅ **Decorations Management** - CRUD for decorations

### Phase 2: Content Management (Priority High)
5. ✅ **Gallery Management** - Image management with primary/order
6. ✅ **Testimonials Management** - Customer reviews
7. ✅ **FAQs Management** - Frequently asked questions

### Phase 3: Business Operations (Priority Medium)
8. ✅ **Orders Management** - View and manage orders
9. ✅ **Consultations Management** - Handle consultation requests
10. ✅ **Promotions Management** - Manage promotions
11. ✅ **Vouchers Management** - Manage discount vouchers

### Phase 4: Dashboard & Analytics (Priority Medium)
12. ✅ **Dashboard** - Statistics and overview
13. ✅ **Reports** - Sales and performance reports

## 🎨 UI Components Needed

### Already Created:
- ✅ BaseInput, BaseTextarea, BaseSelect
- ✅ BaseImage, BaseDatePicker
- ✅ BaseButton, IconButton, SubmitButton
- ✅ BaseModal, ConfirmModal, FormModal
- ✅ PinkCard
- ✅ AdminLayout with pink theme

### To Create:
- 🔲 ImageGalleryManager - For managing multiple images
- 🔲 RichTextEditor - For descriptions
- 🔲 StatusBadge - For order/consultation status
- 🔲 PriceInput - For currency input
- 🔲 StockManager - For product stock
- 🔲 FeatureList - For package features

## 📁 Folder Structure

```
admin-panel/src/features/
├── services/          # ✅ To build
├── packages/          # ✅ To build
├── products/          # ✅ To build
├── decorations/       # ✅ To build
├── galleries/         # ✅ To build
├── testimonials/      # ✅ To build
├── faqs/              # ✅ To build
├── orders/            # ✅ To build
├── consultations/     # ✅ To build
├── promotions/        # ✅ To build
└── vouchers/          # ✅ To build
```

Each feature will have:
```
feature/
├── components/
│   ├── FeatureTable.vue
│   ├── FeatureForm.vue
│   └── FeatureFilter.vue
├── pages/
│   └── FeatureListPage.vue
├── services/
│   └── feature.service.ts
└── types/
    └── feature.types.ts
```

## 🔐 Authentication

All admin routes require:
```typescript
headers: {
  'Authorization': 'Bearer <token>',
  'Content-Type': 'application/json'
}
```

Token is stored in `localStorage.getItem('token')`

## 🚀 Implementation Order

### Week 1: Core Features
1. Services Management
2. Packages Management
3. Products Management

### Week 2: Content & Media
4. Decorations Management
5. Gallery Management
6. Testimonials Management
7. FAQs Management

### Week 3: Business Operations
8. Orders Management
9. Consultations Management
10. Promotions Management
11. Vouchers Management

### Week 4: Polish & Testing
12. Dashboard with real data
13. Reports and analytics
14. Testing and bug fixes
15. Documentation

## 📊 Data Models

### Service
```typescript
interface Service {
  id: string
  name: string
  slug: string
  shortDescription: string
  fullDescription: string
  icon: string
  features: string[]
  basePrice: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}
```

### Package
```typescript
interface Package {
  id: string
  name: string
  slug: string
  description: string
  price: number
  originalPrice?: number
  features: string[]
  images: string[]
  isPopular: boolean
  isActive: boolean
  createdAt: string
  updatedAt: string
}
```

### Product
```typescript
interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  stock: number
  images: string[]
  category: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}
```

## 🎯 Next Steps

1. Create service layer for each feature
2. Create types for each feature
3. Create table components
4. Create form components
5. Create list pages
6. Update router
7. Test with real API
8. Add error handling
9. Add loading states
10. Add success messages

---

**Status**: Ready to implement
**Priority**: High
**Estimated Time**: 3-4 weeks
