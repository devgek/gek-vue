console.log("main.js");

import '../src/assets/css/gekvue.css'
import '../src/assets/js/gekvue.js'

import Vue from 'vue'
import Vuex from 'vuex'

import myVuetify from './vuetify.js'
import {GekEntityRouter} from './gekEntityRouter.js'
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
// GekEntityStoreModule must be registered as Vuex module
myStore.registerModule("gekentities", GekEntityStoreModule);
console.log("after registerModule gekentities and player");

// a GekEntityStoreModel must be created for each Entity and set to Vue's reactivity system
import GekEntityStoreModel from "@/gekEntityStoreModel";
import newEntityObjectUser from "@/gekEntityStoreUser";
import newEntityObjectContact from "@/gekEntityStoreContact";
import newEntityObjectContactAddress from "@/gekEntityStoreContactAddress";

const userModel = new GekEntityStoreModel("User", newEntityObjectUser);
const contactModel = new GekEntityStoreModel("Contact", newEntityObjectContact);
const contactAddressModel = new GekEntityStoreModel("ContactAddress", newEntityObjectContactAddress, "Contact");
// new EntityModels must be set as property to be known by Vue's reactivity system
// 'gekentities' is the module path of Vuex module GekEntityStoreModule
Vue.set(myStore.state.gekentities.gekEntityModels, "User", userModel);
Vue.set(myStore.state.gekentities.gekEntityModels, "Contact", contactModel);
Vue.set(myStore.state.gekentities.gekEntityModels, "ContactAddress", contactAddressModel);

const apiBaseUrl = "http://localhost:8082";
const logConsole = true;
import {GekEntityService} from "@/services/GekEntityService";
GekEntityService.init(myStore, apiBaseUrl, logConsole);

// eslint-disable-next-line no-unused-vars
const myVueInstance = new Vue({
  computed: {
    },
  ...MyApp,
  store: myStore,
  router: GekEntityRouter,
  vuetify: myVuetify,
  i18n: myI18n,
  data: {
    maxi: "franzi",
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