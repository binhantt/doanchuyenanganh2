# CORS Fix Guide - Network Access Setup

Hướng dẫn sửa lỗi CORS khi truy cập từ IP address thay vì localhost.

---

## 🔴 Lỗi Ban Đầu

```
Access to XMLHttpRequest at 'http://localhost:4000/api/user/galleries' 
from origin 'http://192.168.1.2:3000' has been blocked by CORS policy: 
The 'Access-Control-Allow-Origin' header has a value 'http://localhost:3000' 
that is not equal to the supplied origin.
```

**Nguyên nhân**: Backend chỉ cho phép `http://localhost:3000`, nhưng frontend truy cập từ `http://192.168.1.2:3000`

---

## ✅ Giải Pháp

### 1. Backend Configuration

#### File: `backend/.env`
```env
# Thêm tất cả các IP addresses cần cho phép
CORS_ORIGIN=http://localhost:3000,http://127.0.0.1:3000,http://192.168.1.2:3000,http://192.168.1.3:3000,http://192.168.1.4:3000,http://192.168.1.5:3000
```

#### File: `backend/src/infrastructure/config/constants.ts`
```typescript
// Parse CORS origins from environment variable
const parseCorsOrigins = (): string[] => {
  const corsEnv = process.env.CORS_ORIGIN;
  
  if (!corsEnv) {
    return [
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      'http://192.168.1.2:3000',
      'http://192.168.1.3:3000',
      'http://192.168.1.4:3000',
      'http://192.168.1.5:3000',
    ];
  }

  if (typeof corsEnv === 'string' && corsEnv.includes(',')) {
    return corsEnv.split(',').map(origin => origin.trim());
  }

  return [corsEnv];
};

export const APP_CONFIG = {
  PORT: process.env.PORT || 4000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  CORS_ORIGIN: parseCorsOrigins(),
};
```

#### File: `backend/src/server.ts`
```typescript
// CORS configuration
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    const allowedOrigins = Array.isArray(APP_CONFIG.CORS_ORIGIN)
      ? APP_CONFIG.CORS_ORIGIN
      : [APP_CONFIG.CORS_ORIGIN];

    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
```

### 2. Frontend Configuration

#### File: `Laddingpage/.env.local`
```env
# Use your machine IP address instead of localhost for network access
NEXT_PUBLIC_API_URL=http://192.168.1.2:4000

# Alternative: Use localhost for local development
# NEXT_PUBLIC_API_URL=http://localhost:4000
```

---

## 🚀 Cách Chạy

### 1. Restart Backend
```bash
cd backend
npm run dev
# Server chạy tại http://192.168.1.2:4000
```

### 2. Restart Frontend
```bash
cd Laddingpage
npm run dev
# App chạy tại http://192.168.1.2:3000
```

### 3. Kiểm Tra CORS
```bash
# Test CORS headers
curl -H "Origin: http://192.168.1.2:3000" \
  -H "Access-Control-Request-Method: GET" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -X OPTIONS http://192.168.1.2:4000/api/user/galleries -v
```

---

## 📋 Checklist

- [ ] Cập nhật `backend/.env` với CORS_ORIGIN
- [ ] Cập nhật `backend/src/infrastructure/config/constants.ts`
- [ ] Cập nhật `backend/src/server.ts` với CORS options
- [ ] Tạo `Laddingpage/.env.local` với IP address
- [ ] Restart backend server
- [ ] Restart frontend server
- [ ] Test API endpoints

---

## 🧪 Testing

### Test Health Check
```bash
curl http://192.168.1.2:4000/api/health
```

### Test Packages Endpoint
```bash
curl http://192.168.1.2:4000/api/user/packages
```

### Test with Origin Header
```bash
curl -H "Origin: http://192.168.1.2:3000" \
  http://192.168.1.2:4000/api/user/packages
```

---

## 🔧 Troubleshooting

### Still Getting CORS Error?

1. **Clear Browser Cache**
   - Ctrl+Shift+Delete (Windows) hoặc Cmd+Shift+Delete (Mac)
   - Xóa cache và cookies

2. **Check Backend Logs**
   ```bash
   # Xem logs khi server start
   npm run dev
   ```

3. **Verify Environment Variables**
   ```bash
   # Check if .env is loaded
   echo $CORS_ORIGIN
   ```

4. **Test with cURL**
   ```bash
   curl -v http://192.168.1.2:4000/api/health
   ```

### CORS Still Blocked?

Thử thêm IP address vào `backend/.env`:
```env
CORS_ORIGIN=http://localhost:3000,http://127.0.0.1:3000,http://192.168.1.2:3000,http://192.168.1.3:3000
```

---

## 📝 Notes

- **Localhost vs IP**: 
  - `localhost` = chỉ local machine
  - `127.0.0.1` = local machine (IP format)
  - `192.168.1.2` = network IP (có thể truy cập từ máy khác)

- **Development vs Production**:
  - Development: Cho phép nhiều origins
  - Production: Chỉ cho phép domain chính thức

- **CORS Headers**:
  - `Access-Control-Allow-Origin`: Danh sách origins được phép
  - `Access-Control-Allow-Methods`: HTTP methods được phép
  - `Access-Control-Allow-Headers`: Headers được phép

---

## ✨ Kết Quả

Sau khi fix:
- ✅ Frontend có thể truy cập backend từ IP address
- ✅ CORS headers được set đúng
- ✅ API calls thành công
- ✅ Data load từ backend

---

**Status**: ✅ CORS Fixed
**Last Updated**: 2025-11-16
