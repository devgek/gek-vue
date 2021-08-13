<template>
  <v-dialog v-model="dialog" max-width="600px" persistent>
    <v-card>
      <v-card-title class="primary white--text">{{ title }}</v-card-title>
      <v-card-text class="pt-4">
        <v-form>
          <slot name="entity.fields">
            <div>default content of entity.fields</div>
          </slot>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn small color="light" @click="abort">
          {{ $t("form.all.btn.back") }}
        </v-btn>
        <v-btn small color="primary" @click="save">
          {{ $t("form.all.btn.save") }}
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
    return {
      formName: this.entity + "Form",
    };
  },
  methods: {
    ...Vuex.mapMutations(["SET_EDIT_DIALOG"]),
    ...Vuex.mapActions(["saveEntity"]),
    abort() {
      // maybe calling component wants to react
      this.$emit("entity-edit-abort-" + this.entity);
      this.SET_EDIT_DIALOG({
        entityName: this.entityName,
        editDialog: false,
      });
    },
    save() {
      this.saveEntity({ entityName: this.entityName, entityDesc: this.entityDesc });
      // maybe calling component wants to react
      this.$emit("entity-edit-save-" + this.entity);
      this.SET_EDIT_DIALOG({
        entityName: this.entityName,
        editDialog: false,
      });
    },
  },
  computed: {
    ...Vuex.mapState(["gekEntityObjects"]),
    ...Vuex.mapGetters(["getEditDialogByEntityName", "getEditNewByEntityName"]),
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
