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
        component: () => import('@/features/packages/pages/PackageListPage.vue'),
        meta: { title: 'Quản lý gói dịch vụ' }
      },
      {
        path: 'products',
        name: 'Products',
        component: () => import('@/features/products/pages/ProductListPage.vue'),
        meta: { title: 'Quản lý sản phẩm' }
      },
      {
        path: 'orders',
        name: 'Orders',
        component: () => import('@/features/orders/pages/OrderListPage.vue'),
        meta: { title: 'Quản lý đơn hàng' }
      },
      {
        path: 'promotions',
        name: 'Promotions',
        component: () => import('@/features/promotions/pages/PromotionListPage.vue'),
        meta: { title: 'Quản lý mã giảm giá' }
      },
      {
        path: 'galleries',
        name: 'Galleries',
        component: () => import('@/features/galleries/pages/GalleryListPage.vue'),
        meta: { title: 'Quản lý thư viện ảnh' }
      },
      {
        path: 'faqs',
        name: 'FAQs',
        component: () => import('@/features/faqs/pages/FAQListPage.vue'),
        meta: { title: 'Quản lý câu hỏi thường gặp' }
      },
      {
        path: 'testimonials',
        name: 'Testimonials',
        component: () => import('@/features/testimonials/pages/TestimonialListPage.vue'),
        meta: { title: 'Quản lý bình luận' }
      },
      {
        path: 'consultations',
        name: 'Consultations',
        component: () => import('@/features/consultations/pages/ConsultationListPage.vue'),
        meta: { title: 'Quản lý lịch tư vấn' }
      },
      {
        path: 'users',
        name: 'Users',
        component: () => import('@/features/users/pages/UserListPage.vue'),
        meta: { title: 'Quản lý người dùng', requiresAdmin: true }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, _from, next) => {
  document.title = `${to.meta.title || 'Admin'} - Wedding Admin`
  
  const { useAuthStore } = await import('@/stores/auth')
  const authStore = useAuthStore()
  
  // Public routes
  if (to.path === '/login') {
    if (authStore.isAuthenticated) {
      next('/')
    } else {
      next()
    }
    return
  }
  
  // Protected routes
  if (!authStore.isAuthenticated) {
    next('/login')
    return
  }
  
  // Check admin-only routes
  if (to.meta.requiresAdmin && authStore.user?.role !== 'admin') {
    return
  }
  
  next()
})

export default router
