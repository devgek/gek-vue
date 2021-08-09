import axios from "axios";

const GekEntityApiService = {
  init(apiBaseUrl, logConsole) {
    window.axios = axios;
    axios.defaults.baseURL = apiBaseUrl;

    if (logConsole) {
      axios.interceptors.response.use(
        (response) => response,
        (error) => {
          console.log("axios-response-interceptor:: api error: ", error, error.toJSON());
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
          console.log("error config:", error.config);
          // console.log("axios-response-interceptor:: api error: " + error.response.status + " " + error.response.data);
          // if (error.response.status === 401) {
          //   this.$store.dispatch("logout");
          // }
          return Promise.reject(error);
        }
      );
    }
  },
  login(commit, credentials) {
    return axios
      .post("/api/login", credentials)
      .then(({ data }) => {
        console.log("login data:", data);
        commit("LOGGED_IN", data);
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
        commit("SET_OPTION_LIST", {
          entityName: payload.entityName,
          optionList: data.EntityOptions,
        });
      });
  },
  getEntities(commit, payload) {
    return axios
      .post("/api/entitylist" + payload.entityName)
      .then(({ data }) => {
        commit("SET_ENTITY_LIST", {
          entityName: payload.entityName,
          entityList: data.EntityObject,
        });
      });
  },
  createEntity(dispatch, payload) {
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
          dispatch("setMessage", message);
          dispatch("loadEntities", { entityName: payload.entityName });
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          console.log("error in createEntity", error);
          const message = {
            type: "error",
            i18n: "msg.entity.error.create",
            i18nArgs: { entityDesc: payload.entityDesc },
          };
          dispatch("setMessage", message);
        })
    );
  },
  updateEntity(dispatch, payload) {
    console.log("before axios post updateEntity");
    return (
      axios
        .post("/api/entityedit" + payload.entityName, payload.entityObject)
        // eslint-disable-next-line no-unused-vars
        .then(({ data }) => {
          console.log("then in updateEntity", data);
          const message = {
            type: "success",
            i18n: "msg.entity.success.update",
            i18nArgs: { entityDesc: payload.entityDesc },
          };
          console.log("before setMessage in updateEntity");
          dispatch("setMessage", message);
          console.log("before loadEntities in updateEntity");
          dispatch("loadEntities", { entityName: payload.entityName });
        })
        // eslint-disable-next-line no-unused-vars
        .catch(({ error }) => {
          console.log("error in updateEntity", error);
          const message = {
            type: "error",
            i18n: "msg.entity.error.update",
            i18nArgs: { entityDesc: payload.entityDesc },
          };
          dispatch("setMessage", message);
        })
    );
  },
  deleteEntity(dispatch, payload) {
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
          dispatch("setMessage", message);
          dispatch("loadEntities", { entityName: payload.entityName });
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          const message = {
            type: "error",
            i18n: "msg.entity.error.delete",
            i18nArgs: { entityDesc: payload.entityDesc },
          };
          dispatch("setMessage", message);
        })
    );
  },
};

export { GekEntityApiService };
