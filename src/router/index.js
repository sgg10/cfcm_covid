import Vue from 'vue'
import VueRouter from 'vue-router'
import { auth } from 'firebase'

Vue.use(VueRouter)

const routerOptions = [
  { path: '/', name: 'Home' },
  { path: '/about', name: 'About' },
  { path: '/error', name: 'Error' },
  { path: '/login', name: 'Login' },
  { path: '/registro', name: 'Registro', params: true, props: true },
  { path: '/admin', name: 'Admin', meta: { requireAuth: true } },
  { path: '/progevento', name: 'ProgEvento', meta: { requireAuth: true } },
  { path: '/asistencia', name: 'Asistencia', meta: { requireAuth: true } },
  { path: '/consevento', name: 'ConsEvento', meta: { requireAuth: true } },
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

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.requireAuth)) {
    auth().currentUser ? next() : next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
