<template>
  <div class="flex bg-purple-700 min-h-screen text-white">
    <!-- Sidebar -->
    <aside class="w-1/4 bg-purple-800 p-6">
      <h2 class="text-2xl font-bold mb-6">MaliSafi Limited</h2>
      <nav class="space-y-4">
        <button
          @click="view = 'makeOrder'"
          :class="{ 'bg-purple-600': view === 'makeOrder' }"
          class="block w-full py-2 px-4 text-left rounded hover:bg-purple-600 transition"
        >
          Make Order
        </button>
        <button
          @click="view = 'orderHistory'"
          :class="{ 'bg-purple-600': view === 'orderHistory' }"
          class="block w-full py-2 px-4 text-left rounded hover:bg-purple-600 transition"
        >
          Order History
        </button>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-6 relative">
      <!-- Login Button -->
      <button
        @click="navigateToLogin"
        class="absolute top-6 right-6 border-2 border-white rounded-full px-6 py-2 text-white font-semibold hover:bg-white hover:text-purple-700 transition duration-300"
      >
        Login
      </button>

      <!-- Making Order Section -->
      <section v-if="view === 'makeOrder'" class="bg-purple-600 p-6 rounded-lg shadow-lg">
        <h2 class="text-3xl font-semibold mb-4">Available Products</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="product in products"
            :key="product.id"
            class="border border-purple-400 rounded-lg p-4 bg-purple-500 hover:shadow-lg transition-shadow duration-300"
          >
            <h3 class="text-lg font-bold text-white mb-2">{{ product.name }}</h3>
            <p class="text-white mb-1">Price: ${{ product.price }}</p>
            <p class="text-white mb-1">Quantity: {{ product.quantity }}</p>
            <button
              @click="handleOrder(product)"
              class="bg-purple-700 mt-4 py-2 px-4 rounded-lg hover:bg-purple-800 transition"
            >
              Order
            </button>
          </div>
        </div>
      </section>

      <!-- Order History Section -->
      <section v-if="view === 'orderHistory'" class="bg-purple-600 p-6 rounded-lg shadow-lg">
        <h2 class="text-3xl font-semibold mb-4">Order History</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="order in orders"
            :key="order.id"
            class="border border-purple-400 rounded-lg p-4 bg-purple-500 hover:shadow-lg transition-shadow duration-300"
          >
            <h3 class="text-lg font-bold text-white mb-2">Order #{{ order.orderNo }}</h3>
            <p class="text-white mb-1">Product: {{ order.name }}</p>
            <p class="text-white mb-1">Price: ${{ order.price }}</p>
            <p class="text-white">Quantity: {{ order.quantity }}</p>
            <p class="text-white font-semibold">Status: {{ order.status }}</p>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: "CustomerDashboard",
  data() {
    return {
      view: "makeOrder", // Default view is 'Make Order'
      products: [], // Products fetched from the backend
      orders: [], // Orders placed by the customer
      isLoggedIn: false, // Track login state
    };
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await fetch("http://localhost:3000/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        this.products = await response.json();
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },

    async fetchOrders() {
      try {
        const response = await fetch("http://localhost:3000/orders");
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        this.orders = await response.json();
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    },

    handleOrder(product) {
      if (!this.isLoggedIn) {
        this.$router.push("/login"); // Redirect to login page if not logged in
      } else {
        // Handle order logic for logged-in users (not shown as per request)
        console.log("Order placed:", product.name);
      }
    },

    navigateToLogin() {
      this.$router.push("/login"); // It navigates to the login page
    },
  },
  mounted() {
    this.fetchProducts(); // Fetch products when the component is mounted
    this.fetchOrders(); // Fetch orders when the component is mounted
  },
};
</script>

<style scoped>
button:hover {
  cursor: pointer;
}
</style>
