<template>
  <v-dialog v-model="dialog" max-width="600px" persistent>
    <v-card>
      <v-card-title class="primary white--text">{{
        entityStores[entityName].getEditHeader(entityDesc)
      }}</v-card-title>
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
import Vuex from 'vuex'

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
      dialog: false,
      formName: this.entity + "Form",
    };
  },
  methods: {
    abort() {
      this.$emit("entity-edit-abort-" + this.entity);
      this.$store.commit("SET_EDIT_DIALOG", {
        entityName: this.entityName,
        editDialog: false,
      });
    },
    save() {
      this.$emit("entity-edit-save-" + this.entity);
      this.$store.commit("SET_EDIT_DIALOG", {
        entityName: this.entityName,
        editDialog: false,
      });
    },
  },
  computed: {
    ...Vuex.mapState(["entityStores"]),
    ...Vuex.mapGetters(["getEditDialogByEntityName"]),
  },
};
</script>
