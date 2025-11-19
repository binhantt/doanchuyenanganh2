# Test FAQ API - Quick Debug

## Bước 1: Mở Console trong Admin Panel
1. Vào trang FAQs: `http://localhost:5173/faqs`
2. Nhấn F12 để mở DevTools
3. Chọn tab Console

## Bước 2: Chạy Test Script Trong Console

### Test 1: Kiểm tra token
```javascript
console.log('Token:', localStorage.getItem('token'))
```
**Kết quả mong đợi:** Phải có token string dài

### Test 2: Test API trực tiếp
```javascript
fetch('http://localhost:4000/api/admin/faqs', {
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem('token'),
    'Content-Type': 'application/json'
  }
})
.then(r => r.json())
.then(data => {
  console.log('✅ API Response:', data)
  console.log('✅ Data length:', data.data?.length)
})
.catch(err => console.error('❌ Error:', err))
```
**Kết quả mong đợi:** 
```
✅ API Response: {success: true, data: Array(2)}
✅ Data length: 2
```

### Test 3: Kiểm tra Vue component state
```javascript
// Trong Vue DevTools hoặc console
// Tìm component FAQListPage
console.log('FAQs:', window.$vm?.faqs)
console.log('Loading:', window.$vm?.loading)
```

## Bước 3: Kiểm tra Network Tab
1. Chọn tab Network trong DevTools
2. Refresh trang (Ctrl+R)
3. Tìm request: `faqs`
4. Click vào request đó
5. Xem:
   - **Status:** Phải là 200
   - **Response:** Phải có `{success: true, data: [...]}`
   - **Headers:** Phải có `Authorization: Bearer ...`

## Các Lỗi Thường Gặp

### ❌ Lỗi 1: "Failed to fetch" hoặc "Network Error"
**Nguyên nhân:** Backend không chạy hoặc URL sai

**Giải pháp:**
```bash
# Terminal 1: Chạy backend
cd backend
npm run dev

# Kiểm tra backend đang chạy
curl http://localhost:4000/api/health
```

### ❌ Lỗi 2: 401 Unauthorized
**Nguyên nhân:** Token không hợp lệ hoặc hết hạn

**Giải pháp:**
1. Logout: Click vào avatar > Đăng xuất
2. Login lại với: `admin@weddingplanner.vn` / `123`

### ❌ Lỗi 3: CORS Error
**Nguyên nhân:** Backend chưa cho phép origin của admin panel

**Giải pháp:**
```bash
# Sửa backend/.env
CORS_ORIGIN=http://localhost:5173,http://localhost:3000

# Restart backend
cd backend
npm run dev
```

### ❌ Lỗi 4: Table không hiển thị dù API trả về 200
**Nguyên nhân:** Response structure không đúng

**Debug trong Console:**
```javascript
// Xem response structure
fetch('http://localhost:4000/api/admin/faqs', {
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  }
})
.then(r => r.json())
.then(data => {
  console.log('Response type:', typeof data)
  console.log('Has success?', 'success' in data)
  console.log('Has data?', 'data' in data)
  console.log('Data is array?', Array.isArray(data.data))
  console.log('First item:', data.data?.[0])
})
```

## Bước 4: Kiểm Tra Component Render

### Mở Vue DevTools
1. Cài extension: Vue.js devtools (Chrome/Edge)
2. Mở DevTools > Tab Vue
3. Tìm component tree: `FAQListPage`
4. Xem state:
   - `faqs`: Phải có array với 2 items
   - `loading`: Phải là `false`

### Nếu faqs vẫn là array rỗng []
Có thể response structure không đúng. Thử sửa code:

```typescript
// Trong FAQListPage.vue, sửa fetchFAQs:
const fetchFAQs = async () => {
  loading.value = true
  try {
    const response = await faqsService.getFAQs(filters.value)
    console.log('🔍 Raw Response:', response)
    console.log('🔍 Response type:', typeof response)
    console.log('🔍 Response keys:', Object.keys(response || {}))
    
    // Try multiple ways to extract data
    if (response?.data) {
      console.log('✅ Using response.data')
      faqs.value = response.data
    } else if (Array.isArray(response)) {
      console.log('✅ Response is array')
      faqs.value = response
    } else {
      console.log('❌ Unknown response structure')
    }
    
    console.log('📊 Final faqs:', faqs.value)
  } catch (error: any) {
    console.error('❌ FAQ Error:', error)
    message.error(error.message || 'Không thể tải danh sách câu hỏi')
  } finally {
    loading.value = false
  }
}
```

## Bước 5: Force Reload

Nếu vẫn không được:
```bash
# Clear cache và restart
cd admin-panel
rm -rf node_modules/.vite
npm run dev
```

Trong browser:
- Hard refresh: `Ctrl + Shift + R`
- Hoặc clear cache: DevTools > Application > Clear storage

## Kết Quả Mong Đợi

Sau khi fix, bạn sẽ thấy:
1. ✅ Console log: `FAQ Response: {success: true, data: [...]}`
2. ✅ Table hiển thị 2 rows
3. ✅ Có thể click Edit, Delete, Toggle status
4. ✅ Không có error trong console

## Nếu Vẫn Không Được

Gửi cho tôi:
1. Screenshot console (tab Console)
2. Screenshot network (tab Network, request `faqs`)
3. Screenshot Vue DevTools (state của FAQListPage)
