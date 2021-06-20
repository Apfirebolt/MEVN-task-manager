<template>
  <div>
    <header-component :user-data="profileData" />
    <router-view />
    <footer-component />
  </div>
</template>
<script>
import HeaderComponent from '../components/common/header.vue';
import FooterComponent from '../components/common/footer.vue';

export default {
  name: 'DashboardLayout',
  components: {
    HeaderComponent,
    FooterComponent,
  },
  data() {
    return {
      profileData: {},
    };
  },
  mounted() {
    this.getProfileData();
  },
  methods: {
    async getProfileData() {
      const response = await this.$http.get('users/profile');
      if (response) {
        this.profileData = response;
      }
    },
  },
};
</script>
