const gekPageUser = Vue.component("gek-page-user", {
  template:
    /*html*/
    `
 <!-- Page Content -->
<div>
  <!-- entityEditDialog -->
  <gek-entity-edit-list entity="user" entityName="User" :tableHeaders="tableHeaders">
    <!-- scoped slots from v-data-table -->
    <template v-slot:item.Pass="{ item }">
      ********
    </template>
    <template v-slot:item.Role="{ item }">
     {{ roleDesc(item.Role) }}
    </template>
  </gek-entity-edit-list>
  <!-- entityEditDialog -->
  <gek-entity-edit-dialog entity="user" entityName="User" entityDesc="Benutzer" @entity-edit-save-user="saveEntity({entityName:'User', entityDesc:'Benutzer'})">
    <template v-slot:entity.fields>
      <v-text-field v-model="entityStores['User'].entityObject.Name" :label="$t('form.user.edit.label.name')" required :readonly="!entityStores['User'].editNew" outlined dense></v-text-field>
      <v-text-field v-model="entityStores['User'].entityObject.Pass" :label="$t('form.user.edit.label.pass')" type="password" required :readonly="!entityStores['User'].editNew" outlined dense></v-text-field>
      <v-text-field v-model="entityStores['User'].entityObject.Email" :label="$t('form.user.edit.label.email')" required outlined dense></v-text-field>
      <v-select v-model="entityStores['User'].entityObject.Role" :label="$t('form.user.edit.label.role')" required :items="getRoleTypes()" outlined dense></v-select>
    </template>
  </gek-entity-edit-dialog>
  <!-- confirmDelete Dialog-->
  <gek-confirm-delete entity="user" entityName="User" entityDesc="Benutzer" @entity-delete-confirm-user="deleteEntity({entityName:'User', entityDesc:'Benutzer'})"/>
</div>
<!-- END Page Content -->
`,
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
    ...Vuex.mapState(['entityStores']),
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
});
