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
}

export default EntityObject
