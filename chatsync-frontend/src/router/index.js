import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import UserAuth from '@/views/UserAuth.vue'
import ChatView from '@/views/ChatView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/chats/:uri?',
    name: 'chat',
    component: ChatView
  },
  {
    path: '/auth',
    name: 'UserAuth',
    component: UserAuth
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
