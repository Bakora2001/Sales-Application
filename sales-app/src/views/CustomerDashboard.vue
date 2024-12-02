<template>
  <div class="flex flex-col md:flex-row bg-purple-700 min-h-screen text-white">
    <!-- Sidebar -->
    <aside class="w-full md:w-1/4 bg-purple-800 p-6">
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
        v-if="!user"
        @click="navigateToLogin"
        class="absolute top-6 right-6 border-2 border-white rounded-full px-6 py-2 text-white font-semibold hover:bg-white hover:text-purple-700 transition duration-300"
      >
        Login
      </button>

      <button
        v-if="user"
        @click="handleLogOut"
        class="absolute top-6 right-6 border-2 border-white rounded-full px-6 py-2 text-white font-semibold hover:bg-white hover:text-purple-700 transition duration-300"
      >
        LogOut
      </button>

      <!-- Making Order Section -->
      <section
        v-if="view === 'makeOrder'"
        class="bg-purple-600 p-6 rounded-lg shadow-lg"
      >
        <h2 class="text-3xl font-semibold mb-4">Available Products</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="product in products"
            :key="product.id"
            class="border border-purple-400 rounded-lg p-4 bg-purple-500 hover:shadow-lg transition-shadow duration-300"
          >
            <h3 class="text-lg font-bold text-white mb-2">
              {{ product.name }}
            </h3>
            <p class="text-white mb-1">Price: ${{ product.price }}</p>
            <p class="text-white mb-1">
              Quantity Available: {{ product.quantity }}
            </p>

            <div class="flex items-center mt-4">
              <input
                type="number"
                v-model.number="product.quantity"
                min="1"
                :max="product.stock"
                class="w-16 p-2 rounded border border-purple-400 text-black"
                placeholder="Qty"
              />
              <button
                @click="handleOrder(product)"
                class="bg-purple-700 py-2 px-4 ml-2 rounded-lg hover:bg-purple-800 transition"
              >
                Order
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Order History Section -->
      <section
        v-if="view === 'orderHistory'"
        class="bg-purple-600 p-6 rounded-lg shadow-lg"
      >
        <h2 class="text-3xl font-semibold mb-4">Order History</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="order in orders"
            :key="order.order_no"
            class="border border-purple-400 rounded-lg p-4 bg-purple-500 hover:shadow-lg transition-shadow duration-300"
          >
            <h3 class="text-lg font-bold text-white mb-2">
              Order #{{ order.order_no }}
            </h3>
            <p class="text-white mb-1">Product: {{ order.product_name }}</p>
            <p class="text-white mb-1">Price: ${{ order.product_price }}</p>
            <p class="text-white">Quantity: {{ order.product_quantity }}</p>
            <p class="text-white font-semibold">Status: {{ order.status }}</p>

            <!-- Cancel Button (Only for 'pending' orders) -->
            <button
              v-if="order.status === 'pending'"
              @click="handleCancel(order.order_no)"
              class="mt-4 bg-red-600 py-2 px-4 rounded-lg hover:bg-red-700 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { checkUser } from "../utils/user";
import axios from "axios";

export default {
  name: "CustomerDashboard",
  data() {
    return {
      view: "makeOrder",
      products: [],
      orders: [],
      user: null,
      connection: null,
    };
  },
  methods: {
    handleLogOut() {
      localStorage.removeItem("token");
      this.user = null;
      this.$router.push("/login");
    },
    async fetchProducts() {
      try {
        const response = await axios.get("http://localhost:5000/api/products", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        this.products = response.data.map((product) => ({
          id: product.id,
          name: product.name,
          price: product.price,
          stock: product.stock,
          quantity: product.quantity,
        }));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    async fetchOrders() {
      try {
        const response = await axios.get("http://localhost:5000/api/orders", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        this.orders = response.data;
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    },
    handleOrder(product) {
      if (!this.user) {
        this.$router.push("/login");
        return;
      }

      const { id, quantity } = product;

      axios
        .post(
          "http://localhost:5000/api/orders",
          { product_id: id, quantity: quantity },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          console.log("Order placed:", response.data);
          this.fetchOrders();
        })
        .catch((error) => {
          console.error("Error placing order:", error);
        });
    },
    handleCancel(orderId) {
      axios
        .put(`http://localhost:5000/api/orders/cancel/${orderId}`, null, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          alert("Order cancelled");
          this.fetchOrders();
        })
        .catch((error) => {
          console.error("Error cancelling order:", error);
        });
    },
    navigateToLogin() {
      this.$router.push("/login");
    },
  },
  async mounted() {
    const router = useRouter();
    try {
      const { user } = await checkUser();
      this.user = user;

      if (user && user.role === "admin") {
        router.push("/admin");
      } else if (user && user.role === "sales_rep") {
        router.push("/sales");
      }
    } catch (error) {
      console.error("Error checking user:", error);
      router.push("/login");
    }

    await this.fetchProducts();
    await this.fetchOrders();
  },
};
</script>

<style scoped>
button:hover {
  cursor: pointer;
}
</style>
