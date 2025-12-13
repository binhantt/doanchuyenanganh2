# 🎉 Wedding Service Platform - Hệ Thống Dịch Vụ Tiệc Cưới

Hệ thống quản lý và cung cấp dịch vụ tiệc cưới toàn diện, bao gồm website giới thiệu, quản lý đơn hàng, thiệp cưới điện tử và panel quản trị.

## 📋 Mục Lục

- [Tổng Quan](#tổng-quan)
- [Kiến Trúc Hệ Thống](#kiến-trúc-hệ-thống)
- [Công Nghệ Sử Dụng](#công-nghệ-sử-dụng)
- [Cài Đặt](#cài-đặt)
- [Cấu Hình](#cấu-hình)
- [Chạy Dự Án](#chạy-dự-án)
- [API Documentation](#api-documentation)
- [Cấu Trúc Thư Mục](#cấu-trúc-thư-mục)
- [Tính Năng](#tính-năng)
- [Đóng Góp](#đóng-góp)

## 🎯 Tổng Quan

Dự án Wedding Service Platform là một hệ thống đầy đủ để quản lý và cung cấp dịch vụ tiệc cưới, bao gồm:

- **Landing Page**: Website giới thiệu dịch vụ với giao diện hiện đại, responsive
- **Admin Panel**: Hệ thống quản trị để quản lý sản phẩm, đơn hàng, khách hàng
- **Backend API**: RESTful API với Clean Architecture
- **Thiệp Cưới Điện Tử**: Hệ thống tạo và chia sẻ thiệp cưới online
- **Template Website**: Website hiển thị thiệp cưới với thiết kế đẹp mắt

## 🏗️ Kiến Trúc Hệ Thống

```
┌─────────────────┐
│  Landing Page   │  Next.js 15 + React 19
│   (Frontend)    │  TypeScript + Tailwind CSS
└────────┬────────┘
         │
         │ HTTP/REST
         │
┌────────▼────────┐
│   Backend API   │  Node.js + Express
│  (Clean Arch)   │  TypeScript + MySQL/PostgreSQL
└────────┬────────┘
         │
         │
┌────────▼────────┐
│  Admin Panel    │  Vue 3 + TypeScript
│   (Frontend)    │  Ant Design Vue + Tailwind
└─────────────────┘

┌─────────────────┐
│ Template Site   │  React + JavaScript
│ (Invitations)   │  Hiển thị thiệp cưới
└─────────────────┘
```

## 🛠️ Công Nghệ Sử Dụng

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 5.x
- **Language**: TypeScript 5.x
- **Database**: MySQL / PostgreSQL (Knex.js ORM)
- **Authentication**: JWT (JSON Web Tokens)
- **Architecture**: Clean Architecture (Domain-Driven Design)

### Landing Page (Frontend)
- **Framework**: Next.js 15.5.6
- **UI Library**: React 19.1.0
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 4.x
- **UI Components**: Radix UI, Ant Design
- **State Management**: Zustand
- **HTTP Client**: Axios

### Admin Panel
- **Framework**: Vue 3.4.0
- **Language**: TypeScript 5.x
- **Build Tool**: Vite 5.x
- **UI Library**: Ant Design Vue 4.x
- **Styling**: Tailwind CSS 3.x
- **State Management**: Pinia
- **Router**: Vue Router 4.x

### Template Website
- **Framework**: React
- **Language**: JavaScript
- **Purpose**: Hiển thị thiệp cưới điện tử

## 📦 Cài Đặt

### Yêu Cầu Hệ Thống

- Node.js >= 18.x
- npm >= 9.x hoặc yarn >= 1.22.x
- MySQL >= 8.0 hoặc PostgreSQL >= 14.x
- Git

### Clone Repository

```bash
git clone https://github.com/binhantt/doanchuyenanganh2.git
cd doanchuyenanganh2
```

### Cài Đặt Dependencies

#### Backend
```bash
cd backend
npm install
```

#### Landing Page
```bash
cd Laddingpage
npm install
```

#### Admin Panel
```bash
cd admin-panel
npm install
```

#### Template Website
```bash
cd temlple1
npm install
```

## ⚙️ Cấu Hình

### Backend Configuration

Tạo file `.env` trong thư mục `backend/`:

```env
# Server
PORT=4000
NODE_ENV=development

# Database
DB_CLIENT=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=wedding_service

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=http://localhost:3000
```

### Landing Page Configuration

Tạo file `.env.local` trong thư mục `Laddingpage/`:

```env
# API
NEXT_PUBLIC_API_URL=http://localhost:4000/api

# Template URL
NEXT_PUBLIC_TEMPLATE_URL=http://localhost:3001
```

### Database Setup

```bash
cd backend
npm run migrate:latest
npm run seed:run
```

## 🚀 Chạy Dự Án

### Development Mode

#### 1. Chạy Backend
```bash
cd backend
npm run dev
```
Backend sẽ chạy tại: `http://localhost:4000`

#### 2. Chạy Landing Page
```bash
cd Laddingpage
npm run dev
```
Landing page sẽ chạy tại: `http://localhost:3000`

#### 3. Chạy Admin Panel
```bash
cd admin-panel
npm run dev
```
Admin panel sẽ chạy tại: `http://localhost:5173` (hoặc port khác)

#### 4. Chạy Template Website
```bash
cd temlple1
npm start
```
Template website sẽ chạy tại: `http://localhost:3001`

### Production Build

#### Backend
```bash
cd backend
npm run build
npm start
```

#### Landing Page
```bash
cd Laddingpage
npm run build
npm start
```

#### Admin Panel
```bash
cd admin-panel
npm run build
# Serve dist/ folder với web server
```

## 📚 API Documentation

### Base URL
```
http://localhost:4000/api
```

### Authentication
Tất cả các API protected cần JWT token trong header:
```
Authorization: Bearer <token>
```

### Main Endpoints

#### User Endpoints
- `POST /api/user/register` - Đăng ký tài khoản
- `POST /api/user/login` - Đăng nhập
- `GET /api/user/profile` - Lấy thông tin user
- `PUT /api/user/profile` - Cập nhật thông tin user

#### Invitations (Thiệp Cưới)
- `GET /api/user/invitations` - Lấy danh sách thiệp cưới của user
- `POST /api/user/invitations` - Tạo thiệp cưới mới
- `GET /api/user/invitations/:id` - Lấy chi tiết thiệp cưới
- `PUT /api/user/invitations/:id` - Cập nhật thiệp cưới
- `DELETE /api/user/invitations/:id` - Xóa thiệp cưới
- `GET /api/user/invitations/share/:shareUrl` - Lấy thiệp cưới theo share URL (public)

#### Guests (Khách Mời)
- `GET /api/user/guests/invitation/:invitationId` - Lấy danh sách khách mời
- `POST /api/user/guests/invitation/:invitationId` - Tạo khách mời mới

#### Products (Sản Phẩm)
- `GET /api/products` - Lấy danh sách sản phẩm
- `GET /api/products/:id` - Lấy chi tiết sản phẩm

#### Packages (Gói Dịch Vụ)
- `GET /api/packages` - Lấy danh sách gói dịch vụ
- `GET /api/packages/:id` - Lấy chi tiết gói dịch vụ

#### Services (Dịch Vụ)
- `GET /api/services` - Lấy danh sách dịch vụ
- `GET /api/services/:slug` - Lấy chi tiết dịch vụ theo slug

#### Orders (Đơn Hàng)
- `GET /api/user/orders` - Lấy danh sách đơn hàng của user
- `POST /api/user/orders` - Tạo đơn hàng mới
- `GET /api/user/orders/:id` - Lấy chi tiết đơn hàng

## 📁 Cấu Trúc Thư Mục

```
doanchuyenanganh2/
├── backend/                 # Backend API
│   ├── src/
│   │   ├── application/    # Application layer (DTOs, Services)
│   │   ├── domain/         # Domain layer (Entities, Repositories)
│   │   ├── infrastructure/ # Infrastructure layer (Database, Config)
│   │   ├── interfaces/     # Interface layer (Controllers, Routes)
│   │   └── shared/         # Shared utilities
│   ├── dist/               # Compiled JavaScript
│   └── knexfile.ts         # Knex configuration
│
├── Laddingpage/            # Landing Page (Next.js)
│   ├── app/                # Next.js App Router
│   │   ├── page.tsx        # Homepage
│   │   ├── invitations/    # Thiệp cưới pages
│   │   ├── products/       # Sản phẩm pages
│   │   └── services/       # Dịch vụ pages
│   ├── src/
│   │   ├── features/       # Feature modules
│   │   │   ├── api/        # API clients
│   │   │   ├── auth/       # Authentication
│   │   │   ├── invitations/# Thiệp cưới features
│   │   │   ├── products/   # Sản phẩm features
│   │   │   └── ...
│   │   └── components/     # Shared components
│   └── components/         # UI components
│
├── admin-panel/            # Admin Panel (Vue 3)
│   ├── src/
│   │   ├── features/       # Feature modules
│   │   │   ├── categories/ # Quản lý danh mục
│   │   │   ├── products/   # Quản lý sản phẩm
│   │   │   ├── orders/     # Quản lý đơn hàng
│   │   │   └── ...
│   │   ├── layouts/        # Layout components
│   │   └── stores/         # Pinia stores
│   └── src/pages/          # Page components
│
└── temlple1/               # Template Website (React)
    ├── src/
    │   ├── components/     # React components
    │   ├── pages/          # Page components
    │   └── api/            # API client
    └── public/             # Static files
```

## ✨ Tính Năng

### Landing Page
- ✅ Trang chủ với hero section và các section giới thiệu
- ✅ Hiển thị danh sách dịch vụ, sản phẩm, gói dịch vụ
- ✅ Gallery ảnh tiệc cưới
- ✅ Testimonials (Đánh giá khách hàng)
- ✅ FAQ (Câu hỏi thường gặp)
- ✅ Form đặt lịch tư vấn
- ✅ Thiệp cưới điện tử - Tạo và quản lý thiệp cưới
- ✅ Giỏ hàng và đặt hàng
- ✅ Chatbot hỗ trợ
- ✅ Responsive design

### Admin Panel
- ✅ Dashboard tổng quan
- ✅ Quản lý người dùng
- ✅ Quản lý sản phẩm
- ✅ Quản lý gói dịch vụ
- ✅ Quản lý dịch vụ
- ✅ Quản lý đơn hàng
- ✅ Quản lý danh mục
- ✅ Quản lý gallery
- ✅ Quản lý FAQs
- ✅ Quản lý testimonials
- ✅ Quản lý consultations
- ✅ Quản lý promotions

### Thiệp Cưới Điện Tử
- ✅ Tạo thiệp cưới với nhiều mẫu template
- ✅ Tùy chỉnh nội dung (tên cô dâu, chú rể, ngày cưới, địa điểm)
- ✅ Upload ảnh bìa, ảnh cặp đôi
- ✅ Thêm câu chuyện tình yêu
- ✅ Tạo link chia sẻ cho từng khách mời
- ✅ Xem thiệp cưới trên website template
- ✅ Quản lý danh sách thiệp đã tạo

### Backend API
- ✅ RESTful API với Clean Architecture
- ✅ JWT Authentication
- ✅ Role-based access control
- ✅ File upload (images)
- ✅ Database migrations
- ✅ Seed data
- ✅ Error handling
- ✅ Input validation

## 🔐 Authentication Flow

1. User đăng ký/đăng nhập qua API
2. Backend trả về JWT token
3. Frontend lưu token vào localStorage
4. Mỗi request gửi kèm token trong header `Authorization`
5. Backend verify token và xử lý request

## 🗄️ Database Schema

### Main Tables
- `users` - Người dùng
- `invitations` - Thiệp cưới
- `guests` - Khách mời
- `products` - Sản phẩm
- `packages` - Gói dịch vụ
- `services` - Dịch vụ
- `orders` - Đơn hàng
- `order_items` - Chi tiết đơn hàng
- `categories` - Danh mục
- `galleries` - Gallery ảnh
- `testimonials` - Đánh giá
- `faqs` - Câu hỏi thường gặp
- `consultations` - Tư vấn

## 🧪 Testing

```bash
# Backend tests (nếu có)
cd backend
npm test

# Frontend tests (nếu có)
cd Laddingpage
npm test
```

## 📝 Scripts Hữu Ích

### Backend
```bash
npm run dev          # Chạy development server
npm run build        # Build production
npm run start        # Chạy production server
npm run migrate:make # Tạo migration mới
npm run migrate:latest # Chạy migrations
npm run seed:run     # Chạy seed data
```

### Landing Page
```bash
npm run dev          # Chạy development server
npm run build        # Build production
npm run start        # Chạy production server
npm run lint         # Lint code
```

### Admin Panel
```bash
npm run dev          # Chạy development server
npm run build        # Build production
npm run preview      # Preview production build
```

## 🤝 Đóng Góp

1. Fork dự án
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📄 License

Dự án này là dự án học tập (Đồ án chuyên ngành).

## 👥 Authors

- **Binh An** - [GitHub](https://github.com/binhantt)

## 🙏 Acknowledgments

- Next.js team
- Vue.js team
- Express.js team
- Ant Design team
- Tất cả các open source contributors

## 📞 Liên Hệ

Nếu có câu hỏi hoặc đề xuất, vui lòng mở issue trên GitHub.

---

**Lưu ý**: Đây là dự án học tập. Một số tính năng có thể chưa hoàn thiện hoặc đang trong quá trình phát triển.

