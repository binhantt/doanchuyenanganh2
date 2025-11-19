# Hướng dẫn quản lý Mã giảm giá (Vouchers) trong Admin Panel

## ✅ Chức năng đã có sẵn

Admin panel đã có đầy đủ chức năng CRUD (Create, Read, Update, Delete) cho mã giảm giá.

## Truy cập

**URL**: `http://localhost:5173/promotions`

**Menu**: Click vào "Mã giảm giá" trong sidebar (icon Tag màu hồng)

## Các chức năng

### 1. ✅ XEM danh sách mã giảm giá

- Hiển thị bảng với các cột:
  - Mã code (VD: SUMMER2024)
  - Tiêu đề
  - Giá trị giảm (% hoặc số tiền)
  - Đơn tối thiểu
  - Thời gian áp dụng
  - Trạng thái (Đang diễn ra / Sắp diễn ra / Đã hết hạn)
  - Kích hoạt (On/Off switch)
  - Thao tác (Edit / Delete)

### 2. ✅ THÊM mã giảm giá mới

**Cách thực hiện:**
1. Click nút **"Thêm mã giảm giá"** (màu hồng, góc trên bên phải)
2. Modal form sẽ hiển thị
3. Điền thông tin:
   - **Mã giảm giá**: VD: NEWYEAR2025 (tự động tạo từ tiêu đề)
   - **Tiêu đề**: VD: "Chào năm mới 2025"
   - **Mô tả**: Mô tả chi tiết
   - **Loại giảm giá**: 
     - Phần trăm (%) - có thể set giảm tối đa
     - Số tiền cố định (VNĐ)
   - **Giá trị giảm**: VD: 20 (nếu %) hoặc 500000 (nếu cố định)
   - **Giảm tối đa**: (chỉ với %) VD: 5000000
   - **Đơn hàng tối thiểu**: VD: 10000000
   - **Ngày bắt đầu**: Chọn ngày giờ
   - **Ngày kết thúc**: Chọn ngày giờ
   - **Trạng thái**: Bật/Tắt
4. Click **"Tạo mới"**

**Kết quả**: Mã giảm giá mới được thêm vào danh sách

### 3. ✅ SỬA mã giảm giá

**Cách thực hiện:**
1. Trong bảng danh sách, tìm mã giảm giá cần sửa
2. Click icon **Edit** (bút chì màu xanh) ở cột "Thao tác"
3. Modal form hiển thị với dữ liệu hiện tại
4. Chỉnh sửa các thông tin cần thiết
5. Click **"Cập nhật"**

**Kết quả**: Mã giảm giá được cập nhật

### 4. ✅ XÓA mã giảm giá

**Cách thực hiện:**
1. Trong bảng danh sách, tìm mã giảm giá cần xóa
2. Click icon **Delete** (thùng rác màu đỏ) ở cột "Thao tác"
3. Popup xác nhận hiển thị: "Bạn có chắc chắn muốn xóa mã giảm giá này?"
4. Click **"Xóa"** để xác nhận

**Kết quả**: Mã giảm giá bị xóa khỏi hệ thống

### 5. ✅ BẬT/TẮT mã giảm giá

**Cách thực hiện:**
1. Trong bảng danh sách, tìm mã giảm giá
2. Click vào **Switch** ở cột "Kích hoạt"
3. Trạng thái tự động cập nhật

**Kết quả**: Mã giảm giá được bật/tắt ngay lập tức

### 6. ✅ LỌC và TÌM KIẾM

**Bộ lọc có sẵn:**
- **Tìm kiếm**: Tìm theo mã hoặc tiêu đề
- **Loại giảm giá**: Phần trăm / Cố định / Tất cả
- **Trạng thái**: Hoạt động / Không hoạt động / Tất cả
- Nút **"Đặt lại"** để xóa bộ lọc

## Dữ liệu mẫu

Hệ thống đã có 8 mã giảm giá mẫu:

1. **SUMMER2024** - Giảm 20% mùa hè
2. **WEDDING2024** - Giảm 3.000.000đ gói cưới
3. **NEWYEAR2025** - Giảm 15% năm mới
4. **FLASH50** - Flash sale giảm 50%
5. **VIPWEDDING** - Giảm 5.000.000đ gói VIP
6. **EARLYBIRD** - Giảm 10% đặt sớm
7. **FIRSTORDER** - Giảm 500.000đ khách mới
8. **WEEKEND20** - Giảm 20% cuối tuần

## Cách load dữ liệu mẫu

```bash
cd backend
npx knex seed:run --specific=009_vouchers.ts
```

## API Endpoints được sử dụng

- `GET /admin/vouchers` - Lấy danh sách
- `GET /admin/vouchers/:id` - Lấy chi tiết
- `POST /admin/vouchers` - Tạo mới
- `PUT /admin/vouchers/:id` - Cập nhật
- `DELETE /admin/vouchers/:id` - Xóa

## Validation

Form tự động validate:
- ✅ Mã code không được trống
- ✅ Tiêu đề không được trống
- ✅ Giá trị giảm phải > 0
- ✅ Nếu %, giá trị phải từ 0-100
- ✅ Ngày kết thúc phải sau ngày bắt đầu

## Trạng thái hiển thị

Hệ thống tự động hiển thị trạng thái:
- 🟢 **Đang diễn ra** (màu xanh) - Trong thời gian áp dụng
- 🔵 **Sắp diễn ra** (màu xanh dương) - Chưa đến ngày bắt đầu
- 🔴 **Đã hết hạn** (màu đỏ) - Quá ngày kết thúc
- ⚫ **Tắt** (màu xám) - isActive = false

## Tóm tắt

✅ **THÊM**: Nút "Thêm mã giảm giá" → Điền form → "Tạo mới"
✅ **SỬA**: Icon Edit → Chỉnh sửa → "Cập nhật"
✅ **XÓA**: Icon Delete → Xác nhận → "Xóa"
✅ **BẬT/TẮT**: Click Switch
✅ **TÌM KIẾM**: Dùng bộ lọc phía trên bảng

Tất cả chức năng đã hoạt động đầy đủ! 🎉
