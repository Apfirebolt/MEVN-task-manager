<template>
  <div v-if="showMessage" class="container">
    <p>
      Toast Component
    </p>
  </div>
</template>
<script>
export default {
  name: 'ToastsDefault',
  data() {
    return {
      message: 'This message',
      variant: '',
      showMessage: false,
    };
  },
  mounted() {
    this.toastListener();
  },
  methods: {
    toastListener() {
      this.$bus.on('add_toast', (message) => {
        this.message = message.content;
        this.variant = message.variant ? message.variant : 'success';
        this.$bvToast.toast('Success message', {
          title: this.message,
          autoHideDelay: 4000,
          variant: this.variant,
        });
      });
    },
  },
};
</script>
