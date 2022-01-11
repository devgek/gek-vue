<template>
  <v-dialog v-model="dialog" max-width="600px" persistent>
    <v-card>
      <v-card-title class="primary white--text">{{ title }}</v-card-title>
      <v-card-text class="pt-4">
        <v-form>
          <slot name="entityEdit.embedder" v-bind:embedderObject="getEmbedderObjectByEntityName(entityName)" v-if="embedded">
            <div>default content of slot entityEdit.embedder</div>
          </slot>
          <slot name="entityEdit.fields" >
            <div>default content of slot entityEdit.fields</div>
          </slot>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn gek-btn small color="light" @click="abort">
          {{ $t("form.all.btn.back") }}
        </v-btn>
        <v-btn gek-btn small color="primary" @click="save">
          {{ $t("form.all.btn.save") }}
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
    entityNameReload: {
      type: String,
      default: "",
    },
    embedded: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formName: this.entity + "Form",
    };
  },
  methods: {
    ...Vuex.mapMutations(["SET_EDIT_DIALOG"]),
    abort() {
      // maybe calling component wants to react
      this.$emit("entity-edit-abort-" + this.entity);
      this.SET_EDIT_DIALOG({
        entityName: this.entityName,
        editDialog: false,
      });
    },
    save() {
      GekEntityService.saveEntity({ entityName: this.entityName, entityDesc: this.entityDesc, entityNameReload: this.entityNameReload });
      // maybe calling component wants to react
      this.$emit("entity-edit-save-" + this.entity);
      this.SET_EDIT_DIALOG({
        entityName: this.entityName,
        editDialog: false,
      });
    },
  },
  computed: {
    ...Vuex.mapState(["gekEntityModels"]),
    ...Vuex.mapGetters(["getEmbedderObjectByEntityName","getEditEntityObjectByEntityName", "getEditDialogByEntityName", "getEditNewByEntityName"]),
    dialog: {
      get() {
        return this.getEditDialogByEntityName(this.entityName);
      },
      // eslint-disable-next-line no-unused-vars
      set(value) {
        //do nothing here
      },
    },
    title: {
      get() {
        if (this.getEditNewByEntityName(this.entityName)) {
          return this.entityDesc + " neu anlegen";
        } else {
          return this.entityDesc + " ändern";
        }
      },
      // eslint-disable-next-line no-unused-vars
      set(value) {
        //do nothing here
      },
    },
  },
};
</script>
