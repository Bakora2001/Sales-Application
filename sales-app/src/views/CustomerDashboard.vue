<template>
    <div class="bg-purple-50 min-h-screen p-6">
      <h1 class="text-4xl font-extrabold text-center text-purple-700 mb-8">
        Customer Dashboard
      </h1>
  
      <!-- Orders Section -->
      <section class="bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-3xl font-semibold text-purple-600 mb-4">My Orders</h2>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="order in orders"
            :key="order.id"
            class="border border-gray-300 rounded-lg p-4 bg-purple-100 hover:shadow-lg transition-shadow duration-300"
          >
            <h3 class="text-lg font-bold text-purple-700 mb-2">Order #{{ order.orderNo }}</h3>
            <p class="text-gray-700 mb-1">Product: {{ order.product }}</p>
            <p class="text-gray-700 mb-1">Price: ${{ order.price }}</p>
            <p class="text-gray-700">Quantity: {{ order.quantity }}</p>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: "CustomerDashboard",
    data() {
      return {
        orders: [
          { id: 1, orderNo: 101, product: "Laptop", price: 800, quantity: 1 },
          { id: 2, orderNo: 102, product: "Mouse", price: 20, quantity: 2 },
          { id: 3, orderNo: 103, product: "Keyboard", price: 50, quantity: 1 },
          { id: 4, orderNo: 104, product: "Monitor", price: 150, quantity: 1 },
        ],
      };
    },
  };
  </script>
  
  <style scoped>

  </style>
  