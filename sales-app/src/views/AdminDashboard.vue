<template>
  <div class="flex bg-purple-700 min-h-screen text-white">
    <!-- Sidebar -->
    <aside class="w-1/4 bg-purple-800 p-6">
      <h2 class="text-2xl font-bold mb-6">Admin Dashboard</h2>
      <nav class="space-y-4">
        <button
          @click="view = 'addProduct'"
          :class="{'bg-purple-600': view === 'addProduct'}"
          class="block w-full py-2 px-4 text-left rounded hover:bg-purple-600 transition"
        >
          Add Product
        </button>
        <button
          @click="view = 'viewProducts'"
          :class="{'bg-purple-600': view === 'viewProducts'}"
          class="block w-full py-2 px-4 text-left rounded hover:bg-purple-600 transition"
        >
          View Products
        </button>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-6">
      <!-- Add Product Section -->
      <section v-if="view === 'addProduct'" class="bg-purple-600 p-6 rounded-lg shadow-lg">
        <h2 class="text-3xl font-semibold mb-4">Add New Product</h2>
        <form @submit.prevent="addProduct" class="space-y-4">
          <div>
            <label for="productName" class="text-white">Product Name:</label>
            <input
              v-model="newProduct.product"
              type="text"
              id="productName"
              required
              class="w-full p-2 rounded-md"
            />
          </div>
          <div>
            <label for="price" class="text-white">Price:</label>
            <input
              v-model="newProduct.price"
              type="number"
              id="price"
              required
              class="w-full p-2 rounded-md"
            />
          </div>
          <div>
            <label for="quantity" class="text-white">Quantity:</label>
            <input
              v-model="newProduct.quantity"
              type="number"
              id="quantity"
              required
              class="w-full p-2 rounded-md"
            />
          </div>
          <div>
            <label for="orderNo" class="text-white">Order No:</label>
            <input
              v-model="newProduct.orderNo"
              type="number"
              id="orderNo"
              required
              class="w-full p-2 rounded-md"
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
      <section v-if="view === 'viewProducts'" class="bg-purple-600 p-6 rounded-lg shadow-lg">
        <h2 class="text-3xl font-semibold mb-4">Product List</h2>
        <div v-if="products.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="product in products"
            :key="product.orderNo"
            class="border border-purple-400 rounded-lg p-4 bg-purple-500 hover:shadow-lg transition-shadow duration-300"
          >
            <h3 class="text-lg font-bold text-white mb-2">{{ product.product }}</h3>
            <p class="text-white mb-1">Order No: {{ product.orderNo }}</p>
            <p class="text-white mb-1">Price: ${{ product.price }}</p>
            <p class="text-white mb-1">Quantity: {{ product.quantity }}</p>
          </div>
        </div>
        <p v-else class="text-lg text-center">No products added yet.</p>
      </section>
    </main>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AdminDashboard",
  data() {
    return {
      view: "addProduct", // Default view
      newProduct: {
        product: "",
        price: 0,
        quantity: 0,
        orderNo: 0,
      }, // Product details to be added
      products: [], // List of products fetched from the backend
    };
  },
  methods: {
    // Fetch products from the backend
    fetchProducts() {
      axios
        .get("http://localhost:3000/products") // API endpoint to fetch products
        .then((response) => {
          this.products = response.data; // Set the fetched products to the state
        })
        .catch((error) => {
          console.error("There was an error fetching the products:", error);
        });
    },
    // Add a product to the backend
    addProduct() {
      axios
        .post("http://localhost:3000/products", this.newProduct) // Add the product to the backend
        .then((response) => {
          this.products.push(response.data); // Add the newly created product to the products array
          alert("Product added successfully.");
          this.newProduct = { product: "", price: 0, quantity: 0, orderNo: 0 }; // Reset form
        })
        .catch((error) => {
          console.error("There was an error adding the product:", error);
        });
    },
  },
  mounted() {
    this.fetchProducts(); // Fetch products when the component mounts
  },
};
</script>

<style scoped>
button:hover {
  cursor: pointer;
}
</style>
