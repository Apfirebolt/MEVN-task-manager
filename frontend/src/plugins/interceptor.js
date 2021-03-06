import axios from 'axios';
import Vue from 'vue';
import router from '../router';

let baseURL = process.env.VUE_APP_API_URL;
if (!baseURL) {
  baseURL = 'http://localhost:3000/api';
}

const httpClient = axios.create({ baseURL });
// Add a request interceptor
httpClient.interceptors.request.use(
  async (config) => {
    const newConfig = config;
    const token = window.localStorage.getItem('access_token');
    newConfig.headers.Authorization = `Bearer ${token}`;
    return newConfig;
  },
  (error) => {
    Promise.reject(error);
  },
);

// Add a response interceptor
httpClient.interceptors.response.use((response) => {
  if (response.data instanceof Blob) {
    return response.data;
  }
  return response.data || {};
},
(error) => {
  const Vm = new Vue({});
  if (error.response) {
    if (error.response.status === 401) {
      const unauthorizedErrorMsg = error.response.data.message ? error.response.data.message : 'Not authorized to perform this action';
      Vm.$bvToast.toast(unauthorizedErrorMsg, {
        title: 'Unauthorized',
        variant: 'danger',
      });
      // For 401 and 403 errors, redirect to login page
      router.push({ name: 'Login' });
    } else if (error.response.status === 403) {
      Vm.$bvToast.toast('You are not allowed to visit this content.', {
        title: 'Access not allowed',
        variant: 'danger',
      });
      router.push({ name: 'Login' });
    } else if (error.response.status === 409) {
      console.log('Resource exists ');
      Vm.$bvToast.toast(error.response.message, {
        title: 'Resource already exists',
        variant: 'danger',
      });
    }
    return Promise.reject(error);
  }
  Vm.$bvToast.toast('Unable to connect to the server', {
    title: 'Network error',
    variant: 'danger',
  });
  return Promise.reject(error);
});

export default httpClient;
