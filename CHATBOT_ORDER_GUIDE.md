# 📦 Hướng Dẫn Đặt Hàng Qua Chatbot

## ✨ Tính Năng Mới

Chatbot giờ đây có thể nhận đơn đặt hàng trực tiếp! Khi người dùng muốn đặt gói/sản phẩm, chatbot sẽ:
1. Nhận diện ý định đặt hàng
2. Trả về action để frontend hiển thị form
3. Thu thập thông tin khách hàng
4. Tạo đơn hàng trong hệ thống

## 🎯 Cách Hoạt Động

### Bước 1: Người dùng hỏi về sản phẩm cụ thể và muốn đặt

**Ví dụ:**
```
"Tôi muốn đặt Gói Standard"
"Chốt Gói Premium luôn"
"Book gói này cho mình"
"Đặt Backdrop Hoa Tươi"
```

### Bước 2: Chatbot nhận diện và trả về action

**Response từ API:**
```json
{
  "success": true,
  "data": {
    "message": "Dạ vâng! Gói Standard có giá 80.000.000đ. Để đặt gói này, bạn vui lòng cung cấp thông tin nhé 😊",
    "action": {
      "type": "order",
      "productId": "97d2a244-3858-46a1-a204-f3b2e21a074a",
      "productName": "Gói Standard",
      "productType": "package",
      "price": 80000000
    }
  }
}
```

### Bước 3: Frontend hiển thị form thu thập thông tin

**Thông tin cần thu thập:**
- ✅ Tên khách hàng (bắt buộc)
- ✅ Số điện thoại (bắt buộc)
- ✅ Ngày cưới (bắt buộc)
- ✅ Địa điểm tổ chức (bắt buộc)
- ⭕ Email (tùy chọn)
- ⭕ Số lượng khách (tùy chọn, mặc định 100)
- ⭕ Ghi chú (tùy chọn)

### Bước 4: Gửi thông tin để tạo đơn hàng

**Endpoint:** `POST /api/app/chatbot/order` hoặc `POST /api/user/chatbot/order`

**Request Body:**
```json
{
  "productId": "97d2a244-3858-46a1-a204-f3b2e21a074a",
  "productType": "package",
  "clientName": "Nguyễn Văn A",
  "clientPhone": "0901234567",
  "clientEmail": "nguyenvana@email.com",
  "weddingDate": "2024-12-25",
  "venue": "Nhà hàng ABC, Quận 1, TP.HCM",
  "guestCount": 200,
  "notes": "Muốn trang trí màu hồng pastel"
}
```

**Response Success:**
```json
{
  "success": true,
  "data": {
    "orderId": "uuid-here",
    "message": "Đơn hàng đã được tạo thành công! Mã đơn: uuid-here. Chúng tôi sẽ liên hệ với bạn sớm nhất."
  }
}
```

**Response Error:**
```json
{
  "success": false,
  "message": "Thiếu thông tin bắt buộc: Tên, SĐT, Ngày cưới, Địa điểm"
}
```

## 📋 Chi Tiết Đơn Hàng

Đơn hàng được tạo sẽ có:
- **Status:** `pending` (chờ xác nhận)
- **Payment Method:** `bank_transfer` (mặc định)
- **Deposit Amount:** 30% tổng giá trị
- **Order Items:** Sản phẩm/gói được đặt
- **Notes:** "Đặt qua chatbot - [Tên sản phẩm]"

## 🔍 Từ Khóa Nhận Diện Đặt Hàng

Chatbot sẽ nhận diện các từ khóa sau:
- `đặt`
- `chốt`
- `order`
- `book`
- `mua`
- `đăng ký`
- `booking`

## ⚠️ Lưu Ý

1. **Chỉ hoạt động khi có sản phẩm cụ thể:**
   - Người dùng phải hỏi về 1 sản phẩm/gói/dịch vụ cụ thể
   - Nếu hỏi chung chung → không có action

2. **Validation:**
   - Tên, SĐT, Ngày cưới, Địa điểm là bắt buộc
   - Product type phải là: `package`, `product`, hoặc `service`

3. **Email tạm:**
   - Nếu không có email → tự động tạo: `{phone}@temp.com`

4. **Đơn hàng trong database:**
   - Lưu vào bảng `orders` và `order_items`
   - Admin có thể xem và quản lý trong admin panel

## 🧪 Ví Dụ Flow Hoàn Chỉnh

### 1. Người dùng chat
```
User: "Cho mình xem Gói Standard"
```

### 2. Chatbot trả lời
```json
{
  "message": "Gói Standard của chúng tôi có giá 80.000.000đ 💰...",
  "images": [...],
  "products": [...]
}
```

### 3. Người dùng muốn đặt
```
User: "Chốt gói này luôn"
```

### 4. Chatbot trả về action
```json
{
  "message": "Dạ vâng! Để đặt Gói Standard, bạn vui lòng cung cấp thông tin...",
  "action": {
    "type": "order",
    "productId": "...",
    "productName": "Gói Standard",
    "productType": "package",
    "price": 80000000
  }
}
```

### 5. Frontend hiển thị form
- Form thu thập thông tin khách hàng
- Pre-fill: productId, productType, productName, price

### 6. Người dùng điền form và submit
```
POST /api/app/chatbot/order
{
  "productId": "...",
  "productType": "package",
  "clientName": "Nguyễn Văn A",
  "clientPhone": "0901234567",
  ...
}
```

### 7. Hệ thống tạo đơn hàng
- Lưu vào database
- Trả về orderId
- Admin có thể xem trong admin panel

### 8. Thông báo thành công
```
"Đơn hàng đã được tạo thành công! Mã đơn: xxx. Chúng tôi sẽ liên hệ với bạn sớm nhất."
```

## 🎨 UI/UX Suggestions

1. **Khi có action:**
   - Hiển thị button "Đặt ngay" hoặc "Điền thông tin"
   - Click vào button → mở modal/form

2. **Form design:**
   - Các field bắt buộc đánh dấu *
   - Date picker cho ngày cưới
   - Phone input với validation
   - Hiển thị tóm tắt sản phẩm đang đặt

3. **Sau khi đặt thành công:**
   - Hiển thị mã đơn hàng
   - Button "Xem đơn hàng" (nếu có trang order tracking)
   - Thông báo "Chúng tôi sẽ liên hệ sớm"

## 🔧 API Endpoints

### 1. Chat với chatbot
```
POST /api/app/chatbot/chat
POST /api/user/chatbot/chat
```

### 2. Tạo đơn hàng
```
POST /api/app/chatbot/order
POST /api/user/chatbot/order
```

### 3. Lấy quick replies
```
GET /api/app/chatbot/quick-replies
GET /api/user/chatbot/quick-replies
```

### 4. Lấy thông tin chatbot
```
GET /api/app/chatbot/info
GET /api/user/chatbot/info
```
