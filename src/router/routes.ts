import HomePage from '@/views/HomeView.vue'
import ProductDetails from '@/views/ProductDetailsView.vue'
import Product from '@/views/ProductsView.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import CartView from '@/views/CartView.vue'
import CheckoutPage from '@/views/CheckoutView.vue'
import LoginView from '@/views/LoginView.vue'
import SignUpView from '@/views/SignUp.vue'
import ProfileView from '@/views/ProfileView.vue'
import OrderView from '@/views/OrderView.vue'
import OrderDetails from '@/views/OrderDetails.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import CategoryView from '@/views/CategoryView.vue'
import SearchPage from '@/views/SearchPage.vue'
import ForgotPassword from '@/views/ForgotPassword.vue'
import Password from '@/views/Password.vue'

import { useProducts } from '@/stores/products'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: HomePage,
      },
      {
        path: '/login',
        name: 'login',
        component: LoginView,
        meta: { requiresGuest: true },
      },
      {
        path: '/sign-up',
        name: 'signup',
        component: SignUpView,
        meta: { requiresGuest: true },
      },
      {
        path: '/profile',
        name: 'profile',
        component: ProfileView,
        meta: { requiresAuth: true },
      },
      {
        path: '/forgot-password',
        name: 'forgot',
        component: ForgotPassword,
        meta: { requiresGuest: true },
      },
      {
        path: '/account-security',
        name: 'security',
        component: Password,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/category',
    component: MainLayout,
    children: [
      {
        path: ':name',
        name: 'category',
        component: CategoryView,
      },
    ],
  },
  {
    path: '/products',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'products',
        component: Product,
      },
      {
        path: ':id',
        name: 'product-details',
        component: ProductDetails,
        beforeEnter: (to, from, next) => {
          const productStore = useProducts()
          const isValidUUID = productStore.getProductById(to.params.id)
          if (isValidUUID) {
            next()
          } else {
            next('/not-found')
          }
        },
      },
    ],
  },
  {
    path: '/search',
    component: MainLayout,
    children: [
      {
        path: ':item',
        name: 'search-details',
        component: SearchPage,
      },
    ],
  },

  {
    path: '/cart',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'cart',
        component: CartView,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/checkout',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'checkout',
        component: CheckoutPage,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/order',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'order',
        component: OrderView,
        meta: { requiresAuth: true },
      },

      {
        path: ':id',
        name: 'order-details',
        component: OrderDetails,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'NotFound',
        component: NotFoundView,
      },
    ],
  },
]

export default routes
