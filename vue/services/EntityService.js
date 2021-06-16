const EntityService = {
  getEntityOptions(commit, payload) {
    return axios
      .post("//localhost:8080/api/optionlist" + payload.entityName)
      .then(({ data }) => {
        commit("SET_OPTION_LIST", {entityName: payload.entityName, optionList: data.EntityOptions});
      });
  },
  getEntities(commit, payload) {
    return axios
      .post("//localhost:8080/api/entitylist" + payload.entityName)
      .then(({ data }) => {
        commit("SET_ENTITY_LIST", {entityName: payload.entityName, entityList: data.EntityObject});
      });
  },
  createEntity(dispatch, payload) {
    return axios
      .post("//localhost:8080/api/entitynew" + payload.entityName, payload.entityObject)
      .then(({ data }) => {
        const message = {
          type: "success",
          i18n: "msg.entity.success.create",
          i18nArgs: {"entityDesc": payload.entityDesc}
        };
        dispatch("setMessage", message);
        dispatch("loadEntities", {entityName: payload.entityName});
      })
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
      .post("//localhost:8080/api/entityedit" + payload.entityName, payload.entityObject)
      .then(({ data }) => {
        const message = {
          type: "success",
          i18n: "msg.entity.success.update",
          i18nArgs: {"entityDesc": payload.entityDesc}
        };
        dispatch("setMessage", message);
        dispatch("loadEntities", {entityName: payload.entityName});
      })
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
      .post("//localhost:8080/api/entitydelete" + payload.entityName + "/" + payload.entityObject.ID)
      .then(({ data }) => {
        const message = {
          type: "success",
          i18n: "msg.entity.success.delete",
          i18nArgs: {"entityDesc": payload.entityDesc}
        };
        dispatch("setMessage", message);
        dispatch("loadEntities", {entityName: payload.entityName});
      })
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
