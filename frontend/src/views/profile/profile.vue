<template>
  <b-container v-if="profileData" class="container auth-form mx-auto p-3 my-3">
    <profile-detail-component :user-data="profileData" />
  </b-container>
</template>

<script>
import ProfileDetailComponent from '../../components/auth/profile-details.vue';

export default {
  name: 'ProfilePage',
  components: {
    ProfileDetailComponent,
  },
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
        this.profileData = response;
      }
    },
  },
};
</script>
