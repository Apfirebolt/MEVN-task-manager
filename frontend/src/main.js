import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import App from './App.vue';
import router from './router/index';
import axios from './plugins/interceptor';
import events from './plugins/events';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import '@/scss/main.scss';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.prototype.$http = axios;
Vue.prototype.$bus = events;
Vue.prototype.$auth = null;

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
