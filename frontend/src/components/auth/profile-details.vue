<template>
  <b-card
    title="Your Profile"
    tag="article"
    style="max-width: 20rem;"
    class="mb-2"
  >
    <b-card-text>
      <p>
        First Name - <span class="font-weight-bold">{{ userData.first_name }}</span>
      </p>
      <p>
        Last Name - <span class="font-weight-bold">{{ userData.last_name }}</span>
      </p>
      <p>
        Email - <span class="font-weight-bold">{{ userData.email }}</span>
      </p>
    </b-card-text>

    <b-button variant="primary" @click.prevent="goToSettings">
      Update Profile
    </b-button>
  </b-card>
</template>

<script>

export default {
  name: 'ProfileDetails',
  props: {
    userData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    goToSettings() {
      this.$router.push({ name: 'account_settings' });
    },
  },
};
</script>
