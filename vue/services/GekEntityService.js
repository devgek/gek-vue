import {GekEntityApiService} from "./GekEntityApiService.js";

// GekEntityService contains the business logic of GekEntity module and must be initialized with a reference tu Vuex-store
// and the API-BaseUrl.
const GekEntityService = {
    theStore: null,
    init(store, apiBaseUrl, logConsole) {
        this.theStore = store;
        return GekEntityApiService.init(apiBaseUrl, logConsole)
    },
    login(credentials) {
        return GekEntityApiService.login(this.theStore, credentials)
            .then(({ data }) => {
                this.theStore.commit("LOGGED_IN", data);
            });
    },
    logout() {
        return this.theStore.commit("LOGOUT");
    },
    loadEntities(payload) {
        return GekEntityApiService.getEntities(this.theStore, payload)
            .then(({ data }) => {
                this.theStore.commit("SET_ENTITY_LIST", {entityName: payload.entityName, entityList: data.data});
        })
            .catch(({ error}) => {
                console.log("GekEntityServe::loadEntities::Error:", error);
            });
    },
    loadEntityOptions(payload) {
        return GekEntityApiService.getEntityOptions(this.theStore, payload)
            .then(({ data }) => {
                this.theStore.commit("SET_OPTION_LIST", {entityName: payload.entityName, optionList: data.data});
            })
            .catch(({ error}) => {
                console.log("GekEntityServe::loadEntities::Error:", error);
            });
    },
    saveEntity(payload) {
        payload.entityObject = this.theStore.getters.getEditEntityObjectByEntityName(payload.entityName);
        let message = {
            type: "",
            i18n: "",
            i18nArgs: { entityDesc: payload.entityDesc },
        };
        let savePromise;
        if (this.theStore.getters.getEditNewByEntityName(payload.entityName)) {
            savePromise = GekEntityApiService.createEntity(this.theStore, payload);
        }
        else {
            savePromise = GekEntityApiService.updateEntity(this.theStore, payload);
        }

        savePromise.then(() => {
            message.type = "success";
            if (this.theStore.getters.getEditNewByEntityName(payload.entityName)) {
                message.i18n = "msg.entity.success.create";
            }
            else {
                message.i18n = "msg.entity.success.update";
            }
            this.theStore.commit("SET_MESSAGE", message);
            if (payload.entityNameReload != "") {
                return this.loadEntities( { entityName: payload.entityNameReload });
            }
        })
            .catch(() => {
                message.type = "error";
                if (this.theStore.getters.getEditNewByEntityName(payload.entityName)) {
                    message.i18n = "msg.entity.error.create";
                }
                else {
                    message.i18n = "msg.entity.error.update";
                }
                this.theStore.commit("SET_MESSAGE", message);
            })

    },
    deleteEntity(payload) {
        payload.entityObject = this.theStore.getters.getEditEntityObjectByEntityName(payload.entityName);

        return GekEntityApiService.deleteEntity(this.theStore, payload)
            .then(() => {
            const message = {
                type: "success",
                i18n: "msg.entity.success.delete",
                i18nArgs: { entityDesc: payload.entityDesc },
            };
            this.theStore.commit("SET_MESSAGE", message);
            if (payload.entityNameReload != "") {
                return this.loadEntities({ entityName: payload.entityNameReload });
            }
        })
            .catch(() => {
                const message = {
                    type: "error",
                    i18n: "msg.entity.error.delete",
                    i18nArgs: { entityDesc: payload.entityDesc },
                };
                this.theStore.commit("SET_MESSAGE", message);
            })
    }
};

export { GekEntityService };
