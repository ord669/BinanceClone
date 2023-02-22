import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/home-page.vue')

    },
    {
      path: '/dashboard',
      component: () => import('../views/dashboard.vue')

    },
    {
      path: '/transfer',
      component: () => import('../views/transfer.vue')

    },
    {
      path: '/contact',
      component: () => import('../views/contact-index.vue')

    },
    {
      path: '/contact/:_id',
      component: () => import('../views/contact-details.vue')
    },
    {
      path: '/contact/edit/:_id?',
      component: () => import('../views/contact-edit.vue')
    },

  ]
})

export default router
