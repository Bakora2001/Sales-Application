<template>
    <div class="bg-purple-50 min-h-screen p-6">
      <h1 class="text-4xl font-extrabold text-center text-purple-700 mb-8">Customer Dashboard</h1>
  
      <!-- Customer Profile Information Section -->
      <section class="mb-10 bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-3xl font-semibold text-purple-600 mb-4">Customer Profile</h2>
        <div class="mb-6">
          <p><strong>Name:</strong> {{ customer.name }}</p>
          <p><strong>Email:</strong> {{ customer.email }}</p>
          <p><strong>Phone:</strong> {{ customer.phone }}</p>
        </div>
      </section>
  
      <!-- Orders Section -->
      <section class="bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-3xl font-semibold text-purple-600 mb-4">Your Orders</h2>
  
        <!-- No Orders Message -->
        <p v-if="orders.length === 0" class="text-center text-gray-500">You have no orders yet.</p>
  
        <!-- Orders List -->
        <ul v-else class="border border-gray-300 rounded-lg bg-white shadow-sm">
          <li
            v-for="order in orders"
            :key="order.id"
            class="flex justify-between items-center py-3 px-4 border-b"
          >
            <div>
              <p class="text-lg font-medium text-purple-700">Order #{{ order.orderNo }}</p>
              <div class="text-gray-500">Product: {{ order.productName }}</div>
              <div class="text-gray-500">Quantity: {{ order.quantity }}</div>
              <div class="text-gray-500">Price: ${{ order.price.toFixed(2) }}</div>
            </div>
          </li>
        </ul>
      </section>
    </div>
  </template>
  
  <script>
  import api from "@/services/api.js";
  
  export default {
    name: "CustomerDashboard",
    data() {
      return {
        customer: {
          name: "John Doe", // Default for now, should be fetched from the API
          email: "johndoe@example.com", // Default for now, should be fetched from the API
          phone: "+1234567890", // Default for now, should be fetched from the API
        },
        orders: [],
      };
    },
    methods: {
      async fetchCustomerData() {
        // Fetch customer data from the API (if applicable)
        try {
          const response = await api.get("/customer-profile");
          this.customer = response.data; // Assuming the customer profile is returned from the backend
        } catch (error) {
          console.error("Error fetching customer profile:", error);
        }
      },
      async fetchCustomerOrders() {
        // Fetch customer orders (these orders could be created by the admin)
        try {
          const response = await api.get("/orders");
          this.orders = response.data.filter(order => order.customerId === this.customer.id);
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      },
    },
    mounted() {
      // Fetch customer profile and orders when the component is mounted
      this.fetchCustomerData();
      this.fetchCustomerOrders();
    },
  };
  </script>
  
  <style scoped>

  </style>
  