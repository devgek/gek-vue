Vue.component("gek-entity-edit-dialog", {
  props: {
    entity: {
      type: String,
      required: true,
    },
    entityName: {
      type: String,
      required: true,
    },
    entityDesc: {
      type: String,
      required: true,
    }
  },
  template:
    /*html*/
  `<!-- Modal Dialog-->
  <v-dialog v-model="getEditDialogByEntityName(entityName)" max-width="600px" persistent>
  <v-card>
    <v-card-title class="gek-bg-page-header">{{ entityStores[entityName].getEditHeader(entityDesc) }}</v-card-title>
    <v-card-text>
                <!-- include the edit fields here -->
                <component :is="editFormComponent"></component>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        outlined
        @click="abort"
      >
      {{$t("form.all.btn.back")}}
      </v-btn>
      <v-btn
        color="primary"
        outlined
        @click="save"
      >
      {{$t("form.all.btn.save")}}
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
`,
  data() {
    return {
      editFormComponent: "gek-entity-edit-form-" + this.entity,
    };
  },
  methods: {
    abort() {
      this.$emit("entity-edit-abort-" + this.entity);
      this.$store.commit("SET_EDIT_DIALOG", {entityName: this.entityName, editDialog: false})
    },
    save() {
      this.$emit("entity-edit-save-" + this.entity);
      this.$store.commit("SET_EDIT_DIALOG", {entityName: this.entityName, editDialog: false})
    },
  },
  computed: {
    ...Vuex.mapState(['entityStores']),
    ...Vuex.mapGetters(["getEditDialogByEntityName"]),
    editModalId() {
      return this.entity + "EditModal"
    }
  },
});
