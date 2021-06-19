<template>
  <div id="app">
    <toast-component />
    <router-view />
  </div>
</template>

<script>
import ToastComponent from './components/common/toaster.vue';

export default {
  name: 'App',
  components: {
    ToastComponent,
  },
};
</script>
