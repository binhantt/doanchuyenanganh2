# API Development Guide - Adding New APIs

Hướng dẫn chi tiết để thêm API mới vào backend mà không cần sửa đổi các component hiện có.

---

## 📋 Quy Trình Tổng Quát

### 1. **Tạo API Documentation** (`.md` file)
### 2. **Tạo Database Migration** (nếu cần)
### 3. **Tạo Domain Layer** (Entity + Repository Interface)
### 4. **Tạo Application Layer** (Service + DTO + Validator)
### 5. **Tạo Infrastructure Layer** (Repository Implementation)
### 6. **Tạo Interface Layer** (Controller + Routes)
### 7. **Test API** (cURL hoặc Postman)

---

## 🏗️ Cấu Trúc Thư Mục Cho Feature Mới

```
src/
├── domain/
│   ├── entities/
│   │   └── YourFeature.ts              # Entity class
│   └── repositories/
│       └── IYourFeatureRepository.ts   # Repository interface
│
├── application/
│   ├── services/
│   │   └── YourFeatureService.ts       # Business logic
│   ├── dto/
│   │   └── YourFeatureDTO.ts           # Data Transfer Objects
│   ├── validators/
│   │   └── yourFeature.validator.ts    # Input validation
│   └── interfaces/
│       └── IYourFeatureService.ts      # Service interface
│
├── infrastructure/
│   ├── database/
│   │   └── migrations/
│   │       └── [timestamp]_create_your_features_table.ts
│   └── repositories/
│       └── YourFeatureRepository.ts    # Repository implementation
│
└── interfaces/
    ├── controllers/
    │   └── yourFeature.controller.ts   # HTTP handlers
    └── routes/
        ├── user/
        │   └── yourFeature.routes.ts   # Public routes
        └── admin/
            └── yourFeature.routes.ts   # Admin routes
```

---

## 📝 Step-by-Step Example: Thêm "Reviews" API

### Step 1: Tạo API Documentation

**File:** `backend/REVIEWS_API.md`

```markdown
# Reviews API Documentation

## Overview
API cho quản lý đánh giá (Reviews) từ khách hàng về dịch vụ/sản phẩm.

## User Endpoints (Public)

### Get Reviews for Service
\`\`\`http
GET /api/user/reviews/service/:serviceId
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "rating": 5,
      "comment": "Dịch vụ tuyệt vời!",
      "customerName": "Nguyễn Văn A",
      "createdAt": "2025-11-15T10:00:00.000Z"
    }
  ]
}
\`\`\`

## Admin Endpoints

### Create Review (Admin)
\`\`\`http
POST /api/admin/reviews
Authorization: Bearer <token>
\`\`\`

**Request Body:**
\`\`\`json
{
  "serviceId": "uuid",
  "rating": 5,
  "comment": "Dịch vụ tuyệt vời!",
  "customerName": "Nguyễn Văn A",
  "isApproved": true
}
\`\`\`

### Delete Review
\`\`\`http
DELETE /api/admin/reviews/:id
Authorization: Bearer <token>
\`\`\`
```

---

### Step 2: Tạo Database Migration

**File:** `src/infrastructure/database/migrations/[timestamp]_create_reviews_table.ts`

```typescript
import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('reviews', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('UUID()'));
    table.uuid('service_id').notNullable();
    table.integer('rating').notNullable().checkBetween([1, 5]);
    table.text('comment').notNullable();
    table.string('customer_name', 200).notNullable();
    table.boolean('is_approved').defaultTo(false);
    table.timestamps(true, true);
    
    table.foreign('service_id').references('id').inTable('services');
    table.index('service_id');
    table.index('is_approved');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('reviews');
}
```

**Chạy migration:**
```bash
npm run migrate:make create_reviews_table
npm run migrate:latest
```

---

### Step 3: Tạo Domain Layer

**File:** `src/domain/entities/Review.ts`

```typescript
export interface IReview {
  id: string;
  serviceId: string;
  rating: number;
  comment: string;
  customerName: string;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class Review implements IReview {
  id: string;
  serviceId: string;
  rating: number;
  comment: string;
  customerName: string;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: IReview) {
    this.id = data.id;
    this.serviceId = data.serviceId;
    this.rating = data.rating;
    this.comment = data.comment;
    this.customerName = data.customerName;
    this.isApproved = data.isApproved;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
```

