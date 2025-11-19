# 📸 Service Images API - Hướng dẫn sử dụng

## Tổng quan

API này cho phép admin thêm, xóa và quản lý ảnh cho các services. Ảnh được lưu trữ thông qua Gallery system.

---

## 🔑 Authentication

Tất cả endpoints yêu cầu Bearer token:

```javascript
headers: {
  'Authorization': 'Bearer YOUR_TOKEN',
  'Content-Type': 'application/json'
}
```

---

## 📋 Endpoints

### 1. Lấy danh sách ảnh của service

**Endpoint:**
```http
GET /api/admin/services/:serviceId/images
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "image-uuid",
      "title": "Wedding Decoration",
      "altText": "Beautiful decoration",
      "fileUrl": "https://example.com/images/service1.jpg",
      "fileName": "service1.jpg",
      "mimeType": "image/jpeg",
      "category": "service",
      "relatedId": "service-uuid",
      "relatedType": "service",
      "isPrimary": true,
      "displayOrder": 1,
      "isActive": true,
      "createdAt": "2025-11-19T10:00:00.000Z"
    }
  ],
  "count": 5
}
```

---

### 2. Thêm ảnh mới cho service

**Endpoint:**
```http
POST /api/admin/services/:serviceId/images
```

**Request Body:**
```json
{
  "imageUrl": "https://example.com/images/service-new.jpg",
  "altText": "Beautiful wedding decoration",
  "caption": "Premium decoration setup",
  "isPrimary": false,
  "displayOrder": 2
}
```

**Các trường:**
- `imageUrl` (required): URL của ảnh
- `altText` (optional): Text mô tả ảnh cho SEO
- `caption` (optional): Chú thích ảnh
- `isPrimary` (optional, default: false): Ảnh chính hay không
- `displayOrder` (optional, default: 0): Thứ tự hiển thị

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "new-image-uuid",
    "title": "Beautiful wedding decoration",
    "altText": "Beautiful wedding decoration",
    "fileUrl": "https://example.com/images/service-new.jpg",
    "fileName": "service-new.jpg",
    "category": "service",
    "relatedId": "service-uuid",
    "relatedType": "service",
    "isPrimary": false,
    "displayOrder": 2,
    "isActive": true,
    "createdAt": "2025-11-19T10:00:00.000Z"
  },
  "message": "Image added successfully"
}
```

---

### 3. Xóa ảnh khỏi service

**Endpoint:**
```http
DELETE /api/admin/services/:serviceId/images/:imageId
```

**Response:**
```json
{
  "success": true,
  "message": "Image removed successfully"
}
```

---

## 💻 Code Examples

### JavaScript (Fetch)

```javascript
const API_URL = 'http://localhost:4000/api';
const token = 'YOUR_AUTH_TOKEN';

// 1. Lấy danh sách ảnh
async function getServiceImages(serviceId) {
  const response = await fetch(`${API_URL}/admin/services/${serviceId}/images`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}

// 2. Thêm ảnh mới
async function addServiceImage(serviceId, imageData) {
  const response = await fetch(`${API_URL}/admin/services/${serviceId}/images`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      imageUrl: imageData.url,
      altText: imageData.altText,
      caption: imageData.caption,
      isPrimary: imageData.isPrimary || false,
      displayOrder: imageData.displayOrder || 0,
    }),
  });
  const data = await response.json();
  return data;
}

// 3. Xóa ảnh
async function removeServiceImage(serviceId, imageId) {
  const response = await fetch(`${API_URL}/admin/services/${serviceId}/images/${imageId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}

// Sử dụng
const serviceId = 'your-service-uuid';

// Lấy danh sách ảnh
const images = await getServiceImages(serviceId);
console.log('Images:', images);

// Thêm ảnh mới
const newImage = await addServiceImage(serviceId, {
  url: 'https://example.com/new-image.jpg',
  altText: 'Beautiful decoration',
  caption: 'Premium setup',
  isPrimary: false,
  displayOrder: 1,
});
console.log('Added:', newImage);

// Xóa ảnh
const imageId = 'image-uuid-to-delete';
await removeServiceImage(serviceId, imageId);
console.log('Deleted successfully');
```

---

### Axios

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
  headers: {
    'Authorization': `Bearer ${token}`,
  },
});

// 1. Lấy danh sách ảnh
const getServiceImages = async (serviceId) => {
  const { data } = await api.get(`/admin/services/${serviceId}/images`);
  return data;
};

// 2. Thêm ảnh mới
const addServiceImage = async (serviceId, imageData) => {
  const { data } = await api.post(`/admin/services/${serviceId}/images`, {
    imageUrl: imageData.url,
    altText: imageData.altText,
    caption: imageData.caption,
    isPrimary: imageData.isPrimary || false,
    displayOrder: imageData.displayOrder || 0,
  });
  return data;
};

