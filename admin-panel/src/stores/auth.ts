import { defineStore } from 'pinia'
import { ref } from 'vue'
import http from '@/utils/http'

interface User {
  id: string
  email: string
  fullName: string
  role: string
}

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)

  // Load from localStorage on init
  const savedToken = localStorage.getItem('admin_token')
  const savedUser = localStorage.getItem('admin_user')
  if (savedToken && savedUser) {
    token.value = savedToken
    user.value = JSON.parse(savedUser)
    isAuthenticated.value = true
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await http.post<{ token: string; user: User }>('/admin/auth/login', {
        email,
        password
      })

      if (response.data) {
        token.value = response.data.token
        user.value = response.data.user
        isAuthenticated.value = true
        
        localStorage.setItem('admin_token', response.data.token)
        localStorage.setItem('admin_user', JSON.stringify(response.data.user))
        
        return true
      }
      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  const logout = () => {
    isAuthenticated.value = false
    user.value = null
    token.value = null
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
  }

  const verifyToken = async (): Promise<boolean> => {
    if (!token.value) return false

    try {
      const response = await http.get<{ user: User }>('/admin/auth/verify')
      if (response.data) {
        user.value = response.data.user
        isAuthenticated.value = true
        return true
      }
      logout()
      return false
    } catch (error) {
      logout()
      return false
    }
  }

  return {
    isAuthenticated,
    user,
    token,
    login,
    logout,
    verifyToken
  }
})
