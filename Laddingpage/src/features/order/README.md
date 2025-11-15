# 🛒 Order Feature - Wedding Paradise

Feature module hoàn chỉnh cho giỏ hàng và đặt hàng trong ứng dụng Next.js.

## 🎯 Tính Năng

### 1. **Shopping Cart (Giỏ Hàng)**
- ✅ Thêm/xóa sản phẩm và gói dịch vụ
- ✅ Cập nhật số lượng
- ✅ Tính tổng tiền tự động
- ✅ LocalStorage persistence (Zustand)
- ✅ Cart icon với badge số lượng trong Navbar

### 2. **Customer Information Form**
- ✅ Họ tên, email, số điện thoại
- ✅ Ngày cưới dự kiến
- ✅ Số lượng khách
- ✅ Địa điểm tổ chức
- ✅ Ghi chú thêm
- ✅ Validation đầy đủ

### 3. **Payment Methods**
- ✅ Chuyển khoản ngân hàng (hiển thị thông tin TK)
- ✅ Ví MoMo
- ✅ ZaloPay
- ✅ Tiền mặt
- ✅ UI chọn phương thức thanh toán đẹp

### 4. **Order Summary**
- ✅ Tạm tính
- ✅ Mã giảm giá (voucher)
- ✅ VAT 10%
- ✅ Tổng cộng
- ✅ Sticky sidebar

### 5. **Multi-Step Checkout**
- ✅ Step 1: Giỏ hàng
- ✅ Step 2: Thông tin khách hàng
- ✅ Step 3: Thanh toán
- ✅ Step 4: Thành công
- ✅ Progress indicator

## 📁 Cấu Trúc

```
order/
├── components/
│   ├── CartItem.tsx                 # Item trong giỏ hàng
│   ├── OrderSummary.tsx             # Tổng đơn hàng
│   ├── CustomerInfoForm.tsx         # Form thông tin
│   ├── PaymentMethodSelector.tsx    # Chọn thanh toán
│   └── index.ts
│
├── store/
│   └── useCartStore.ts              # Zustand store
│
├── data/
│   └── paymentMethods.ts            # Phương thức thanh toán
│
├── types.ts                         # TypeScript types
├── index.ts                         # Main export
└── README.md
```

## 🚀 Usage

### Thêm vào giỏ hàng
```tsx
import { useCartStore } from '@/src/features/order/store/useCartStore';

const { addItem } = useCartStore();

addItem({
  id: 'product-1',
  type: 'product',
  name: 'Váy cưới',
  price: 15000000,
  image: 'url',
  description: 'Mô tả',
});
```

### Hiển thị số lượng trong Navbar
```tsx
const { getTotalItems } = useCartStore();
const totalItems = getTotalItems();
```

### Truy cập trang Order
```
/order
```

## 🎨 Components

### CartItem
- Hiển thị thông tin sản phẩm/gói
- Buttons +/- để thay đổi số lượng
- Button xóa
- Tính tổng tiền tự động

### OrderSummary
- Tạm tính
- Input mã giảm giá
- VAT 10%
- Tổng cộng
- Sticky position

### CustomerInfoForm
- 6 fields: name, email, phone, date, guests, venue
- Validation real-time
- Error messages
- Icons cho mỗi field

### PaymentMethodSelector
- 4 phương thức
- Radio button style
- Hiển thị thông tin chi tiết khi chọn
- Bank transfer info
- E-wallet instructions

## 💾 State Management

### Zustand Store
```typescript
interface CartStore {
  items: OrderItem[];
  addItem: (item) => void;
  removeItem: (id, type) => void;
  updateQuantity: (id, type, quantity) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
}
```

### LocalStorage
- Key: `wedding-cart-storage`
- Auto-save on every change
- Auto-load on app start

## 📊 Order Flow

```
Homepage/Product Detail
  ↓
Click "Thêm Vào Giỏ"
  ↓
Cart icon badge updates
  ↓
Click Cart icon → /order
  ↓
Step 1: Review cart items
  ↓
Step 2: Fill customer info
  ↓
Step 3: Select payment method
  ↓
Step 4: Success page
```

## 🎯 Validation

### Customer Info
- **Full Name**: Required, min 2 characters
- **Email**: Required, valid email format
- **Phone**: Required, 10 digits
- **Wedding Date**: Required, future date
- **Guest Count**: Optional, number
- **Venue**: Optional, string
- **Notes**: Optional, textarea

### Payment
- Must select payment method
- Must agree to terms

## 💳 Payment Methods

### 1. Bank Transfer
```
Ngân hàng: Vietcombank
Số TK: 1234567890
Chủ TK: WEDDING PARADISE
Chi nhánh: Hà Nội
```

### 2. MoMo/ZaloPay
- Link thanh toán gửi qua SMS
- Hoàn tất trong 24h

### 3. Cash
- Thanh toán khi gặp mặt
- Sắp xếp lịch hẹn

## 🎨 Styling

### Colors
- Primary: `from-rose-500 to-pink-600`
- Success: `from-green-500 to-emerald-600`
- Border: `border-rose-100`, `border-rose-200`

### Components
- Cards: `rounded-2xl`, `border-2`
- Buttons: `rounded-full`, `rounded-xl`
- Inputs: `rounded-xl`, `border-2`

## 📱 Responsive

- **Mobile**: Stack layout, full width
- **Tablet**: 2 columns where appropriate
- **Desktop**: Sidebar layout (2/3 + 1/3)

## ✨ Features Nổi Bật

- ✅ Real-time cart updates
- ✅ LocalStorage persistence
- ✅ Multi-step checkout
- ✅ Voucher system
- ✅ VAT calculation
- ✅ Payment method selection
- ✅ Order success page
- ✅ Validation & error handling
- ✅ Responsive design
- ✅ Smooth animations

## 🔄 Integration

### Thêm button "Thêm vào giỏ" vào Product/Package
```tsx
import { useCartStore } from '@/src/features/order/store/useCartStore';

const { addItem } = useCartStore();

<button onClick={() => addItem({...})}>
  Thêm Vào Giỏ
</button>
```

### Hiển thị Cart icon trong Navbar
```tsx
import { useCartStore } from '@/src/features/order/store/useCartStore';

const { getTotalItems } = useCartStore();
const totalItems = getTotalItems();

<Link href="/order">
  <ShoppingCart />
  {totalItems > 0 && <Badge>{totalItems}</Badge>}
</Link>
```

## 🎁 Voucher Codes (Mock)

- **WEDDING2024**: Giảm 10%
- Có thể thêm nhiều mã khác

## 📝 TODO / Future

- [ ] Backend API integration
- [ ] Real payment gateway
- [ ] Email confirmation
- [ ] Order tracking
- [ ] Invoice generation
- [ ] Admin order management
- [ ] Multiple addresses
- [ ] Saved payment methods
- [ ] Order history

---

**Wedding Paradise Order System** - Đặt hàng dễ dàng, thanh toán linh hoạt! 🛒✨
