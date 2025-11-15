# Products API Documentation

API endpoints cho quản lý sản phẩm trang sức (nhẫn, dây chuyền, vòng tay, v.v.)

## Base URL
- User API: `http://localhost:3000/api/user/products`
- Admin API: `http://localhost:3000/api/admin/products`

---

## User Endpoints (Public)

### 1. Lấy danh sách sản phẩm
```http
GET /api/user/products
```

**Query Parameters:**
- `category` (optional): Lọc theo danh mục (Nhẫn Cưới, Dây Chuyền, Vòng Tay, v.v.)
- `isActive` (optional): Tự động set = true cho user

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Nhẫn cưới vàng 18K đính kim cương",
      "slug": "nhan-cuoi-vang-18k-dinh-kim-cuong",
      "description": "Nhẫn cưới vàng 18K đính kim cương thiên nhiên...",
      "price": 8000000,
      "category": "Nhẫn Cưới",
      "material": "Vàng 18K",
      "features": [
        "Vàng 18K nguyên chất",
        "Kim cương thiên nhiên",
        "Thiết kế tinh tế",
        "Khắc tên miễn phí"
      ],
      "images": [
        "/images/products/nhan-cuoi-vang-18k-1.jpg",
        "/images/products/nhan-cuoi-vang-18k-2.jpg"
      ],
      "stockQuantity": 50,
      "isFeatured": true,
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### 2. Lấy sản phẩm nổi bật
```http
GET /api/user/products/featured
```

**Response:** Tương tự endpoint 1, chỉ trả về sản phẩm có `isFeatured = true`

### 3. Lấy sản phẩm theo danh mục
```http
GET /api/user/products/category/:category
```

**Example:**
```http
GET /api/user/products/category/Nhẫn Cưới
```

### 4. Lấy chi tiết sản phẩm theo slug
```http
GET /api/user/products/slug/:slug
```

**Example:**
```http
GET /api/user/products/slug/nhan-cuoi-vang-18k-dinh-kim-cuong
```

### 5. Lấy chi tiết sản phẩm theo ID
```http
GET /api/user/products/:id
```

---

## Admin Endpoints (Requires Authentication)

### 1. Lấy tất cả sản phẩm (Admin)
```http
GET /api/admin/products
```

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `category` (optional): Lọc theo danh mục
- `isActive` (optional): Lọc theo trạng thái (true/false)
- `isFeatured` (optional): Lọc sản phẩm nổi bật (true/false)

### 2. Tạo sản phẩm mới
```http
POST /api/admin/products
```

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Nhẫn cưới vàng 18K đính kim cương",
  "slug": "nhan-cuoi-vang-18k-dinh-kim-cuong",
  "description": "Nhẫn cưới vàng 18K đính kim cương thiên nhiên, thiết kế tinh tế, sang trọng. Khắc tên miễn phí cho cặp đôi.",
  "price": 8000000,
  "category": "Nhẫn Cưới",
  "material": "Vàng 18K",
  "features": [
    "Vàng 18K nguyên chất",
    "Kim cương thiên nhiên",
    "Thiết kế tinh tế",
    "Khắc tên miễn phí"
  ],
  "images": [
    "/images/products/nhan-cuoi-vang-18k-1.jpg",
    "/images/products/nhan-cuoi-vang-18k-2.jpg"
  ],
  "stockQuantity": 50,
  "isFeatured": true,
  "isActive": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Nhẫn cưới vàng 18K đính kim cương",
    ...
  }
}
```

### 3. Cập nhật sản phẩm
```http
PUT /api/admin/products/:id
```

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:** (Tất cả fields đều optional)
```json
{
  "name": "Nhẫn cưới vàng 18K đính kim cương cao cấp",
  "price": 8500000,
  "stockQuantity": 45
}
```

### 4. Cập nhật số lượng tồn kho
```http
PUT /api/admin/products/:id/stock
```

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "quantity": 100
}
```

**Response:**
```json
{
  "success": true,
  "message": "Stock updated successfully"
}
```

### 5. Xóa sản phẩm
```http
DELETE /api/admin/products/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

### 6. Lấy chi tiết sản phẩm theo slug (Admin)
```http
GET /api/admin/products/slug/:slug
```

### 7. Lấy chi tiết sản phẩm theo ID (Admin)
```http
GET /api/admin/products/:id
```

---

## Danh mục sản phẩm (Categories)

- Nhẫn Cưới
- Nhẫn Kim Cương
- Dây Chuyền
- Vòng Tay
- Bông Tai
- Lắc Tay

## Chất liệu (Materials)

- Vàng 18K
- Vàng 24K
- Vàng Trắng 18K
- Bạc 925
- Platinum

---

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
  "message": "Product not found"
}
```

### 409 Conflict
```json
{
  "success": false,
  "message": "Product with this slug already exists"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## Testing với cURL

### Lấy danh sách sản phẩm
```bash
curl http://localhost:3000/api/user/products
```

### Lấy sản phẩm nổi bật
```bash
curl http://localhost:3000/api/user/products/featured
```

### Lấy sản phẩm theo danh mục
```bash
curl "http://localhost:3000/api/user/products/category/Nhẫn%20Cưới"
```

### Tạo sản phẩm mới (Admin)
```bash
curl -X POST http://localhost:3000/api/admin/products \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Nhẫn cưới vàng 18K",
    "slug": "nhan-cuoi-vang-18k",
    "description": "Nhẫn cưới đẹp",
    "price": 8000000,
    "category": "Nhẫn Cưới",
    "material": "Vàng 18K",
    "features": ["Vàng 18K nguyên chất"],
    "images": ["/images/product.jpg"],
    "stockQuantity": 50
  }'
```
