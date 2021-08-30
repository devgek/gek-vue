import axios from "axios";
/*
  GekEntityApiService encapsulates API-calls to Entity-API-Backend using axios.
  You have to initialize GekEntityApiService with the API-BaseUrl. Logging API-Errors to console can be switched on/off.
 */
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
    return axios.post("/api/login", credentials);
  },
  getEntityOptions(store, payload) {
    return axios.post("/api/optionlist" + payload.entityName);
  },
  getEntities(store, payload) {
    return axios.post("/api/entitylist" + payload.entityName);
  },
  createEntity(store, payload) {
    return axios.post("/api/entitynew" + payload.entityName, payload.entityObject);
  },
  updateEntity(store, payload) {
    return axios.post("/api/entityedit" + payload.entityName, payload.entityObject);
  },
  deleteEntity(store, payload) {
    return axios.post("/api/entitydelete" + payload.entityName + "/" + payload.entityObject.ID);
  },
};

export { GekEntityApiService };
