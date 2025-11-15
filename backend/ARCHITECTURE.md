# Backend Architecture

Clean Architecture implementation with Knex.js and TypeScript.

## Project Structure

```
src/
├── application/              # Application Business Logic
│   ├── interfaces/          # Service interfaces (ports)
│   │   └── IServiceService.ts
│   ├── services/            # Application services
│   │   └── ServiceService.ts
│   ├── validators/          # Input validation
│   │   └── service.validator.ts
│   └── dto/                 # Data Transfer Objects
│       └── ServiceDTO.ts
│
├── domain/                   # Business Domain Layer
│   ├── entities/            # Domain entities
│   │   └── Service.ts
│   └── repositories/        # Repository interfaces
│       └── IServiceRepository.ts
│
├── infrastructure/           # External Implementations
│   ├── config/              # Configuration
│   │   ├── database.ts
│   │   └── constants.ts
│   ├── database/            # Database layer
│   │   ├── connection.ts
│   │   ├── migrations/
│   │   └── seeds/
│   └── repositories/        # Repository implementations
│       └── ServiceRepository.ts
│
├── interfaces/               # Interface Adapters
│   ├── controllers/         # HTTP Controllers
│   │   └── service.controller.ts
│   ├── middlewares/         # Express middlewares
│   │   ├── auth.middleware.ts
│   │   ├── validation.middleware.ts
│   │   └── error.middleware.ts
│   ├── routes/              # Route definitions
│   │   ├── index.ts
│   │   ├── user/
│   │   │   ├── index.ts
│   │   │   └── service.routes.ts
│   │   └── admin/
│   │       ├── index.ts
│   │       └── service.routes.ts
│   └── serializers/         # Response serializers
│       └── service.serializer.ts
│
├── shared/                   # Shared Utilities
│   ├── errors/              # Custom error classes
│   │   └── AppError.ts
│   ├── utils/               # Utility functions
│   │   └── routeBuilder.ts
│   └── types/               # Global TypeScript types
│       └── index.ts
│
└── server.ts                 # Application entry point
```

## Layer Responsibilities

### Domain Layer
- Pure business logic
- No dependencies on external frameworks
- Entities and repository interfaces

### Application Layer
- Use cases and business workflows
- Service interfaces and implementations
- Input validation and DTOs

### Infrastructure Layer
- External service implementations
- Database connections and queries
- Third-party integrations

### Interface Layer
- HTTP request/response handling
- Route definitions
- Middleware
- Response serialization

### Shared Layer
- Cross-cutting concerns
- Utilities and helpers
- Common types

## Routing Structure

### User Routes (`/api/user`)
- Public or authenticated user access
- Read-only operations
- Only active resources

### Admin Routes (`/api/admin`)
- Admin authentication required
- Full CRUD operations
- Access to all resources

## Database Migrations

```bash
# Create migration
npx knex migrate:make migration_name --knexfile src/infrastructure/config/database.ts

# Run migrations
npm run migrate:latest

# Rollback
npm run migrate:rollback

# Run seeds
npm run seed:run
```

## Dependency Flow

```
Interfaces → Application → Domain
     ↓
Infrastructure
```

- Interfaces depend on Application
- Application depends on Domain
- Infrastructure implements Domain interfaces
- Domain has no dependencies
