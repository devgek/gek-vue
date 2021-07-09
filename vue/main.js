import '../src/assets/css/gkwebapp.css'
import '../src/assets/js/gkwebapp.js'

import Vue from 'vue'
import axios from 'axios'

import myRouter from './router.js'
import myStore from './store.js'
import myVuetify from './vuetify.js'
import myI18n from './i18n.js'

window.axios = axios
axios.defaults.baseURL = 'http://localhost:8080'

import MyApp from './gekApp.vue'

const myVueInstance = new Vue({
  ...MyApp,
  store: myStore,
  router: myRouter,
  vuetify: myVuetify,
  i18n: myI18n,
  data: {
    user: "",
    token: "",
    isAdmin: false,
  },
  created() {
    console.log("myVueInstance created");
    // this.$vuetify.dataTable.itemsPerPageText = "maxi";
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      this.$store.commit("SET_USER_DATA", userData);
    }
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        console.log(
          "axios error: " + error.response.status + error.response.data
        );
        if (error.response.status === 401) {
          this.$store.dispatch("logout");
        }
        return Promise.reject(error);
      }
    );
  },
}).$mount("#myApp");