**File:** `src/domain/repositories/IReviewRepository.ts`

```typescript
import { Review } from '../entities/Review';

export interface IReviewRepository {
  findByServiceId(serviceId: string): Promise<Review[]>;
  findById(id: string): Promise<Review | null>;
  create(review: Omit<Review, 'id' | 'createdAt' | 'updatedAt'>): Promise<Review>;
  update(id: string, data: Partial<Review>): Promise<Review>;
  delete(id: string): Promise<void>;
}
```

---

### Step 4: Tạo Application Layer

**File:** `src/application/dto/ReviewDTO.ts`

```typescript
export interface CreateReviewDTO {
  serviceId: string;
  rating: number;
  comment: string;
  customerName: string;
  isApproved?: boolean;
}

export interface UpdateReviewDTO {
  rating?: number;
  comment?: string;
  isApproved?: boolean;
}

export interface ReviewResponseDTO {
  id: string;
  serviceId: string;
  rating: number;
  comment: string;
  customerName: string;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

**File:** `src/application/validators/review.validator.ts`

```typescript
import { CreateReviewDTO, UpdateReviewDTO } from '../dto/ReviewDTO';

export class ReviewValidator {
  static validateCreate(data: any): CreateReviewDTO {
    if (!data.serviceId) throw new Error('Service ID is required');
    if (!data.rating || data.rating < 1 || data.rating > 5) {
      throw new Error('Rating must be between 1 and 5');
    }
    if (!data.comment || data.comment.trim().length === 0) {
      throw new Error('Comment is required');
    }
    if (!data.customerName) throw new Error('Customer name is required');

    return {
      serviceId: data.serviceId,
      rating: data.rating,
      comment: data.comment,
      customerName: data.customerName,
      isApproved: data.isApproved || false,
    };
  }

  static validateUpdate(data: any): UpdateReviewDTO {
    const update: UpdateReviewDTO = {};

    if (data.rating !== undefined) {
      if (data.rating < 1 || data.rating > 5) {
        throw new Error('Rating must be between 1 and 5');
      }
      update.rating = data.rating;
    }

    if (data.comment !== undefined) {
      if (data.comment.trim().length === 0) {
        throw new Error('Comment cannot be empty');
      }
      update.comment = data.comment;
    }

    if (data.isApproved !== undefined) {
      update.isApproved = data.isApproved;
    }

    return update;
  }
}
```

**File:** `src/application/services/ReviewService.ts`

```typescript
import { IReviewRepository } from '../../domain/repositories/IReviewRepository';
import { Review } from '../../domain/entities/Review';
import { CreateReviewDTO, UpdateReviewDTO, ReviewResponseDTO } from '../dto/ReviewDTO';
import { ReviewValidator } from '../validators/review.validator';
import { v4 as uuidv4 } from 'uuid';

export class ReviewService {
  constructor(private reviewRepository: IReviewRepository) {}

  async getReviewsByService(serviceId: string): Promise<ReviewResponseDTO[]> {
    const reviews = await this.reviewRepository.findByServiceId(serviceId);
    return reviews.map(this.toDTO);
  }

  async getReview(id: string): Promise<ReviewResponseDTO> {
    const review = await this.reviewRepository.findById(id);
    if (!review) throw new Error('Review not found');
    return this.toDTO(review);
  }

