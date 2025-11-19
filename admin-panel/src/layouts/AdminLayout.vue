<template>
  <a-layout class="admin-layout h-screen overflow-hidden">
    <!-- Sider - Fixed -->
    <a-layout-sider
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
      :style="{ background: '#FFFFFF', position: 'fixed', left: 0, top: 0, bottom: 0, height: '100vh', overflow: 'auto' }"
      class="bg-white border-r border-gray-200"
    >
      <div class="logo p-4 text-center font-bold text-xl text-pink-500 bg-white">
        {{ collapsed ? 'WA' : 'Wedding Admin' }}
      </div>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        :style="{ background: '#FFFFFF' }"
        mode="inline"
        :items="menuItems"
        @click="handleMenuClick"
        class="bg-white border-none"
      />
    </a-layout-sider>

    <!-- Main Layout -->
    <a-layout :style="{ background: '#FFFFFF', marginLeft: collapsed ? '80px' : '200px', transition: 'margin-left 0.2s' }">
      <!-- Header - Fixed -->
      <a-layout-header 
        :style="{ background: '#FFFFFF', position: 'fixed', top: 0, right: 0, left: collapsed ? '80px' : '200px', zIndex: 10, transition: 'left 0.2s' }" 
        class="bg-white px-6 flex items-center justify-between border-b border-gray-200 shadow-sm"
      >
        <component
          :is="collapsed ? MenuUnfoldOutlined : MenuFoldOutlined"
          class="text-xl cursor-pointer"
          @click="collapsed = !collapsed"
        />
        
        <a-dropdown>
          <a class="ant-dropdown-link flex items-center gap-2" @click.prevent>
            <a-avatar>
              <template #icon><UserOutlined /></template>
            </a-avatar>
            <span>Admin</span>
            <DownOutlined />
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item key="profile">
                <UserOutlined /> Profile
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item key="logout" @click="handleLogout">
                <LogoutOutlined /> Logout
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </a-layout-header>

      <!-- Content - Scrollable -->
      <a-layout-content 
        class="bg-white overflow-y-auto"
        :style="{ marginTop: '64px', height: 'calc(100vh - 64px)', padding: '24px' }"
      >
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { ref, h } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DashboardOutlined,
  AppstoreOutlined,
  ShoppingOutlined,
  GiftOutlined,
  ShopOutlined,
  FileTextOutlined,
  TagOutlined,
  PictureOutlined,
  QuestionCircleOutlined,
  CalendarOutlined,
  UserOutlined,
  DownOutlined,
  CheckOutlined,
  LogoutOutlined,
  CommentOutlined
} from '@ant-design/icons-vue'

const router = useRouter()
const route = useRoute()

const collapsed = ref(false)
const selectedKeys = ref<string[]>([route.name as string])

import { useAuthStore } from '@/stores/auth'
import { computed } from 'vue'

const authStore = useAuthStore()
const isAdmin = computed(() => authStore.user?.role === 'admin')

const menuItems = computed(() => {
  const items = [
    { key: 'Dashboard', icon: () => h(DashboardOutlined), label: 'Tổng quan' },
    { key: 'Categories', icon: () => h(AppstoreOutlined), label: 'Danh mục' },
  { key: 'Services', icon: () => h(ShoppingOutlined), label: 'Dịch vụ' },
  { key: 'Packages', icon: () => h(GiftOutlined), label: 'Gói dịch vụ' },
  { key: 'Products', icon: () => h(ShopOutlined), label: 'Sản phẩm' },
  { key: 'Orders', icon: () => h(FileTextOutlined), label: 'Đơn hàng' },
  { key: 'Promotions', icon: () => h(TagOutlined), label: 'Mã giảm giá' },
  { key: 'Galleries', icon: () => h(PictureOutlined), label: 'Thư viện ảnh' },
  { key: 'FAQs', icon: () => h(QuestionCircleOutlined), label: 'Câu hỏi thường gặp' },
  { key: 'Testimonials', icon: () => h(CommentOutlined), label: 'Bình luận' },
  { key: 'Consultations', icon: () => h(CalendarOutlined), label: 'Lịch tư vấn' }
  ]
  
  // Only show Users menu for admin
  if (isAdmin.value) {
    items.push({ key: 'Users', icon: () => h(UserOutlined), label: 'Quản lý người dùng' })
  }
  
  return items
})

const handleMenuClick = ({ key }: { key: string }) => {
  selectedKeys.value = [key]
  router.push({ name: key })
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.logo {
  border-bottom: 1px solid #f0f0f0;
}

/* Custom scrollbar for sidebar */
.ant-layout-sider::-webkit-scrollbar {
  width: 6px;
}

.ant-layout-sider::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.ant-layout-sider::-webkit-scrollbar-thumb {
  background: #ec4899;
  border-radius: 3px;
}

.ant-layout-sider::-webkit-scrollbar-thumb:hover {
  background: #db2777;
}

/* Custom scrollbar for content */
.ant-layout-content::-webkit-scrollbar {
  width: 8px;
}

.ant-layout-content::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.ant-layout-content::-webkit-scrollbar-thumb {
  background: #ec4899;
  border-radius: 4px;
}

.ant-layout-content::-webkit-scrollbar-thumb:hover {
  background: #db2777;
}
</style>
