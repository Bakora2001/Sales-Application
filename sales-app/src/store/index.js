import { createRouter, createWebHistory } from 'vue-router';
import AdminDashboard from '../components/AdminDashboard.vue';

const routes = [
  {
    path: '/',
    name: 'AdminDashboard',
    component: AdminDashboard,
  },
  // Add more routes as needed
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
