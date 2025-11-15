# Order API Documentation

## Overview
The Order API allows clients to create orders with multiple items (packages, services, products, menus) and manage payment information.

## Base URLs
- **User API**: `/user/orders`
- **Admin API**: `/admin/orders`

## Endpoints

### User Endpoints (Public)

#### Create Order
```
POST /user/orders
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
  "notes": "Mong muốn có wedding planner tận tâm",
  "items": [
    {
      "id": "item-1",
      "productId": "uuid-package",
      "productName": "Gói Premium",
      "productType": "package",
      "quantity": 1,
      "unitPrice": 100000000,
      "subtotal": 100000000,
      "description": "Gói Premium mang đến trải nghiệm đám cưới hoàn hảo"
    },
    {
      "id": "item-2",
      "productId": "uuid-menu",
      "productName": "Thực Đơn Tiệc Cưới Cao Cấp",
      "productType": "menu",
      "quantity": 1,
      "unitPrice": 50000000,
      "subtotal": 50000000,
      "description": "Thực đơn tiệc cưới cao cấp với 12 món ăn sang trọng"
    }
  ],
  "paymentMethod": "bank_transfer"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "id": "uuid",
    "clientName": "Pham Thu Ha",
    "clientEmail": "pham.thuha@example.com",
    "clientPhone": "0912345678",
    "weddingDate": "2025-06-15T00:00:00.000Z",
    "guestCount": 150,
    "venue": "Ho Chi Minh City",
    "notes": "Mong muốn có wedding planner tận tâm",
    "items": [
      {
        "id": "item-1",
        "productId": "uuid-package",
        "productName": "Gói Premium",
        "productType": "package",
        "quantity": 1,
        "unitPrice": 100000000,
        "subtotal": 100000000,
        "description": "Gói Premium mang đến trải nghiệm đám cưới hoàn hảo"
      },
      {
        "id": "item-2",
        "productId": "uuid-menu",
        "productName": "Thực Đơn Tiệc Cưới Cao Cấp",
        "productType": "menu",
        "quantity": 1,
        "unitPrice": 50000000,
        "subtotal": 50000000,
        "description": "Thực đơn tiệc cưới cao cấp với 12 món ăn sang trọng"
      }
    ],
    "paymentMethod": "bank_transfer",
    "totalAmount": 150000000,
    "depositAmount": 45000000,
    "status": "pending",
    "createdAt": "2024-11-15T10:00:00.000Z",
    "updatedAt": "2024-11-15T10:00:00.000Z"
  }
}
```

#### Get Order by ID
```
GET /user/orders/:id
```

**Parameters:**
- `id` (string): Order UUID

**Response:** Order object

#### Get Orders by Email
```
GET /user/orders/email/:email
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
      "notes": "Mong muốn có wedding planner tận tâm",
      "items": [...],
      "paymentMethod": "bank_transfer",
      "totalAmount": 150000000,
      "depositAmount": 45000000,
      "status": "pending",
      "createdAt": "2024-11-15T10:00:00.000Z",
      "updatedAt": "2024-11-15T10:00:00.000Z"
    }
  ]
}
```

### Admin Endpoints (Protected)

#### Get All Orders
```
GET /admin/orders
```

**Authentication:** Required (Admin)

**Response:** Array of all orders

#### Get Order by ID
```
GET /admin/orders/:id
```

**Authentication:** Required (Admin)

**Response:** Order object

#### Get Orders by Status
```
GET /admin/orders/status/:status
```

**Authentication:** Required (Admin)

**Parameters:**
- `status` (string): Status value - `pending`, `confirmed`, `paid`, `completed`, or `cancelled`

**Response:** Array of orders with specified status

#### Update Order
```
PUT /admin/orders/:id
```

**Authentication:** Required (Admin)

**Request Body:** (All fields optional)
```json
{
  "status": "confirmed",
  "notes": "Đã xác nhận đơn hàng"
}
```

**Response:** Updated order object

