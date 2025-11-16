import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/LoginPage.vue'),
    meta: { title: 'Đăng nhập' }
  },
  {
    path: '/',
    component: () => import('@/layouts/AdminLayout.vue'),
    children: [
      {
        path: '',
        redirect: '/dashboard'
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/pages/DashboardPage.vue'),
        meta: { title: 'Tổng quan' }
      },
      {
        path: 'categories',
        name: 'Categories',
        component: () => import('@/features/categories/pages/CategoryListPage.vue'),
        meta: { title: 'Quản lý danh mục' }
      },
      {
        path: 'services',
        name: 'Services',
        component: () => import('@/features/services/pages/ServiceListPage.vue'),
        meta: { title: 'Quản lý dịch vụ' }
      },
      {
        path: 'packages',
        name: 'Packages',
        component: () => import('@/pages/ComingSoonPage.vue'),
        meta: { title: 'Quản lý gói dịch vụ' }
      },
      {
        path: 'products',
        name: 'Products',
        component: () => import('@/pages/ComingSoonPage.vue'),
        meta: { title: 'Quản lý sản phẩm' }
      },
      {
        path: 'orders',
        name: 'Orders',
        component: () => import('@/pages/ComingSoonPage.vue'),
        meta: { title: 'Quản lý đơn hàng' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, _from, next) => {
  document.title = `${to.meta.title || 'Admin'} - Wedding Admin`
  next()
})

export default router
