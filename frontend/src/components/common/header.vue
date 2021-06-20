<template>
  <b-navbar class="text-danger d-flex justify-content-between" variant="danger">
    <b-navbar-nav>
      <router-link :to="{name: 'dashboard'}" class="text-white mx-2">
        Welcome, {{ getFullName }}
      </router-link>
    </b-navbar-nav>
    <b-navbar-nav>
      <b-nav-item class="font-weight-bold" @click.prevent="goToProfileDashboard">
        Dashboard
      </b-nav-item>
      <b-nav-item class="font-weight-bold" @click.prevent="logOut">
        Log Out
      </b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  name: 'HeaderComponent',
  props: {
    userData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    getFullName() {
      return `${this.userData.first_name} ${this.userData.last_name}`;
    },
  },
  methods: {
    async logOut() {
      this.$root.$bvToast.toast('You have been successfully logged out, please login to continue.', {
        title: 'Success Message',
        autoHideDelay: 6000,
        variant: 'success',
      });
      window.localStorage.removeItem('access_token');
      this.$router.push({ name: 'Login' });
    },
    goToProfileDashboard() {
      this.$router.push({ name: 'profile_dashboard' });
    },
  },
};
</script>
