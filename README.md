# Wedding Paradise - Landing Page

Landing page chuyên nghiệp cho dịch vụ tổ chức đám cưới, được xây dựng với **Next.js 15**, **TypeScript**, và **Tailwind CSS v4**. Giao diện hiện đại với theme màu hồng/rose, tối ưu cho trải nghiệm người dùng và chuyển đổi khách hàng.

## 🎯 Mục Tiêu Dự Án

Tạo ra một landing page thu hút và chuyên nghiệp để:
- ✅ Giới thiệu dịch vụ tổ chức đám cưới
- ✅ Hiển thị các gói dịch vụ và bảng giá
- ✅ Trưng bày thư viện ảnh đám cưới
- ✅ Thu thập thông tin khách hàng qua form đặt lịch
- ✅ Xây dựng niềm tin qua testimonials và quy trình làm việc
- ✅ Tối ưu SEO và tốc độ tải trang

## 🚀 Tính Năng Chính

### 🏠 **Hero Section**
- Hero banner với gradient background hồng/rose
- Tiêu đề chính và mô tả thu hút
- Call-to-action buttons nổi bật
- Responsive design với animations mượt mà
- Tối ưu cho first impression

### 💎 **Service Features**
- Giới thiệu các dịch vụ cốt lõi
- Icon và mô tả rõ ràng
- Layout grid responsive
- Hover effects và animations
- Highlight các giá trị độc đáo

### 💍 **Wedding Packages**
- Hiển thị các gói dịch vụ cưới
- Bảng giá chi tiết và so sánh
- Feature list cho từng gói
- Pricing cards với hover effects
- CTA buttons cho từng gói
- Badge "Popular" cho gói nổi bật

### 📸 **Gallery Section**
- Thư viện ảnh đám cưới đẹp mắt
- Grid layout responsive
- Lightbox/modal để xem ảnh full size
- Lazy loading cho performance
- Showcase portfolio chất lượng cao

### 👥 **Testimonials**
- Đánh giá và feedback từ khách hàng
- Avatar, tên, và rating stars
- Carousel/slider cho nhiều testimonials
- Social proof để xây dựng niềm tin
- Quote design đẹp mắt

### 📋 **Process Steps**
- Quy trình làm việc từng bước
- Timeline hoặc numbered steps
- Icon và mô tả cho mỗi bước
- Giúp khách hàng hiểu rõ flow
- Tạo sự tin tưởng và chuyên nghiệp

### ❓ **FAQ Section**
- Câu hỏi thường gặp
- Accordion/collapsible design
- Giải đáp thắc mắc phổ biến
- Giảm friction trong quyết định
- Tối ưu UX

### 📞 **Booking Section**
- Form đặt lịch tư vấn
- Input fields: tên, email, số điện thoại, ngày cưới, ghi chú
- Validation và error handling
- Success message sau khi submit
- Integration với backend API (future)
- Lead generation chính

### 🎨 **UI/UX Design**
- Theme màu **hồng/rose** nhất quán
- **Tailwind CSS v4** với custom theme
- **Radix UI** components cho accessibility
- **Lucide React** icons
- Responsive design: mobile, tablet, desktop
- Smooth animations và transitions
- Loading states và micro-interactions
- Optimized typography system

## 🛠️ Công Nghệ Sử Dụng

### **Frontend Framework**
- **Next.js 15** - App Router, SSR/SSG, Image Optimization
- **React 19** - Latest features và performance
- **TypeScript** - Type safety và developer experience

### **Styling & UI**
- **Tailwind CSS v4** - Utility-first CSS với CSS variables
- **shadcn/ui** - High-quality React components
- **Radix UI** - Accessible component primitives
  - `@radix-ui/react-accordion` - FAQ section
  - `@radix-ui/react-dialog` - Modals
  - `@radix-ui/react-tabs` - Tabbed content
  - `@radix-ui/react-tooltip` - Tooltips
- **Lucide React** - Beautiful icon library
- **tw-animate-css** - Tailwind animation utilities

