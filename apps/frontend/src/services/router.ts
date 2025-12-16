import IssPage from '@/pages/IssPage.vue'
import OsdrPage from '@/pages/OsdrPage.vue'
import JwstPage from '@/pages/JwstPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/osdr',
    component: OsdrPage,
    name: 'osdr',
  },
  {
    path: '/iss',
    component: IssPage,
    name: 'iss',
  },
  {
    path: '/jwst',
    component: JwstPage,
    name: 'jwst',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
