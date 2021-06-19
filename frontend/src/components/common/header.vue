<template>
  <b-navbar class="text-danger d-flex justify-content-between" variant="danger">
    <b-navbar-nav>
      <router-link :to="{name: 'dashboard'}" class="text-blue mx-2">
        Dashboard
      </router-link>
    </b-navbar-nav>
    <b-navbar-nav>
      <b-nav-item class="text-blue" @click="logOut">
        Log Out
      </b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  name: 'HeaderComponent',
  methods: {
    async logOut() {
      await this.$root.$bvToast.toast('You have been successfully logged out, please login to continue.', {
        title: 'Success Message',
        autoHideDelay: 6000,
        variant: 'success',
      });
      window.localStorage.removeItem('access_token');
      this.$router.push({ name: 'Login' });
    },
  },
};
</script>
<style lang="scss">

</style>
