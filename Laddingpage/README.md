# Wedding Paradise - Users Web App

Ứng dụng web khách hàng cho dịch vụ cưới hỏi, được xây dựng với **Next.js 15** (App Router), **TypeScript** và **Tailwind CSS v4**. Cung cấp giao diện hiện đại với theme màu hồng/rose, trải nghiệm người dùng mượt mà cho việc duyệt và đặt dịch vụ cưới.

## 🎯 Mục Tiêu Dự Án

Tạo ra một nền tảng web toàn diện cho khách hàng có thể:
- ✅ Duyệt và xem chi tiết các **gói cưới** (Wedding Packages) với filter theo loại địa điểm
- ✅ Khám phá các **dịch vụ cưới** (Services) với tìm kiếm và filter theo danh mục
- ✅ Quản lý **giỏ hàng** với localStorage persistence (Zustand)
- ✅ Xem thông tin **về công ty** và đội ngũ
- ✅ **Liên hệ** và nhận tư vấn từ chuyên gia

## 🚀 Tính Năng Chính

### 🏠 **Trang Chủ (Home Page)**
- Hero section với gradient background và CTA buttons
- Features section giới thiệu 3 giá trị cốt lõi:
  - 💍 Gói cưới đa dạng
  - 🎉 Dịch vụ chuyên nghiệp  
  - ✨ Kỷ niệm vĩnh cửu
- Featured packages section hiển thị 3 gói cưới nổi bật từ API
- CTA section cuối trang với gradient background
- Responsive design với animations hover

### 💍 **Wedding Packages (Gói Cưới)**
- Danh sách gói cưới với filter theo `venue_type`:
  - 🏢 Indoor (Trong nhà)
  - 🌳 Outdoor (Ngoài trời)
  - 🌸 Garden (Vườn)
  - 🏖️ Beach (Bãi biển)
- Hiển thị thông tin: tên, mô tả, giá, số khách, loại địa điểm, hình ảnh
- Tìm kiếm theo tên gói
- Chi tiết gói cưới với dynamic routing `/wedding-packages/[slug]`
- Thêm gói cưới vào giỏ hàng
- Loading states và empty states

### 🎉 **Services (Dịch Vụ Cưới)**
- Danh sách dịch vụ với filter theo category
- Tìm kiếm theo tên dịch vụ hoặc mô tả
- Hiển thị thông tin:
  - Tên, mô tả, giá
  - Category badge
  - Availability status (Còn chỗ/Hết chỗ)
  - Duration (thời lượng)
  - Max guests (số khách tối đa)
- Thêm dịch vụ vào giỏ hàng
- Badge hiển thị trạng thái "Hết chỗ" và "Đã thêm"
- Chi tiết dịch vụ với dynamic routing `/services/[id]`

### 🛒 **Shopping Cart (Giỏ Hàng)**
- State management với **Zustand**
- **LocalStorage persistence** để lưu giỏ hàng
- Hỗ trợ cả wedding packages và services
- Hiển thị số lượng items trong navbar
- Cart preview và cart summary
- Voucher input system
- Checkout form với validation
- Client-side hydration với `useClientCart` hook

### 📞 **About & Contact**
- **Trang About** với:
  - Câu chuyện công ty
  - Thống kê thành tựu (500+ đám cưới, 5+ năm kinh nghiệm)
  - 3 giá trị cốt lõi (Tận tâm, Chuyên nghiệp, Sáng tạo)
  - Giới thiệu đội ngũ
- **Trang Contact** với form liên hệ

### 🎨 **UI/UX Design**
- Theme màu **hồng/rose** nhất quán (`from-pink-600 to-rose-600`)
- **Tailwind CSS v4** với custom theme và CSS variables
- **Radix UI** components:
  - Separator
  - Dialog
  - Navigation Menu
  - Tabs
- **Lucide React** icons
- Responsive design cho mobile, tablet, desktop
- Smooth animations và transitions
- Loading states với spinner
- Empty states với illustrations
- Hover effects và transform animations

## 🛠️ Công Nghệ Sử Dụng

### **Frontend Framework**
- **Next.js 15** - App Router cho SSR/SSG
- **React 18** - Component-based architecture
- **TypeScript** - Type safety và developer experience

