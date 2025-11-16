import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { message } from 'ant-design-vue'

const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
http.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response
      
      if (status === 401) {
        localStorage.removeItem('token')
        window.location.href = '/login'
        message.error('Phiên đăng nhập hết hạn')
      } else if (status === 403) {
        message.error('Bạn không có quyền thực hiện thao tác này')
      } else if (status === 404) {
        message.error('Không tìm thấy dữ liệu')
      } else if (status >= 500) {
        message.error('Lỗi server, vui lòng thử lại sau')
      } else {
        message.error(data.message || 'Có lỗi xảy ra')
      }
    } else {
      message.error('Không thể kết nối đến server')
    }
    
    return Promise.reject(error)
  }
)

export default http
