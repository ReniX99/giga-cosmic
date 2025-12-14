import OsdrPage from '@/pages/OsdrPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/osdr',
    component: OsdrPage,
    name: 'osdr',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
