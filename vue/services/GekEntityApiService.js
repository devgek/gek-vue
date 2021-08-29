import axios from "axios";

const GekEntityApiService = {
  init(apiBaseUrl, logConsole) {
    window.axios = axios;
    axios.defaults.baseURL = apiBaseUrl;

    if (logConsole) {
      axios.interceptors.response.use(
        (response) => response,
        (error) => {
          console.log("axios-response-interceptor:: api error catched:");
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          return Promise.reject(error);
        }
      );
    }
  },
  login(store, credentials) {
    return axios
      .post("/api/login", credentials)
      .then(({ data }) => {
        store.commit("LOGGED_IN", data);
      });
  },
  logout(store) {
    store.commit("LOGOUT");
  },
  getEntityOptions(store, payload) {
    return axios
      .post("/api/optionlist" + payload.entityName)
      .then(({ data }) => {
        store.commit("SET_OPTION_LIST", {
          entityName: payload.entityName,
          optionList: data.EntityOptions,
        });
      });
  },
  getEntities(store, payload) {
    return axios
      .post("/api/entitylist" + payload.entityName)
      .then(({ data }) => {
        store.commit("SET_ENTITY_LIST", {
          entityName: payload.entityName,
          entityList: data.EntityObject,
        });
      });
  },
  createEntity(store, payload) {
    return (
      axios
        .post("/api/entitynew" + payload.entityName, payload.entityObject)
        // eslint-disable-next-line no-unused-vars
        .then(({ data }) => {
          const message = {
            type: "success",
            i18n: "msg.entity.success.create",
            i18nArgs: { entityDesc: payload.entityDesc },
          };
          store.commit("SET_MESSAGE", message);
          this.getEntities(store, { entityName: payload.entityName });
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          const message = {
            type: "error",
            i18n: "msg.entity.error.create",
            i18nArgs: { entityDesc: payload.entityDesc },
          };
          store.commit("SET_MESSAGE", message);
        })
    );
  },
  updateEntity(store, payload) {
    return (
      axios
        .post("/api/entityedit" + payload.entityName, payload.entityObject)
        // eslint-disable-next-line no-unused-vars
        .then(({ data }) => {
          const message = {
            type: "success",
            i18n: "msg.entity.success.update",
            i18nArgs: { entityDesc: payload.entityDesc },
          };
          store.commit("SET_MESSAGE", message);
          this.getEntities(store, { entityName: payload.entityName });
        })
        // eslint-disable-next-line no-unused-vars
        .catch(({ error }) => {
          const message = {
            type: "error",
            i18n: "msg.entity.error.update",
            i18nArgs: { entityDesc: payload.entityDesc },
          };
          store.commit("SET_MESSAGE", message);
        })
    );
  },
  deleteEntity(store, payload) {
    return (
      axios
        .post(
          "/api/entitydelete" +
            payload.entityName +
            "/" +
            payload.entityObject.ID
        )
        // eslint-disable-next-line no-unused-vars
        .then(({ data }) => {
          const message = {
            type: "success",
            i18n: "msg.entity.success.delete",
            i18nArgs: { entityDesc: payload.entityDesc },
          };
          store.commit("SET_MESSAGE", message);
          this.getEntities(store, { entityName: payload.entityName });
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          const message = {
            type: "error",
            i18n: "msg.entity.error.delete",
            i18nArgs: { entityDesc: payload.entityDesc },
          };
          store.commit("SET_MESSAGE", message);
        })
    );
  },
};

export { GekEntityApiService };
