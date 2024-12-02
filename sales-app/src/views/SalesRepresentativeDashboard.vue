<template>
  <div class="flex bg-purple-700 min-h-screen text-white flex-col lg:flex-row">
    <!-- Sidebar -->
    <aside class="w-full lg:w-1/4 bg-purple-800 p-6">
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
        <button
          @click="view = 'cancelledOrders'"
          :class="{ 'bg-purple-600': view === 'cancelledOrders' }"
          class="block w-full py-2 px-4 text-left rounded hover:bg-purple-600 transition"
        >
          Cancelled Orders
        </button>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-6 relative">
      <!-- Logout Button -->
      <button
        v-if="user"
        @click="handleLogOut"
        class="absolute top-6 right-6 border-2 border-white rounded-full px-6 py-2 text-white font-semibold hover:bg-white hover:text-purple-700 transition duration-300"
      >
        Log Out
      </button>

      <!-- Pending Orders Section -->
      <section
        v-if="view === 'viewPending'"
        class="bg-purple-600 p-6 rounded-lg shadow-lg"
      >
        <h2 class="text-3xl font-semibold mb-4">Pending Orders</h2>
        <div v-if="pendingOrders.length === 0" class="text-center text-lg">
          No pending orders at the moment.
        </div>
        <div
          v-else
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div
            v-for="order in pendingOrders"
            :key="order_no"
            class="border border-purple-400 rounded-lg p-4 bg-white hover:shadow-lg transition"
          >
            <h3 class="text-lg font-bold text-purple-800 mb-2">
              {{ order.product }}
            </h3>
            <p class="mb-1 text-black">Price: {{ order.product_price }}</p>
            <p class="mb-1 text-black">
              Quantity: {{ order.product_quantity }}
            </p>
            <p class="mb-1 text-black">Order No: {{ order.order_no }}</p>
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
      <section
        v-if="view === 'completedOrders'"
        class="bg-purple-600 p-6 rounded-lg shadow-lg"
      >
        <h2 class="text-3xl font-semibold mb-4">Completed Order History</h2>
        <div v-if="completedOrders.length === 0" class="text-center text-lg">
          No completed orders yet.
        </div>
        <div
          v-else
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div
            v-for="order in completedOrders"
            :key="order_no"
            class="border border-purple-400 rounded-lg p-4 bg-white hover:shadow-lg transition"
          >
            <h3 class="text-lg font-bold text-purple-800 mb-2">
              {{ order.product }}
            </h3>
            <p class="mb-1 text-black">Price: ${{ order.price }}</p>
            <p class="mb-1 text-black">Quantity: {{ order.quantity }}</p>
            <p class="mb-1 text-black">Order No: {{ order.order_no }}</p>
            <p class="text-green-400 font-semibold">Status: Completed</p>
          </div>
        </div>
      </section>

      <!-- Cancelled Orders Section -->
      <section
        v-if="view === 'cancelledOrders'"
        class="bg-purple-600 p-6 rounded-lg shadow-lg"
      >
        <h2 class="text-3xl font-semibold mb-4">Cancelled Orders</h2>
        <div v-if="cancelledOrders.length === 0" class="text-center text-lg">
          No cancelled orders at the moment.
        </div>
        <div
          v-else
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div
            v-for="order in cancelledOrders"
            :key="order_no"
            class="border border-purple-400 rounded-lg p-4 bg-white hover:shadow-lg transition"
          >
            <h3 class="text-lg font-bold text-purple-800 mb-2">
              {{ order.product }}
            </h3>
            <p class="mb-1 text-black">Price: ${{ order.price }}</p>
            <p class="mb-1 text-black">Quantity: {{ order.quantity }}</p>
            <p class="mb-1 text-black">Order No: {{ order.order_no }}</p>
            <p class="text-red-400 font-semibold">Status: Cancelled</p>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import { useRouter } from "vue-router";
import { checkUser } from "../utils/user";

export default {
  name: "SalesRepresentativeDashboard",
  data() {
    return {
      view: "viewPending",
      pendingOrders: [],
      completedOrders: [],
      cancelledOrders: [],
      user: null,
    };
  },
  methods: {
    async fetchOrders() {
      try {
        const response = await axios.get("http://localhost:5000/api/orders", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        this.orders = response.data;

        this.pendingOrders = this.orders.filter(
          (order) => order.status === "pending"
        );

        this.completedOrders = this.orders.filter(
          (order) => order.status === "completed"
        );

        this.cancelledOrders = this.orders.filter(
          (order) => order.status === "cancelled"
        );
        console.log("Fetched orders:", this.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    },
    async completeOrder(order) {
      try {
        await axios
          .put(
            `http://localhost:5000/api/orders/complete/${order.order_no}`, // use order.order_no instead of order_no
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then(() => {
            this.fetchOrders();
          })
          .catch((error) => {
            console.error("Error updating order status:", error);
            alert("An error occurred while updating the order status.");
          });
      } catch (error) {
        console.error("Error updating order status:", error);
        alert("An error occurred while updating the order status.");
      }
    },
    async handleLogOut() {
      try {
        localStorage.removeItem("token");
        this.$router.push("/login");
      } catch (error) {
        console.error("Error logging out:", error);
      }
    },
  },
  async mounted() {
    const router = useRouter();
    try {
      const { user, error } = await checkUser();
      if (error) {
        alert(`${error.message} : ${error.status}`);
        router.push("/login");
      } else {
        this.user = user;
        if (user.role === "customer") router.push("/");
        else if (user.role === "admin") router.push("/admin");
      }
    } catch (error) {
      console.error("Error checking user:", error);
      router.push("/login");
    }
    this.fetchOrders();
  },
};
</script>

<style scoped>
button:hover {
  cursor: pointer;
}
</style>