// 3. Xóa ảnh
const removeServiceImage = async (serviceId, imageId) => {
  const { data } = await api.delete(`/admin/services/${serviceId}/images/${imageId}`);
  return data;
};
```

---

### React Hook Example

```typescript
import { useState } from 'react';
import axios from 'axios';

interface ServiceImage {
  id: string;
  fileUrl: string;
  altText: string;
  caption?: string;
  isPrimary: boolean;
  displayOrder: number;
}

export const useServiceImages = (serviceId: string, token: string) => {
  const [images, setImages] = useState<ServiceImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const api = axios.create({
    baseURL: 'http://localhost:4000/api',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  // Lấy danh sách ảnh
  const fetchImages = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get(`/admin/services/${serviceId}/images`);
      setImages(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Thêm ảnh mới
  const addImage = async (imageData: {
    url: string;
    altText?: string;
    caption?: string;
    isPrimary?: boolean;
    displayOrder?: number;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post(`/admin/services/${serviceId}/images`, {
        imageUrl: imageData.url,
        altText: imageData.altText,
        caption: imageData.caption,
        isPrimary: imageData.isPrimary || false,
        displayOrder: imageData.displayOrder || 0,
      });
      setImages([...images, data.data]);
      return data.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Xóa ảnh
  const removeImage = async (imageId: string) => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/admin/services/${serviceId}/images/${imageId}`);
      setImages(images.filter(img => img.id !== imageId));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    images,
    loading,
    error,
    fetchImages,
    addImage,
    removeImage,
  };
};

// Sử dụng trong component
function ServiceImagesManager({ serviceId, token }) {
  const { images, loading, error, fetchImages, addImage, removeImage } = 
    useServiceImages(serviceId, token);

  useEffect(() => {
    fetchImages();
  }, [serviceId]);

  const handleAddImage = async () => {
    try {
      await addImage({
        url: 'https://example.com/new-image.jpg',
        altText: 'New decoration',
        isPrimary: false,
        displayOrder: images.length,
      });
      alert('Image added successfully!');
    } catch (err) {
      alert('Failed to add image');
    }
  };

  const handleRemoveImage = async (imageId: string) => {
    if (confirm('Are you sure?')) {
      try {
        await removeImage(imageId);
        alert('Image removed successfully!');
      } catch (err) {
        alert('Failed to remove image');
      }
    }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      
      <button onClick={handleAddImage}>Add Image</button>
      
      <div className="images-grid">
        {images.map(image => (
          <div key={image.id}>
            <img src={image.fileUrl} alt={image.altText} />
            <button onClick={() => handleRemoveImage(image.id)}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 🎯 Use Cases

### 1. Upload ảnh từ form

```javascript
async function handleImageUpload(serviceId, file) {
  // Bước 1: Upload file lên server/cloud storage
  const formData = new FormData();
  formData.append('file', file);
  
  const uploadResponse = await fetch('YOUR_UPLOAD_ENDPOINT', {
    method: 'POST',
    body: formData,
  });
  const { url } = await uploadResponse.json();
  
  // Bước 2: Thêm URL vào service
  const result = await addServiceImage(serviceId, {
    url: url,
    altText: file.name,
    isPrimary: false,
  });
  
  return result;
}
```

### 2. Set ảnh làm primary

```javascript
async function setPrimaryImage(serviceId, imageId) {
  // Thêm ảnh mới với isPrimary = true
  // Hệ thống sẽ tự động unset các ảnh primary khác
  await addServiceImage(serviceId, {
    url: 'https://example.com/primary.jpg',
    isPrimary: true,
    displayOrder: 0,
  });
}
```

### 3. Sắp xếp thứ tự ảnh

```javascript
async function reorderImages(serviceId, images) {
  // Update displayOrder cho từng ảnh
  for (let i = 0; i < images.length; i++) {
    // Cần implement update endpoint hoặc xóa và thêm lại
    await addServiceImage(serviceId, {
      ...images[i],
      displayOrder: i,
    });
  }
}
```

---

## ⚠️ Lưu ý

1. **imageUrl phải là URL hợp lệ** - Không phải file upload trực tiếp
2. **Chỉ có 1 ảnh primary** - Khi set isPrimary=true, các ảnh khác sẽ tự động thành false
3. **displayOrder** - Số càng nhỏ càng hiển thị trước
4. **Authentication required** - Tất cả endpoints cần Bearer token
5. **Service phải tồn tại** - Sẽ trả về 404 nếu serviceId không tồn tại

---

## 🔗 Related APIs

- [Gallery API](./GALLERY_API.md) - Quản lý ảnh tổng quát
- [Services API](./API_DOCUMENTATION.md#services-api) - Quản lý services
- [API Documentation](./API_DOCUMENTATION.md) - Tài liệu API đầy đủ

---

**Last Updated:** November 19, 2025
