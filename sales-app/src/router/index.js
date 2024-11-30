import { createRouter, createWebHistory } from "vue-router";
import AdminDashboard from "@/views/AdminDashboard.vue";
import CustomerDashboard from "@/views/CustomerDashboard.vue";
import SalesRepresentativeDashboard from "@/views/SalesRepresentativeDashboard.vue";
import LoginForm from "@/components/auth/LoginForm.vue";  
import SignupForm from "@/components/auth/SignupForm.vue";  

const routes = [
  {
    path: "/",
    name: "home",
    component: LoginForm, // This shows the Login page as the default page
  },
  {
    path: "/signup",
    name: "signup",
    component: SignupForm,
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminDashboard,
  },
  {
    path: "/sales",
    name: "salesRepresentative",
    component: SalesRepresentativeDashboard,
  },
  {
    path: "/customer",
    name: "customer",
    component: CustomerDashboard,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
