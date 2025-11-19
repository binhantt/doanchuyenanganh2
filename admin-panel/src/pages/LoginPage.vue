<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-pinkSoft via-pinkLight to-pinkShadow relative overflow-hidden">
    <!-- Decorative elements -->
    <div class="absolute top-0 left-0 w-64 h-64 bg-pinkPrimary opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
    <div class="absolute bottom-0 right-0 w-96 h-96 bg-pinkDark opacity-10 rounded-full translate-x-1/2 translate-y-1/2"></div>
    
    <div class="bg-white p-10 rounded-2xl pink-shadow w-full max-w-md relative z-10 backdrop-blur-sm">
      <div class="text-center mb-8">
        <div class="inline-block p-4 bg-gradient-to-br from-pinkSoft to-pinkLight rounded-full mb-4">
          <heart-filled class="text-5xl text-pinkPrimary" />
        </div>
        <h1 class="text-4xl font-bold pink-gradient-text mb-2">Wedding Admin</h1>
        <p class="text-gray-600">Đăng nhập vào hệ thống quản trị</p>
        <div class="mt-4 h-1 w-20 mx-auto bg-gradient-to-r from-pinkPrimary to-pinkDark rounded-full"></div>
      </div>
      
      <a-form
        :model="formData"
        @finish="handleLogin"
        layout="vertical"
      >
        <a-form-item
          label="Email"
          name="email"
          :rules="[{ required: true, message: 'Vui lòng nhập email!' }]"
        >
          <a-input
            v-model:value="formData.email"
            placeholder="admin@example.com"
            size="large"
          >
            <template #prefix>
              <user-outlined />
            </template>
          </a-input>
        </a-form-item>
        
        <a-form-item
          label="Mật khẩu"
          name="password"
          :rules="[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]"
        >
          <a-input-password
            v-model:value="formData.password"
            placeholder="••••••••"
            size="large"
          >
            <template #prefix>
              <lock-outlined />
            </template>
          </a-input-password>
        </a-form-item>
        
        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            size="large"
            block
            :loading="loading"
            class="h-12 text-lg font-semibold"
          >
            <login-outlined v-if="!loading" class="mr-2" />
            Đăng nhập
          </a-button>
        </a-form-item>
        
        <div class="text-center text-sm text-gray-500 mt-4">
          <p>Chào mừng bạn đến với hệ thống quản trị</p>
          <p class="text-pinkPrimary font-semibold mt-2">💕 Wedding Management System 💕</p>
        </div>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { UserOutlined, LockOutlined, HeartFilled, LoginOutlined } from '@ant-design/icons-vue'

const router = useRouter()

const formData = ref({
  email: '',
  password: ''
})

const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  try {
    const { useAuthStore } = await import('@/stores/auth')
    const authStore = useAuthStore()
    
    const success = await authStore.login(formData.value.email, formData.value.password)
    
    if (success) {
      message.success('Đăng nhập thành công!')
      setTimeout(() => {
        router.push('/')
      }, 500)
    } else {
      message.error('Email hoặc mật khẩu không đúng!')
    }
  } catch (error) {
    message.error('Đăng nhập thất bại!')
  } finally {
    loading.value = false
  }
}
</script>
