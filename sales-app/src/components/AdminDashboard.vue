<template>
  <div class="bg-purple-700 min-h-screen p-6 md:p-8">
    <!-- Dashboard Header -->
    <h1 class="text-4xl font-extrabold text-center text-white mb-8">Admin Dashboard</h1>

    <!-- Products Section -->
    <section class="mb-8 bg-white p-6 rounded-lg shadow-lg">
      <h2 class="text-3xl font-semibold text-purple-600 mb-4">Manage Products</h2>
      <form @submit.prevent="addProduct" class="flex flex-col sm:flex-row gap-4 items-center mb-6">
        <input
          v-model="newProduct.name"
          type="text"
          placeholder="Product Name"
          class="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/3 focus:ring-2 focus:ring-purple-500"
          required
        />
        <input
          v-model.number="newProduct.price"
          type="number"
          placeholder="Price"
          class="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/3 focus:ring-2 focus:ring-purple-500"
        />
        <input
          v-model.number="newProduct.quantity"
          type="number"
          placeholder="Quantity"
          class="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/3 focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          class="bg-purple-600 text-white rounded-lg px-6 py-2 mt-4 sm:mt-0 sm:ml-4 hover:bg-purple-700 transition-all duration-300 w-full sm:w-auto"
        >
          Add Product
        </button>
      </form>

      <ul class="border border-gray-300 rounded-lg bg-white shadow-sm">
        <li
          v-for="product in products"
          :key="product.OrderNo"
          class="flex flex-col sm:flex-row justify-between items-center py-3 px-4 border-b"
        >
          <div class="sm:w-1/3 text-lg font-medium text-purple-700">{{ product.name }}</div>
          <div class="sm:w-1/3 text-gray-700">${{ product.price }}</div>
          <div class="sm:w-1/3 text-gray-500">Quantity: {{ product.quantity }}</div>
          <div class="sm:w-1/3 text-gray-500">Order No: {{ product.OrderNo }}</div>
        </li>
      </ul>
    </section>

    <!-- Customers Section -->
    <section class="mb-8 bg-white p-6 rounded-lg shadow-lg">
      <h2 class="text-3xl font-semibold text-purple-600 mb-4">Customer List</h2>
      <ul class="border border-gray-300 rounded-lg bg-white shadow-sm">
        <li
          v-for="customer in customers"
          :key="customer.id"
          class="py-3 px-4 border-b text-gray-800"
        >
          <span class="font-medium">{{ customer.name }}</span> - 
          <span class="text-gray-500">{{ customer.email }}</span>
        </li>
      </ul>
    </section>

    <!-- Sales Representatives Section -->
    <section class="bg-white p-6 rounded-lg shadow-lg">
      <h2 class="text-3xl font-semibold text-purple-600 mb-4">Sales Representatives</h2>
      <ul class="border border-gray-300 rounded-lg bg-white shadow-sm">
        <li
          v-for="rep in salesRepresentatives"
          :key="rep.id"
          class="py-3 px-4 border-b text-gray-800"
        >
          <span class="font-medium">{{ rep.name }}</span> - 
          <span class="text-gray-500">{{ rep.email }}</span>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import api from "@/services/api.js";

export default {
  name: "AdminDashboard",
  data() {
    return {
      products: [],
      customers: [],
      salesRepresentatives: [],
      newProduct: {
        name: "",
        price: null, // Set to null to avoid defaulting to 0
        quantity: null, // Set to null to avoid defaulting to 0
      },
      nextOrderNo: 1, // Start with 1 for OrderNo
    };
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await api.get("/products");
        this.products = response.data;

        // Initialize nextOrderNo based on existing products
        if (this.products.length > 0) {
          this.nextOrderNo = Math.max(...this.products.map(p => p.OrderNo)) + 1;
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    async fetchCustomers() {
      try {
        const response = await api.get("/customers");
        this.customers = response.data;
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    },
    async fetchSalesRepresentatives() {
      try {
        const response = await api.get("/sales-representatives");
        this.salesRepresentatives = response.data;
      } catch (error) {
        console.error("Error fetching sales representatives:", error);
      }
    },
    async addProduct() {
      // Check if price and quantity are valid before pushing
      if (this.newProduct.name && this.newProduct.price !== null && this.newProduct.quantity !== null) {
        try {
          // Create new product with unique OrderNo
          const productToAdd = {
            ...this.newProduct,
            OrderNo: this.nextOrderNo, // Assign the unique OrderNo
          };

          // Post to the API (or directly add it if you don't need an API)
          const response = await api.post("/products", productToAdd);
          this.products.push(response.data); // Add the new product to the list

          // Increment OrderNo for the next product
          this.nextOrderNo++;

          // Reset the form
          this.newProduct = { name: "", price: null, quantity: null };
        } catch (error) {
          console.error("Error adding product:", error);
        }
      } else {
        console.error("Please fill out all fields correctly.");
      }
    },
  },
  mounted() {
    this.fetchProducts();
    this.fetchCustomers();
    this.fetchSalesRepresentatives();
  },
};
</script>

<style scoped>

</style>
