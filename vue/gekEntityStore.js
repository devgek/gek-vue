// eslint-disable-next-line no-unused-vars
/*global axios*/

import Vue from 'vue'
import Vuex from 'vuex'
import {EntityApiService} from './services/GekEntityApiService.js'
import EntityObject from './gekEntityObject.js'
import newEntityObjectUser from './gekEntityStoreUser.js'
import newEntityObjectContact from './gekEntityStoreContact.js'
import newEntityObjectContactAddress from './gekEntityStoreContactAddress.js'

Vue.use(Vuex)

var GekEntityStore = new Vuex.Store({
  state() {
    return {
      userData: null,
      message: null,
      navDrawer: true,
      gekEntityObjects: {"User": new EntityObject("User", newEntityObjectUser, this), "Contact": new EntityObject("Contact", newEntityObjectContact, this), "ContactAddress": new EntityObject("ContactAddress", newEntityObjectContactAddress, this)}
    };
  },
  mutations: {
    SET_MESSAGE(state, message) {
      state.message = message;
    },
    SET_ENTITY_NEW(state, payload) {
      state.gekEntityObjects[payload.entityName].entityObject = state.gekEntityObjects[payload.entityName].newEntityObjectFn();
      state.gekEntityObjects[payload.entityName].editNew = true;
      state.gekEntityObjects[payload.entityName].editDialog = true;
    },
    SET_ENTITY_EDIT(state, payload) {
      // create new object with JSON.parse
      state.gekEntityObjects[payload.entityName].entityObject = JSON.parse(JSON.stringify(payload.entityObject));
      state.gekEntityObjects[payload.entityName].editNew = false;
      state.gekEntityObjects[payload.entityName].editDialog = true;
    },
    SET_ENTITY_DELETE(state, payload) {
      state.gekEntityObjects[payload.entityName].entityObject = payload.entityObject;
      state.gekEntityObjects[payload.entityName].editNew = false;
      state.gekEntityObjects[payload.entityName].confirmDeleteDialog = true;
    },
    SET_ENTITY_LIST(state, payload) {
      state.gekEntityObjects[payload.entityName].entityList = payload.entityList;
    },
    SET_OPTION_LIST(state, payload) {
      state.gekEntityObjects[payload.entityName].optionList = payload.optionList;
    },
    SET_EDIT_DIALOG(state, payload) {
      state.gekEntityObjects[payload.entityName].editDialog = payload.editDialog;
    },
    SET_CONFIRM_DELETE_DIALOG(state, payload) {
      state.gekEntityObjects[payload.entityName].confirmDeleteDialog = payload.confirmDeleteDialog;
    },
    LOGGED_IN(state, userData) {
      localStorage.setItem("userData", JSON.stringify(userData));
      state.userData = userData;
    },
    // eslint-disable-next-line no-unused-vars
    LOGOUT(state) {
      localStorage.removeItem("userData");
    },
  },
  actions: {
    setMessage({ commit }, message) {
      commit("SET_MESSAGE", message);
    },
    login({ commit }, credentials) {
      EntityApiService.login(commit, credentials);
    },
    logout({ commit }) {
      EntityApiService.logout(commit);
    },
    loadEntities({ commit }, payload) {
      EntityApiService.getEntities(commit, payload);
    },
    loadEntityOptions({ commit }, payload) {
      console.log("loadEntityOptions:" + payload.entityName);
      EntityApiService.getEntityOptions(commit, payload);
    },
    saveEntity({ dispatch, getters }, payload) {
      payload.entityObject = getters.getEditEntityObjectByEntityName(payload.entityName);
      if (getters.getEditNewByEntityName(payload.entityName)) {
        EntityApiService.createEntity(dispatch, payload);
      }
      else {
        EntityApiService.updateEntity(dispatch, payload);
      }
    },
    deleteEntity({ dispatch, getters }, payload) {
      payload.entityObject = getters.getEditEntityObjectByEntityName(payload.entityName);
      EntityApiService.deleteEntity(dispatch, payload);
    }
  },
  getters: {
    isAdminUser(state) {
      return state.userData.admin;
    },
    getEntityListByEntityName: (state) => (entityName) => {
      if (state.gekEntityObjects[entityName].entityList === null) {
        return []
      }
      else {
        return state.gekEntityObjects[entityName].entityList;
      }
    },
    getOptionListByEntityName: (state) => (entityName) => {
        return state.gekEntityObjects[entityName].optionList;
    },
    getEditEntityObjectByEntityName: (state) => (entityName) => {
      return state.gekEntityObjects[entityName].entityObject;
    },
    getEditNewByEntityName: (state) => (entityName) => {
      return state.gekEntityObjects[entityName].editNew;
    },
    getConfirmDeleteDialogByEntityName: (state) => (entityName) => {
      return state.gekEntityObjects[entityName].confirmDeleteDialog;
    },
    getEditDialogByEntityName: (state) => (entityName) => {
      return state.gekEntityObjects[entityName].editDialog;
    },
    getUser(state) {
      if (state.userData) {
        return state.userData.name
      }
      return "notLoggedIn";
    }
  },
});

export default GekEntityStore;