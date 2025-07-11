import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import ProductDetails from '@/views/ProductDetails.vue'
import Product from '@/views/ProductsPage.vue'
import MainLayout from '@/layouts/MainLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '/',
          name: 'home',
          component: HomePage,
        },
      ],
    },

    {
      path: '/products',
      component: MainLayout,
      children: [
        {
          path: '/products',
          name: 'products',
          component: Product,
        },
        {
          path: '/products/:id',
          name: 'products-details',
          component: ProductDetails,
        },
      ],
    },
  ],
})

export default router
