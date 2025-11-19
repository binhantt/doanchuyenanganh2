# Hướng dẫn Quản lý Bình luận (Testimonials)

## Tổng quan
Trang quản lý bình luận cho phép admin xem, duyệt, chỉnh sửa và xóa các đánh giá từ khách hàng.

## Tính năng

### 1. Xem danh sách bình luận
- Hiển thị tất cả bình luận với thông tin:
  - Tên khách hàng và vai trò
  - Nội dung đánh giá
  - Đánh giá (1-5 sao)
  - Ngày sự kiện và địa điểm
  - Ngôn ngữ (Tiếng Việt/English)
  - Trạng thái (Hiện/Ẩn)

### 2. Lọc và tìm kiếm
- **Tìm kiếm**: Theo tên khách hàng hoặc nội dung
- **Đánh giá**: Lọc theo số sao (1-5)
- **Ngôn ngữ**: Tiếng Việt hoặc English
- **Trạng thái**: Đã duyệt hoặc Chờ duyệt
- **Sắp xếp**: Theo ngày tạo, đánh giá, hoặc tên
- **Thứ tự**: Tăng dần hoặc giảm dần

### 3. Thêm bình luận mới
Nhấn nút "Thêm bình luận" và điền thông tin:
- **Tên khách hàng** (bắt buộc)
- **Vai trò** (bắt buộc): Ví dụ: Cô dâu, Chú rể, Khách hàng
- **Nội dung đánh giá** (bắt buộc)
- **Đánh giá** (bắt buộc): 1-5 sao
- **Ngày sự kiện** (bắt buộc)
- **Địa điểm** (bắt buộc)
- **Ngôn ngữ** (bắt buộc): Tiếng Việt hoặc English
- **Trạng thái**: Hiển thị hoặc Ẩn

### 4. Chỉnh sửa bình luận
- Nhấn nút "Sửa" trên bảng
- Cập nhật thông tin cần thiết
- Nhấn "Cập nhật" để lưu

### 5. Duyệt/Ẩn bình luận
- Sử dụng switch "Hiện/Ẩn" để nhanh chóng duyệt hoặc ẩn bình luận
- Bình luận ẩn sẽ không hiển thị trên trang landing

### 6. Xóa bình luận
- Nhấn nút "Xóa" trên bảng
- Xác nhận xóa trong popup
- Bình luận sẽ bị xóa vĩnh viễn

## Quy trình duyệt bình luận

### Khi khách hàng gửi bình luận từ trang landing:
1. Bình luận được tạo với trạng thái `isActive = false` (Chờ duyệt)
2. Admin vào trang quản lý bình luận
3. Lọc theo "Trạng thái: Chờ duyệt"
4. Xem xét nội dung bình luận
5. Bật switch "Hiện" để duyệt hoặc "Xóa" nếu không phù hợp
6. Bình luận đã duyệt sẽ hiển thị trên trang landing

## API Endpoints

### Admin Routes (Prefix: `/api/admin/testimonials`)
- `GET /` - Lấy danh sách bình luận (có filter)
- `GET /:id` - Lấy chi tiết bình luận
- `POST /` - Tạo bình luận mới
- `PUT /:id` - Cập nhật bình luận
- `DELETE /:id` - Xóa bình luận

### Query Parameters cho GET /
- `keyword`: Tìm kiếm theo tên hoặc nội dung
- `rating`: Lọc theo đánh giá (1-5)
- `isActive`: Lọc theo trạng thái (true/false)
- `language`: Lọc theo ngôn ngữ (vi/en)
- `sortBy`: Sắp xếp theo (clientName/rating/createdAt)
- `sortOrder`: Thứ tự (asc/desc)

## Cấu trúc File

```
admin-panel/src/features/testimonials/
├── types/
│   └── testimonial.types.ts      # Type definitions
├── components/
│   ├── TestimonialTable.vue      # Bảng hiển thị
│   ├── TestimonialFilter.vue     # Bộ lọc
│   └── TestimonialForm.vue       # Form thêm/sửa
├── services/
│   └── testimonials.service.ts   # API service
└── pages/
    └── TestimonialListPage.vue   # Trang chính
```

## Truy cập

Sau khi đăng nhập admin panel, vào menu:
**Bình luận** (icon 💬)

Hoặc truy cập trực tiếp: `http://localhost:5174/testimonials`

## Lưu ý

1. **Duyệt bình luận**: Luôn kiểm tra nội dung trước khi duyệt
2. **Ngôn ngữ**: Đảm bảo chọn đúng ngôn ngữ để hiển thị đúng trên trang landing
3. **Đánh giá**: Chỉ chấp nhận đánh giá từ 1-5 sao
4. **Xóa**: Thao tác xóa không thể hoàn tác

## Tích hợp với Landing Page

Bình luận đã duyệt (`isActive = true`) sẽ tự động hiển thị trên:
- Trang chủ (Testimonials Section)
- Có thể lọc theo ngôn ngữ (vi/en)
- Hiển thị theo thứ tự đánh giá cao nhất

## Troubleshooting

### Không tải được danh sách bình luận
- Kiểm tra backend đang chạy
- Kiểm tra token authentication
- Xem console log để biết lỗi cụ thể

### Không cập nhật được trạng thái
- Đảm bảo có quyền admin
- Kiểm tra kết nối API
- Refresh lại trang

### Lỗi validation khi thêm/sửa
- Điền đầy đủ các trường bắt buộc
- Kiểm tra định dạng ngày tháng
- Đảm bảo đánh giá từ 1-5
