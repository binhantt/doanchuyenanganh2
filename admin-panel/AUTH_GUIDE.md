# 🔐 Authentication Guide - Admin Panel

## Current Status: Mock Authentication

Backend hiện đang sử dụng **mock authentication** để development dễ dàng hơn.

## How It Works

### 1. Login Flow

```
User → Login Page → Set Token → Redirect to Dashboard
```

**LoginPage.vue**:
```typescript
const handleLogin = async () => {
  // Set any token to localStorage
  localStorage.setItem('token', 'admin-mock-token-' + Date.now())
  router.push('/')
}
```

### 2. HTTP Client Auto-Inject Token

**src/utils/http.ts**:
```typescript
http.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
```

### 3. Backend Mock Authentication

**backend/src/interfaces/middlewares/auth.middleware.ts**:
```typescript
export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '')
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required'
    })
  }
  
  // Mock user - accepts any token
  req.user = {
    id: 'user-123',
    email: 'admin@wedding.com',
    role: 'admin'
  }
  
  next()
}
```

## Testing

### 1. Login
```
1. Go to http://localhost:3001/login
2. Enter any email and password
3. Click "Đăng nhập"
4. Token is saved to localStorage
5. Redirected to dashboard
```

### 2. Check Token
```javascript
// In browser console
localStorage.getItem('token')
// Should return: "admin-mock-token-1234567890"
```

### 3. API Calls
All API calls automatically include the token:
```
GET /api/admin/products
Headers: {
  Authorization: Bearer admin-mock-token-1234567890
}
```

## Logout

**AdminLayout.vue**:
```typescript
const handleLogout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
```

## Protected Routes

Currently all routes under `/` require authentication:

```typescript
// router/index.ts
{
  path: '/',
  component: AdminLayout,
  // All children require token
  children: [
    { path: 'dashboard', ... },
    { path: 'services', ... },
    { path: 'products', ... },
    // ...
  ]
}
```

## Future: Real Authentication

### Step 1: Create Auth API

```typescript
// backend/src/interfaces/controllers/auth.controller.ts
export class AuthController {
  async login(req, res) {
    const { email, password } = req.body
    
    // Validate credentials
    const user = await userService.findByEmail(email)
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      })
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )
    
    return res.json({
      success: true,
      data: { token, user }
    })
  }
}
```

### Step 2: Update Frontend Login

```typescript
// admin-panel/src/pages/LoginPage.vue
const handleLogin = async () => {
  loading.value = true
  try {
    const response = await http.post('/auth/login', formData.value)
    
    if (response.success) {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      message.success('Đăng nhập thành công!')
      router.push('/')
    }
  } catch (error) {
    message.error('Email hoặc mật khẩu không đúng!')
  } finally {
    loading.value = false
  }
}
```

### Step 3: Update Auth Middleware

```typescript
// backend/src/interfaces/middlewares/auth.middleware.ts
import jwt from 'jsonwebtoken'

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '')
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required'
    })
  }
  
  try {
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    })
  }
}
```

### Step 4: Add Route Guards

```typescript
// admin-panel/src/router/index.ts
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  
  if (to.path !== '/login' && !token) {
    // Redirect to login if not authenticated
    next('/login')
  } else if (to.path === '/login' && token) {
    // Redirect to dashboard if already logged in
    next('/')
  } else {
    next()
  }
})
```

## Security Best Practices

### 1. Token Storage
- ✅ Currently: localStorage (simple, works for development)
- 🔒 Production: Consider httpOnly cookies for better security

### 2. Token Expiration
- ✅ Set expiration time (e.g., 7 days)
- ✅ Refresh token mechanism
- ✅ Auto-logout on expiration

### 3. Password Security
- ✅ Hash passwords with bcrypt
- ✅ Minimum password requirements
- ✅ Rate limiting on login attempts

### 4. HTTPS
- ✅ Use HTTPS in production
- ✅ Secure cookie flags
- ✅ CORS configuration

## Troubleshooting

### Issue 1: "Authentication required"
**Solution**: Make sure you're logged in
```javascript
// Check if token exists
localStorage.getItem('token')

// If not, go to login page
window.location.href = '/login'
```

### Issue 2: Token not being sent
**Solution**: Check HTTP interceptor
```typescript
// src/utils/http.ts should have:
http.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
```

### Issue 3: 401 after some time
**Solution**: Token expired, need to re-login
```typescript
// HTTP interceptor handles this:
http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
```

## Quick Test

### 1. Start Backend
```bash
cd backend
npm run dev
```

### 2. Start Admin Panel
```bash
cd admin-panel
npm run dev
```

### 3. Login
```
1. Go to http://localhost:3001/login
2. Enter: admin@example.com / any password
3. Click login
4. Should redirect to dashboard
```

### 4. Test API
```
1. Go to Services or Products page
2. Should load data successfully
3. Check Network tab - Authorization header should be present
```

## Summary

- ✅ Mock authentication working
- ✅ Token auto-injection working
- ✅ Protected routes working
- ✅ Logout working
- 🔄 Real JWT authentication (future)
- 🔄 User management (future)
- 🔄 Role-based access (future)

---

**Current Status**: ✅ Ready to use with mock authentication
**Next Step**: Implement real JWT authentication when needed
