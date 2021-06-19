<template>
  <b-container class="container auth-form mx-auto p-3 my-3">
    <p>
      Dashboard Page
    </p>
  </b-container>
</template>

<script>
export default {
  name: 'DashboardPage',
  data() {
    return {

    };
  },
  mounted() {
    this.getProfileData();
  },
  methods: {
    async getProfileData() {
      const response = await this.$http.get('users/profile');
      if (response) {
        console.log('Profile data ', response);
        this.profileData = response;
      }
    },
  },
};
</script>
