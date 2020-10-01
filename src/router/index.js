import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routerOptions = [
  { path: '/', name: 'Home' },
  { path: '/about', name: 'About' },
  { path: '/error', name: 'Error' },
  { path: '/admin', name: 'Admin' },
  { path: '/login', name: 'Login' },
  { path: '/progevento', name: 'ProgEvento' },
  { path: '*', redirect: { name: 'Home' } }
]

const routes = routerOptions.map(r => {
  return {
    ...r,
    component: () => import(/* webpackChunkName: "[request]" */ `@/views/${r.name}/`)
  }
})

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
