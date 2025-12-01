import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import StickerView from '@/views/StickerView.vue'
import StickerUpload from '@/views/StickerUpload.vue'
import CartView from '@/views/CartView.vue'
import SignupView from '@/views/SignupView.vue'
import LoginView from '@/views/LoginView.vue'
import AccountView from '@/views/AccountView.vue'
import OrderConfirmView from '@/views/OrderConfirmView.vue'
import CustomerOrdersView from '@/views/CustomerOrdersView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/upload',
      name: 'upload-sticker',
      component: StickerUpload,
    },
    {
      path: '/sticker/:id',
      name: 'sticker',
      component: StickerView,
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/account',
      name: 'account',
      component: AccountView,
    },
    {
      path: '/order/:orderId',
      name: 'orderConfirm',
      component: OrderConfirmView,
    },
    {
      path: '/orders/all',
      name: 'customer-orders',
      component: CustomerOrdersView,
    },
  ],
})

export default router
