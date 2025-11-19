# Hướng dẫn quản lý hình ảnh Services trong Admin Panel

## ✅ Tính năng đã sẵn sàng

Admin panel đã được cập nhật để hỗ trợ đầy đủ việc quản lý hình ảnh URLs cho services.

## Cách sử dụng

### 1. Truy cập trang Services

1. Mở admin panel: `http://localhost:5173`
2. Đăng nhập (nếu cần)
3. Click vào menu **"Dịch vụ"** ở sidebar

### 2. Tạo Service mới với hình ảnh

1. Click nút **"Thêm dịch vụ"** (màu hồng, góc trên bên phải)
2. Điền thông tin service:
   - **Tên dịch vụ**: VD: "Trang trí tiệc cưới"
   - **Slug**: Tự động tạo từ tên (VD: "trang-tri-tiec-cuoi")
   - **Mô tả ngắn**: Mô tả ngắn gọn
   - **Mô tả đầy đủ**: Mô tả chi tiết
   - **Icon**: VD: "Flower", "Heart", "Camera"
   - **Giá cơ bản**: VD: 5000000

3. **Thêm tính năng**:
   - **Tính năng bao gồm**: Click "+ Thêm tính năng" để thêm
   - **Tính năng không bao gồm**: (tùy chọn)
   - **Điểm nổi bật**: (tùy chọn)

4. **Thêm hình ảnh**:
   - Nhập URL hình ảnh đầu tiên (VD: `https://picsum.photos/800/600?random=1`)
   - Click **"+ Thêm hình ảnh"** để thêm nhiều ảnh
   - Hình ảnh đầu tiên sẽ tự động là ảnh chính (primary)

5. Click **"Tạo mới"** để lưu

### 3. Cập nhật Service và hình ảnh

1. Trong bảng danh sách services, click icon **Edit** (bút chì màu xanh)
2. Modal sẽ hiển thị với dữ liệu hiện tại
3. Cập nhật thông tin cần thiết
4. **Cập nhật hình ảnh**:
   - Thêm URL mới
   - Xóa URL cũ bằng nút "Xóa"
   - Thay đổi thứ tự bằng cách sắp xếp lại
5. Click **"Cập nhật"** để lưu

**Lưu ý quan trọng:**
- Khi bạn cập nhật service, tất cả hình ảnh cũ sẽ bị xóa và thay thế bằng danh sách mới
- Hãy đảm bảo giữ lại các URL bạn muốn giữ

### 4. Xem hình ảnh trong bảng

Trong bảng danh sách services, cột đầu tiên sẽ hiển thị:
- **Ảnh đại diện**: Hình ảnh đầu tiên (primary) của service
- **"Không có ảnh"**: Nếu service chưa có hình ảnh

### 5. Xóa Service

1. Click icon **Delete** (thùng rác màu đỏ)
2. Xác nhận xóa
3. Service và tất cả hình ảnh liên quan sẽ bị xóa

## Ví dụ URLs hình ảnh

Bạn có thể dùng các nguồn sau để test:

### Picsum (Random images)
```
https://picsum.photos/800/600?random=1
https://picsum.photos/800/600?random=2
https://picsum.photos/800/600?random=3
```

### Unsplash (Wedding images)
```
https://images.unsplash.com/photo-1519741497674-611481863552?w=800
https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800
https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800
```

### Placeholder
```
https://via.placeholder.com/800x600/FF69B4/FFFFFF?text=Service+1
https://via.placeholder.com/800x600/FFB6C1/FFFFFF?text=Service+2
```

## Cấu trúc dữ liệu

Khi tạo/cập nhật service, dữ liệu gửi lên backend có dạng:

```json
{
  "name": "Trang trí tiệc cưới",
  "slug": "trang-tri-tiec-cuoi",
  "shortDescription": "Dịch vụ trang trí chuyên nghiệp",
  "fullDescription": "Mô tả chi tiết...",
  "icon": "Flower",
  "basePrice": 5000000,
  "features": {
    "included": ["Trang trí sân khấu", "Hoa tươi"],
    "excluded": ["Âm thanh"],
    "highlights": ["Thiết kế độc đáo"]
  },
  "images": [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg",
    "https://example.com/image3.jpg"
  ],
  "isActive": true
}
```

## Troubleshooting

### Không thấy hình ảnh hiển thị?
- Kiểm tra URL có đúng không
- Kiểm tra URL có thể truy cập được không (mở trong tab mới)
- Kiểm tra CORS của server hình ảnh

### Không thể cập nhật hình ảnh?
- Kiểm tra backend đang chạy (`http://localhost:3000`)
- Kiểm tra console browser để xem lỗi
- Kiểm tra network tab để xem request/response

### Hình ảnh bị mất sau khi cập nhật?
- Đây là hành vi mong đợi: khi cập nhật, tất cả images cũ sẽ bị thay thế
- Hãy đảm bảo giữ lại các URL bạn muốn giữ trong form

## API Endpoints

Backend cung cấp các endpoints sau:

- `GET /api/admin/services` - Lấy danh sách services
- `GET /api/admin/services/:id` - Lấy chi tiết service
- `POST /api/admin/services` - Tạo service mới (với images)
- `PUT /api/admin/services/:id` - Cập nhật service (với images)
- `DELETE /api/admin/services/:id` - Xóa service
- `GET /api/admin/services/:id/images` - Lấy danh sách images
- `POST /api/admin/services/:id/images` - Thêm một image
- `DELETE /api/admin/services/:id/images/:imageId` - Xóa một image

## Hoàn thành! 🎉

Tính năng quản lý hình ảnh cho services đã sẵn sàng sử dụng trong admin panel.
