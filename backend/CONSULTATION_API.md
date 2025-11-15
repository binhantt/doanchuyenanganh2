# Consultation Booking API Documentation

## Overview
The Consultation API allows clients to book free consultation sessions and admins to manage consultation requests.

## Base URLs
- **User API**: `/user/consultations`
- **Admin API**: `/admin/consultations`

## Endpoints

### User Endpoints (Public)

#### Book a Consultation
```
POST /user/consultations
```

**Request Body:**
```json
{
  "clientName": "Pham Thu Ha",
  "clientEmail": "pham.thuha@example.com",
  "clientPhone": "0912345678",
  "weddingDate": "2025-06-15",
  "guestCount": 150,
  "venue": "Ho Chi Minh City",
  "serviceType": "Gói dịch vụ trọn gói",
  "budget": "100 - 200 triệu",
  "notes": "Mong muốn có wedding planner tận tâm"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Consultation booked successfully",
  "data": {
    "id": "uuid",
    "clientName": "Pham Thu Ha",
    "clientEmail": "pham.thuha@example.com",
    "clientPhone": "0912345678",
    "weddingDate": "2025-06-15T00:00:00.000Z",
    "guestCount": 150,
    "venue": "Ho Chi Minh City",
    "serviceType": "Gói dịch vụ trọn gói",
    "budget": "100 - 200 triệu",
    "notes": "Mong muốn có wedding planner tận tâm",
    "status": "pending",
    "createdAt": "2024-11-15T10:00:00.000Z",
    "updatedAt": "2024-11-15T10:00:00.000Z"
  }
}
```

#### Get Consultation by ID
```
GET /user/consultations/:id
```

**Parameters:**
- `id` (string): Consultation UUID

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "clientName": "Pham Thu Ha",
    "clientEmail": "pham.thuha@example.com",
    "clientPhone": "0912345678",
    "weddingDate": "2025-06-15T00:00:00.000Z",
    "guestCount": 150,
    "venue": "Ho Chi Minh City",
    "serviceType": "Gói dịch vụ trọn gói",
    "budget": "100 - 200 triệu",
    "notes": "Mong muốn có wedding planner tận tâm",
    "status": "pending",
    "createdAt": "2024-11-15T10:00:00.000Z",
    "updatedAt": "2024-11-15T10:00:00.000Z"
  }
}
```

#### Get Consultations by Email
```
GET /user/consultations/email/:email
```

**Parameters:**
- `email` (string): Client email address

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "clientName": "Pham Thu Ha",
      "clientEmail": "pham.thuha@example.com",
      "clientPhone": "0912345678",
      "weddingDate": "2025-06-15T00:00:00.000Z",
      "guestCount": 150,
      "venue": "Ho Chi Minh City",
      "serviceType": "Gói dịch vụ trọn gói",
      "budget": "100 - 200 triệu",
      "notes": "Mong muốn có wedding planner tận tâm",
      "status": "pending",
      "createdAt": "2024-11-15T10:00:00.000Z",
      "updatedAt": "2024-11-15T10:00:00.000Z"
    }
  ]
}
```

### Admin Endpoints (Protected)

#### Get All Consultations
```
GET /admin/consultations
```

**Authentication:** Required (Admin)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "clientName": "Pham Thu Ha",
      "clientEmail": "pham.thuha@example.com",
      "clientPhone": "0912345678",
      "weddingDate": "2025-06-15T00:00:00.000Z",
      "guestCount": 150,
      "venue": "Ho Chi Minh City",
      "serviceType": "Gói dịch vụ trọn gói",
      "budget": "100 - 200 triệu",
      "notes": "Mong muốn có wedding planner tận tâm",
      "status": "pending",
      "createdAt": "2024-11-15T10:00:00.000Z",
      "updatedAt": "2024-11-15T10:00:00.000Z"
    }
  ]
}
```

#### Get Consultation by ID
```
GET /admin/consultations/:id
```

**Authentication:** Required (Admin)

**Response:** Same as user endpoint

#### Get Consultations by Status
```
GET /admin/consultations/status/:status
```

**Authentication:** Required (Admin)

**Parameters:**
- `status` (string): Status value - `pending`, `confirmed`, `completed`, or `cancelled`

**Response:** Array of consultations with specified status

#### Update Consultation
```
PUT /admin/consultations/:id
```

**Authentication:** Required (Admin)

**Request Body:** (All fields optional)
```json
{
  "status": "confirmed",
  "notes": "Đã xác nhận lịch tư vấn"
}
```

**Response:** Updated consultation object

#### Delete Consultation
```
DELETE /admin/consultations/:id
```

**Authentication:** Required (Admin)

**Response:**
```json
{
  "success": true,
  "message": "Consultation deleted successfully"
}
```

## Field Specifications

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| clientName | string | Yes | Max 200 characters |
| clientEmail | string | Yes | Max 200 characters, valid email |
| clientPhone | string | Yes | Max 20 characters |
| weddingDate | date | Yes | ISO 8601 format |
| guestCount | number | Yes | Minimum 1 |
| venue | string | Yes | Max 300 characters |
| serviceType | string | Yes | Max 200 characters |
| budget | string | Yes | Max 100 characters |
| notes | string | No | Text field |
| status | enum | No | pending, confirmed, completed, cancelled |

## Service Types

- Gói dịch vụ trọn gói
- Trang trí tiệc cưới
- Chụp ảnh & quay phim
- Tiệc cưới & thực đơn
- Dịch vụ khác

## Budget Ranges

- Dưới 50 triệu
- 50 - 100 triệu
- 100 - 200 triệu
- 200 - 500 triệu
- Trên 500 triệu

## Status Values

| Status | Description |
|--------|-------------|
| pending | Chờ xác nhận |
| confirmed | Đã xác nhận |
| completed | Đã hoàn thành |
| cancelled | Đã hủy |

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
  "message": "Consultation not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Failed to book consultation",
  "error": "Error details"
}
```

## Example Usage

### cURL

**Book a consultation:**
```bash
curl -X POST http://localhost:3000/user/consultations \
  -H "Content-Type: application/json" \
  -d '{
    "clientName": "Pham Thu Ha",
    "clientEmail": "pham.thuha@example.com",
    "clientPhone": "0912345678",
    "weddingDate": "2025-06-15",
    "guestCount": 150,
    "venue": "Ho Chi Minh City",
    "serviceType": "Gói dịch vụ trọn gói",
    "budget": "100 - 200 triệu",
    "notes": "Mong muốn có wedding planner tận tâm"
  }'
```

**Get consultations by email:**
```bash
curl -X GET http://localhost:3000/user/consultations/email/pham.thuha@example.com
```

**Get all consultations (Admin):**
```bash
curl -X GET http://localhost:3000/admin/consultations \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Get pending consultations (Admin):**
```bash
curl -X GET http://localhost:3000/admin/consultations/status/pending \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Update consultation status (Admin):**
```bash
curl -X PUT http://localhost:3000/admin/consultations/UUID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "status": "confirmed",
    "notes": "Đã xác nhận lịch tư vấn"
  }'
```

**Delete a consultation (Admin):**
```bash
curl -X DELETE http://localhost:3000/admin/consultations/UUID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Notes

- All consultations start with status `pending`
- Admins can update status to track consultation progress
- Email is used to retrieve client's consultation history
- Consultations are sorted by creation date (newest first) for users
- Consultations are sorted by wedding date (earliest first) for admins when filtering by status
