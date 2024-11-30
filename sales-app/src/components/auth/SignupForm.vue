<template>
  <div class="signup-form">
    <h2>Sign Up</h2>
    <form @submit.prevent="submitSignup">
      <input type="text" v-model="name" placeholder="Full Name" required />
      <input type="text" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <user-role-selector v-model="role"></user-role-selector>
      <button type="submit">Sign Up</button>
    </form>
  </div>
</template>

<script>
import UserRoleSelector from "@/components/auth/UserRoleSelector.vue";
import { signup } from "@/services/auth";

export default {
  name: "SignupForm", 
  components: { UserRoleSelector },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      role: "",
    };
  },
  methods: {
    async submitSignup() {
      try {
        await signup(this.name, this.email, this.password, this.role);
        this.$router.push("/");
      } catch (error) {
        console.error("Signup failed", error);
      }
    },
  },
};
</script>

<style scoped>
.signup-form {
  margin: 20px;
}
</style>
