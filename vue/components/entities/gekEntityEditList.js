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
    },
    showExpand: {
      type: Boolean,
      default: false
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
        <v-data-table :items="getEntityListByEntityName(entityName)" :headers="tableHeaders" :items-per-page="5" :show-expand="showExpand" :expanded.sync="expanded" :single-expand="singleExpand" item-key="Name">
            <!-- pass through scoped slots -->
            <template v-for="(_, scopedSlotName) in $scopedSlots" v-slot:[scopedSlotName]="slotData">
              <slot :name="scopedSlotName" v-bind="slotData"></slot>
            </template>
      

            <template v-slot:item.actions="{ item }" v-if="isAdminUser">
              <v-btn 
                small
                color="primary" 
                outlined 
                @click="SET_ENTITY_EDIT({entityName: entityName, entityObject: item})"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn 
              small
              color="primary" 
              outlined 
              @click="SET_ENTITY_DELETE({entityName: entityName, entityObject: item})"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
        </v-data-table>
      </v-container>
    </v-card-text>
  </v-card>
</v-sheet>
`,
  data() {
    return {
      expanded: [],
      singleExpand: true,
    };
  },
  methods: {
    ...Vuex.mapMutations(["SET_ENTITY_NEW", "SET_ENTITY_EDIT", "SET_ENTITY_DELETE"]),
  },
  computed: {
    ...Vuex.mapState(["entityStores"]),
    ...Vuex.mapGetters(["isAdminUser", "getEntityListByEntityName", "getUser"]),
  },
});