### **Styling & UI**
- **Tailwind CSS v4** - Utility-first CSS framework với CSS variables
- **shadcn/ui** - High-quality React components
- **Radix UI** - Accessible component primitives
  - `@radix-ui/react-separator`
  - `@radix-ui/react-dialog`
  - `@radix-ui/react-navigation-menu`
  - `@radix-ui/react-tabs`
- **Lucide React** - Beautiful icon library
- **tw-animate-css** - Tailwind animation utilities

### **State Management & Data Fetching**
- **Zustand** - Lightweight state management cho cart
- **Axios** - HTTP client cho API calls
- **React Hooks** - Custom hooks cho logic reuse

### **Development Tools**
- **ESLint** - Code linting với Next.js config
- **TypeScript** - Static type checking
- **PostCSS** - CSS processing

## 📦 Yêu Cầu Hệ Thống

- **Node.js** >= 18.0.0
- **npm** >= 8.0.0 hoặc **yarn** >= 1.22.0
- **Git** cho version control

## ▶️ Cài Đặt & Chạy

### 1. Clone Repository
```bash
git clone <repository-url>
cd doanchuyennghanh/users
```

### 2. Cài Đặt Dependencies
```bash
npm install
# hoặc
yarn install
```

### 3. Cấu Hình Environment
Tạo file `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Chạy Development Server
```bash
npm run dev
# hoặc
yarn dev
```

### 5. Build Production
```bash
npm run build
npm run start
# hoặc
yarn build
yarn start
```

### 6. Lint Code
```bash
npm run lint
# hoặc
yarn lint
```

**Ứng dụng sẽ chạy tại:** http://localhost:3000

## 📁 Cấu Trúc Thư Mục

```
users/
├── 📁 app/                          # Next.js App Router
│   ├── 📁 about/                    # Trang giới thiệu
│   │   └── 📄 page.tsx
│   ├── 📁 cart/                     # Trang giỏ hàng
│   │   └── 📄 page.tsx
│   ├── 📁 contact/                  # Trang liên hệ
│   │   └── 📄 page.tsx
│   ├── 📁 products/                 # Trang sản phẩm
│   │   ├── 📄 page.tsx
│   │   └── 📁 [name]/              # Chi tiết sản phẩm (dynamic)
│   ├── 📁 services/                 # Trang dịch vụ
│   │   ├── 📄 page.tsx
│   │   └── 📁 [id]/                # Chi tiết dịch vụ (dynamic)
│   ├── 📁 wedding-packages/         # Trang gói cưới
│   │   ├── 📄 page.tsx
│   │   └── 📁 [...slug]/           # Catch-all route
│   ├── 📄 layout.tsx                # Root layout
│   ├── 📄 page.tsx                  # Trang chủ
│   ├── 📄 globals.css               # Global styles + Tailwind
│   └── 📄 favicon.ico
│
├── 📁 features/                     # Feature-based architecture
│   ├── 📁 cart/                     # Cart feature
│   │   ├── 📁 components/
│   │   │   ├── 📄 CartItem.tsx
│   │   │   ├── 📄 CartSummary.tsx
│   │   │   ├── 📄 VoucherInput.tsx
│   │   │   └── 📄 CheckoutForm.tsx
│   │   ├── 📁 store/
│   │   │   └── 📄 useCartStore.ts   # Zustand store
│   │   ├── 📁 hooks/
│   │   │   ├── 📄 useCartPersistence.ts
│   │   │   └── 📄 useClientCart.ts
│   │   ├── 📁 types/
│   │   │   └── 📄 index.ts
│   │   └── 📄 index.ts
│   │
│   ├── 📁 navbar/                   # Navigation feature
│   │   ├── 📁 components/
│   │   │   ├── 📄 Navbar.tsx
│   │   │   ├── 📄 NavbarTop.tsx
│   │   │   ├── 📄 NavbarMenu.tsx
│   │   │   ├── 📄 NavbarCart.tsx
│   │   │   ├── 📄 NavbarSearch.tsx
│   │   │   ├── 📄 CartPreview.tsx
│   │   │   └── 📄 CartStats.tsx
│   │   ├── 📁 Hooks/
│   │   │   └── 📄 useNavbarMenu.ts
│   │   ├── 📄 types.ts
│   │   └── 📄 index.ts
│   │
│   ├── 📁 footer/                   # Footer feature
│   │   ├── 📁 components/
│   │   │   ├── 📄 Footer.tsx
│   │   │   ├── 📄 FooterBrand.tsx
│   │   │   ├── 📄 FooterLinks.tsx
│   │   │   ├── 📄 FooterServices.tsx
│   │   │   ├── 📄 FooterContact.tsx
│   │   │   └── 📄 FooterNewsletter.tsx
│   │   ├── 📄 types.ts
│   │   └── 📄 index.ts
│   │
│   ├── 📁 home/                     # Home page components
│   │   ├── 📁 components/
│   │   │   ├── 📄 HeroSection.tsx
│   │   │   ├── 📄 HeroTitle.tsx
│   │   │   ├── 📄 HeroDescription.tsx
│   │   │   └── 📄 HeroButtons.tsx
│   │   └── 📁 hooks/
│   │
│   ├── 📁 wedding-packages/         # Wedding packages feature
│   │   ├── 📁 api/
│   │   │   └── 📄 weddingApi.ts     # API client
│   │   ├── 📁 components/
│   │   │   └── 📄 PackageCard.tsx
│   │   ├── 📁 hooks/
│   │   ├── 📁 store/
│   │   ├── 📁 types/
│   │   │   └── 📄 index.ts          # TypeScript types
│   │   └── 📄 index.ts
│   │
│   ├── 📁 products/                 # Products feature
│   │   ├── 📁 api/
│   │   ├── 📁 components/
│   │   │   └── 📄 ProductCard.tsx
│   │   ├── 📁 hooks/
│   │   ├── 📁 store/
│   │   ├── 📁 types/
│   │   └── 📄 index.ts
│   │
│   ├── 📁 contact/                  # Contact feature
│   │   ├── 📁 components/
│   │   │   ├── 📄 ContactForm.tsx
│   │   │   └── 📄 ContactInfo.tsx
│   │   ├── 📁 types/
│   │   └── 📄 index.ts
│   │
│   └── 📁 layouts/                  # Layout components
│       ├── 📄 navbar.tsx
│       ├── 📄 footer.tsx
│       └── 📄 index.ts
│
├── 📁 components/                   # Shared UI components
│   └── 📁 ui/                       # shadcn/ui components
│       ├── 📄 button.tsx
│       ├── 📄 navigation-menu.tsx
│       └── ...
│
├── 📁 lib/                          # Utility libraries
│   └── 📄 utils.ts                  # Common utilities (formatPrice, createSlug, etc.)
│
├── 📁 public/                       # Static assets
│   ├── 📄 file.svg
│   ├── 📄 globe.svg
│   ├── 📄 next.svg
│   ├── 📄 vercel.svg
│   └── 📄 window.svg
│
├── 📄 package.json                  # Dependencies & scripts
├── 📄 tsconfig.json                 # TypeScript config
├── � niext.config.ts                # Next.js config
├── 📄 components.json               # shadcn/ui config
├── 📄 postcss.config.mjs            # PostCSS config
├── 📄 eslint.config.mjs             # ESLint config
├── 📄 .env.local                    # Environment variables
├── 📄 .gitignore                    # Git ignore rules
└── 📄 README.md                     # Documentation
```

## 🎨 Design System

### **Color Palette**
```css
/* Primary Colors */
--color-pink-600: #ec4899
--color-rose-600: #f43f5e

