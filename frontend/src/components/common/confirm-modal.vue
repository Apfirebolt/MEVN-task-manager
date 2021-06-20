<template>
  <b-container class="container auth-form mx-auto p-3 my-3">
    <h3 class="heading my-3">
      CONFIRM
    </h3>
    <p class="font-weight-bold">
      {{ message }}
    </p>
    <b-row class="justify-content-between">
      <b-button variant="danger" class="mx-2" @click.prevent="cancelAction">
        Cancel
      </b-button>
      <b-button variant="primary" @click.prevent="onConfirm">
        Submit
      </b-button>
    </b-row>
  </b-container>
</template>

<script>

export default {
  name: 'ConfirmModal',
  props: {
    message: {
      type: String,
      required: false,
      default: '',
    },
  },
  methods: {
    async onConfirm() {
      this.$emit('onConfirmAction');
    },
    cancelAction() {
      this.$emit('onCancelAction');
    },
  },
};
</script>
