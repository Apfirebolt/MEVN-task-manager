<template>
  <b-container class="container auth-form mx-auto p-3 my-3">
    <h3 class="heading my-3">
      UPDATE PROFILE
    </h3>
    <b-form @submit.prevent="updateProfile" @reset="onReset">
      <b-form-group
        label="Enter First Name:"
        label-for="first_name"
        description="Please Enter Your First Name."
      >
        <b-form-input
          id="first_name"
          v-model="data.first_name"
          type="text"
          placeholder="First Name"
        />
      </b-form-group>

      <b-form-group
        label="Enter Last Name:"
        label-for="last_name"
        description="Please Enter Your Last Name."
      >
        <b-form-input
          id="first_name"
          v-model="data.last_name"
          type="text"
          placeholder="Last Name"
        />
      </b-form-group>

      <b-form-group
        label="Enter Your Email:"
        label-for="email"
        description="Please Enter Your Email."
      >
        <b-form-input
          id="email"
          v-model="data.email"
          type="email"
          placeholder="Your Email"
        />
      </b-form-group>

      <p v-for="(eachError, index) in errors" :key="index" class="alert-danger p-2">
        {{ eachError }}
      </p>
      <b-button type="submit" variant="primary">
        Update Profile
      </b-button>
      <b-button type="reset" variant="danger" class="mx-2">
        Reset
      </b-button>
    </b-form>
  </b-container>
</template>

<script>

export default {
  name: 'UpdateProfileForm',
  props: {
    userData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      data: {
        first_name: '',
        last_name: '',
        email: '',
      },
      errors: [],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.data.first_name = this.userData.first_name;
      this.data.last_name = this.userData.last_name;
      this.data.email = this.userData.email;
    },
    async updateProfile() {
      // Name and description are required fields
      if (!this.data.first_name) {
        this.errors.push('First Name is required.');
      }
      if (!this.data.last_name) {
        this.errors.push('Last Name is required.');
      }
      if (!this.data.email) {
        this.errors.push('Email is required.');
      }
      if (this.errors.length === 0) {
        this.$emit('updateProfile', this.data);
      }
    },
    onReset() {
      this.data = {};
    },
  },
};
</script>
