<template>
  <b-container class="container auth-form mx-auto p-3 my-3">
    <b-row>
      <b-col>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Sit quibusdam quo nobis facilis odio vitae ex doloremque nemo sint iure.
        </p>
      </b-col>
      <b-col class="bg-white shadow m-3 p-3">
        <h3 class="text-center my-4">
          REGISTER
        </h3>
        <b-form v-if="show" @submit.prevent="onSubmit" @reset="onReset">
          <b-row>
            <b-col>
              <b-form-group
                label="Enter Your First Name:"
                label-for="first_name"
              >
                <b-form-input
                  id="first_name"
                  v-model="form.first_name"
                  type="text"
                  placeholder="Enter Your First Name"
                />
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                label="Enter Your Last Name:"
                label-for="last_name"
              >
                <b-form-input
                  id="last_name"
                  v-model="form.last_name"
                  type="text"
                  placeholder="Enter Your Last Name"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <b-form-group
            label="Email address:"
            label-for="email"
            description="We'll never share your email with anyone else."
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
          <b-form-group
            label="Confirm Password"
            label-for="confirm_password"
          >
            <b-form-input
              id="confirm_password"
              v-model="form.confirm_password"
              type="password"
              placeholder="Please Confirm Your Password"
            />
          </b-form-group>
          <p v-for="(eachError, index) in errors" :key="index" class="alert-danger p-2">
            {{ eachError }}
          </p>
          <b-button type="submit" variant="primary">
            Submit
          </b-button>
          <b-button type="reset" variant="danger" class="mx-2">
            Reset
          </b-button>
          <router-link :to="{ name: 'Login'}" tag="p" class="link-tag">
            Already a member ? Please login here!
          </router-link>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'RegisterPage',
  data() {
    return {
      form: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: '',
      },
      errors: [],
      show: true,
    };
  },
  methods: {
    async onSubmit() {
      if (this.form.first_name && this.form.last_name
          && this.form.email && this.form.password && this.form.confirm_password
          && this.form.password === this.form.confirm_password) {
        this.form.confirm_password = '';
        const newUser = await this.$http.post('users/signup', this.form);
        if (newUser) {
          this.$router.push({ name: 'Login' });
          this.$bvToast.toast('You have been successfully registered, please login to continue.', {
            title: 'Success Message',
            autoHideDelay: 6000,
            variant: 'success',
          });
        }
      }
      this.errors = [];

      if (!this.form.first_name) {
        this.errors.push('First name is required.');
      }
      if (!this.form.last_name) {
        this.errors.push('Last name is required.');
      }
      if (!this.form.email) {
        this.errors.push('Email is required.');
      }
      if (!this.form.password) {
        this.errors.push('Password is required.');
      }
      if (!this.form.confirm_password) {
        this.errors.push('Password confirmation is required.');
      }
      if (this.form.password !== this.form.confirm_password) {
        this.errors.push('Password and confirm password must match.');
      }
      return false;
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.email = '';
      this.form.first_name = '';
      this.form.last_name = '';
      this.form.password = '';
      this.form.confirm_password = '';
      this.errors = [];
    },
  },
};
</script>
