import Vue from 'vue';
import VueRouter from 'vue-router';
import EmptyLayout from '../layouts/empty.vue';
import DashboardLayout from '../layouts/dashboard.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/auth',
    component: EmptyLayout,
    meta: {
      requiresAuth: false,
    },
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('../views/auth/login.vue'),
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('../views/auth/register.vue'),
      },
    ],
  },
  {
    path: '/',
    name: 'dashboard',
    component: DashboardLayout,
    children: [
      {
        path: '',
        name: 'profile_dashboard',
        component: () => import('../views/profile/dashboard.vue'),
      },
      {
        path: 'profile',
        name: 'profile_settings',
        component: () => import('../views/profile/profile.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
