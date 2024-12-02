<template>
  <div class="flex bg-purple-700 min-h-screen text-white flex-col sm:flex-row">
    <!-- Sidebar -->
    <aside class="w-full sm:w-1/4 bg-purple-800 p-6">
      <h2 class="text-2xl font-bold mb-6">Admin Dashboard</h2>
      <nav class="space-y-4">
        <button
          @click="view = 'addProduct'"
          :class="{ 'bg-purple-600': view === 'addProduct' }"
          class="block w-full py-2 px-4 text-left rounded hover:bg-purple-600 transition"
        >
          Add Product
        </button>
        <button
          @click="view = 'viewProducts'"
          :class="{ 'bg-purple-600': view === 'viewProducts' }"
          class="block w-full py-2 px-4 text-left rounded hover:bg-purple-600 transition"
        >
          View Products
        </button>
        <button
          @click="view = 'viewUsers'"
          :class="{ 'bg-purple-600': view === 'viewUsers' }"
          class="block w-full py-2 px-4 text-left rounded hover:bg-purple-600 transition"
        >
          View Users
        </button>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-6 mt-6 sm:mt-0">
      <!-- Logout Button -->
      <button
        v-if="user"
        @click="handleLogOut"
        class="absolute top-6 right-6 border-2 border-white rounded-full px-6 py-2 text-white font-semibold hover:bg-white hover:text-purple-700 transition duration-300"
      >
        Log Out
      </button>

      <!-- Add Product Section -->
      <section
        v-if="view === 'addProduct'"
        class="bg-purple-600 p-6 rounded-lg shadow-lg"
      >
        <h2 class="text-3xl font-semibold mb-4">Add New Product</h2>
        <form @submit.prevent="addProduct" class="space-y-4">
          <div>
            <label for="productName" class="text-white">Product Name:</label>
            <input
              v-model="newProduct.product"
              type="text"
              id="productName"
              required
              class="w-full p-2 rounded-md text-black"
            />
          </div>
          <div>
            <label for="price" class="text-white">Price:</label>
            <input
              v-model="newProduct.price"
              type="number"
              id="price"
              required
              class="w-full p-2 rounded-md text-black"
            />
          </div>
          <div>
            <label for="quantity" class="text-white">Quantity:</label>
            <input
              v-model="newProduct.quantity"
              type="number"
              id="quantity"
              required
              class="w-full p-2 rounded-md text-black"
            />
          </div>
          <button
            type="submit"
            class="w-full py-2 bg-purple-700 rounded hover:bg-purple-800 transition"
          >
            Add Product
          </button>
        </form>
      </section>

      <!-- View Products Section -->
      <section
        v-if="view === 'viewProducts'"
        class="bg-purple-600 p-6 rounded-lg shadow-lg"
      >
        <h2 class="text-3xl font-semibold mb-4">Product List</h2>
        <div
          v-if="products.length > 0"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div
            v-for="product in products"
            :key="product.orderNo"
            class="border border-purple-400 rounded-lg p-4 bg-purple-500 hover:shadow-lg transition-shadow duration-300"
          >
            <h3 class="text-lg font-bold text-white mb-2">
              {{ product.product }}
            </h3>
            <p class="text-white mb-1">Name: {{ product.name }}</p>
            <p class="text-white mb-1">Price: ${{ product.price }}</p>
            <p class="text-white mb-1">Quantity: {{ product.quantity }}</p>
          </div>
        </div>
        <p v-else class="text-lg text-center">No products added yet.</p>
      </section>

      <!-- View Users Section -->
      <section
        v-if="view === 'viewUsers'"
        class="bg-purple-600 p-6 rounded-lg shadow-lg"
      >
        <h2 class="text-3xl font-semibold mb-4">Users List</h2>
        <div
          v-if="users.length > 0"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div
            v-for="user in users"
            :key="user.id"
            class="border border-purple-400 rounded-lg p-4 bg-purple-500 hover:shadow-lg transition-shadow duration-300"
          >
            <h3 class="text-lg font-bold text-white mb-2">
              {{ user.name }}
            </h3>
            <p class="text-white mb-1">Email: {{ user.email }}</p>
            <p class="text-white mb-1">Role: {{ user.role }}</p>

            <!-- Role Selector -->
            <div class="mb-4">
              <label for="role" class="text-white">Change Role:</label>
              <select
                v-model="user.newRole"
                id="role"
                class="w-full p-2 rounded-md text-black"
              >
                <option value="admin">Admin</option>
                <option value="customer">Customer</option>
                <option value="sales_rep">Sales Rep</option>
              </select>
            </div>

            <!-- Button to update role -->
            <button
              @click="updateUserRole(user, user.newRole)"
              class="w-full py-2 bg-purple-700 rounded hover:bg-purple-800 transition"
            >
              Update Role
            </button>
          </div>
        </div>
        <p v-else class="text-lg text-center">No users found.</p>
      </section>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import { useRouter } from "vue-router";
import { checkUser } from "../utils/user";
import { io } from "socket.io-client";

export default {
  name: "AdminDashboard",
  data() {
    return {
      view: "addProduct", // Default view
      newProduct: {
        product: "",
        price: 0,
        quantity: 0,
      }, // Product details to be added
      products: [], // List of products fetched from the backend
      users: [], // List of users fetched from the backend
      user: null, // User information
      socket: null,
    };
  },
  created() {
    console.log("Starting connection to WebSocket Server");
    this.connection = io("http://localhost:5000", {
      transports: ["websocket"], // Force the WebSocket transport
    });

    this.connection.on("connect", () => {
      console.log("CONNECTED TO WEBSERVER");
    });

    this.connection.on("disconnect", () => {
      console.log("DISCONNECTED FROM WEBSERVER");
    });

    this.connection.on("connect_error", (error) => {
      console.error("Connection Error:", error);
    });
  },
  methods: {
    updateUserRole(user, role) {
      axios
        .put(
          "http://localhost:5000/api/users",
          {
            user_id: user.id,
            role: role,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          this.users = response.data;
          this.fetchUsers();
        })
        .catch((error) => {
          console.error("There was an error fetching the users:", error);
        });
    },
    fetchProducts() {
      axios
        .get("http://localhost:5000/api/products")
        .then((response) => {
          this.products = response.data;
        })
        .catch((error) => {
          console.error("There was an error fetching the products:", error);
        });
    },
    // Fetch users from the backend
    fetchUsers() {
      axios
        .get("http://localhost:5000/api/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          this.users = response.data;
        })
        .catch((error) => {
          console.error("There was an error fetching the users:", error);
        });
    },
    // Add a product to the backend
    addProduct() {
      axios
        .post(
          "http://localhost:5000/api/products",
          {
            product: this.newProduct.product,
            price: this.newProduct.price,
            quantity: this.newProduct.quantity,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          alert("Product added successfully");
          this.fetchProducts(); // Refresh the product list after adding
        })
        .catch((error) => {
          console.error("There was an error adding the product:", error);
        });
    },
    // Handle user log out
    handleLogOut() {
      localStorage.removeItem("token");
      this.user = null;
      this.$router.push("/login");
    },
  },
  watch: {
    view(newView) {
      if (newView === "viewUsers") {
        this.fetchUsers();
      }
      if (newView === "viewProducts") {
        this.fetchProducts();
      }
    },
  },
  mounted() {
    // Check if the user is logged in
    this.user = checkUser();

    if (!this.user) {
      this.$router.push("/login");
    }

    // Fetch the products initially
    this.fetchProducts();
    // Fetch the users initially
    this.fetchUsers();
  },
};
</script>

<style scoped>
/* Add custom styles if necessary */
</style>
