// eslint-disable-next-line no-unused-vars
/*global axios*/

const GekEntityStoreModule = {
  namespaced: false,
  state() {
    return {
      userData: null,
      message: null,
      navDrawer: true,
      gekEntityModels: {}
    };
  },
  mutations: {
    SET_MESSAGE(state, message) {
      state.message = message;
    },
    SET_NAV_DRAWER(state, drawer) {
      state.navDrawer = drawer;
    },
    SET_ENTITY_MODEL(state, payload) {
      state.gekEntityModels[payload.entityName] = payload.entityModel;
    },
    SET_ENTITY_NEW(state, payload) {
      state.gekEntityModels[payload.entityName].entityObject = state.gekEntityModels[payload.entityName].newEntityObjectFn();
      state.gekEntityModels[payload.entityName].editNew = true;
      state.gekEntityModels[payload.entityName].editDialog = true;
    },
    SET_ENTITY_NEW_EMBEDDED(state, payload) {
      state.gekEntityModels[payload.entityNameEmbedded].entityObject = state.gekEntityModels[payload.entityNameEmbedded].newEntityObjectFn();
      state.gekEntityModels[payload.entityNameEmbedded].entityObjectEmbedder = payload.entityObjectEmbedder;
      state.gekEntityModels[payload.entityNameEmbedded].editNew = true;
      state.gekEntityModels[payload.entityNameEmbedded].editDialog = true;
    },
    SET_ENTITY_EDIT(state, payload) {
      // create new object with JSON.parse
      state.gekEntityModels[payload.entityName].entityObject = JSON.parse(JSON.stringify(payload.entityObject));
      state.gekEntityModels[payload.entityName].editNew = false;
      state.gekEntityModels[payload.entityName].editDialog = true;
    },
    SET_ENTITY_EDIT_EMBEDDED(state, payload) {
      // create new object with JSON.parse
      state.gekEntityModels[payload.entityName].entityObject = JSON.parse(JSON.stringify(payload.entityObject));
      state.gekEntityModels[payload.entityName].entityObjectEmbedder = payload.entityObjectEmbedder;
      state.gekEntityModels[payload.entityName].editNew = false;
      state.gekEntityModels[payload.entityName].editDialog = true;
    },
    SET_ENTITY_DELETE(state, payload) {
      state.gekEntityModels[payload.entityName].entityObject = payload.entityObject;
      state.gekEntityModels[payload.entityName].editNew = false;
      state.gekEntityModels[payload.entityName].confirmDeleteDialog = true;
    },
    SET_ENTITY_DELETE_EMBEDDED(state, payload) {
      state.gekEntityModels[payload.entityName].entityObject = payload.entityObject;
      state.gekEntityModels[payload.entityName].editNew = false;
      state.gekEntityModels[payload.entityName].confirmDeleteDialog = true;
    },
    SET_ENTITY_LIST(state, payload) {
      state.gekEntityModels[payload.entityName].entityList = payload.entityList;
    },
    SET_OPTION_LIST(state, payload) {
      state.gekEntityModels[payload.entityName].optionList = payload.optionList;
    },
    SET_EDIT_DIALOG(state, payload) {
      state.gekEntityModels[payload.entityName].editDialog = payload.editDialog;
    },
    SET_CONFIRM_DELETE_DIALOG(state, payload) {
      state.gekEntityModels[payload.entityName].confirmDeleteDialog = payload.confirmDeleteDialog;
    },
    LOGGED_IN(state, userData) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${userData.token}`;
      localStorage.setItem("userData", JSON.stringify(userData));
      state.userData = userData;
    },
    // eslint-disable-next-line no-unused-vars
    LOGOUT(state) {
      localStorage.removeItem("userData");
    },
  },
  actions: {
  },
  getters: {
    isAdminUser(state) {
      return state.userData.admin;
    },
    getEntityListByEntityName: (state) => (entityName) => {
      if (state.gekEntityModels[entityName].entityList === null) {
        return []
      }
      else {
        return state.gekEntityModels[entityName].entityList;
      }
    },
    getOptionListByEntityName: (state) => (entityName) => {
        return state.gekEntityModels[entityName].optionList;
    },
    getEditEntityObjectByEntityName: (state) => (entityName) => {
      return state.gekEntityModels[entityName].entityObject;
    },
    getEmbedderObjectByEntityName: (state) => (entityName) => {
      return state.gekEntityModels[entityName].entityObjectEmbedder;
    },
    getEditNewByEntityName: (state) => (entityName) => {
      return state.gekEntityModels[entityName].editNew;
    },
    getConfirmDeleteDialogByEntityName: (state) => (entityName) => {
      return state.gekEntityModels[entityName].confirmDeleteDialog;
    },
    getEditDialogByEntityName: (state) => (entityName) => {
      return state.gekEntityModels[entityName].editDialog;
    },
    getUser(state) {
      if (state.userData) {
        return state.userData.name
      }
      return "notLoggedIn";
    },
    getMessage(state) {
      return state.message;
    },
    getNavDrawer(state) {
      return state.navDrawer;
    },
  },
};

export {GekEntityStoreModule};