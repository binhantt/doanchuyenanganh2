# FAQ (Frequently Asked Questions) API Documentation

## Overview
The FAQ API allows you to manage frequently asked questions for your wedding service business.

## Base URLs
- **User API**: `/user/faqs`
- **Admin API**: `/admin/faqs`

## Endpoints

### User Endpoints (Public)

#### Get All Active FAQs
```
GET /user/faqs
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "question": "Dịch vụ của bạn bao gồm những gì?",
      "answer": "Chúng tôi cung cấp đầy đủ các dịch vụ tổ chức tiệc cưới...",
      "category": "Services",
      "language": "vi",
      "displayOrder": 1,
      "isActive": true,
      "createdAt": "2024-11-15T10:00:00.000Z",
      "updatedAt": "2024-11-15T10:00:00.000Z"
    }
  ]
}
```

#### Get FAQs by Category
```
GET /user/faqs/category/:category
```

**Parameters:**
- `category` (string): FAQ category (e.g., 'Services', 'Pricing', 'Booking')

**Response:** Same as above

#### Get FAQs by Language
```
GET /user/faqs/language/:language
```

**Parameters:**
- `language` (string): Language code (e.g., 'en', 'vi')

**Response:** Same as above

#### Get FAQs by Category and Language
```
GET /user/faqs/category/:category/language/:language
```

**Parameters:**
- `category` (string): FAQ category
- `language` (string): Language code

**Response:** Same as above

#### Get FAQ by ID
```
GET /user/faqs/:id
```

**Parameters:**
- `id` (string): FAQ UUID

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "question": "Dịch vụ của bạn bao gồm những gì?",
    "answer": "Chúng tôi cung cấp đầy đủ các dịch vụ tổ chức tiệc cưới...",
    "category": "Services",
    "language": "vi",
    "displayOrder": 1,
    "isActive": true,
    "createdAt": "2024-11-15T10:00:00.000Z",
    "updatedAt": "2024-11-15T10:00:00.000Z"
  }
}
```

### Admin Endpoints (Protected)

#### Get All FAQs
```
GET /admin/faqs
```

**Authentication:** Required (Admin)

**Response:** Same as user endpoint

#### Get FAQ by ID
```
GET /admin/faqs/:id
```

**Authentication:** Required (Admin)

**Response:** Same as user endpoint

#### Create FAQ
```
POST /admin/faqs
```

**Authentication:** Required (Admin)

**Request Body:**
```json
{
  "question": "Dịch vụ của bạn bao gồm những gì?",
  "answer": "Chúng tôi cung cấp đầy đủ các dịch vụ tổ chức tiệc cưới bao gồm: trang trí sảnh tiệc, trang điểm cô dâu chú rể, chụp ảnh và quay phim, âm thanh ánh sáng, MC dẫn chương trình, backdrop và photobooth, wedding planner chuyên nghiệp, và nhiều dịch vụ khác. Bạn có thể lựa chọn gói dịch vụ phù hợp hoặc tùy chỉnh theo nhu cầu.",
  "category": "Services",
  "language": "vi",
  "displayOrder": 1
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "question": "Dịch vụ của bạn bao gồm những gì?",
    "answer": "Chúng tôi cung cấp đầy đủ các dịch vụ tổ chức tiệc cưới...",
    "category": "Services",
    "language": "vi",
    "displayOrder": 1,
    "isActive": true,
    "createdAt": "2024-11-15T10:00:00.000Z",
    "updatedAt": "2024-11-15T10:00:00.000Z"
  }
}
```

#### Update FAQ
```
PUT /admin/faqs/:id
```

**Authentication:** Required (Admin)

**Request Body:** (All fields optional)
```json
{
  "question": "Updated question?",
  "answer": "Updated answer...",
  "category": "Services",
  "language": "vi",
  "displayOrder": 2,
  "isActive": true
}
```

**Response:** Updated FAQ object

#### Delete FAQ
```
DELETE /admin/faqs/:id
```

**Authentication:** Required (Admin)

**Response:**
```json
{
  "success": true,
  "message": "FAQ deleted successfully"
}
```

## Field Specifications

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| question | string | Yes | Max 500 characters |
| answer | string | Yes | Text field |
| category | string | Yes | Max 100 characters |
| language | string | Yes | Language code (e.g., 'en', 'vi') |
| displayOrder | number | No | Default: 0 |
| isActive | boolean | No | Default: true |

## Common Categories

- Services
- Pricing
- Booking
- Payment
- Cancellation
- Customization
- Timeline
- Venue

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Missing required fields"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "FAQ not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Failed to fetch FAQs",
  "error": "Error details"
}
```

## Example Usage

### cURL

**Get all active FAQs:**
```bash
curl -X GET http://localhost:3000/user/faqs
```

**Get FAQs by category and language:**
```bash
curl -X GET http://localhost:3000/user/faqs/category/Services/language/vi
```

**Create a new FAQ (Admin):**
```bash
curl -X POST http://localhost:3000/admin/faqs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "question": "Dịch vụ của bạn bao gồm những gì?",
    "answer": "Chúng tôi cung cấp đầy đủ các dịch vụ tổ chức tiệc cưới...",
    "category": "Services",
    "language": "vi",
    "displayOrder": 1
  }'
```

**Update an FAQ (Admin):**
```bash
curl -X PUT http://localhost:3000/admin/faqs/UUID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "displayOrder": 2,
    "isActive": false
  }'
```

**Delete an FAQ (Admin):**
```bash
curl -X DELETE http://localhost:3000/admin/faqs/UUID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Notes

- FAQs are sorted by `displayOrder` in ascending order
- Only active FAQs are returned in public endpoints
- Admin endpoints return all FAQs regardless of active status
- Use `displayOrder` to control the order of FAQs in the UI
- Support multiple languages for the same question/answer
