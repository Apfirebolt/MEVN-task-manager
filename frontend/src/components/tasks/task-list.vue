<template>
  <b-container class="container auth-form mx-auto p-3 my-3">
    <h3 class="heading my-3">
      TASK LIST
    </h3>
    <div>
      <b-table striped hover :items="tasks" :fields="fields" />
    </div>
  </b-container>
</template>

<script>

export default {
  name: 'TaskListComponent',
  props: {
    tasks: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      fields: ['index', 'name', 'description', 'status', 'priority', 'dueDate', 'Actions'],
    };
  },
  methods: {
    async editTask() {
      this.$emit('editTask');
    },
    async deleteTask() {
      this.$emit('deleteTask');
    },
  },
};
</script>
