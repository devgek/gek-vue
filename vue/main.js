console.log("main.js");

import '../src/assets/css/gekvue.css'
import '../src/assets/js/gekvue.js'

import Vue from 'vue'

import axios from 'axios'

import myVuetify from './vuetify.js'
import myRouter from './router.js'
import myStore from './store.js'
import myI18n from './i18n.js'

import GekEntitiesPlugin from "../src/plugin/gekentities-vue.js"
Vue.use(GekEntitiesPlugin);

window.onerror = function(message, source, line, column, error) {
  console.log("Error catched:", message, "source:", source, "line:", line, "theError:", error);
}
window.axios = axios
axios.defaults.baseURL = 'http://localhost:8080'

import MyApp from './GekApp.vue'

// eslint-disable-next-line no-unused-vars
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
  render(h) {
    return h(MyApp);
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
          "axios-response-interceptor:: api error: " + error.response.status + " " + error.response.data
        );
        if (error.response.status === 401) {
          this.$store.dispatch("logout");
        }
        return Promise.reject(error);
      }
    );
  },
  beforeMount() {
    console.log("myVueInstance beforeMount");
  },
  mounted() {
    console.log("myVueInstance mounted");
    console.log("thePlugin:", this.$store.state.myPlugin);
  },
  errorCaptured(err,vm,info) {
    console.log(`errorCaptured: ${err.toString()}\ninfo: ${info}`); 
  }
}).$mount("#myApp");