### **State Management & Forms**
- **Zustand** - Lightweight state management
- **React Hooks** - Custom hooks cho logic reuse
- **Axios** - HTTP client cho API calls (future)

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
cd Laddingpage
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
Laddingpage/
├── 📁 app/                          # Next.js App Router
│   ├── 📄 layout.tsx                # Root layout với Navbar & Footer
│   ├── 📄 page.tsx                  # Landing page chính
│   ├── 📄 globals.css               # Global styles + Tailwind
│   └── 📄 favicon.ico
│
├── 📁 src/                          # Source code
│   ├── 📁 components/               # Shared components
│   │   ├── 📄 NavbarWrapper.tsx     # Navbar wrapper
│   │   └── 📄 TypographyDemo.tsx    # Typography demo
│   │
│   ├── 📁 features/                 # Feature-based architecture
│   │   ├── 📁 landing/              # Hero section
│   │   │   └── 📄 hero.tsx
│   │   │
│   │   ├── 📁 services/             # Service features section
│   │   │   └── 📄 index.tsx
│   │   │
│   │   ├── 📁 packages/             # Wedding packages pricing
│   │   │   └── 📄 index.tsx
│   │   │
│   │   ├── 📁 gallery/              # Photo gallery
│   │   │   └── 📄 index.tsx
│   │   │
│   │   ├── 📁 testimonials/         # Customer reviews
│   │   │   └── 📄 index.tsx
│   │   │
│   │   ├── 📁 process/              # Process steps
│   │   │   └── 📄 index.tsx
│   │   │
│   │   ├── 📁 faq/                  # FAQ section
│   │   │   └── 📄 index.tsx
│   │   │
│   │   ├── 📁 booking/              # Booking form
│   │   │   └── 📄 index.tsx
│   │   │
│   │   └── 📁 footer/               # Footer section
│   │       └── 📄 index.tsx
│   │
│   └── 📁 styles/                   # Style utilities
│       └── 📄 typography.ts         # Typography system
│
├── 📁 components/                   # shadcn/ui components
│   └── 📁 ui/
│       ├── 📄 button.tsx
│       ├── 📄 accordion.tsx
│       ├── 📄 dialog.tsx
│       ├── 📄 tabs.tsx
│       └── ...
│
├── 📁 lib/                          # Utility libraries
│   └── 📄 utils.ts                  # Common utilities
│
├── 📁 public/                       # Static assets
│   ├── 📄 file.svg
│   ├── 📄 globe.svg
│   └── ...
│
├── 📄 package.json                  # Dependencies & scripts
├── 📄 tsconfig.json                 # TypeScript config
├── 📄 next.config.ts                # Next.js config
├── 📄 components.json               # shadcn/ui config
├── 📄 postcss.config.mjs            # PostCSS config
├── 📄 eslint.config.mjs             # ESLint config
├── 📄 .env.local                    # Environment variables
├── 📄 .gitignore                    # Git ignore rules
├── 📄 README.md                     # Documentation (this file)
├── 📄 SETUP.md                      # Setup guide
└── 📄 STYLING_GUIDE.md              # Styling guidelines
```

## 🎨 Design System

### **Color Palette**
```css
/* Primary Colors - Rose/Pink Theme */
--color-pink-50: #fdf2f8
--color-pink-100: #fce7f3
--color-pink-600: #ec4899
--color-rose-500: #f43f5e
--color-rose-600: #e11d48

/* Gradients */
bg-gradient-to-r from-rose-500 to-pink-600
bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100
bg-gradient-to-b from-white via-pink-50/30 to-white

/* Neutral Colors */
--color-gray-900: #1f2937
--color-gray-600: #6b7280
--color-gray-500: #9ca3af
--color-white: #ffffff
```

### **Typography System**
```tsx
// Display Text (Hero)
<h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">

// Section Headings
<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">

// Card Titles
<h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold">

// Body Text
<p className="text-lg leading-relaxed text-gray-600">

// Small Text
<p className="text-sm leading-normal text-gray-500">
```

### **Spacing & Layout**
- **Container**: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **Section Padding**: `py-20` (vertical), `px-4 sm:px-6 lg:px-8` (horizontal)
- **Grid Gap**: `gap-8`, `gap-12`
- **Border Radius**: `rounded-2xl`, `rounded-full`

### **Components**
```tsx
// Primary Button
<button className="px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300">

// Card
<div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-500 border-2 border-pink-100 hover:border-pink-300">

// Badge
<div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100 rounded-full">
  <span className="text-sm font-medium text-pink-600">Badge</span>
