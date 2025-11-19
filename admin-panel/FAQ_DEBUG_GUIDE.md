# Hướng Dẫn Debug FAQ Không Hiển Thị

## Vấn Đề
API trả về dữ liệu đúng nhưng không hiển thị trong bảng.

## Các Bước Kiểm Tra

### 1. Mở DevTools Console
```
F12 hoặc Ctrl+Shift+I
```

### 2. Kiểm Tra Console Logs
Sau khi refresh trang FAQs, bạn sẽ thấy:
```
FAQ Response: { success: true, data: [...] }
```

Nếu thấy log này, data đã được fetch thành công.

### 3. Kiểm Tra Network Tab
- Mở tab Network
- Refresh trang
- Tìm request: `GET /api/admin/faqs`
- Kiểm tra:
  - Status: 200 OK
  - Response: `{"success": true, "data": [...]}`

### 4. Kiểm Tra Vue DevTools
- Cài extension: Vue.js devtools
- Mở Vue tab
- Tìm component: FAQListPage
- Kiểm tra state:
  - `faqs`: phải có array data
  - `loading`: phải là false sau khi load xong

## Các Lỗi Thường Gặp

### Lỗi 1: Token không hợp lệ
**Triệu chứng:** Console hiện lỗi 401 Unauthorized

**Giải pháp:**
1. Logout và login lại
2. Kiểm tra localStorage có token:
```javascript
localStorage.getItem('token')
```

### Lỗi 2: CORS Error
**Triệu chứng:** Console hiện "blocked by CORS policy"

**Giải pháp:**
1. Kiểm tra backend/.env:
```env
CORS_ORIGIN=http://localhost:5173
```
2. Restart backend

### Lỗi 3: API URL sai
**Triệu chứng:** Network error hoặc 404

**Giải pháp:**
1. Kiểm tra admin-panel/.env:
```env
VITE_API_URL=http://localhost:4000/api
```
2. Restart admin panel: `npm run dev`

### Lỗi 4: Response structure không đúng
**Triệu chứng:** Data không hiển thị dù API trả về 200

**Giải pháp:**
Đã fix trong code, response interceptor sẽ handle cả 2 cases:
- `{ success: true, data: [...] }`
- `[...]` (array trực tiếp)

## Test Nhanh

### Test 1: Kiểm tra API trực tiếp
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:4000/api/admin/faqs
```

### Test 2: Kiểm tra trong Console
```javascript
// Mở Console trong trang admin
fetch('http://localhost:4000/api/admin/faqs', {
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  }
})
.then(r => r.json())
.then(d => console.log(d))
```

### Test 3: Kiểm tra Vue Component
```javascript
// Trong Vue DevTools Console
$vm.faqs // Xem data
$vm.loading // Xem loading state
$vm.fetchFAQs() // Gọi lại function fetch
```

## Nếu Vẫn Không Hiển Thị

### Bước 1: Clear Cache
```bash
# Trong admin-panel folder
rm -rf node_modules/.vite
npm run dev
```

### Bước 2: Hard Refresh Browser
```
Ctrl + Shift + R (Windows)
Cmd + Shift + R (Mac)
```

### Bước 3: Kiểm tra lại toàn bộ
1. Backend đang chạy: `http://localhost:4000`
2. Admin panel đang chạy: `http://localhost:5173`
3. Đã login với token hợp lệ
4. Console không có error

## Code Đã Sửa

File: `admin-panel/src/features/faqs/pages/FAQListPage.vue`

```typescript
const fetchFAQs = async () => {
  loading.value = true
  try {
    const response = await faqsService.getFAQs(filters.value)
    console.log('FAQ Response:', response) // Debug log
    
    // Response đã được unwrap bởi http interceptor
    if (response && response.data) {
      faqs.value = response.data
    } else if (Array.isArray(response)) {
      faqs.value = response
    }
  } catch (error: any) {
    console.error('FAQ Error:', error)
    message.error(error.message || 'Không thể tải danh sách câu hỏi')
  } finally {
    loading.value = false
  }
}
```

## Kết Quả Mong Đợi

Sau khi fix, bạn sẽ thấy:
1. Console log: `FAQ Response: { success: true, data: [...] }`
2. Bảng hiển thị 2 FAQs (1 tiếng Anh, 1 tiếng Việt)
3. Có thể edit, delete, toggle status

## Liên Hệ

Nếu vẫn gặp vấn đề, cung cấp:
1. Screenshot console errors
2. Screenshot network tab
3. Response từ API
