<template>
  <b-container class="container auth-form mx-auto p-3 my-3">
    <p>
      Profile Page, update settings from here
    </p>
  </b-container>
</template>

<script>
export default {
  name: 'ProfilePage',
  data() {
    return {
      profileData: null,
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