#### Delete Order
```
DELETE /admin/orders/:id
```

**Authentication:** Required (Admin)

**Response:**
```json
{
  "success": true,
  "message": "Order deleted successfully"
}
```

## Field Specifications

### Order Fields

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| clientName | string | Yes | Max 200 characters |
| clientEmail | string | Yes | Max 200 characters, valid email |
| clientPhone | string | Yes | Max 20 characters |
| weddingDate | date | Yes | ISO 8601 format |
| guestCount | number | Yes | Minimum 1 |
| venue | string | Yes | Max 300 characters |
| notes | string | No | Text field |
| items | array | Yes | At least 1 item |
| paymentMethod | enum | Yes | bank_transfer, momo, zalopay, cash |
| status | enum | No | pending, confirmed, paid, completed, cancelled |

### OrderItem Fields

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| id | string | Yes | Unique identifier |
| productId | string | Yes | Product UUID |
| productName | string | Yes | Max 200 characters |
| productType | enum | Yes | package, service, product, menu |
| quantity | number | Yes | Minimum 1 |
| unitPrice | number | Yes | Price per unit |
| subtotal | number | Yes | quantity × unitPrice |
| description | string | No | Product description |

## Payment Methods

| Method | Description |
|--------|-------------|
| bank_transfer | Chuyển khoản ngân hàng |
| momo | Thanh toán qua ví MoMo |
| zalopay | Thanh toán qua ví ZaloPay |
| cash | Thanh toán bằng tiền mặt |

## Order Status

| Status | Description |
|--------|-------------|
| pending | Chờ xác nhận |
| confirmed | Đã xác nhận |
| paid | Đã thanh toán |
| completed | Đã hoàn thành |
| cancelled | Đã hủy |

## Pricing Information

- **Deposit**: 30% of total amount
- **Remaining**: 70% of total amount
- **Payment Terms**: Deposit due at booking, remaining due 7 days before wedding

## Bank Transfer Information

```
Ngân hàng: Vietcombank
Số tài khoản: 1234567890
Chủ tài khoản: WEDDING PARADISE
Chi nhánh: Chi nhánh Hà Nội
Nội dung chuyển khoản: [Họ tên] - [Số điện thoại] - Dat coc tiec cuoi
```

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
  "message": "Order not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Failed to create order",
  "error": "Error details"
}
```

## Example Usage

### cURL

**Create an order:**
```bash
curl -X POST http://localhost:3000/user/orders \
  -H "Content-Type: application/json" \
  -d '{
    "clientName": "Pham Thu Ha",
    "clientEmail": "pham.thuha@example.com",
    "clientPhone": "0912345678",
    "weddingDate": "2025-06-15",
    "guestCount": 150,
    "venue": "Ho Chi Minh City",
    "notes": "Mong muốn có wedding planner tận tâm",
    "items": [
      {
        "id": "item-1",
        "productId": "uuid-package",
        "productName": "Gói Premium",
        "productType": "package",
        "quantity": 1,
        "unitPrice": 100000000,
        "subtotal": 100000000
      }
    ],
    "paymentMethod": "bank_transfer"
  }'
```

**Get orders by email:**
```bash
curl -X GET http://localhost:3000/user/orders/email/pham.thuha@example.com
```

**Get all orders (Admin):**
```bash
curl -X GET http://localhost:3000/admin/orders \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Get pending orders (Admin):**
```bash
curl -X GET http://localhost:3000/admin/orders/status/pending \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Update order status (Admin):**
```bash
curl -X PUT http://localhost:3000/admin/orders/UUID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "status": "confirmed"
  }'
```

**Delete an order (Admin):**
```bash
curl -X DELETE http://localhost:3000/admin/orders/UUID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Notes

- All orders start with status `pending`
- Deposit is automatically calculated as 30% of total amount
- Orders can contain multiple items of different types
- Email is used to retrieve client's order history
- Orders are sorted by creation date (newest first) for users
- Orders are sorted by wedding date (earliest first) for admins when filtering by status
