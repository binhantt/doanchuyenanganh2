# Testimonials API Documentation

## Overview
The Testimonials API allows you to manage client testimonials and reviews for wedding services.

## Base URLs
- **User API**: `/user/testimonials`
- **Admin API**: `/admin/testimonials`

## Endpoints

### User Endpoints (Public)

#### Get All Active Testimonials
```
GET /user/testimonials
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "clientName": "Pham Thu Ha & Le Quang Minh",
      "clientRole": "Bride & Groom",
      "content": "Amazing service! From decoration to lighting...",
      "rating": 5,
      "eventDate": "2024-09-01T00:00:00.000Z",
      "location": "Ho Chi Minh City",
      "language": "en",
      "isActive": true,
      "createdAt": "2024-11-15T10:00:00.000Z",
      "updatedAt": "2024-11-15T10:00:00.000Z"
    }
  ]
}
```

#### Get Testimonials by Language
```
GET /user/testimonials/language/:language
```

**Parameters:**
- `language` (string): Language code (e.g., 'en', 'vi')

**Response:** Same as above

#### Get Testimonial by ID
```
GET /user/testimonials/:id
```

**Parameters:**
- `id` (string): Testimonial UUID

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "clientName": "Pham Thu Ha & Le Quang Minh",
    "clientRole": "Bride & Groom",
    "content": "Amazing service! From decoration to lighting...",
    "rating": 5,
    "eventDate": "2024-09-01T00:00:00.000Z",
    "location": "Ho Chi Minh City",
    "language": "en",
    "isActive": true,
    "createdAt": "2024-11-15T10:00:00.000Z",
    "updatedAt": "2024-11-15T10:00:00.000Z"
  }
}
```

### Admin Endpoints (Protected)

#### Get All Testimonials
```
GET /admin/testimonials
```

**Authentication:** Required (Admin)

**Response:** Same as user endpoint

#### Get Testimonial by ID
```
GET /admin/testimonials/:id
```

**Authentication:** Required (Admin)

**Response:** Same as user endpoint

#### Create Testimonial
```
POST /admin/testimonials
```

**Authentication:** Required (Admin)

**Request Body:**
```json
{
  "clientName": "Pham Thu Ha & Le Quang Minh",
  "clientRole": "Bride & Groom",
  "content": "Amazing service! From decoration to lighting, sound, and catering — everything was outstanding. Our guests were full of compliments. We were truly satisfied and will definitely recommend your service to our friends.",
  "rating": 5,
  "eventDate": "2024-09-01",
  "location": "Ho Chi Minh City",
  "language": "en"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "clientName": "Pham Thu Ha & Le Quang Minh",
    "clientRole": "Bride & Groom",
    "content": "Amazing service! From decoration to lighting...",
    "rating": 5,
    "eventDate": "2024-09-01T00:00:00.000Z",
    "location": "Ho Chi Minh City",
    "language": "en",
    "isActive": true,
    "createdAt": "2024-11-15T10:00:00.000Z",
    "updatedAt": "2024-11-15T10:00:00.000Z"
  }
}
```

#### Update Testimonial
```
PUT /admin/testimonials/:id
```

**Authentication:** Required (Admin)

**Request Body:** (All fields optional)
```json
{
  "clientName": "Updated Name",
  "clientRole": "Updated Role",
  "content": "Updated content...",
  "rating": 4,
  "eventDate": "2024-09-01",
  "location": "Updated Location",
  "language": "en",
  "isActive": true
}
```

**Response:** Updated testimonial object

#### Delete Testimonial
```
DELETE /admin/testimonials/:id
```

**Authentication:** Required (Admin)

**Response:**
```json
{
  "success": true,
  "message": "Testimonial deleted successfully"
}
```

## Field Specifications

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| clientName | string | Yes | Max 200 characters |
| clientRole | string | Yes | Max 100 characters |
| content | string | Yes | Text field |
| rating | number | Yes | 1-5 |
| eventDate | date | Yes | ISO 8601 format |
| location | string | Yes | Max 200 characters |
| language | string | Yes | Language code (e.g., 'en', 'vi') |
| isActive | boolean | No | Default: true |

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
  "message": "Testimonial not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Failed to fetch testimonials",
  "error": "Error details"
}
```

## Example Usage

### cURL

**Get all active testimonials:**
```bash
curl -X GET http://localhost:3000/user/testimonials
```

**Create a new testimonial (Admin):**
```bash
curl -X POST http://localhost:3000/admin/testimonials \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "clientName": "Pham Thu Ha & Le Quang Minh",
    "clientRole": "Bride & Groom",
    "content": "Amazing service! From decoration to lighting...",
    "rating": 5,
    "eventDate": "2024-09-01",
    "location": "Ho Chi Minh City",
    "language": "en"
  }'
```

**Update a testimonial (Admin):**
```bash
curl -X PUT http://localhost:3000/admin/testimonials/UUID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "rating": 4,
    "isActive": false
  }'
```

**Delete a testimonial (Admin):**
```bash
curl -X DELETE http://localhost:3000/admin/testimonials/UUID \
  -H "Authorization: Bearer YOUR_TOKEN"
```
