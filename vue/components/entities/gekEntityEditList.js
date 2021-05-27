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
    tableHeaders: {
      type: Array,
      required: true,
    }
  },
  template:
    /*html*/
    `
 <v-sheet>
  <v-card>
    <v-card-title class="gek-bg-page-header primary--text">{{$t("form." + entity + ".list.header")}}</v-card-title>
    <v-card-text class="mt-5">
      <v-container fluid>
        <v-row align="start" dense>
          <v-col cols="12" align="end">
            <div class="float-right mb-2">
              <v-btn outlined color="primary" @click="SET_ENTITY_NEW({entityName: entityName, entityDesc: 'Benutzer'})">{{$t("form." + entity + ".list.buttonnew")}}</v-btn>
            </div>
            <div class="pb-3">&nbsp;</div>
          </v-col>
        </v-row>
        <v-data-table :items="getEntityListByEntityName(entityName)" :headers="tableHeaders" :items-per-page="15">
            <template v-slot:item.Role="{ item }">
              {{roleDesc(item.Role)}}
            </template>
            <template v-slot:item.OrgType="{ item }">
              {{orgDesc(item.OrgType)}}
            </template>
            <template v-slot:item.ContactType="{ item }">
              {{contactDesc(item.ContactType)}}
            </template>
            <template v-slot:item.actions="{ item }">
            <v-icon
              color="primary" 
              outlined 
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
      </v-container>
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
    roleDesc(role)  {
      return gkwebapp_T_RoleTypes[role].text;
    },
    orgDesc(org)  {
      return gkwebapp_T_OrgTypes[org].text;
    },
    contactDesc(contact)  {
      return gkwebapp_T_ContactTypes[contact].text;
    }
  },
  computed: {
    ...Vuex.mapState(["entityStores"]),
    ...Vuex.mapGetters(["isAdminUser", "getEntityListByEntityName", "getUser"]),
    editModalIdRef() {
      return "#" + this.entity + "EditModal";
    },
    entityTableId() {
      return this.entity + "Table";
    }
  },
});
