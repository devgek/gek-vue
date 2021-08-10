console.log("main.js");

import '../src/assets/css/gekvue.css'
import '../src/assets/js/gekvue.js'

import Vue from 'vue'
import Vuex from 'vuex'

import myVuetify from './vuetify.js'
import myRouter from './router.js'
import {GekEntityStoreModule} from './gekEntityStoreModule.js'
import myI18n from './i18n.js'

import GekEntitiesPlugin from "../src/plugin/gekentities-vueplugin.js"
Vue.use(GekEntitiesPlugin, {caller: "main.js"});

window.onerror = function(message, source, line, column, error) {
  console.log("Error catched in browser window:", message, "source:", source, "line:", line, "theError:", error);
}

import MyApp from './GekApp.vue'

import {playerModule} from './modules/player/playerModule.js'

const myStoreOptions = {
  state() {
    return {
      myXX: "Mister XX",
    };
  },
};
Vue.use(Vuex);
const myStore = new Vuex.Store(myStoreOptions);

myStore.registerModule("player", playerModule);
myStore.registerModule("gekentities", GekEntityStoreModule);
console.log("after registerModule gekentities and player");

// eslint-disable-next-line no-unused-vars
const myVueInstance = new Vue({
  computed: {
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
  created() {
    console.log("myVueInstance created");
    console.log("myPlugin is", Vue.myPlugin);
    console.log("gekEntityPlugin is ", this.$options.gekEntityPlugin);
    // this.$vuetify.dataTable.itemsPerPageText = "maxi";
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      console.log("userData found for logged_in", userData);
      this.$store.commit("LOGGED_IN", userData);
    }
  },
  errorCaptured(err,vm,info) {
    console.log(`errorCaptured: ${err.toString()}\ninfo: ${info} vm: ${vm}`); 
  }
}).$mount("#myApp");

console.log("myVueRootInstance after new", myVueInstance);