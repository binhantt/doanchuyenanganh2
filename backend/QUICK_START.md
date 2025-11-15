# Quick Start Guide

## Prerequisites
- Node.js >= 18.0.0
- MySQL >= 8.0
- npm or yarn

## Setup Steps

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment
Create `.env` file:
```bash
cp .env.example .env
```

Edit `.env`:
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

### 3. Create Database
```bash
mysql -u root -p
```

```sql
CREATE DATABASE wedding_service;
EXIT;
```

### 4. Run Migrations & Seeds
```bash
npm run db:setup
```

This will:
- Create tables (users, services, orders, order_items)
- Seed initial data

### 5. Start Development Server
```bash
npm run dev
```

Server will run at: http://localhost:4000

## Test the API

### Health Check
```bash
curl http://localhost:4000/health
```

### Get Services (Public)
```bash
curl http://localhost:4000/api/user/services
```

### Admin Routes (Mock Auth)
```bash
curl http://localhost:4000/api/admin/services \
  -H "Authorization: Bearer mock-token"
```

## Project Structure
```
backend/
├── src/
│   ├── application/        # Business logic
│   ├── domain/            # Entities & interfaces
│   ├── infrastructure/    # Database & config
│   ├── interfaces/        # Controllers & routes
│   ├── shared/            # Utilities
│   └── server.ts          # Entry point
├── .env                   # Environment variables
└── package.json
```

## Available Scripts

```bash
# Development
npm run dev              # Start dev server with hot reload

# Database
npm run migrate:make     # Create new migration
npm run migrate:latest   # Run migrations
npm run migrate:rollback # Rollback last migration
npm run seed:run         # Run seeds
npm run db:setup         # Run migrations + seeds

# Production
npm run build            # Build TypeScript
npm run start            # Start production server
```

## API Endpoints

### Public Routes
- `GET /api/user/services` - List active services
- `GET /api/user/services/:id` - Get service details
- `GET /api/user/services/slug/:slug` - Get by slug

### Admin Routes (Auth Required)
- `GET /api/admin/services` - List all services
- `POST /api/admin/services` - Create service
- `PUT /api/admin/services/:id` - Update service
- `DELETE /api/admin/services/:id` - Delete service
- `GET /api/admin/stats` - Dashboard stats

## Next Steps

1. **Implement JWT Authentication**
   - Add bcrypt for password hashing
   - Create login/register endpoints
   - Generate JWT tokens

2. **Add More Features**
   - Orders management
   - User profiles
   - File uploads for images

3. **Testing**
   - Add Jest for unit tests
   - Add Supertest for API tests

4. **Deployment**
   - Configure production environment
   - Setup CI/CD pipeline
   - Deploy to cloud (AWS, Heroku, etc.)

## Troubleshooting

### Database Connection Failed
- Check MySQL is running
- Verify credentials in `.env`
- Ensure database exists

### Port Already in Use
Change port in `.env`:
```env
PORT=4001
```

### Migration Errors
Reset database:
```bash
npm run migrate:rollback
npm run migrate:latest
```

## Documentation
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Architecture overview
- [API_ROUTES.md](./API_ROUTES.md) - Complete API documentation
- [README.md](./README.md) - Project overview
