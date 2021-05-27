Vue.component("gek-entity-edit-form-user", {
  name: "gek-entity-edit-form-user",
  props: {
  },
  template:
    /*html*/
  `<!-- EntityEditFormUser -->
  <v-form ref="formUser" v-model="valid" lazy-validation>
    <v-text-field v-model="entityStores['User'].entityObject.Name" :label="$t('form.user.edit.label.name')" required :readonly="!entityStores['User'].editNew" outlined dense></v-text-field>
    <v-text-field v-model="entityStores['User'].entityObject.Pass" :label="$t('form.user.edit.label.pass')" type="password" required :readonly="!entityStores['User'].editNew" outlined dense></v-text-field>
    <v-text-field v-model="entityStores['User'].entityObject.Email" :label="$t('form.user.edit.label.email')" required outlined dense></v-text-field>
    <v-select v-model="entityStores['User'].entityObject.Role" :label="$t('form.user.edit.label.role')" required :items="getRoleTypes" outlined dense></v-select>
</v-form>
<!-- END EntityEditFormUser -->
`,
  data() {
    return {
      valid: true,
    };
  },
  methods: {
  },
  computed: {
    ...Vuex.mapState([
      'entityStores'
    ]),
    getRoleTypes() {
      return gkwebapp_T_RoleTypes;
    },
  },
});
