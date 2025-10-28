import { createRouter, createWebHistory } from 'vue-router'
//import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import { useAuthStore } from '@/stores/loginStore'


const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/home',
    name: 'home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/HomeView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/Signup',
    name: 'Signup',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/SignupView.vue')
  },
   {
    path: '/list',
    name: 'users',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/listUserViewTeste.vue')
  },
  {
    path: '/update',
    name: 'user',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/editProfileView.vue'),
    meta: { requiresAuth: true }
  },
    {
    path: '/requests',
    name: 'Request',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/RequestView.vue'),
    meta: { requiresAuth: true }
  }
]





const router = createRouter({
  history: createWebHistory(),
  routes
})

//Guard global
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  // Se a rota exigir autenticação
  if (to.meta.requiresAuth) {
    // Se não tiver token, redireciona pro login
    if (!authStore.token) {
      return next({ name: 'login' })
    }

    // Se tiver token mas o usuário ainda não foi carregado
    if (!authStore.user) {
      try {
        await authStore.getUserProfile(authStore.userId)
        console.log('Perfil do usuário carregado com sucesso!')
      } catch (err) {
        console.error('Erro ao carregar perfil do usuário:', err)
        authStore.logout()
        return next({ name: 'login' })
      }
    }
  }

  next()
})

export default router