</div>
```

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
- ✅ Image optimization với next/image
- ✅ Font optimization
- ✅ Static generation cho landing page

### **Client-Side Optimizations**
- ✅ Lazy loading components
- ✅ Optimized images và assets
- ✅ Minimal JavaScript bundle
- ✅ CSS optimization với Tailwind
- ✅ Smooth animations với CSS transforms

## 🔒 Best Practices

### **Code Quality**
- ✅ TypeScript strict mode
- ✅ ESLint rules enforcement
- ✅ Component composition
- ✅ Feature-based architecture
- ✅ Reusable components

### **Accessibility**
- ✅ Semantic HTML
- ✅ ARIA labels
- ✅ Keyboard navigation
- ✅ Focus management
- ✅ Color contrast compliance (WCAG AA)

### **SEO**
- ✅ Meta tags optimization
- ✅ Semantic HTML structure
- ✅ Fast page load times
- ✅ Mobile-friendly design
- ✅ Structured data (future)

## 🎯 Landing Page Sections

### 1. Hero Section
- **Mục đích**: First impression, thu hút attention
- **Elements**: Headline, subheadline, CTA buttons, hero image/video
- **Goal**: Giữ chân visitors, encourage scroll

### 2. Service Features
- **Mục đích**: Giới thiệu value proposition
- **Elements**: 3-6 feature cards với icons
- **Goal**: Highlight unique selling points

### 3. Wedding Packages
- **Mục đích**: Hiển thị pricing và packages
- **Elements**: Pricing cards, feature lists, CTA buttons
- **Goal**: Drive conversions, clear pricing

### 4. Gallery
- **Mục đích**: Visual proof, showcase work quality
- **Elements**: Photo grid, lightbox
- **Goal**: Build trust, inspire customers

### 5. Process Steps
- **Mục đích**: Explain how it works
- **Elements**: Numbered steps, icons, descriptions
- **Goal**: Reduce friction, clarify process

### 6. Testimonials
- **Mục đích**: Social proof
- **Elements**: Customer quotes, photos, ratings
- **Goal**: Build trust and credibility

### 7. FAQ
- **Mục đích**: Address common concerns
- **Elements**: Accordion with Q&A
- **Goal**: Remove objections, provide clarity

### 8. Booking Form
- **Mục đích**: Lead generation
- **Elements**: Contact form, validation
- **Goal**: Capture leads, schedule consultations

## 🐛 Known Issues & Future Improvements

### **Current Limitations**
- ⚠️ No backend integration yet (form submissions)
- ⚠️ No CMS for content management
- ⚠️ No analytics tracking
- ⚠️ No A/B testing setup

### **Planned Features**
- 🔜 Backend API integration cho booking form
- 🔜 Email notifications cho form submissions
- 🔜 Google Analytics / Facebook Pixel
- 🔜 CMS integration (Sanity/Contentful)
- 🔜 Multi-language support (i18n)
- 🔜 Blog section
- 🔜 Live chat widget
- 🔜 Video testimonials
- 🔜 Interactive pricing calculator

## 📊 Conversion Optimization

### **CTA Strategy**
- Primary CTA: "Đặt Lịch Tư Vấn" (Book Consultation)
- Secondary CTA: "Xem Bảng Giá" (View Pricing)
- Multiple CTA placements throughout page

### **Trust Signals**
- Customer testimonials với photos
- Portfolio gallery
- Process transparency
- Clear pricing
- Professional design

### **Mobile Optimization**
- Touch-friendly buttons (min 44x44px)
- Fast loading times
- Simplified navigation
- Sticky CTA button (future)

## 📞 Support & Contact

- **Developer**: Wedding Paradise Team
- **Email**: dev@weddingparadise.com
- **Documentation**: See SETUP.md and STYLING_GUIDE.md
- **Issue Tracking**: GitHub Issues

---

**Wedding Paradise Landing Page** - Tạo nên những khoảnh khắc đáng nhớ nhất! 💒✨

## 📚 Tài Liệu Liên Quan

- [SETUP.md](./Laddingpage/SETUP.md) - Hướng dẫn setup chi tiết
- [STYLING_GUIDE.md](./Laddingpage/STYLING_GUIDE.md) - Quy chuẩn styling và design system
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com/)
