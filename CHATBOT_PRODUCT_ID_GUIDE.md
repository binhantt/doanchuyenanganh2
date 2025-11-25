# 🎯 Hướng Dẫn Tìm Sản Phẩm Thông Minh

## ✨ Tính Năng Mới

Chatbot giờ đây có thể tự động tìm và hiển thị sản phẩm cụ thể theo 2 cách:

### 🔍 Cách 1: Tìm theo TÊN sản phẩm (Thông minh)
Chỉ cần nhắc tên sản phẩm trong câu hỏi, chatbot sẽ tự động nhận diện!

**Ví dụ:**
```
- "Cho mình xem Gói Standard"
- "Gói Premium giá bao nhiêu?"
- "Tôi muốn biết về Backdrop Hoa Tươi"
- "Thiệp cưới cao cấp có không?"
```

### 🆔 Cách 2: Tìm theo ID (Chính xác)

#### 1. Dùng từ khóa "id"
```
id: abc123-def456-ghi789
```

#### 2. Dùng từ khóa "mã"
```
mã sản phẩm abc123-def456-ghi789
```

#### 3. Dùng từ khóa "sản phẩm"
```
sản phẩm abc123-def456-ghi789
```

#### 4. Chỉ cần ID (UUID format)
```
abc123-def456-ghi789-012345
```

## 🎁 Kết Quả

Khi tìm thấy sản phẩm cụ thể, chatbot sẽ:

1. ✅ **CHỈ hiển thị sản phẩm đó** (không hiển thị tất cả sản phẩm khác)
2. 📝 Hiển thị thông tin chi tiết:
   - Tên sản phẩm
   - Giá
   - Danh mục
   - Mô tả
   - Đặc điểm/tính năng
3. 🖼️ **CHỈ hiển thị hình ảnh của sản phẩm đó** (có gắn productId)
4. 💬 Tư vấn nhiệt tình và chi tiết về sản phẩm

## 🎯 Ưu Điểm

### ✅ Tìm theo TÊN:
- Tự nhiên, dễ dùng
- Không cần biết ID
- Chatbot tự động nhận diện (exact match hoặc partial match)
- Phù hợp với người dùng thông thường

### ✅ Tìm theo ID:
- Chính xác 100%
- Phù hợp khi có nhiều sản phẩm tên giống nhau
- Dùng cho admin hoặc người có kinh nghiệm

## ⚠️ Lưu Ý

- Nếu tìm thấy sản phẩm cụ thể → CHỈ hiển thị sản phẩm đó
- Nếu KHÔNG tìm thấy → Hiển thị tất cả sản phẩm như bình thường
- Mỗi image có `productId` để biết thuộc sản phẩm nào
- Chatbot ưu tiên tìm theo ID trước, sau đó mới tìm theo tên

## 🧪 Ví Dụ Thực Tế

### Ví dụ 1: Tìm theo TÊN (Thông minh)

**Người dùng:** "Cho mình xem Gói Standard"

**Kết quả:**
- ✅ Chatbot tìm thấy "Gói Standard"
- � nCHỈ hiển thị thông tin Gói Standard
- �️ CHỈ hớiển thị ảnh của Gói Standard (có productId)
- 💬 Tư vấn chi tiết về gói này

**Chatbot:** "Gói Standard của chúng tôi có giá 80.000.000đ 💰. Gói này bao gồm trang trí sảnh tiệc cao cấp, backdrop chụp ảnh đẹp mắt... Nếu bạn quan tâm, mình có thể tư vấn thêm nhé 🌸!"

### Ví dụ 2: Tìm theo ID (Chính xác)

**Người dùng:** "Cho mình xem sản phẩm id: 97d2a244-3858-46a1-a204-f3b2e21a074a"

**Kết quả:**
- ✅ Chatbot tìm thấy sản phẩm với ID này
- 📝 CHỈ hiển thị thông tin sản phẩm đó
- 🖼️ CHỈ hiển thị ảnh của sản phẩm đó
- 💬 Tư vấn chi tiết

### Ví dụ 3: Không tìm thấy

**Người dùng:** "Có sản phẩm gì không?"

**Kết quả:**
- ❌ Không tìm thấy sản phẩm cụ thể
- 📦 Hiển thị TẤT CẢ sản phẩm
- 🖼️ Hiển thị ảnh của tất cả sản phẩm
- 💬 Tư vấn tổng quan

## 🔧 Cách Lấy ID Sản Phẩm

Để lấy ID sản phẩm, bạn có thể:
1. Vào Admin Panel → Products
2. Click vào sản phẩm muốn xem
3. Copy ID từ URL hoặc thông tin chi tiết