/* Gradients */
bg-gradient-to-r from-pink-600 to-rose-600
bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100

/* Neutral Colors */
--color-gray-900: #1f2937
--color-gray-600: #6b7280
--color-white: #ffffff
```

### **Typography**
- **Font Family**: System fonts (sans-serif)
- **Headings**: 
  - H1: `text-4xl md:text-5xl font-bold`
  - H2: `text-3xl font-bold`
  - H3: `text-2xl font-bold`
- **Body**: `text-base text-gray-600`
- **Small**: `text-sm text-gray-500`

### **Spacing & Layout**
- **Container**: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **Padding**: Responsive (py-8, py-12, py-16, py-20)
- **Gap**: `gap-4`, `gap-6`, `gap-8`, `gap-12`
- **Border Radius**: 
  - Small: `rounded-lg` (8px)
  - Medium: `rounded-xl` (12px)
  - Large: `rounded-2xl` (16px)
  - Full: `rounded-full`

### **Shadows & Effects**
- **Shadow**: `shadow-lg`, `shadow-xl`, `shadow-2xl`
- **Hover**: `hover:shadow-2xl`, `hover:-translate-y-1`, `hover:scale-110`
- **Transitions**: `transition-all duration-300`, `transition-transform duration-500`

## 🔧 API Integration

### **Base URL**
```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
```

### **Endpoints**
```typescript
// Wedding Packages
GET /api/users/wedding-packages          // Lấy tất cả gói cưới
GET /api/users/wedding-packages/featured // Lấy gói cưới nổi bật

