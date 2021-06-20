<template>
  <b-container v-if="profileData" class="container auth-form mx-auto p-3 my-3">
    <change-profile-form :user-data="profileData" @updateProfile="updateProfile" />
    <change-password-form @updatePassword="updatePassword" />
  </b-container>
</template>

<script>
import ChangePasswordForm from '../../components/auth/update-password.vue';
import ChangeProfileForm from '../../components/auth/update-profile.vue';

export default {
  name: 'ProfileSettingsPage',
  components: {
    ChangePasswordForm,
    ChangeProfileForm,
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
    async updatePassword(payload) {
      const response = await this.$http.post('users/update-password', payload);
      if (response) {
        this.profileData = response;
        await this.$root.$bvToast.toast('Password successfully changed.', {
          title: 'Success Message',
          autoHideDelay: 6000,
          variant: 'success',
        });
      }
    },
    async updateProfile(payload) {
      const response = await this.$http.post('users/settings', payload);
      if (response) {
        await this.$root.$bvToast.toast('Profile data successfully updated.', {
          title: 'Success Message',
          autoHideDelay: 6000,
          variant: 'success',
        });
      }
    },
  },
};
</script>
