<template>
  <div
    class="min-h-screen flex items-center justify-center bg-purple-700 bg-cover bg-center"
    style="background-image: url('@/assets/login4.jpg')"
  >
    <div class="bg-purple-800 bg-opacity-90 w-full max-w-md p-6 rounded-lg shadow-lg">
      <h2 class="text-3xl font-bold text-white text-center mb-6">Login</h2>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Email Input -->
        <div>
          <label for="email" class="block text-white font-medium mb-2">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            v-model="email"
            required
            placeholder="Enter your email"
            class="w-full px-4 py-2 rounded-lg bg-purple-700 text-white placeholder-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
          />
        </div>

        <!-- Password Input -->
        <div>
          <label for="password" class="block text-white font-medium mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            v-model="password"
            required
            placeholder="Enter your password"
            class="w-full px-4 py-2 rounded-lg bg-purple-700 text-white placeholder-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
          />
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-500 transition duration-300"
        >
          Login
        </button>
      </form>

      <p class="text-center text-white mt-4">
        Don't have an account?
        <router-link
          to="/signup"
          class="text-purple-400 underline hover:text-purple-300 transition"
        >
          Sign Up
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    handleSubmit() {
      // Handle login logic here
      console.log("Email:", this.email);
      console.log("Password:", this.password);
    },
  },
};
</script>

<style scoped>

</style>
