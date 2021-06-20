<template>
  <b-container class="container auth-form mx-auto p-3 my-3">
    <h3 class="heading my-3">
      CREATE NEW TASK
    </h3>
    <b-form @submit.prevent="createTask" @reset="onReset">
      <b-row>
        <b-col>
          <b-form-group
            label="Task Status:"
            label-for="task_status"
          >
            <b-form-select
              id="task_status"
              v-model="task.status"
              :options="status_choices"
              placeholder="Choose Task Status"
            />
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            label="Task Priority:"
            label-for="task_priority"
          >
            <b-form-select
              id="task_priority"
              v-model="task.priority"
              :options="priority_choices"
              type="text"
              placeholder="Choose Task Priority"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-form-group
        label="Task Name:"
        label-for="task_name"
        description="Please give a name to the task."
      >
        <b-form-input
          id="task_name"
          v-model="task.name"
          type="text"
          placeholder="Enter Task Name"
        />
      </b-form-group>
      <b-form-group
        label="Task Description:"
        label-for="task_description"
        description="Please describe the task briefly."
      >
        <b-form-input
          id="task_description"
          v-model="task.description"
          type="text"
          placeholder="Enter Task Description"
        />
      </b-form-group>
      <b-form-group
        label="Due Date:"
        label-for="due_date"
        description="Please specify deadline for the task."
      >
        <b-form-input
          id="task_description"
          v-model="task.dueDate"
          type="date"
          placeholder="Enter Due Date"
        />
      </b-form-group>

      <p v-for="(eachError, index) in errors" :key="index" class="alert-danger p-2">
        {{ eachError }}
      </p>
      <b-button type="submit" variant="primary">
        Submit
      </b-button>
      <b-button type="reset" variant="danger" class="mx-2">
        Reset
      </b-button>
    </b-form>
  </b-container>
</template>

<script>

export default {
  name: 'CreateTaskForm',
  data() {
    return {
      task: {
        name: '',
        description: '',
        status: 'To Do',
        priority: 'Low',
        dueDate: '',
      },
      status_choices: ['To Do', 'Completed', 'In Progress', 'In Revision'],
      priority_choices: ['Low', 'Medium', 'High', 'Critical'],
      errors: [],
    };
  },
  methods: {
    async createTask() {
      // Name and description are required fields
      if (!this.task.name) {
        this.errors.push('Task Name is required.');
      }
      if (!this.task.description) {
        this.errors.push('Task Description is required.');
      }
      if (this.task.name && this.task.description) {
        this.$emit('createTask', this.task);
      }
    },
    onReset() {
      this.task = {};
    },
  },
};
</script>
