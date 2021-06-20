<template>
  <b-container class="container auth-form mx-auto p-3 my-3">
    <h3 class="heading my-3">
      UPDATE PASSWORD
    </h3>
    <b-form @submit.prevent="updatePassword" @reset="onReset">
      <b-form-group
        label="Type Your New Password:"
        label-for="password"
        description="Please choose a strong password."
      >
        <b-form-input
          id="password"
          v-model="data.password"
          type="password"
          placeholder="Enter Your Password"
        />
      </b-form-group>
      <b-form-group
        label="Confirm Your New Password:"
        label-for="confirm_password"
        description="Please type the same password again."
      >
        <b-form-input
          id="confirm_password"
          v-model="data.confirm_password"
          type="password"
          placeholder="Confirm Your Password"
        />
      </b-form-group>

      <p v-for="(eachError, index) in errors" :key="index" class="alert-danger p-2">
        {{ eachError }}
      </p>
      <b-button type="submit" variant="primary">
        Update Password
      </b-button>
      <b-button type="reset" variant="danger" class="mx-2">
        Reset
      </b-button>
    </b-form>
  </b-container>
</template>

<script>

export default {
  name: 'ChangePasswordForm',
  data() {
    return {
      data: {
        password: '',
        confirm_password: '',
      },
      errors: [],
    };
  },
  methods: {
    async updatePassword() {
      // Name and description are required fields
      if (!this.data.password) {
        this.errors.push('Password is required.');
      }
      if (!this.data.confirm_password) {
        this.errors.push('Confirm Password is required.');
      }
      if (this.data.confirm_password && this.data.password && this.data.password !== this.data.confirm_password) {
        this.errors.push('Password and Confirm password must be equal.');
      }
      if (this.errors.length === 0) {
        this.$emit('updatePassword', this.data);
      }
    },
    onReset() {
      this.data = {};
    },
  },
};
</script>
