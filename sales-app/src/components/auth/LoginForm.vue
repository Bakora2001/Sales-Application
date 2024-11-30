<template>
  <div class="login-form">
    <h2>Login</h2>
    <form @submit.prevent="submitLogin">
      <input type="text" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <user-role-selector v-model="role"></user-role-selector>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import UserRoleSelector from "@/components/auth/UserRoleSelector.vue";
import { login } from "@/services/auth";

export default {
  name: "LoginForm", 
  components: { UserRoleSelector },
  data() {
    return {
      email: "",
      password: "",
      role: "",
    };
  },
  methods: {
    async submitLogin() {
      try {
        await login(this.email, this.password, this.role);
        this.$router.push(this.role === "admin" ? "/admin" : "/");
      } catch (error) {
        console.error("Login failed", error);
      }
    },
  },
};
</script>

<style scoped>
.login-form {
  margin: 20px;
}
</style>
