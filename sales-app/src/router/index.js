import { createRouter, createWebHistory } from 'vue-router'; 
import AdminDashboard from '@/components/AdminDashboard.vue'; 
import CustomerDashboard from '@/components/CustomerDashboard.vue';

// Define routes
const routes = [
  {
    path: '/',
    name: 'home',
    component: CustomerDashboard, // Routed to CustomerDashboard
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminDashboard, // Routed to AdminDashboard
  },
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
