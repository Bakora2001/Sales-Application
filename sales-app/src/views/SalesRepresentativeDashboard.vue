<template>
    <div class="flex bg-purple-700 min-h-screen text-white">
      <!-- Sidebar -->
      <aside class="w-1/4 bg-purple-800 p-6">
        <h2 class="text-2xl font-bold mb-6">Sales Representative Dashboard</h2>
        <nav class="space-y-4">
          <button
            @click="view = 'viewPending'"
            :class="{ 'bg-purple-600': view === 'viewPending' }"
            class="block w-full py-2 px-4 text-left rounded hover:bg-purple-600 transition"
          >
            Pending Orders
          </button>
          <button
            @click="view = 'completedOrders'"
            :class="{ 'bg-purple-600': view === 'completedOrders' }"
            class="block w-full py-2 px-4 text-left rounded hover:bg-purple-600 transition"
          >
            Completed Order History
          </button>
        </nav>
      </aside>
  
      <!-- Main Content -->
      <main class="flex-1 p-6">
        <!-- Pending Orders Section -->
        <section v-if="view === 'viewPending'" class="bg-purple-600 p-6 rounded-lg shadow-lg">
          <h2 class="text-3xl font-semibold mb-4">Pending Orders</h2>
          <div v-if="pendingOrders.length === 0" class="text-center text-lg">
            No pending orders at the moment.
          </div>
          <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="order in pendingOrders"
              :key="order.id"
              class="border border-purple-400 rounded-lg p-4 bg-white hover:shadow-lg transition"
            >
              <h3 class="text-lg font-bold text-purple-800 mb-2">{{ order.product }}</h3>
              <p class="mb-1 text-black">Price: ${{ order.price }}</p>
              <p class="mb-1 text-black">Quantity: {{ order.quantity }}</p>
              <p class="mb-1 text-black">Order No: {{ order.orderNo }}</p>
              <p class="mb-1">Status: {{ order.status }}</p>
              <button
                @click="completeOrder(order)"
                class="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-800 transition"
              >
                Mark as Completed
              </button>
            </div>
          </div>
        </section>
  
        <!-- Completed Orders Section -->
        <section v-if="view === 'completedOrders'" class="bg-purple-600 p-6 rounded-lg shadow-lg">
          <h2 class="text-3xl font-semibold mb-4">Completed Order History</h2>
          <div v-if="completedOrders.length === 0" class="text-center text-lg">
            No completed orders yet.
          </div>
          <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="order in completedOrders"
              :key="order.id"
              class="border border-purple-400 rounded-lg p-4 bg-white hover:shadow-lg transition"
            >
              <h3 class="text-lg font-bold text-purple-800 mb-2">{{ order.product }}</h3>
              <p class="mb-1 text-black">Price: ${{ order.price }}</p>
              <p class="mb-1 text-black">Quantity: {{ order.quantity }}</p>
              <p class="mb-1 text-black">Order No: {{ order.orderNo }}</p>
              <p class="text-green-400 font-semibold">Status: Completed</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "SalesRepresentativeDashboard",
    data() {
      return {
        view: "viewPending", // Default view is 'Pending Orders'
        pendingOrders: [], // Pending orders list
        completedOrders: [], // Completed orders list
      };
    },
    methods: {
      // Fetch all orders (pending and completed) when the page loads
      fetchOrders() {
        axios.get("http://localhost:3000/products").then((response) => {
          const allOrders = response.data;
          // Separate orders based on their status
          this.pendingOrders = allOrders.filter((order) => order.status === "Pending");
          this.completedOrders = allOrders.filter((order) => order.status === "Completed");
        });
      },
      // Mark order as completed
      completeOrder(order) {
        order.status = "Completed"; // Update the order status locally
  
        // Send the updated status to the backend
        axios
          .patch(`http://localhost:3000/products/${order.id}`, { status: "Completed" })
          .then(() => {
            // Move the order from pending to completed in the frontend
            this.pendingOrders = this.pendingOrders.filter((o) => o.id !== order.id); // Remove from pending
            this.completedOrders.push(order); // Add to completed
            alert("Order marked as completed!");
          })
          .catch((error) => {
            console.error("Error completing order:", error);
          });
      },
    },
    mounted() {
      this.fetchOrders(); // Fetch the orders when the page loads
    },
  };
  </script>
  
  <style scoped>
  button:hover {
    cursor: pointer;
  }
  </style>
  