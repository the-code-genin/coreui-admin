import Vue from 'vue'
import VueRouter from 'vue-router'
import DashboardRoutes from './dashboard'
import AuthRoutes from './auth'

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: '/401',
    //   name: 'AccessDenied',
    //   component: () => import('@/views/AccessDenied.vue')
    // },
    {
      path: '*',
      name: 'NotFound',
      component: () => import('@/views/NotFound.vue'),
    }
  ]
});

router.addRoutes(DashboardRoutes);
router.addRoutes(AuthRoutes);

export default router;
