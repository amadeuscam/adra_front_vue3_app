import {
  createRouter,
  createWebHashHistory,
  createWebHistory
} from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Logout from '../views/Logout.vue'
import Detail from '../views/Detail.vue'

const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    // meta: {
    //   requiresAuth: true
    // }
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: Detail,
    props: true,
    // meta: {
    //   requiresAuth: false
    // }
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout,
    // meta: {
    //   requiresAuth: false
    // }
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router