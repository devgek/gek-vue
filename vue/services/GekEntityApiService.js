/*global axios*/
const EntityApiService = {
  login(commit, credentials) {
    return axios
      .post("/api/login", credentials)
      .then(({ data }) => {
        console.log("login data:", data);
        commit("LOGGED_IN", data);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.token}`;
        })
        .catch((error) => {
          console.log("axios error login ApiService", error);
          return Promise.reject(error);
        });
  },
  logout(commit) {
    commit("LOGOUT");
  },
  getEntityOptions(commit, payload) {
    return axios
      .post("/api/optionlist" + payload.entityName)
      .then(({ data }) => {
        console.log("save option list", data);
        commit("SET_OPTION_LIST", {entityName: payload.entityName, optionList: data.EntityOptions});
      });
  },
  getEntities(commit, payload) {
    return axios
      .post("/api/entitylist" + payload.entityName)
      .then(({ data }) => {
        commit("SET_ENTITY_LIST", {entityName: payload.entityName, entityList: data.EntityObject});
      });
  },
  createEntity(dispatch, payload) {
    return axios
      .post("/api/entitynew" + payload.entityName, payload.entityObject)
      // eslint-disable-next-line no-unused-vars
      .then(({ data }) => {
        const message = {
          type: "success",
          i18n: "msg.entity.success.create",
          i18nArgs: {"entityDesc": payload.entityDesc}
        };
        dispatch("setMessage", message);
        dispatch("loadEntities", {entityName: payload.entityName});
      })
      // eslint-disable-next-line no-unused-vars
      .catch((error) => {
        const message = {
          type: "error",
          i18n: "msg.entity.error.create",
          i18nArgs: {"entityDesc": payload.entityDesc}
        };
        dispatch("setMessage", message);
      });
  },
  updateEntity(dispatch, payload) {
    return axios
      .post("/api/entityedit" + payload.entityName, payload.entityObject)
      // eslint-disable-next-line no-unused-vars
      .then(({ data }) => {
        const message = {
          type: "success",
          i18n: "msg.entity.success.update",
          i18nArgs: {"entityDesc": payload.entityDesc}
        };
        dispatch("setMessage", message);
        dispatch("loadEntities", {entityName: payload.entityName});
      })
      // eslint-disable-next-line no-unused-vars
      .catch((error) => {
        const message = {
          type: "error",
          i18n: "msg.entity.error.update",
          i18nArgs: {"entityDesc": payload.entityDesc}
        };
        dispatch("setMessage", message);
      });
  },
  deleteEntity(dispatch, payload) {
    return axios
      .post("/api/entitydelete" + payload.entityName + "/" + payload.entityObject.ID)
      // eslint-disable-next-line no-unused-vars
      .then(({ data }) => {
        const message = {
          type: "success",
          i18n: "msg.entity.success.delete",
          i18nArgs: {"entityDesc": payload.entityDesc}
        };
        dispatch("setMessage", message);
        dispatch("loadEntities", {entityName: payload.entityName});
      })
      // eslint-disable-next-line no-unused-vars
      .catch((error) => {
        const message = {
          type: "error",
          i18n: "msg.entity.error.delete",
          i18nArgs: {"entityDesc": payload.entityDesc}
        };
        dispatch("setMessage", message);
      });
  },
};

export {EntityApiService};