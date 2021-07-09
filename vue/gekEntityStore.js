class EntityStore {
  constructor(entityName, newEntityObjectFn, vuex) {
    this.entityName = entityName;
    this.newEntityObjectFn = newEntityObjectFn;
    this.entityObject = this.newEntityObjectFn.call();
    this.confirmDeleteDialog = false;
    this.editDialog = false;
    this.entityList = [];
    this.optionList = [];
    this.vuex = vuex;
    this.editNew = false;

    this.doSave = function () {
      console.log("doSave", this);
      if (this.editNew) {
        this.vuex.dispatch("create" + this.entityName, this.entityObject);
      } else {
        this.vuex.dispatch("update" + this.entityName, this.entityObject);
      }
    };

    this.doDelete = function (confirmed) {
      if (confirmed) {
        this.vuex.dispatch("delete" + this.entityName, this.entityObject);
      }
    };


  }
  getEditHeader(entityDesc) {
    if (this.editNew) {
      return entityDesc + " neu anlegen";
    }
    else {
      return entityDesc + " ändern";
    }
  }
};

export default EntityStore
