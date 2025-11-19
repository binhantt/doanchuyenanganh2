# 📚 API Documentation - Wedding Service Platform

## 🌐 Base URL
```
Development: http://localhost:4000/api
Production: https://your-domain.com/api
```

## 🔑 Authentication

### Admin Routes
Tất cả routes `/api/admin/*` yêu cầu authentication:

```http
Authorization: Bearer <your-jwt-token>
```

**Headers:**
```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "Content-Type": "application/json"
}
```

---

## 📋 Table of Contents

1. [Services API](#services-api)
2. [Decorations API](#decorations-api)
3. [Packages API](#packages-api)
4. [Products API](#products-api)
5. [Gallery API](#gallery-api)
6. [Testimonials API](#testimonials-api)
7. [FAQ API](#faq-api)
8. [Consultations API](#consultations-api)
9. [Orders API](#orders-api)
10. [Promotions API](#promotions-api)
11. [Vouchers API](#vouchers-api)
12. [Error Responses](#error-responses)

---

## 🎯 Services API

### User Routes (Public)

#### 1. Get Active Services
```http
GET /api/user/services
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Wedding Decoration",
      "slug": "wedding-decoration",
      "shortDescription": "Luxury romantic decoration",
      "icon": "Flower",
      "basePrice": 5000000,
      "isActive": true,
      "images": []
    }
  ],
  "count": 10
}
```

#### 2. Get Service by ID
```http
GET /api/user/services/:id
```

#### 3. Get Service by Slug
```http
GET /api/user/services/slug/:slug
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Wedding Decoration",
    "slug": "wedding-decoration",
    "shortDescription": "Luxury romantic decoration",
    "fullDescription": "Complete description...",
    "icon": "Flower",
    "features": ["Feature 1", "Feature 2"],
    "basePrice": 5000000,
    "isActive": true,
    "images": [],
    "createdAt": "2025-11-15T10:00:00.000Z",
    "updatedAt": "2025-11-15T10:00:00.000Z"
  }
}
```

#### 4. Get Service Images
```http
GET /api/user/services/:id/images
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "Wedding Decoration",
      "altText": "Beautiful decoration",
      "fileUrl": "https://example.com/images/service1.jpg",
      "isPrimary": true,
      "displayOrder": 1,
      "isActive": true
    }
  ],
  "count": 5
}
```

### Admin Routes (Requires Auth)

#### 4. List All Services
```http
GET /api/admin/services
GET /api/admin/services?active=true
```

#### 5. Create Service
```http
POST /api/admin/services
```

**Request Body:**
```json
{
  "name": "Wedding Decoration",
  "slug": "wedding-decoration",
  "shortDescription": "Luxury romantic decoration",
  "fullDescription": "Complete description...",
  "icon": "Flower",
  "features": ["Feature 1", "Feature 2"],
  "basePrice": 5000000,
  "isActive": true
}
```

#### 6. Update Service
```http
PUT /api/admin/services/:id
```

#### 7. Delete Service
```http
DELETE /api/admin/services/:id
```

#### 8. Get Service Images
```http
GET /api/admin/services/:id/images
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "Wedding Decoration",
      "altText": "Beautiful decoration",
      "fileUrl": "https://example.com/images/service1.jpg",
      "fileName": "service1.jpg",
      "mimeType": "image/jpeg",
      "category": "service",
      "relatedId": "service-uuid",
      "relatedType": "service",
      "isPrimary": true,
      "displayOrder": 1,
      "isActive": true
    }
  ],
  "count": 5
}
```

#### 9. Add Image to Service
```http
POST /api/admin/services/:id/images
```

**Request Body:**
```json
{
  "imageUrl": "https://example.com/images/service-new.jpg",
  "altText": "Beautiful wedding decoration",
  "caption": "Premium decoration setup",
  "isPrimary": false,
  "displayOrder": 2
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Beautiful wedding decoration",
    "altText": "Beautiful wedding decoration",
    "fileUrl": "https://example.com/images/service-new.jpg",
    "fileName": "service-new.jpg",
    "category": "service",
    "relatedId": "service-uuid",
    "relatedType": "service",
    "isPrimary": false,
    "displayOrder": 2,
    "isActive": true,
    "createdAt": "2025-11-19T10:00:00.000Z"
  },
  "message": "Image added successfully"
}
```

#### 10. Remove Image from Service
```http
DELETE /api/admin/services/:id/images/:imageId
```

**Response:**
```json
{
  "success": true,
  "message": "Image removed successfully"
}
```

---

## 🎨 Decorations API

### User Routes (Public)

#### 1. Get Active Decorations
```http
GET /api/user/decorations
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Romantic Pink Theme",
      "slug": "romantic-pink-theme",
      "description": "Beautiful pink decoration",
      "category": "wedding",
      "basePrice": 3000000,
      "isActive": true,
      "images": []
    }
  ],
  "count": 15
}
```

#### 2. Get Decoration by ID
```http
GET /api/user/decorations/:id
```

#### 3. Get Decoration by Slug
```http
GET /api/user/decorations/slug/:slug
```

### Admin Routes (Requires Auth)

#### 4. List All Decorations
```http
GET /api/admin/decorations
```

#### 5. Create Decoration
```http
POST /api/admin/decorations
```

**Request Body:**
```json
{
  "name": "Romantic Pink Theme",
  "slug": "romantic-pink-theme",
  "description": "Beautiful pink decoration",
  "category": "wedding",
  "basePrice": 3000000,
  "isActive": true
}
```

#### 6. Update Decoration
```http
PUT /api/admin/decorations/:id
```

#### 7. Delete Decoration
```http
DELETE /api/admin/decorations/:id
```

---

## 💍 Packages API

### User Routes (Public)

#### 1. Get Active Packages
```http
GET /api/user/packages
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Premium Wedding Package",
      "slug": "premium-wedding-package",
      "description": "Complete wedding package",
      "price": 50000000,
      "originalPrice": 60000000,
      "isPopular": true,
      "isActive": true,
      "features": [
        {
          "id": "uuid",
          "name": "Professional Photography",
          "description": "Full day coverage",
          "isIncluded": true
        }
      ],
      "images": []
    }
  ],
  "count": 5
}
```

#### 2. Get Popular Packages
```http
GET /api/user/packages/popular
```

#### 3. Get Package by ID
```http
GET /api/user/packages/:id
```

#### 4. Get Package by Slug
```http
GET /api/user/packages/slug/:slug
```

### Admin Routes (Requires Auth)

#### 5. List All Packages
```http
GET /api/admin/packages
```

#### 6. Create Package
```http
POST /api/admin/packages
```

**Request Body:**
```json
{
  "name": "Premium Wedding Package",
  "slug": "premium-wedding-package",
  "description": "Complete wedding package",
  "price": 50000000,
  "originalPrice": 60000000,
  "isPopular": true,
  "isActive": true,
  "features": [
    {
      "name": "Professional Photography",
      "description": "Full day coverage",
      "isIncluded": true
    }
  ]
}
```

#### 7. Update Package
```http
PUT /api/admin/packages/:id
```

#### 8. Delete Package
```http
DELETE /api/admin/packages/:id
```

---

## 🛍️ Products API

### User Routes (Public)

#### 1. Get Active Products
```http
GET /api/user/products
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Wedding Cake 3 Tiers",
      "slug": "wedding-cake-3-tiers",
      "description": "Delicious wedding cake",
      "category": "cake",
      "price": 2000000,
      "originalPrice": 2500000,
      "stockQuantity": 10,
      "unit": "piece",
      "isFeatured": true,
      "isActive": true,
      "images": []
    }
  ],
  "count": 20
}
```

#### 2. Get Featured Products
```http
GET /api/user/products/featured
```

#### 3. Get Products by Category
```http
GET /api/user/products/category/:category
```

**Categories:** `cake`, `decoration`, `flower`, `invitation`, `favor`, `other`

#### 4. Get Product by ID
```http
GET /api/user/products/:id
```

#### 5. Get Product by Slug
```http
GET /api/user/products/slug/:slug
```

### Admin Routes (Requires Auth)

#### 6. List All Products
```http
GET /api/admin/products
```

#### 7. Get Product Stock
```http
GET /api/admin/products/:id/stock
```

**Response:**
```json
{
  "success": true,
  "data": {
    "productId": "uuid",
    "stockQuantity": 10,
    "unit": "piece"
  }
}
```

#### 8. Create Product
```http
POST /api/admin/products
```

**Request Body:**
```json
{
  "name": "Wedding Cake 3 Tiers",
  "slug": "wedding-cake-3-tiers",
  "description": "Delicious wedding cake",
  "category": "cake",
  "price": 2000000,
  "originalPrice": 2500000,
  "stockQuantity": 10,
  "unit": "piece",
  "isFeatured": true,
  "isActive": true
}
```

#### 9. Update Product
```http
PUT /api/admin/products/:id
```

#### 10. Update Product Stock
```http
PUT /api/admin/products/:id/stock
```

**Request Body:**
```json
{
  "stockQuantity": 15
}
```

#### 11. Delete Product
```http
DELETE /api/admin/products/:id
```

---

## 📸 Gallery API

### User Routes (Public)

#### 1. Get Active Galleries
```http
GET /api/user/galleries
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "imageUrl": "https://example.com/image.jpg",
      "altText": "Wedding decoration",
      "caption": "Beautiful setup",
      "relatedType": "service",
      "relatedId": "uuid",
      "isPrimary": true,
      "displayOrder": 1,
      "isActive": true
    }
  ],
  "count": 50
}
```

#### 2. Get Gallery by ID
```http
GET /api/user/galleries/:id
```

#### 3. Get Galleries by Related Item
```http
GET /api/user/galleries/related/:relatedType/:relatedId
```

**Related Types:** `service`, `decoration`, `package`, `product`

**Example:**
```http
GET /api/user/galleries/related/service/uuid-here
```

#### 4. Get Primary Image
```http
GET /api/user/galleries/primary/:relatedType/:relatedId
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "imageUrl": "https://example.com/primary.jpg",
    "altText": "Primary image",
    "isPrimary": true
  }
}
```

### Admin Routes (Requires Auth)

#### 5. List All Galleries
```http
GET /api/admin/galleries
```

#### 6. Create Gallery
```http
POST /api/admin/galleries
```

**Request Body:**
```json
{
  "imageUrl": "https://example.com/image.jpg",
  "altText": "Wedding decoration",
  "caption": "Beautiful setup",
  "relatedType": "service",
  "relatedId": "uuid",
  "isPrimary": false,
  "displayOrder": 1,
  "isActive": true
}
```

#### 7. Update Gallery
```http
PUT /api/admin/galleries/:id
```

#### 8. Set Primary Image
```http
PUT /api/admin/galleries/:id/primary
```

#### 9. Update Display Order
```http
PUT /api/admin/galleries/:id/order
```

**Request Body:**
```json
{
  "displayOrder": 5
}
```

#### 10. Delete Gallery
```http
DELETE /api/admin/galleries/:id
```

---

## 💬 Testimonials API

### User Routes (Public)

#### 1. Get Active Testimonials
```http
GET /api/user/testimonials
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "customerName": "Nguyễn Văn A",
      "customerAvatar": "https://example.com/avatar.jpg",
      "rating": 5,
      "comment": "Dịch vụ tuyệt vời!",
      "eventDate": "2025-10-15",
      "language": "vi",
      "isActive": true,
      "createdAt": "2025-11-15T10:00:00.000Z"
    }
  ],
  "count": 30
}
```

#### 2. Get Testimonials by Language
```http
GET /api/user/testimonials/language/:language
```

**Languages:** `vi` (Vietnamese), `en` (English)

#### 3. Get Testimonial by ID
```http
GET /api/user/testimonials/:id
```

### Admin Routes (Requires Auth)

#### 4. List All Testimonials
```http
GET /api/admin/testimonials
```

#### 5. Create Testimonial
```http
POST /api/admin/testimonials
```

**Request Body:**
```json
{
  "customerName": "Nguyễn Văn A",
  "customerAvatar": "https://example.com/avatar.jpg",
  "rating": 5,
  "comment": "Dịch vụ tuyệt vời!",
  "eventDate": "2025-10-15",
  "language": "vi",
  "isActive": true
}
```

#### 6. Update Testimonial
```http
PUT /api/admin/testimonials/:id
```

#### 7. Delete Testimonial
```http
DELETE /api/admin/testimonials/:id
```

---

## ❓ FAQ API

### User Routes (Public)

#### 1. Get Active FAQs
```http
GET /api/user/faqs
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "question": "Làm thế nào để đặt dịch vụ?",
      "answer": "Bạn có thể đặt dịch vụ qua website...",
      "category": "booking",
      "language": "vi",
      "displayOrder": 1,
      "isActive": true
    }
  ],
  "count": 20
}
```

#### 2. Get FAQs by Category
```http
GET /api/user/faqs/category/:category
```

**Categories:** `booking`, `payment`, `service`, `general`

#### 3. Get FAQs by Language
```http
GET /api/user/faqs/language/:language
```

#### 4. Get FAQs by Category and Language
```http
GET /api/user/faqs/category/:category/language/:language
```

**Example:**
```http
GET /api/user/faqs/category/booking/language/vi
```

#### 5. Get FAQ by ID
```http
GET /api/user/faqs/:id
```

### Admin Routes (Requires Auth)

#### 6. List All FAQs
```http
GET /api/admin/faqs
```

#### 7. Create FAQ
```http
POST /api/admin/faqs
```

**Request Body:**
```json
{
  "question": "Làm thế nào để đặt dịch vụ?",
  "answer": "Bạn có thể đặt dịch vụ qua website...",
  "category": "booking",
  "language": "vi",
  "displayOrder": 1,
  "isActive": true
}
```

#### 8. Update FAQ
```http
PUT /api/admin/faqs/:id
```

#### 9. Delete FAQ
```http
DELETE /api/admin/faqs/:id
```

---

## 📅 Consultations API

### User Routes (Public)

#### 1. Book Consultation
```http
POST /api/user/consultations
```

**Request Body:**
```json
{
  "customerName": "Nguyễn Văn A",
  "email": "customer@example.com",
  "phone": "0901234567",
  "preferredDate": "2025-12-01",
  "preferredTime": "14:00",
  "message": "Tôi muốn tư vấn về gói cưới",
  "serviceType": "wedding"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "customerName": "Nguyễn Văn A",
    "email": "customer@example.com",
    "phone": "0901234567",
    "preferredDate": "2025-12-01",
    "preferredTime": "14:00",
    "message": "Tôi muốn tư vấn về gói cưới",
    "serviceType": "wedding",
    "status": "pending",
    "createdAt": "2025-11-15T10:00:00.000Z"
  },
  "message": "Consultation booked successfully"
}
```

#### 2. Get Consultations by Email
```http
GET /api/user/consultations/email/:email
```

#### 3. Get Consultation by ID
```http
GET /api/user/consultations/:id
```

### Admin Routes (Requires Auth)

#### 4. List All Consultations
```http
GET /api/admin/consultations
```

#### 5. Get Consultations by Status
```http
GET /api/admin/consultations/status/:status
```

**Status:** `pending`, `confirmed`, `completed`, `cancelled`

#### 6. Update Consultation
```http
PUT /api/admin/consultations/:id
```

**Request Body:**
```json
{
  "status": "confirmed",
  "notes": "Đã xác nhận lịch hẹn"
}
```

#### 7. Delete Consultation
```http
DELETE /api/admin/consultations/:id
```

---

## 🛒 Orders API

### User Routes (Public)

#### 1. Create Order
```http
POST /api/user/orders
```

**Request Body:**
```json
{
  "customerName": "Nguyễn Văn A",
  "email": "customer@example.com",
  "phone": "0901234567",
  "eventDate": "2025-12-25",
  "eventLocation": "Hà Nội",
  "notes": "Ghi chú đặc biệt",
  "items": [
    {
      "itemType": "package",
      "itemId": "uuid",
      "quantity": 1,
      "price": 50000000
    },
    {
      "itemType": "product",
      "itemId": "uuid",
      "quantity": 2,
      "price": 2000000
    }
  ],
  "voucherCode": "SUMMER2025"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "orderNumber": "ORD-20251115-001",
    "customerName": "Nguyễn Văn A",
    "email": "customer@example.com",
    "phone": "0901234567",
    "eventDate": "2025-12-25",
    "eventLocation": "Hà Nội",
    "subtotal": 54000000,
    "discount": 5400000,
    "total": 48600000,
    "status": "pending",
    "items": [...],
    "createdAt": "2025-11-15T10:00:00.000Z"
  },
  "message": "Order created successfully"
}
```

#### 2. Apply Voucher
```http
POST /api/user/orders/apply-voucher
```

**Request Body:**
```json
{
  "voucherCode": "SUMMER2025",
  "subtotal": 54000000
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "voucherCode": "SUMMER2025",
    "discountType": "percentage",
    "discountValue": 10,
    "discountAmount": 5400000,
    "finalTotal": 48600000
  }
}
```

#### 3. Get Orders by Email
```http
GET /api/user/orders/email/:email
```

#### 4. Get Order by ID
```http
GET /api/user/orders/:id
```

### Admin Routes (Requires Auth)

#### 5. List All Orders
```http
GET /api/admin/orders
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "orderNumber": "ORD-20251115-001",
      "customerName": "Nguyễn Văn A",
      "email": "customer@example.com",
      "phone": "0901234567",
      "eventDate": "2025-12-25",
      "total": 48600000,
      "status": "pending",
      "createdAt": "2025-11-15T10:00:00.000Z"
    }
  ],
  "count": 100
}
```

#### 6. Get Orders by Status
```http
GET /api/admin/orders/status/:status
```

**Status:** `pending`, `confirmed`, `processing`, `completed`, `cancelled`

#### 7. Update Order
```http
PUT /api/admin/orders/:id
```

**Request Body:**
```json
{
  "status": "confirmed",
  "notes": "Đã xác nhận đơn hàng"
}
```

#### 8. Delete Order
```http
DELETE /api/admin/orders/:id
```

---

## 🎁 Promotions API

### User Routes (Public)

#### 1. Get Promotion by Code
```http
GET /api/user/promotions/code/:code
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "code": "SUMMER2025",
    "name": "Summer Sale 2025",
    "description": "Giảm giá mùa hè",
    "discountType": "percentage",
    "discountValue": 10,
    "startDate": "2025-06-01",
    "endDate": "2025-08-31",
    "isActive": true
  }
}
```

### Admin Routes (Requires Auth)

#### 2. List All Promotions
```http
GET /api/admin/promotions
```

#### 3. Get Promotion by ID
```http
GET /api/admin/promotions/:id
```

#### 4. Get Promotions by Service
```http
GET /api/admin/promotions/service/:serviceId
```

#### 5. Get Promotions by Package
```http
GET /api/admin/promotions/package/:packageId
```

#### 6. Create Promotion
```http
POST /api/admin/promotions
```

**Request Body:**
```json
{
  "code": "SUMMER2025",
  "name": "Summer Sale 2025",
  "description": "Giảm giá mùa hè",
  "discountType": "percentage",
  "discountValue": 10,
  "startDate": "2025-06-01",
  "endDate": "2025-08-31",
  "applicableType": "all",
  "applicableIds": [],
  "isActive": true
}
```

**Discount Types:** `percentage`, `fixed`
**Applicable Types:** `all`, `service`, `package`, `product`

#### 7. Update Promotion
```http
PUT /api/admin/promotions/:id
```

#### 8. Delete Promotion
```http
DELETE /api/admin/promotions/:id
```

---

## 🎫 Vouchers API

### User Routes (Public)

#### 1. Validate Voucher
```http
POST /api/user/vouchers/validate
```

**Request Body:**
```json
{
  "code": "WELCOME10",
  "subtotal": 50000000
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "isValid": true,
    "voucher": {
      "code": "WELCOME10",
      "discountType": "percentage",
      "discountValue": 10,
      "maxDiscount": 5000000,
      "minOrderValue": 10000000
    },
    "discountAmount": 5000000,
    "finalTotal": 45000000
  }
}
```

#### 2. Get Active Vouchers
```http
GET /api/user/vouchers/active
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "code": "WELCOME10",
      "description": "Giảm 10% cho đơn hàng đầu tiên",
      "discountType": "percentage",
      "discountValue": 10,
      "maxDiscount": 5000000,
      "minOrderValue": 10000000,
      "validFrom": "2025-01-01",
      "validUntil": "2025-12-31",
      "usageLimit": 100,
      "usedCount": 25
    }
  ],
  "count": 5
}
```

#### 3. Get Voucher by Code
```http
GET /api/user/vouchers/:code
```

### Admin Routes (Requires Auth)

#### 4. List All Vouchers
```http
GET /api/admin/vouchers
```

#### 5. Get Voucher by ID
```http
GET /api/admin/vouchers/:id
```

#### 6. Create Voucher
```http
POST /api/admin/vouchers
```

**Request Body:**
```json
{
  "code": "WELCOME10",
  "description": "Giảm 10% cho đơn hàng đầu tiên",
  "discountType": "percentage",
  "discountValue": 10,
  "maxDiscount": 5000000,
  "minOrderValue": 10000000,
  "validFrom": "2025-01-01",
  "validUntil": "2025-12-31",
  "usageLimit": 100,
  "isActive": true
}
```

#### 7. Update Voucher
```http
PUT /api/admin/vouchers/:id
```

#### 8. Delete Voucher
```http
DELETE /api/admin/vouchers/:id
```

---

## ❌ Error Responses

### 400 - Bad Request
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

### 401 - Unauthorized
```json
{
  "success": false,
  "message": "Authentication required"
}
```

### 403 - Forbidden
```json
{
  "success": false,
  "message": "Admin access required"
}
```

### 404 - Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 409 - Conflict
```json
{
  "success": false,
  "message": "Resource already exists"
}
```

### 500 - Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## 🧪 Testing Examples

### Using cURL

#### Get Active Services
```bash
curl http://localhost:4000/api/user/services
```

#### Create Order
```bash
curl -X POST http://localhost:4000/api/user/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "Nguyễn Văn A",
    "email": "customer@example.com",
    "phone": "0901234567",
    "eventDate": "2025-12-25",
    "eventLocation": "Hà Nội",
    "items": [
      {
        "itemType": "package",
        "itemId": "uuid",
        "quantity": 1,
        "price": 50000000
      }
    ]
  }'
```

#### Admin - Create Service
```bash
curl -X POST http://localhost:4000/api/admin/services \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Wedding Decoration",
    "slug": "wedding-decoration",
    "shortDescription": "Luxury decoration",
    "basePrice": 5000000,
    "isActive": true
  }'
```

### Using JavaScript (Fetch)

```javascript
// Get Active Services
const getServices = async () => {
  const response = await fetch('http://localhost:4000/api/user/services');
  const data = await response.json();
  console.log(data);
};

// Create Order
const createOrder = async (orderData) => {
  const response = await fetch('http://localhost:4000/api/user/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });
  const data = await response.json();
  return data;
};

// Admin - Update Service
const updateService = async (id, updateData, token) => {
  const response = await fetch(`http://localhost:4000/api/admin/services/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateData),
  });
  const data = await response.json();
  return data;
};

// Admin - Add Image to Service
const addServiceImage = async (serviceId, imageData, token) => {
  const response = await fetch(`http://localhost:4000/api/admin/services/${serviceId}/images`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(imageData),
  });
  const data = await response.json();
  return data;
};

// Admin - Remove Image from Service
const removeServiceImage = async (serviceId, imageId, token) => {
  const response = await fetch(`http://localhost:4000/api/admin/services/${serviceId}/images/${imageId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

// Admin - Get Service Images
const getServiceImages = async (serviceId, token) => {
  const response = await fetch(`http://localhost:4000/api/admin/services/${serviceId}/images`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};
```

### Using Axios

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
});

// Add auth token for admin requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Get Active Services
const getServices = async () => {
  const { data } = await api.get('/user/services');
  return data;
};

// Create Order
const createOrder = async (orderData) => {
  const { data } = await api.post('/user/orders', orderData);
  return data;
};

// Admin - Create Service
const createService = async (serviceData) => {
  const { data } = await api.post('/admin/services', serviceData);
  return data;
};

// Admin - Add Image to Service
const addServiceImage = async (serviceId, imageData) => {
  const { data } = await api.post(`/admin/services/${serviceId}/images`, imageData);
  return data;
};

// Admin - Remove Image from Service
const removeServiceImage = async (serviceId, imageId) => {
  const { data } = await api.delete(`/admin/services/${serviceId}/images/${imageId}`);
  return data;
};

// Admin - Get Service Images
const getServiceImages = async (serviceId) => {
  const { data } = await api.get(`/admin/services/${serviceId}/images`);
  return data;
};
```

---

## 📝 Notes

1. **Tất cả response đều có format chuẩn:**
   ```json
   {
     "success": true/false,
     "data": {...},
     "message": "Optional message",
     "count": 10  // For list endpoints
   }
   ```

2. **Date format:** ISO 8601 (`YYYY-MM-DDTHH:mm:ss.sssZ`)

3. **Price format:** Số nguyên (VND), ví dụ: `5000000` = 5,000,000 VND

4. **Pagination (Coming soon):**
   ```http
   GET /api/admin/services?page=1&limit=10&sortBy=createdAt&sortOrder=desc
   ```

5. **Rate Limiting (Coming soon):**
   - User routes: 100 requests/minute
   - Admin routes: 200 requests/minute

---

## 🔄 API Versioning

Current version: **v1**

Future versions sẽ được prefix: `/api/v2/...`

---

## 📞 Support

Nếu có vấn đề với API, vui lòng liên hệ:
- Email: support@example.com
- Documentation: https://docs.example.com

---

**Last Updated:** November 19, 2025
