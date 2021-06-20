<template>
  <b-container class="container auth-form mx-auto p-3 my-3">
    <h3 class="heading my-3">
      Welcome to the dashboard page, create and manage tasks from here.
    </h3>
    <b-container class="p-0 text-center">
      <b-button pill variant="info" class="my-2 mr-2" @click.prevent="addNewTask">
        Add Task
      </b-button>
      <b-button pill variant="success" class="my-2 mr-2" @click.prevent="navigateToProfile">
        Update Profile Settings
      </b-button>
    </b-container>
    <task-list-component v-if="tasks.length" :tasks="tasks" @editTask="selectTaskForEdit" @deleteTask="selectTaskForDelete" />
    <b-modal v-model="createTaskModal" hide-footer hide-header>
      <create-task-modal :task-object="selectedTask" @editTask="editTask" @createTask="createTask" @closeDeleteModal="createTaskModal = false" />
    </b-modal>
    <b-modal v-model="confirmModalOpened" hide-footer hide-header>
      <confirm-modal :message="confirmDeleteMessage" @onConfirmAction="deleteTask" @onCancelAction="confirmModalOpened = false" />
    </b-modal>
  </b-container>
</template>

<script>

import ConfirmModal from '../../components/common/confirm-modal.vue';
import createTaskModal from '../../components/tasks/task-form.vue';
import TaskListComponent from '../../components/tasks/task-list.vue';

export default {
  name: 'DashboardPage',
  components: {
    createTaskModal,
    TaskListComponent,
    ConfirmModal,
  },
  data() {
    return {
      createTaskModal: false,
      tasks: [],
      total: 0,
      confirmModalOpened: false,
      selectedTask: null,
      confirmDeleteMessage: '',
    };
  },
  mounted() {
    this.getTasks();
  },
  methods: {
    addNewTask() {
      this.selectedTask = null;
      this.createTaskModal = true;
    },
    async createTask(payload) {
      this.selectedTask = null;
      const newTask = await this.$http.post('tasks', payload);
      if (newTask) {
        await this.$root.$bvToast.toast('New task added successfully.', {
          title: 'Success Message',
          autoHideDelay: 6000,
          variant: 'success',
        });
        this.createTaskModal = false;
        await this.getTasks();
      }
    },
    async getTasks() {
      const taskResponse = await this.$http.get('tasks');
      if (taskResponse) {
        this.tasks = taskResponse.results;
        this.total = taskResponse.total;
      }
    },
    async editTask(payload) {
      const updatedTask = await this.$http.put(`tasks/${this.selectedTask._id}`, payload);
      if (updatedTask) {
        await this.$root.$bvToast.toast('Task updated successfully.', {
          title: 'Success Message',
          autoHideDelay: 6000,
          variant: 'success',
        });
        this.createTaskModal = false;
        await this.getTasks();
      }
    },
    async selectTaskForDelete(task) {
      this.selectedTask = task;
      this.confirmDeleteMessage = `Are you sure you want to delete the task with name '${this.selectedTask.name}' ?`;
      this.confirmModalOpened = true;
    },
    async selectTaskForEdit(task) {
      this.selectedTask = task;
      this.createTaskModal = true;
    },
    async deleteTask() {
      const taskId = this.selectedTask._id;
      const taskResponse = await this.$http.delete(`tasks/${taskId}`);
      if (taskResponse) {
        await this.$root.$bvToast.toast('Task deleted successfully.', {
          title: 'Success Message',
          autoHideDelay: 6000,
          variant: 'success',
        });
        this.confirmModalOpened = false;
        await this.getTasks();
      }
    },
    navigateToProfile() {
      this.$router.push({ name: 'profile_settings' });
    },
  },
};
</script>
