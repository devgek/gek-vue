import {GekEntityApiService} from "./GekEntityApiService.js";

// contains the business logic of GekEntity module
const GekEntityService = {
    theStore: null,
    init(store, apiBaseUrl, logConsole) {
        this.theStore = store;
        return GekEntityApiService.init(apiBaseUrl, logConsole)
    },
    // eslint-disable-next-line no-unused-vars
    login(credentials) {
        return GekEntityApiService.login(this.theStore, credentials);
    },
    logout() {
        return GekEntityApiService.logout(this.theStore);
    },
    loadEntities(payload) {
        //TODO: change this hack!
        if (payload.entityName == 'ContactAddress') {
            payload.entityName = 'Contact';
        }
        return GekEntityApiService.getEntities(this.theStore, payload);
    },
    loadEntityOptions(payload) {
        return GekEntityApiService.getEntityOptions(this.theStore, payload);
    },
    saveEntity(payload) {
        payload.entityObject = this.theStore.getters.getEditEntityObjectByEntityName(payload.entityName);
        if (this.theStore.getters.getEditNewByEntityName(payload.entityName)) {
            return GekEntityApiService.createEntity(this.theStore, payload);
        }
        else {
            return GekEntityApiService.updateEntity(this.theStore, payload);
        }
    },
    deleteEntity(payload) {
        payload.entityObject = this.theStore.getters.getEditEntityObjectByEntityName(payload.entityName);
        return GekEntityApiService.deleteEntity(this.theStore, payload);
    }
};

export { GekEntityService };
