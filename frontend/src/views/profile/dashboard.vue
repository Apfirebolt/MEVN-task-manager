<template>
  <b-container class="container auth-form mx-auto p-3 my-3">
    <h3 class="heading my-3">
      Welcome to the dashboard page, create and manage tasks from here.
    </h3>
    <b-container class="p-0 text-center">
      <b-button pill variant="info" class="my-2 mr-2" @click.prevent="createTaskModal = true">
        Add Task
      </b-button>
      <b-button pill variant="success" class="my-2 mr-2" @click.prevent="navigateToProfile">
        Update Profile Settings
      </b-button>
    </b-container>
    <task-list-component v-if="tasks.length" :tasks="tasks" />
    <b-modal v-model="createTaskModal" hide-footer hide-header>
      <create-task-modal @createTask="createTask" @closeDeleteModal="createTaskModal = false" />
    </b-modal>
  </b-container>
</template>

<script>
import createTaskModal from '../../components/tasks/task-form.vue';
import TaskListComponent from '../../components/tasks/task-list.vue';

export default {
  name: 'DashboardPage',
  components: {
    createTaskModal,
    TaskListComponent,
  },
  data() {
    return {
      createTaskModal: false,
      tasks: [],
      total: 0,
    };
  },
  mounted() {
    this.getTasks();
  },
  methods: {
    async createTask(payload) {
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
    navigateToProfile() {
      this.$router.push({ name: 'profile_settings' });
    },
  },
};
</script>
