Vue.component("gek-confirm-delete", {
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
    },
  },
  template:
    /*html*/
    `<!-- Modal Dialog-->
<v-dialog v-model="getConfirmDeleteDialogByEntityName(entityName)" max-width="600px">
  <v-card>
    <v-card-title class="gek-bg-page-header">{{ title }}</v-card-title>
    <v-card-text>
      {{ confirmationMessage }}
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="primary darken-1"
        text
        @click="abort"
      >
      {{$t("form.all.btn.abort")}}
      </v-btn>
      <v-btn
        color="primary darken-1"
        outlined
        @click="confirmDelete"
      >
      {{$t("form.all.btn.delete")}}
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
`,
  data() {
    return {
      dialog: true,
    };
  },
  methods: {
    ...Vuex.mapActions([
      'dismissConfirmDeleteDialog',
      'dismissEditDialog',
    ]),
    abort() {
      this.$emit("entity-delete-abort-" + this.entity);
      this.$store.commit("SET_CONFIRM_DELETE_DIALOG", {entityName: this.entityName, confirmDeleteDialog: false})
    },
    confirmDelete() {
      this.$emit("entity-delete-confirm-" + this.entity);
      this.$store.commit("SET_CONFIRM_DELETE_DIALOG", {entityName: this.entityName, confirmDeleteDialog: false})
    },
  },
  computed: {
    ...Vuex.mapGetters(["getConfirmDeleteDialogByEntityName"]),
    title() {
      return this.entityDesc + " löschen";
    },
    confirmationMessage() {
      return this.entityDesc + " wirklich löschen?";
    },
  },
});