  async createReview(data: any): Promise<ReviewResponseDTO> {
    const validatedData = ReviewValidator.validateCreate(data);
    
    const review = new Review({
      id: uuidv4(),
      ...validatedData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const created = await this.reviewRepository.create(review);
    return this.toDTO(created);
  }

  async updateReview(id: string, data: any): Promise<ReviewResponseDTO> {
    const validatedData = ReviewValidator.validateUpdate(data);
    const updated = await this.reviewRepository.update(id, validatedData);
    return this.toDTO(updated);
  }

  async deleteReview(id: string): Promise<void> {
    await this.reviewRepository.delete(id);
  }

  private toDTO(review: Review): ReviewResponseDTO {
    return {
      id: review.id,
      serviceId: review.serviceId,
      rating: review.rating,
      comment: review.comment,
      customerName: review.customerName,
      isApproved: review.isApproved,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
    };
  }
}
```

---

### Step 5: Tạo Infrastructure Layer

**File:** `src/infrastructure/repositories/ReviewRepository.ts`

```typescript
import { Knex } from 'knex';
import { IReviewRepository } from '../../domain/repositories/IReviewRepository';
import { Review } from '../../domain/entities/Review';

export class ReviewRepository implements IReviewRepository {
  constructor(private db: Knex) {}

  async findByServiceId(serviceId: string): Promise<Review[]> {
    const rows = await this.db('reviews')
      .where('service_id', serviceId)
      .where('is_approved', true)
      .orderBy('created_at', 'desc');

    return rows.map(this.mapToEntity);
  }

  async findById(id: string): Promise<Review | null> {
    const row = await this.db('reviews').where('id', id).first();
    return row ? this.mapToEntity(row) : null;
  }

  async create(review: Omit<Review, 'id' | 'createdAt' | 'updatedAt'>): Promise<Review> {
    const now = new Date();
    const [id] = await this.db('reviews').insert({
      id: review.id,
      service_id: review.serviceId,
      rating: review.rating,
      comment: review.comment,
      customer_name: review.customerName,
      is_approved: review.isApproved,
      created_at: now,
      updated_at: now,
    });

    return this.findById(review.id) as Promise<Review>;
  }

  async update(id: string, data: Partial<Review>): Promise<Review> {
    const updateData: any = {};
    if (data.rating !== undefined) updateData.rating = data.rating;
    if (data.comment !== undefined) updateData.comment = data.comment;
    if (data.isApproved !== undefined) updateData.is_approved = data.isApproved;
    updateData.updated_at = new Date();

    await this.db('reviews').where('id', id).update(updateData);
    return this.findById(id) as Promise<Review>;
  }

  async delete(id: string): Promise<void> {
    await this.db('reviews').where('id', id).delete();
  }

  private mapToEntity(row: any): Review {
    return new Review({
      id: row.id,
      serviceId: row.service_id,
      rating: row.rating,
      comment: row.comment,
      customerName: row.customer_name,
      isApproved: row.is_approved,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    });
  }
}
```

---

### Step 6: Tạo Interface Layer

**File:** `src/interfaces/controllers/review.controller.ts`

```typescript
import { Request, Response } from 'express';
import { ReviewService } from '../../application/services/ReviewService';

export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  async getReviewsByService(req: Request, res: Response): Promise<void> {
    try {
      const { serviceId } = req.params;
      const reviews = await this.reviewService.getReviewsByService(serviceId);
      res.json({ success: true, data: reviews, count: reviews.length });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getReview(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const review = await this.reviewService.getReview(id);
      res.json({ success: true, data: review });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async createReview(req: Request, res: Response): Promise<void> {
    try {
      const review = await this.reviewService.createReview(req.body);
      res.status(201).json({ success: true, data: review, message: 'Review created successfully' });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async updateReview(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const review = await this.reviewService.updateReview(id, req.body);
      res.json({ success: true, data: review, message: 'Review updated successfully' });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async deleteReview(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.reviewService.deleteReview(id);
      res.json({ success: true, message: 'Review deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
```

**File:** `src/interfaces/routes/user/review.routes.ts`

```typescript
import { Router } from 'express';
import { ReviewController } from '../../controllers/review.controller';
import { ReviewService } from '../../../application/services/ReviewService';
import { ReviewRepository } from '../../../infrastructure/repositories/ReviewRepository';
import { getDatabase } from '../../../infrastructure/config/database';

const router = Router();
const db = getDatabase();
const reviewRepository = new ReviewRepository(db);
const reviewService = new ReviewService(reviewRepository);
const reviewController = new ReviewController(reviewService);

// Public routes
router.get('/service/:serviceId', (req, res) => reviewController.getReviewsByService(req, res));
router.get('/:id', (req, res) => reviewController.getReview(req, res));

export default router;
```

**File:** `src/interfaces/routes/admin/review.routes.ts`

```typescript
import { Router } from 'express';
import { ReviewController } from '../../controllers/review.controller';
import { ReviewService } from '../../../application/services/ReviewService';
import { ReviewRepository } from '../../../infrastructure/repositories/ReviewRepository';
import { getDatabase } from '../../../infrastructure/config/database';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();
const db = getDatabase();
const reviewRepository = new ReviewRepository(db);
const reviewService = new ReviewService(reviewRepository);
const reviewController = new ReviewController(reviewService);

// Admin routes (protected)
router.use(authMiddleware);

router.post('/', (req, res) => reviewController.createReview(req, res));
router.put('/:id', (req, res) => reviewController.updateReview(req, res));
router.delete('/:id', (req, res) => reviewController.deleteReview(req, res));

export default router;
```

---

### Step 7: Đăng Ký Routes

**File:** `src/interfaces/routes/user/index.ts` (thêm vào)

```typescript
import reviewRoutes from './review.routes';

// ... existing routes ...

router.use('/reviews', reviewRoutes);
```

**File:** `src/interfaces/routes/admin/index.ts` (thêm vào)

```typescript
import reviewRoutes from './review.routes';

// ... existing routes ...

router.use('/reviews', reviewRoutes);
```

---

### Step 8: Test API

```bash
# Get reviews for a service
curl http://localhost:4000/api/user/reviews/service/SERVICE_ID

# Create review (Admin)
curl -X POST http://localhost:4000/api/admin/reviews \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "serviceId": "SERVICE_ID",
    "rating": 5,
    "comment": "Dịch vụ tuyệt vời!",
    "customerName": "Nguyễn Văn A",
    "isApproved": true
  }'

# Update review
curl -X PUT http://localhost:4000/api/admin/reviews/REVIEW_ID \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "rating": 4,
    "isApproved": false
  }'

# Delete review
curl -X DELETE http://localhost:4000/api/admin/reviews/REVIEW_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 🎯 Checklist Khi Thêm API Mới

- [ ] Tạo `.md` documentation file
- [ ] Tạo database migration (nếu cần)
- [ ] Tạo Entity class trong `domain/entities/`
- [ ] Tạo Repository interface trong `domain/repositories/`
- [ ] Tạo DTO classes trong `application/dto/`
- [ ] Tạo Validator class trong `application/validators/`
- [ ] Tạo Service class trong `application/services/`
- [ ] Tạo Repository implementation trong `infrastructure/repositories/`
- [ ] Tạo Controller class trong `interfaces/controllers/`
- [ ] Tạo user routes trong `interfaces/routes/user/`
- [ ] Tạo admin routes trong `interfaces/routes/admin/`
- [ ] Đăng ký routes trong `interfaces/routes/user/index.ts` và `admin/index.ts`
- [ ] Test API với cURL hoặc Postman
- [ ] Cập nhật `API_ROUTES.md` chính

---

## 📚 Best Practices

### 1. **Separation of Concerns**
- Domain layer: Pure business logic
- Application layer: Use cases
- Infrastructure layer: Database operations
- Interface layer: HTTP handling

### 2. **Validation**
- Luôn validate input ở Application layer
- Throw meaningful errors
- Return 400 cho validation errors

### 3. **Error Handling**
- Sử dụng try-catch trong controllers
- Return appropriate HTTP status codes
- Provide clear error messages

### 4. **Database**
- Sử dụng migrations cho schema changes
- Index các fields thường xuyên query
- Sử dụng foreign keys cho relationships

### 5. **Naming Conventions**
- Entities: `PascalCase` (Review, Service)
- Interfaces: `IPascalCase` (IReviewRepository)
- Services: `PascalCaseService` (ReviewService)
- Controllers: `PascalCaseController` (ReviewController)
- Routes: `kebab-case.routes.ts` (review.routes.ts)
- Database tables: `snake_case` (reviews)
- Database columns: `snake_case` (service_id)

### 6. **Response Format**
```json
{
  "success": true/false,
  "data": {},
  "message": "Optional message",
  "count": "Optional count for lists"
}
```

---

## 🔗 Liên Kết Tài Liệu

- [ARCHITECTURE.md](./ARCHITECTURE.md) - Kiến trúc tổng quát
- [API_ROUTES.md](./API_ROUTES.md) - Tất cả endpoints
- [QUICK_START.md](./QUICK_START.md) - Hướng dẫn nhanh

---

**Last Updated:** 2025-11-16
