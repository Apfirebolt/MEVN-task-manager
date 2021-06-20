<template>
  <b-container class="container auth-form mx-auto p-3 my-3">
    <h3 class="heading my-3">
      TASK LIST
    </h3>
  </b-container>
</template>

<script>

export default {
  name: 'TaskListComponent',
  data() {
    return {

    };
  },
  methods: {
    async createTask() {
      this.$emit('createTask');
    },
  },
};
</script>
