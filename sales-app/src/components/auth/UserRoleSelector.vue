<template>
  <div class="role-selector">
    <select v-model="selectedRole" @change="emitRole" required>
      <option value="">Select Role</option>
      <option value="admin">Admin</option>
      <option value="customer">Customer</option>
      <option value="sales_rep">Sales Representative</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "UserRoleSelector",  //This is the export name that will be exported
  props: ["value"],
  data() {
    return {
      selectedRole: this.value || "",
    };
  },
  methods: {
    emitRole() {
      this.$emit("input", this.selectedRole);
    },
  },
};
</script>

<style scoped>
.role-selector {
  margin: 10px 0;
}
</style>
