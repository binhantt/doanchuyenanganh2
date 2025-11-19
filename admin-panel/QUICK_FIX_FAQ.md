# Quick Fix - FAQ Không Hiển Thị

## Làm Ngay Bây Giờ

### 1. Mở Admin Panel
```
http://localhost:5173/faqs
```

### 2. Mở Console (F12)
Bạn sẽ thấy các logs:
```
🔄 Fetching FAQs...
📦 Raw Response: ...
📦 Response type: ...
✅ Found response.data, length: 2
📊 Final faqs value: ...
📊 FAQs length: 2
✅ Loading finished
```

### 3. Nếu Thấy Logs Nhưng Table Vẫn Trống

**Vấn đề:** Component không re-render

**Fix:** Thêm key vào table

Sửa file `admin-panel/src/features/faqs/pages/FAQListPage.vue`:

```vue
<faq-table
  :key="faqs.length"
  :faqs="faqs"
  :loading="loading"
  @edit="handleEdit"
  @delete="handleDelete"
  @toggle-status="handleToggleStatus"
/>
```

### 4. Nếu Không Thấy Logs

**Vấn đề:** Code chưa được reload

**Fix:**
```bash
# Stop admin panel (Ctrl+C)
# Clear cache
cd admin-panel
rm -rf node_modules/.vite

# Start lại
npm run dev
```

### 5. Nếu Thấy Error 401

**Vấn đề:** Token hết hạn

**Fix:**
1. Click avatar góc phải > Đăng xuất
2. Login lại:
   - Email: `admin@weddingplanner.vn`
   - Password: `123`

### 6. Nếu Thấy CORS Error

**Vấn đề:** Backend chưa allow origin

**Fix backend/.env:**
```env
CORS_ORIGIN=http://localhost:5173,http://localhost:3000,http://localhost:4000
```

**Restart backend:**
```bash
cd backend
npm run dev
```

### 7. Test API Trực Tiếp Trong Console

Paste vào Console:
```javascript
// Test 1: Check token
console.log('Token exists:', !!localStorage.getItem('token'))

// Test 2: Call API
fetch('http://localhost:4000/api/admin/faqs', {
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem('token'),
    'Content-Type': 'application/json'
  }
})
.then(r => {
  console.log('Status:', r.status)
  return r.json()
})
.then(data => {
  console.log('✅ Success!')
  console.log('Data:', data)
  console.log('Items:', data.data?.length)
})
.catch(err => console.error('❌ Error:', err))
```

## Checklist Debug

- [ ] Backend đang chạy ở port 4000
- [ ] Admin panel đang chạy ở port 5173
- [ ] Đã login và có token
- [ ] Console không có CORS error
- [ ] Console không có 401 error
- [ ] Console thấy logs "Fetching FAQs"
- [ ] Console thấy "FAQs length: 2"
- [ ] Network tab thấy request thành công (200)

## Nếu Tất Cả Đều OK Nhưng Vẫn Không Hiển Thị

Có thể là vấn đề với Ant Design Table. Thử replace FAQTable bằng simple div:

```vue
<!-- Tạm thời comment FAQTable -->
<!-- <faq-table ... /> -->

<!-- Thêm debug view -->
<div class="p-4 bg-white rounded">
  <h3>Debug View</h3>
  <p>Loading: {{ loading }}</p>
  <p>FAQs count: {{ faqs.length }}</p>
  <div v-for="faq in faqs" :key="faq.id" class="border p-2 mb-2">
    <strong>{{ faq.question }}</strong>
    <p class="text-sm">{{ faq.answer }}</p>
  </div>
</div>
```

Nếu debug view hiển thị được data, vấn đề nằm ở FAQTable component.

## Contact

Nếu vẫn không được, gửi cho tôi:
1. Screenshot console logs
2. Screenshot network tab (request faqs)
3. Text của error message (nếu có)
