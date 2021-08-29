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
import {GekEntityService} from "@/services/GekEntityService";

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
    ...Vuex.mapMutations(["SET_CONFIRM_DELETE_DIALOG"]),
    abort() {
      // maybe calling component wants to react
      this.$emit("entity-delete-abort-" + this.entity);
      this.SET_CONFIRM_DELETE_DIALOG({
        entityName: this.entityName,
        confirmDeleteDialog: false,
      });
    },
    confirmDelete() {
      GekEntityService.deleteEntity({ entityName: this.entityName, entityDesc: this.entityDesc });
      // maybe calling component wants to react
      this.$emit("entity-delete-confirm-" + this.entity);
      this.SET_CONFIRM_DELETE_DIALOG({
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
      // eslint-disable-next-line no-unused-vars
      set(value) {
        //do nothing here
      },
    },
  },
};
</script>
