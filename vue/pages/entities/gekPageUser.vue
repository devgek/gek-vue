<template>
  <!-- Page Content -->
  <div>
    <!-- entityEditDialog -->
    <GekEntityEditList
      entity="user"
      entityName="User"
      :tableHeaders="tableHeaders"
    >
      <!-- scoped slots from v-data-table -->
      <template v-slot:item.Pass="{}"> ******** </template>
      <template v-slot:item.Role="{ item }">
        {{ roleDesc(item.Role) }}
      </template>
    </GekEntityEditList>
    <!-- entityEditDialog -->
    <GekEntityEditDialog
      entity="user"
      entityName="User"
      entityDesc="Benutzer"
      @entity-edit-save-user="
        saveEntity({ entityName: 'User', entityDesc: 'Benutzer' })
      "
    >
      <template v-slot:entity.fields>
        <v-text-field
          v-model="getEditEntityObjectByEntityName('User').Name"
          :label="$t('form.user.edit.label.name')"
          required
          :readonly="!getEditNewByEntityName('User')"
          outlined
          dense
        ></v-text-field>
        <v-text-field
          v-model="getEditEntityObjectByEntityName('User').Pass"
          :label="$t('form.user.edit.label.pass')"
          type="password"
          required
          :readonly="!getEditNewByEntityName('User')"
          outlined
          dense
        ></v-text-field>
        <v-text-field
          v-model="getEditEntityObjectByEntityName('User').Email"
          :label="$t('form.user.edit.label.email')"
          required
          outlined
          dense
        ></v-text-field>
        <v-select
          v-model="getEditEntityObjectByEntityName('User').Role"
          :label="$t('form.user.edit.label.role')"
          required
          :items="getRoleTypes()"
          outlined
          dense
        ></v-select>
      </template>
    </GekEntityEditDialog>
    <!-- confirmDelete Dialog-->
    <GekEntityConfirmDelete
      entity="user"
      entityName="User"
      entityDesc="Benutzer"
      @entity-delete-confirm-user="
        deleteEntity({ entityName: 'User', entityDesc: 'Benutzer' })
      "
    />
  </div>
  <!-- END Page Content -->
</template>
<script>
import Vuex from 'vuex'
import GekEntityEditDialog from "/vue/components/entities/GekEntityEditDialog.vue"
import GekEntityEditList from "/vue/components/entities/GekEntityEditList.vue"
import GekEntityConfirmDelete from "/vue/components/entities/GekEntityConfirmDelete.vue"
import {gkwebapp_T_RoleTypes} from "/src/assets/js/gekvue.js"


export default {
components: {
  GekEntityEditDialog, GekEntityEditList, GekEntityConfirmDelete
},
data() {
    return {};
  },
  created() {
    this.$store.dispatch("loadEntities", {entityName: "User"});
  },
  methods: {
    ...Vuex.mapActions(["loadEntities", "deleteEntity", "saveEntity"]),
    roleDesc(role)  {
      return gkwebapp_T_RoleTypes[role].text;
    },
    getRoleTypes() {
      return gkwebapp_T_RoleTypes;
    }
  },
  computed: {
    ...Vuex.mapState("es", ['gekEntityObjects']),
    ...Vuex.mapGetters(["getEditNewByEntityName", "getEditEntityObjectByEntityName"]),
    tableHeaders() {
      var h = [
        {
          text: "Name",
          align: "start",
          sortable: true,
          value: "Name",
        },
        { text: "Passwort", value: "Pass", sortable: false },
        { text: "Email", value: "Email" },
        { text: "Benutzerrolle", value: "Role" },
        { text: "Aktionen", value: "actions", sortable: false, class: "w-8" },
      ];
      return h;
    }
  },
}
</script>
