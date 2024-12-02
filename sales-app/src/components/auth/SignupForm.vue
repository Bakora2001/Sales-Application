<template>
  <div
    class="flex min-h-screen items-center justify-center bg-purple-700 bg-cover bg-center"
    :style="{ backgroundImage: 'url(\'/src/assets/login4.jpg\')' }"
  >
    <div
      class="bg-purple-800 bg-opacity-90 p-6 rounded-lg shadow-lg w-full max-w-md"
    >
      <h2 class="text-3xl font-bold text-white text-center mb-6">Sign Up</h2>
      <form @submit.prevent="handleSignUp" class="space-y-4">
        <!-- Name Input -->
        <div>
          <label for="name" class="block text-white font-medium mb-2"
            >Full Name</label
          >
          <input
            id="name"
            type="text"
            v-model="name"
            required
            placeholder="Enter your full name"
            class="w-full px-4 py-2 rounded-lg bg-purple-700 text-white placeholder-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
          />
        </div>

        <!-- Email Input -->
        <div>
          <label for="email" class="block text-white font-medium mb-2"
            >Email Address</label
          >
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
          <label for="password" class="block text-white font-medium mb-2"
            >Password</label
          >
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
          Sign Up
        </button>
      </form>

      <p class="text-center text-white mt-4">
        Already have an account?
        <router-link
          to="/login"
          class="text-purple-400 underline hover:text-purple-300 transition"
        >
          Login
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { checkUser, signupUser } from "../../utils/user";

export default {
  name: "SignUpForm",
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async handleSignUp() {
      try {
        const { token, error } = await signupUser(
          this.name,
          this.email,
          this.password
        );

        if (error) {
          alert(`${error.message} : ${error.status}`);
        } else {
          localStorage.setItem("token", token); // Store the token in localStorage
          this.$router.push("/"); // Redirect to the home page upon successful sign-up
        }
      } catch (err) {
        alert("An error occurred while signing up. Please try again.");
      }
    },
  },
  created() {
    const { user, error } = checkUser();

    if (user) {
      this.$router.push("/");
    }
  },
};
</script>

<style scoped>
button:hover {
  cursor: pointer;
}
</style>
