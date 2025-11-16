<template>
  <a-layout class="admin-layout min-h-screen ">
    <!-- Sider -->
    <a-layout-sider
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
        :style="{ background: '#FFFFFF' }"
      class="bg-white border-r border-gray-200"
    >
      <div class="logo p-4 text-center font-bold text-xl text-pink-500 bg-white " >
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
    <a-layout         :style="{ background: '#FFFFFF' }">
      <!-- Header -->
      <a-layout-header :style="{ background: '#FFFFFF' }" class="bg-white px-6 flex items-center justify-between border-b border-gray-200 shadow-sm">
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

      <!-- Content -->
      <a-layout-content class="m-6 p-6 bg-white rounded-lg shadow-sm min-h-[calc(100vh-64px)]">
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
  UserOutlined,
  DownOutlined,
  LogoutOutlined
} from '@ant-design/icons-vue'

const router = useRouter()
const route = useRoute()

const collapsed = ref(false)
const selectedKeys = ref<string[]>([route.name as string])

const menuItems = [
  { key: 'Dashboard', icon: () => h(DashboardOutlined), label: 'Tổng quan' },
  { key: 'Categories', icon: () => h(AppstoreOutlined), label: 'Danh mục' },
  { key: 'Services', icon: () => h(ShoppingOutlined), label: 'Dịch vụ' },
  { key: 'Packages', icon: () => h(GiftOutlined), label: 'Gói dịch vụ' },
  { key: 'Products', icon: () => h(ShopOutlined), label: 'Sản phẩm' },
  { key: 'Orders', icon: () => h(FileTextOutlined), label: 'Đơn hàng' }
]

const handleMenuClick = ({ key }: { key: string }) => {
  selectedKeys.value = [key]
  router.push({ name: key })
}

const handleLogout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<style scoped>
.logo {
  border-bottom: 1px solid #f0f0f0;
}
</style>
