<template>
  <v-dialog v-model="dialog" max-width="600px">
    <v-card>
      <v-card-title class="primary white--text">{{ title }}</v-card-title>
      <v-card-text class="pt-4">
        {{ confirmationMessage }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="light" @click="abort">
          {{ $t("form.all.btn.abort") }}
        </v-btn>
        <v-btn color="primary" @click="confirmDelete">
          {{ $t("form.all.btn.delete") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import Vuex from "vuex";

export default {
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
  data() {
    return {};
  },
  methods: {
    ...Vuex.mapActions(["dismissConfirmDeleteDialog", "dismissEditDialog"]),
    abort() {
      this.$emit("entity-delete-abort-" + this.entity);
      this.$store.commit("SET_CONFIRM_DELETE_DIALOG", {
        entityName: this.entityName,
        confirmDeleteDialog: false,
      });
    },
    confirmDelete() {
      this.$emit("entity-delete-confirm-" + this.entity);
      this.$store.commit("SET_CONFIRM_DELETE_DIALOG", {
        entityName: this.entityName,
        confirmDeleteDialog: false,
      });
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
    dialog: {
      get() {
        return this.getConfirmDeleteDialogByEntityName(this.entityName);
      },
      set(value) {
        //do nothing here
      },
    },
  },
};
</script>
