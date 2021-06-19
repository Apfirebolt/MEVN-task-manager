<template>
  <div>
    <header-component />
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
      user: {},
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    async getUser() {
      const userData = await this.$http.get('users');
      this.user = userData;
    },
  },
};
</script>
