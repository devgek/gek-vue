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
              <v-btn outlined color="primary" @click="SET_ENTITY_NEW({entityName: entityName, entityDesc: 'Benutzer'})">{{$t("form." + entity + ".list.buttonnew")}}</v-btn>
            </div>
            <div class="pb-3">&nbsp;</div>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
  <v-card class="mt-5">
    <v-card-text>
      <v-data-table :items="getEntityListByEntityName(entityName)" :headers="getHeaders" :items-per-page="5">
          <template v-slot:item.actions="{ item }">
          <v-icon
            color="primary" 
            outlined 
            class="mr-2"
            @click="SET_ENTITY_EDIT({entityName: entityName, entityObject: item})"
          >
            mdi-pencil
          </v-icon>
          <v-icon
          color="primary" 
          outlined 
          @click="SET_ENTITY_DELETE({entityName: entityName, entityObject: item})"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
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
    ...Vuex.mapMutations(["SET_ENTITY_NEW", "SET_ENTITY_EDIT", "SET_ENTITY_DELETE"]),
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
    getHeaders() {
      var h = 
       [
      {
        text: 'Name',
        align: 'start',
        sortable: true,
        value: 'Name',
      },
      { text: 'Passwort', value: 'Pass' , sortable: false},
      { text: 'Email', value: 'Email' },
      { text: 'Benutzerrolle', value: 'Role' },
      { text: 'Aktionen', value: 'actions', sortable: false},
    ]
    return h;
  },
  },
});
