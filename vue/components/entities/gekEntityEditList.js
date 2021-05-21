Vue.component("gek-entity-edit-list", {
  props: {
    entity: {
      type: String,
      required: true,
    },
    entityName: {
      type: String,
      required: true,
    },
  },
  template:
    /*html*/
    `
 <v-sheet>
  <v-card>
    <v-card-title class="gek-bg-page-header">{{$t("form." + entity + ".list.header")}}</v-card-title>
    <v-card-text>
      <v-container fluid>
        <v-row align="start" dense>
          <v-col cols="12" align="end">
            <div class="float-right mb-2">
              <v-btn outlined data-toggle="modal" :data-target="editModalIdRef" 
                @click="SET_ENTITY_NEW({entityName: entityName, entityDesc: 'Benutzer'})">{{$t("form." + entity + ".list.buttonnew")}}</v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
  <v-card class="mt-5">
    <v-card-text>
      <table class="table table-hover table-sm table-bordered table-striped gk-table js-dataTable-simple dataTable" :id="entityTableId">
        <thead>
          <component :is="entityListTableHeaderComponent"></component>
        </thead>
        <tbody>
          <component :is="entityListTableRowComponent" v-for="(entityObject, index) in getEntityListByEntityName(entityName)" :entityObject="entityObject" :entityIndex="index"></component>
        </tbody>
      </table>
    </v-card-text>
  </v-card>
</v-sheet>
`,
  data() {
    return {
      entityListTableHeaderComponent:
        "gek-entity-list-table-header-" + this.entity,
      entityListTableRowComponent: "gek-entity-list-table-row-" + this.entity,
    };
  },
  methods: {
    ...Vuex.mapMutations(["SET_ENTITY_NEW"]),
  },
  computed: {
    ...Vuex.mapState(["entityStores"]),
    ...Vuex.mapGetters(["isAdminUser", "getEntityListByEntityName", "getUser"]),
    editModalIdRef() {
      return "#" + this.entity + "EditModal";
    },
    entityTableId() {
      return this.entity + "Table";
    },
  },
});
