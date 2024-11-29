import { createRouter, createWebHistory } from 'vue-router'; 
import AdminDashboard from '@/components/AdminDashboard.vue'; 
import CustomerDashboard from '@/components/CustomerDashboard.vue';

// Defined the routes that i'll use on my components
const routes = [
    {
      path: '/',
      name: 'home',
      component: CustomerDashboard, // router component where it can be rendered
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminDashboard,
    },
  ];

// I have created a router instance
const router = createRouter({
  history: createWebHistory(), // Use history mode
  routes, // Pass in the routes
});

export default router; // Export the router to use it in the main.js
