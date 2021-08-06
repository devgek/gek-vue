console.log("main.js");

import '../src/assets/css/gekvue.css'
import '../src/assets/js/gekvue.js'

import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

import myVuetify from './vuetify.js'
import myRouter from './router.js'
import {GekEntityStoreModule} from './gekEntityStoreModule.js'
import myI18n from './i18n.js'

import GekEntitiesPlugin from "../src/plugin/gekentities-vueplugin.js"
Vue.use(GekEntitiesPlugin, {caller: "main.js"});

window.onerror = function(message, source, line, column, error) {
  console.log("Error catched in browser window:", message, "source:", source, "line:", line, "theError:", error);
}
window.axios = axios
axios.defaults.baseURL = 'http://localhost:8080'

import MyApp from './GekApp.vue'

const myStoreOptions = {
  state() {
    return {
      player: "Tsitsipas",
    };
  },
};
Vue.use(Vuex);
const myStore = new Vuex.Store(myStoreOptions);

myStore.registerModule("es", GekEntityStoreModule);
console.log("after registerModule es");

// eslint-disable-next-line no-unused-vars
const myVueInstance = new Vue({
  computed: {
    ...Vuex.mapState({
      es: state => state.es,
    }),
    },
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
  beforeCreate() {
    console.log("myVueInstance beforeCreate");
  },
  created() {
    console.log("myVueInstance created");
    console.log("myPlugin is", Vue.myPlugin);
    console.log("gekEntityPlugin is ", this.$options.gekEntityPlugin);
    // this.$vuetify.dataTable.itemsPerPageText = "maxi";
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      this.$store.commit("LOGGED_IN", userData);
    }
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        console.log(
          "axios-response-interceptor:: api error: " + error.response.status + " " + error.response.data
        );
        // if (error.response.status === 401) {
        //   this.$store.dispatch("logout");
        // }
        return Promise.reject(error);
      }
    );
  },
  beforeMount() {
    console.log("myVueInstance beforeMount");
  },
  mounted() {
    console.log("myVueInstance mounted");
    console.log("thePlugin:", Vue.myPlugin);
  },
  errorCaptured(err,vm,info) {
    console.log(`errorCaptured: ${err.toString()}\ninfo: ${info} vm: ${vm}`); 
  }
}).$mount("#myApp");

console.log("myVueInstance after new", myVueInstance);