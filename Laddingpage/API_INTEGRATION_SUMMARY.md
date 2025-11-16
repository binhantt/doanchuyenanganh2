# API Integration Summary - Backend & Frontend Connection

Tóm tắt kết nối API giữa Backend (port 4000) và Frontend (port 3000).

---

## ✅ Hoàn Thành

### Backend Setup (Port 4000)
- ✅ Express server chạy trên port 4000
- ✅ CORS enabled cho frontend (http://localhost:3000)
- ✅ API routes đã setup:
  - `/api/user/*` - Public endpoints
  - `/api/admin/*` - Admin endpoints
  - `/api/health` - Health check

### Frontend Setup (Port 3000)
- ✅ Axios client configured
- ✅ API config với base URL: `http://localhost:4000/api`
- ✅ Custom hooks cho mỗi feature
- ✅ Components updated để sử dụng API

---

## 🔗 API Endpoints Mapping

### Packages
```
Frontend Hook: usePackages()
Backend Endpoint: GET /api/user/packages
Backend Endpoint: GET /api/user/packages/popular
Backend Endpoint: GET /api/user/packages/:id
Backend Endpoint: GET /api/user/packages/slug/:slug
```

### Services
```
Frontend Hook: useServices()
Backend Endpoint: GET /api/user/services
Backend Endpoint: GET /api/user/services/:id
Backend Endpoint: GET /api/user/services/slug/:slug
```

### Products
```
Frontend Hook: useProducts()
Backend Endpoint: GET /api/user/products
Backend Endpoint: GET /api/user/products/featured
Backend Endpoint: GET /api/user/products/category/:category
Backend Endpoint: GET /api/user/products/:id
Backend Endpoint: GET /api/user/products/slug/:slug
```

### Testimonials
```
Frontend Hook: useTestimonials()
Backend Endpoint: GET /api/user/testimonials
Backend Endpoint: GET /api/user/testimonials/:id
```

### Gallery
```
Frontend Hook: useGallery()
Backend Endpoint: GET /api/user/galleries
Backend Endpoint: GET /api/user/galleries/:id
Backend Endpoint: GET /api/user/galleries/related/:relatedType/:relatedId
Backend Endpoint: GET /api/user/galleries/primary/:relatedType/:relatedId
```

### FAQ
```
Frontend Hook: useFAQ()
Backend Endpoint: GET /api/user/faqs
Backend Endpoint: GET /api/user/faqs/:id
Backend Endpoint: GET /api/user/faqs/category/:category
Backend Endpoint: GET /api/user/faqs/language/:language
```

### Consultations
```
Frontend Hook: useConsultations()
Backend Endpoint: POST /api/user/consultations
Backend Endpoint: GET /api/user/consultations/:id
Backend Endpoint: GET /api/user/consultations/email/:email
```

---

## 📝 Updated Components

### 1. WeddingPackages
- ✅ Sử dụng `usePackages()` hook
- ✅ Fallback to default data nếu API fail
- ✅ Loading state
- ✅ Error handling

### 2. ProductsList
- ✅ Sử dụng `useProducts()` hook
- ✅ Fallback to default data
- ✅ Loading state
- ✅ Error handling

### 3. TestimonialsSection
- ✅ Sử dụng `useTestimonials()` hook
- ✅ Fallback to default data
- ✅ Loading state
- ✅ Error handling

### 4. ServiceFeatures
- ✅ Sử dụng `useServices()` hook
- ✅ Fallback to default data
- ✅ Loading state
- ✅ Error handling

### 5. FAQSection
- ✅ Sử dụng `useFAQ()` hook
- ✅ Fallback to default data
- ✅ Loading state
- ✅ Error handling

### 6. GallerySection
- ✅ Sử dụng `useGallery()` hook
- ✅ Fallback to default data
- ✅ Loading state
- ✅ Error handling

---

## 🚀 Cách Chạy

### 1. Start Backend
```bash
cd backend
npm install
npm run dev
# Server chạy tại http://localhost:4000
```

### 2. Start Frontend
```bash
cd Laddingpage
npm install
npm run dev
# App chạy tại http://localhost:3000
```

### 3. Kiểm Tra Kết Nối
```bash
# Test backend health
curl http://localhost:4000/api/health

# Test packages endpoint
curl http://localhost:4000/api/user/packages

# Test services endpoint
curl http://localhost:4000/api/user/services
```

---

## 📁 File Structure

### Frontend API Layer
```
src/features/api/
├── config.ts                 # API configuration
├── client.ts                 # Axios instance
├── types.ts                  # TypeScript types
├── packages.ts               # Packages API
├── services.ts               # Services API
├── products.ts               # Products API
├── testimonials.ts           # Testimonials API
├── gallery.ts                # Gallery API
├── faq.ts                    # FAQ API
├── consultations.ts          # Consultations API
├── index.ts                  # Main export
└── hooks/
    ├── usePackages.ts
    ├── useServices.ts
    ├── useProducts.ts
    ├── useTestimonials.ts
    ├── useFAQ.ts
    ├── useGallery.ts
    └── index.ts
```

### Updated Components
```
src/features/
├── packages/components/WeddingPackages.tsx      ✅ Updated
├── products/components/ProductsList.tsx         ✅ Updated
├── testimonials/components/TestimonialsSection.tsx ✅ Updated
├── services/components/ServiceFeatures.tsx      ✅ Updated
├── faq/components/FAQSection.tsx                ✅ Updated
└── gallery/components/GallerySection.tsx        ✅ Updated
```

---

## 🔧 Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### Backend (.env)
```env
PORT=4000
NODE_ENV=development
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASS=your_password
DB_NAME=wedding_service
CORS_ORIGIN=http://localhost:3000
```

---

## 🧪 Testing

### Test Packages API
```bash
curl http://localhost:4000/api/user/packages
```

### Test Services API
```bash
curl http://localhost:4000/api/user/services
```

### Test Products API
```bash
curl http://localhost:4000/api/user/products
```

### Test Testimonials API
```bash
curl http://localhost:4000/api/user/testimonials
```

### Test Gallery API
```bash
curl http://localhost:4000/api/user/galleries
```

### Test FAQ API
```bash
curl http://localhost:4000/api/user/faqs
```

---

## 🐛 Troubleshooting

### CORS Error
**Problem**: `Access to XMLHttpRequest blocked by CORS policy`

**Solution**: 
1. Kiểm tra backend CORS config
2. Đảm bảo `CORS_ORIGIN=http://localhost:3000` trong backend .env
3. Restart backend server

### API Not Responding
**Problem**: `Failed to fetch`

**Solution**:
1. Kiểm tra backend đang chạy: `curl http://localhost:4000/api/health`
2. Kiểm tra frontend .env có `NEXT_PUBLIC_API_URL` đúng
3. Kiểm tra port 4000 không bị chiếm

### Data Not Loading
**Problem**: Components hiển thị default data

**Solution**:
1. Kiểm tra API endpoint trong browser DevTools Network tab
2. Kiểm tra response status code
3. Kiểm tra database có data không

---

## 📊 Data Flow

```
Frontend Component
    ↓
useHook (e.g., usePackages)
    ↓
API Service (e.g., packagesApi.getAll())
    ↓
Axios Client
    ↓
Backend API (http://localhost:4000/api/user/packages)
    ↓
Backend Controller
    ↓
Backend Service
    ↓
Database
    ↓
Response → Frontend Component
```

---

## ✨ Features

- ✅ Automatic API calls on component mount
- ✅ Loading states
- ✅ Error handling
- ✅ Fallback to default data
- ✅ Type-safe with TypeScript
- ✅ Reusable hooks
- ✅ Centralized API config
- ✅ CORS enabled
- ✅ Request/Response interceptors

---

## 🎯 Next Steps

1. **Database Setup**
   - Tạo database `wedding_service`
   - Chạy migrations: `npm run migrate:latest`
   - Seed data: `npm run seed:run`

2. **Testing**
   - Test tất cả endpoints với cURL
   - Kiểm tra frontend components load data từ API

3. **Deployment**
   - Deploy backend to production
   - Update `NEXT_PUBLIC_API_URL` trong frontend
   - Deploy frontend

---

**Status**: ✅ API Integration Complete
**Last Updated**: 2025-11-16
