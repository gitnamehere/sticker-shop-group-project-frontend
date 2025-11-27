import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import StickerView from '@/views/StickerView.vue'
import StickerUpload from '@/views/StickerUpload.vue'
import CartView from '@/views/CartView.vue'

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
    }
  ],
})

export default router
