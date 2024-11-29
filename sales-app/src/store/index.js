// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router'; // Import the necessary functions

// Import the components
import AdminDashboard from '@/components/AdminDashboard.vue'; // Ensure this path is correct

// Define your routes
const routes = [
  {
    path: '/',
    name: 'home',
    component: AdminDashboard, // The default component to render at home
  },

  {
    path: '/',
    name: 'admin',
    component: AdminDashboard, // The default component to render at home
  },
  // Add other routes for different pages if needed
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(), // Use history mode
  routes, // Pass in the routes
});

export default router; // Export the router to use it in the main.js
