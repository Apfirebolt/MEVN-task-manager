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
    <b-modal v-model="createTaskModal" hide-footer hide-header>
      <create-task-modal @createTask="createTask" @closeDeleteModal="createTaskModal = false" />
    </b-modal>
  </b-container>
</template>

<script>
import createTaskModal from '../../components/tasks/task-form.vue';

export default {
  name: 'DashboardPage',
  components: {
    createTaskModal,
  },
  data() {
    return {
      createTaskModal: false,
    };
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
      }
    },
    navigateToProfile() {
      this.$router.push({ name: 'profile_settings' });
    },
  },
};
</script>
