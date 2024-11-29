import { createRouter, createWebHistory } from 'vue-router';
import AdminDashboard from '@/views/AdminDashboard.vue';
import CustomerDashboard from '@/views/CustomerDashboard.vue';
// import SalesRepresentativeDashboard from '@/views/SalesRepresentativeDashboard.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: CustomerDashboard,
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminDashboard,
  },
//   {
//     path: '/sales-representative',
//     name: 'salesRepresentative',
//     component: SalesRepresentativeDashboard,
//   },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
