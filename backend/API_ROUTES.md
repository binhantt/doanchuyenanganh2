# API Routes Documentation

## Base URL
```
http://localhost:4000/api
```

## Route Structure

```
/api
├── /health                    # API health check
├── /user                      # User/Public routes
│   ├── /health               # User API health
│   └── /services             # Service routes
│       ├── GET /             # List active services
│       ├── GET /:id          # Get service by ID
│       └── GET /slug/:slug   # Get service by slug
│
└── /admin                     # Admin routes (requires auth)
    ├── /health               # Admin API health
    ├── /stats                # Dashboard statistics
    └── /services             # Service management
        ├── GET /             # List all services
        ├── GET /:id          # Get service by ID
        ├── GET /slug/:slug   # Get service by slug
        ├── POST /            # Create service
        ├── PUT /:id          # Update service
        └── DELETE /:id       # Delete service
```

## Authentication

### Admin Routes
All `/api/admin/*` routes require authentication:

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

## API Endpoints

### Health Checks

#### Root Health Check
```http
GET /api/health
```

**Response:**
```json
{
  "success": true,
  "message": "API is healthy",
  "version": "1.0.0",
  "timestamp": "2025-11-15T10:30:00.000Z"
}
```

#### User API Health
```http
GET /api/user/health
```

#### Admin API Health
```http
GET /api/admin/health
```
*Requires authentication*

---

### User/Public Routes

#### List Active Services
```http
GET /api/user/services
GET /api/user/services?active=true
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
      "shortDescription": "Luxury romantic decoration...",
      "icon": "Flower",
      "basePrice": 5000000,
      "isActive": true
    }
  ],
  "count": 10
}
```

#### Get Service by ID
```http
GET /api/user/services/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Wedding Decoration",
    "slug": "wedding-decoration",
    "shortDescription": "Luxury romantic decoration...",
    "fullDescription": "Complete description...",
    "icon": "Flower",
    "features": ["Feature 1", "Feature 2"],
    "basePrice": 5000000,
    "isActive": true,
    "createdAt": "2025-11-15T10:00:00.000Z",
    "updatedAt": "2025-11-15T10:00:00.000Z"
  }
}
```

#### Get Service by Slug
```http
GET /api/user/services/slug/:slug
```

---

### Admin Routes

#### List All Services
```http
GET /api/admin/services
GET /api/admin/services?active=true
```
*Requires authentication*

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Wedding Decoration",
      "slug": "wedding-decoration",
      "shortDescription": "Luxury romantic decoration...",
      "icon": "Flower",
      "basePrice": 5000000,
      "isActive": true
    }
  ],
  "count": 15
}
```

#### Create Service
```http
POST /api/admin/services
```
*Requires authentication*

**Request Body:**
```json
{
  "name": "Wedding Decoration",
  "slug": "wedding-decoration",
  "shortDescription": "Luxury romantic decoration for your special day",
  "fullDescription": "Complete description with all details...",
  "icon": "Flower",
  "features": [
    "Professional decoration team",
    "Premium materials",
    "Custom design"
  ],
  "basePrice": 5000000,
  "isActive": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Wedding Decoration",
    "slug": "wedding-decoration",
    "shortDescription": "Luxury romantic decoration...",
    "fullDescription": "Complete description...",
    "icon": "Flower",
    "features": ["Professional decoration team", "Premium materials"],
    "basePrice": 5000000,
    "isActive": true,
    "createdAt": "2025-11-15T10:00:00.000Z",
    "updatedAt": "2025-11-15T10:00:00.000Z"
  },
  "message": "Service created successfully"
}
```

#### Update Service
```http
PUT /api/admin/services/:id
```
*Requires authentication*

**Request Body:** (all fields optional)
```json
{
  "name": "Updated Name",
  "basePrice": 6000000,
  "isActive": false
}
```

**Response:**
```json
{
  "success": true,
  "data": { /* updated service */ },
  "message": "Service updated successfully"
}
```

#### Delete Service
```http
DELETE /api/admin/services/:id
```
*Requires authentication*

**Response:**
```json
{
  "success": true,
  "message": "Service deleted successfully"
}
```

#### Dashboard Statistics
```http
GET /api/admin/stats
```
*Requires authentication*

**Response:**
```json
{
  "success": true,
  "data": {
    "totalServices": 15,
    "activeServices": 12,
    "totalOrders": 150,
    "revenue": 500000000
  }
}
```

---

## Error Responses

### Validation Error (400)
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "name",
      "message": "Name is required"
    },
    {
      "field": "basePrice",
      "message": "Base price must be non-negative"
    }
  ]
}
```

### Unauthorized (401)
```json
{
  "success": false,
  "message": "Authentication required"
}
```

### Forbidden (403)
```json
{
  "success": false,
  "message": "Admin access required"
}
```

### Not Found (404)
```json
{
  "success": false,
  "message": "Service not found"
}
```

### Conflict (409)
```json
{
  "success": false,
  "message": "Service with slug 'wedding-decoration' already exists"
}
```

### Internal Server Error (500)
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## Testing with cURL

### Get Active Services (Public)
```bash
curl http://localhost:4000/api/user/services
```

### Create Service (Admin)
```bash
curl -X POST http://localhost:4000/api/admin/services \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Wedding Decoration",
    "slug": "wedding-decoration",
    "shortDescription": "Luxury decoration",
    "fullDescription": "Complete description",
    "icon": "Flower",
    "features": ["Feature 1", "Feature 2"],
    "basePrice": 5000000,
    "isActive": true
  }'
```

### Update Service (Admin)
```bash
curl -X PUT http://localhost:4000/api/admin/services/SERVICE_ID \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "basePrice": 6000000
  }'
```

### Delete Service (Admin)
```bash
curl -X DELETE http://localhost:4000/api/admin/services/SERVICE_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Rate Limiting (Future)
- User routes: 100 requests/minute
- Admin routes: 200 requests/minute

## Pagination (Future)
```http
GET /api/admin/services?page=1&limit=10&sortBy=createdAt&sortOrder=desc
```
