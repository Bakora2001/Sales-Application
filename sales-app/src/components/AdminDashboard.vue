
<template>
  <div class="min-h-screen bg-gray-100 py-10">
    <div class="container mx-auto">
      <h1 class="text-3xl font-bold text-center text-blue-600 mb-6">Admin Dashboard</h1>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Products Section -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold text-gray-700 mb-4">Products</h2>
          <button
            @click="createProduct"
            class="bg-blue-500 text-white py-2 px-4 rounded-md mb-4 hover:bg-blue-600"
          >
            Create Product
          </button>
          <div>
            <p v-if="products.length === 0" class="text-gray-500">No products available.</p>
            <div
              v-for="product in products"
              :key="product.id"
              class="bg-gray-50 rounded-lg p-4 mb-3"
            >
              <p class="font-semibold text-gray-800">{{ product.name }}</p>
              <p>Price: ${{ product.price }}</p>
              <p>Quantity: {{ product.quantity }}</p>
            </div>
          </div>
        </div>

        <!-- Customers Section -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold text-gray-700 mb-4">Customers</h2>
          <p v-if="customers.length === 0" class="text-gray-500">No customers found.</p>
          <ul class="divide-y divide-gray-200">
            <li v-for="customer in customers" :key="customer.id" class="py-2">
              {{ customer.name }}
            </li>
          </ul>
        </div>

        <!-- Sales Representatives Section -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold text-gray-700 mb-4">Sales Representatives</h2>
          <p v-if="salesReps.length === 0" class="text-gray-500">No sales representatives found.</p>
          <ul class="divide-y divide-gray-200">
            <li v-for="rep in salesReps" :key="rep.id" class="py-2">
              {{ rep.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/services/api.js';


export default {
  data() {
    return {
      products: [],
      customers: [],
      salesReps: [],
    };
  },
  async created() {
    const productResponse = await api.get("/products");
    const customerResponse = await api.get("/customers");
    const repResponse = await api.get("/sales-representatives");

    this.products = productResponse.data || [];
    this.customers = customerResponse.data || [];
    this.salesReps = repResponse.data || [];
  },
  methods: {
    createProduct() {
      alert("Create Product functionality coming soon!");
    },
  },
};
</script>
