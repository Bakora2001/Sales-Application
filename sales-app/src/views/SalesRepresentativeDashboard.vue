<template>
    <div class="p-6 bg-blue-100 min-h-screen">
      <h2 class="text-3xl font-bold mb-4">Sales Representative Dashboard</h2>
      <div v-if="pendingOrders.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="order in pendingOrders"
          :key="order.id"
          class="p-4 border border-blue-400 bg-white rounded shadow"
        >
          <h3 class="text-lg font-bold mb-2">{{ order.product }}</h3>
          <p class="mb-1">Price: ${{ order.price }}</p>
          <p class="mb-1">Quantity: {{ order.quantity }}</p>
          <p class="mb-1">Order No: {{ order.orderNo }}</p>
          <p class="mb-1">Status: {{ order.status }}</p>
          <button
            class="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800"
            @click="completeOrder(order)"
          >
            Mark as Completed
          </button>
        </div>
      </div>
      <p v-else>No pending orders.</p>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "SalesRepresentativeDashboard",
    data() {
      return {
        pendingOrders: [], // Pending orders list
      };
    },
    methods: {
      fetchPendingOrders() {
        axios.get("http://localhost:3000/products").then((response) => {
          this.pendingOrders = response.data.filter((order) => order.status === "Pending");
        });
      },
      completeOrder(order) {
        order.status = "Completed"; // Update order status locally
        axios
          .patch(`http://localhost:3000/products/${order.id}`, { status: "Completed" })
          .then(() => {
            alert("Order marked as completed!");
            this.fetchPendingOrders(); // Refresh pending orders
          })
          .catch((error) => {
            console.error("Error completing order:", error);
          });
      },
    },
    mounted() {
      this.fetchPendingOrders();
    },
  };
  </script>
  
  <style scoped>
  button:hover {
    cursor: pointer;
  }
  </style>
  