// Services
GET /api/users/services                  // Lấy tất cả dịch vụ
GET /api/users/services/available        // Lấy dịch vụ còn chỗ
GET /api/services/category/:id           // Lấy dịch vụ theo category
```

### **Data Types**
```typescript
interface WeddingPackage {
  id: number;
  name: string;
  description: string;
  price: number;
  guest_count: number;
  venue_type: 'indoor' | 'outdoor' | 'garden' | 'beach';
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}

interface Service {
  id: number;
  name: string;
  description: string;
  price: number | string;
  category_id?: number;
  category_name?: string;
  is_available: boolean | number;
  image_url?: string;
  duration?: string;
  max_guests?: number;
}
```

## 🛒 Cart System

### **Zustand Store**
```typescript
interface CartItem {
  type: 'package' | 'service';
  itemId: number;
  name: string;
  price: number;
  quantity: number;
  image_url?: string;
  description?: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (type: string, itemId: number) => void;
  updateQuantity: (type: string, itemId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  hasItem: (type: string, itemId: number) => boolean;
}
```

### **LocalStorage Persistence**
- Key: `wedding-cart`
- Auto-save on every cart change
- Auto-load on app initialization
- Client-side only (SSR safe)

## 📱 Responsive Breakpoints

```css
/* Mobile First Approach */
sm:  640px   /* Tablet */
md:  768px   /* Small Desktop */
lg:  1024px  /* Desktop */
xl:  1280px  /* Large Desktop */
2xl: 1536px  /* Extra Large Desktop */
```

## 🚀 Performance Optimizations

### **Next.js Features**
- ✅ App Router với Server Components
- ✅ Automatic code splitting
- ✅ Image optimization (future)
- ✅ Font optimization
- ✅ Static generation cho content pages

### **Client-Side Optimizations**
- ✅ Lazy loading components
- ✅ Memoization với useMemo
- ✅ Debounced search
- ✅ LocalStorage caching
- ✅ Optimistic UI updates

## 🔒 Best Practices

### **Code Quality**
- ✅ TypeScript strict mode
- ✅ ESLint rules enforcement
- ✅ Component composition
- ✅ Custom hooks for logic reuse
- ✅ Feature-based architecture

### **Accessibility**
- ✅ Semantic HTML
- ✅ ARIA labels
- ✅ Keyboard navigation
- ✅ Focus management
- ✅ Color contrast compliance

### **SEO**
- ✅ Meta tags (future)
- ✅ Structured data (future)
- ✅ Sitemap (future)
- ✅ Open Graph tags (future)

## 🐛 Known Issues & Future Improvements

### **Current Limitations**
- ⚠️ No authentication system yet
- ⚠️ No payment integration
- ⚠️ No order tracking
- ⚠️ No admin panel integration

### **Planned Features**
- 🔜 User authentication (login/register)
- 🔜 Payment gateway integration
- 🔜 Order management system
- 🔜 Email notifications
- 🔜 Reviews and ratings
- 🔜 Wishlist functionality
- 🔜 Multi-language support

## 📞 Support & Contact

- **Developer**: Wedding Paradise Team
- **Email**: dev@weddingparadise.com
- **Documentation**: [Internal Wiki]
- **Issue Tracking**: GitHub Issues

---

**Wedding Paradise Users Web App** - Tạo nên những khoảnh khắc đáng nhớ nhất! 💒✨
