<template>
  <b-container class="container auth-form mx-auto p-3 my-3">
    <h3 class="heading my-3">
      TASK LIST
    </h3>
    <div>
      <b-table striped hover :items="tasks" :fields="fields">
        <template #cell(index)="data">
          {{ data.index + 1 }}
        </template>
        <template #cell(dueDate)="row">
          {{ row.item.dueDate | filterDate }}
        </template>
        <template #cell(actions)="row" class="d-flex justify-content-center">
          <div class="d-flex justify-content-between">
            <b-button size="sm" class="mr-2 custom-width" @click.prevent="editTask(row.item)">
              Edit
            </b-button>
            <b-button size="sm" class="mr-2 custom-width" variant="danger" @click.prevent="deleteTask(row.item)">
              Delete
            </b-button>
          </div>
        </template>
      </b-table>
    </div>
  </b-container>
</template>

<script>
import dayjs from 'dayjs';

export default {
  name: 'TaskListComponent',
  filters: {
    filterDate(value) {
      return dayjs(value).format('DD/MM/YYYY');
    },
  },
  props: {
    tasks: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      fields: ['index', {
        key: 'name',
        sortable: true,
      }, 'status', 'priority', {
        key: 'dueDate',
        sortable: true,
      }, 'Actions'],
    };
  },
  methods: {
    async editTask(taskId) {
      this.$emit('editTask', taskId);
    },
    async deleteTask(taskId) {
      this.$emit('deleteTask', taskId);
    },
  },
};
</script>
<style>
.custom-width {
  width: 45%;
}
</style>
