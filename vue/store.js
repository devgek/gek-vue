import Vue from 'vue'
import Vuex from 'vuex'
import './services/gekEntityService.js'
import EntityStore from './gekEntityStore.js'
import newEntityObjectUser from './gekEntityStoreUser.js'
import newEntityObjectContact from './gekEntityStoreContact.js'
import newEntityObjectContactAddress from './gekEntityStoreContactAddress.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state() {
    return {
      userData: null,
      message: null,
      navDrawer: true,
      entityStores: {"User": new EntityStore("User", newEntityObjectUser, this), "Contact": new EntityStore("Contact", newEntityObjectContact, this), "ContactAddress": new EntityStore("ContactAddress", newEntityObjectContactAddress, this)}
    };
  },
  mutations: {
    SET_MESSAGE(state, message) {
      state.message = message;
    },
    SET_ENTITY_NEW(state, payload) {
      state.entityStores[payload.entityName].entityObject = state.entityStores[payload.entityName].newEntityObjectFn();
      state.entityStores[payload.entityName].editNew = true;
      state.entityStores[payload.entityName].editDialog = true;
    },
    SET_ENTITY_EDIT(state, payload) {
      // create new object with JSON.parse
      state.entityStores[payload.entityName].entityObject = JSON.parse(JSON.stringify(payload.entityObject));
      state.entityStores[payload.entityName].editNew = false;
      state.entityStores[payload.entityName].editDialog = true;
    },
    SET_ENTITY_DELETE(state, payload) {
      state.entityStores[payload.entityName].entityObject = payload.entityObject;
      state.entityStores[payload.entityName].editNew = false;
      state.entityStores[payload.entityName].confirmDeleteDialog = true;
    },
    SET_ENTITY_LIST(state, payload) {
      state.entityStores[payload.entityName].entityList = payload.entityList;
    },
    SET_OPTION_LIST(state, payload) {
      state.entityStores[payload.entityName].optionList = payload.optionList;
    },
    SET_EDIT_DIALOG(state, payload) {
      state.entityStores[payload.entityName].editDialog = payload.editDialog;
    },
    SET_CONFIRM_DELETE_DIALOG(state, payload) {
      state.entityStores[payload.entityName].confirmDeleteDialog = payload.confirmDeleteDialog;
    },
    SET_USER_DATA(state, userData) {
      localStorage.setItem("userData", JSON.stringify(userData));
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${userData.token}`;
      state.userData = userData;
    },
    LOGOUT(state) {
      localStorage.removeItem("userData");
    },
  },
  actions: {
    setMessage({ commit }, message) {
      commit("SET_MESSAGE", message);
    },
    login({ commit }, credentials) {
      return axios
        .post("//localhost:8080/api/login", credentials)
        .then(({ data }) => {
          commit("SET_USER_DATA", data);
        });
    },
    logout({ commit }) {
      commit("LOGOUT");
    },
    loadEntities({ commit }, payload) {
      EntityService.getEntities(commit, payload);
    },
    loadEntityOptions({ commit }, payload) {
      console.log("loadEntityOptions:" + payload.entityName);
      EntityService.getEntityOptions(commit, payload);
    },
    saveEntity({ dispatch, getters }, payload) {
      payload.entityObject = getters.getEditEntityObjectByEntityName(payload.entityName);
      if (getters.getEditNewByEntityName(payload.entityName)) {
        EntityService.createEntity(dispatch, payload);
      }
      else {
        EntityService.updateEntity(dispatch, payload);
      }
    },
    deleteEntity({ dispatch, getters }, payload) {
      payload.entityObject = getters.getEditEntityObjectByEntityName(payload.entityName);
      EntityService.deleteEntity(dispatch, payload);
    }
  },
  getters: {
    isAdminUser(state) {
      return state.userData.admin;
    },
    getEntityListByEntityName: (state) => (entityName) => {
      if (state.entityStores[entityName].entityList === null) {
        return []
      }
      else {
        return state.entityStores[entityName].entityList;
      }
    },
    getOptionListByEntityName: (state) => (entityName) => {
        return state.entityStores[entityName].optionList;
    },
    getEditEntityObjectByEntityName: (state) => (entityName) => {
      return state.entityStores[entityName].entityObject;
    },
    getEditNewByEntityName: (state) => (entityName) => {
      return state.entityStores[entityName].editNew;
    },
    getConfirmDeleteDialogByEntityName: (state) => (entityName) => {
      return state.entityStores[entityName].confirmDeleteDialog;
    },
    getEditDialogByEntityName: (state) => (entityName) => {
      return state.entityStores[entityName].editDialog;
    },
    getUser(state) {
      return state.userData.name;
    }
  },
});
