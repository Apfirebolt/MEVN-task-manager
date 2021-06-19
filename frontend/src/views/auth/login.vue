<template>
  <b-container class="container auth-form mx-auto p-3 my-3">
    <b-row>
      <b-col>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium, mollitia. Facere rem dolor placeat assumenda sed. Cum quos natus voluptatem.
        </p>
      </b-col>
      <b-col class="bg-white shadow m-3 p-3">
        <h3 class="text-center my-4">
          LOGIN
        </h3>
        <b-form @submit.prevent="onSubmit" @reset="onReset">
          <b-form-group
            label="Email address:"
            label-for="email"
          >
            <b-form-input
              id="email"
              v-model="form.email"
              type="email"
              placeholder="Enter email"
            />
          </b-form-group>
          <b-form-group
            label="Password"
            label-for="password"
          >
            <b-form-input
              id="password"
              v-model="form.password"
              type="password"
              placeholder="Enter Password"
            />
          </b-form-group>
          <p v-for="(eachError, index) in errors" :key="index" class="alert-danger p-2">
            {{ eachError }}
          </p>
          <b-button type="submit" variant="primary" class="m-2">
            Submit
          </b-button>
          <b-button type="reset" variant="danger" class="m-2">
            Reset
          </b-button>
          <router-link :to="{ name: 'Register'}" tag="p" class="link-tag">
            Not a member yet ? Please sign up here!
          </router-link>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      errors: [],
    };
  },
  mounted() {
    this.getResponse();
  },
  methods: {
    async getResponse() {
      const response = await this.$http.get('users');
      if (response) {
        console.log('Response ', response);
      }
    },
    async onSubmit() {
      if (this.form.email && this.form.password) {
        const loginResponse = await this.$http.post('users/signin', this.form);
        if (loginResponse) {
          window.localStorage.setItem('access_token', loginResponse.token);
          await this.$root.$bvToast.toast('Login successful, you would be directed to dashboard.', {
            title: 'Success Message',
            autoHideDelay: 6000,
            variant: 'success',
          });
          this.$router.push({ name: 'dashboard' });
        }
      }
      if (!this.form.email) {
        this.errors.push('Email is required.');
      }
      if (!this.form.password) {
        this.errors.push('Password is required.');
      }
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.email = '';
      this.form.password = '';
    },
  },
};
</script>
