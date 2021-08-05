class EntityObject {
  constructor(entityName, newEntityObjectFn) {
    this.entityName = entityName;
    this.newEntityObjectFn = newEntityObjectFn;
    this.entityObject = this.newEntityObjectFn.call();
    this.confirmDeleteDialog = false;
    this.editDialog = false;
    this.entityList = [];
    this.optionList = [];
    this.editNew = false;

  }
  
  getEditHeader(entityDesc) {
    if (this.editNew) {
      return entityDesc + " neu anlegen";
    }
    else {
      return entityDesc + " ändern";
    }
  }
}

export default EntityObject
