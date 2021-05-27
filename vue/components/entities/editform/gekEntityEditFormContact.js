Vue.component("gek-entity-edit-form-contact", {
  name: "gek-entity-edit-form-contact",
  props: {},
  template:
    /*html*/
    `<!-- EntityEditFormContact -->
<v-form ref="formUser" v-model="valid" lazy-validation>
  <v-select v-model="entityStores['Contact'].entityObject.OrgType" :label="$t('form.contact.edit.label.orgtype')" required :items="getOrgTypes" outlined dense></v-select>
  <v-text-field v-model="entityStores['Contact'].entityObject.Name" :label="$t('form.contact.edit.label.name')" required :readonly="!entityStores['Contact'].editNew" outlined dense></v-text-field>
  <v-text-field v-model="entityStores['Contact'].entityObject.NameExt" :label="$t('form.contact.edit.label.nameext')" outlined dense></v-text-field>
  <v-select v-model="entityStores['Contact'].entityObject.ContactType" :label="$t('form.contact.edit.label.contacttype')" required :items="getContactTypes" outlined dense></v-select>
</v-form>
<!-- END EntityEditFormContact -->
`,
  data() {
    return {
      valid: false,
    };
  },
  methods: {},
  computed: {
    ...Vuex.mapState(["entityStores"]),
    getOrgTypes() {
      return gkwebapp_T_OrgTypes;
    },
    getContactTypes() {
      return gkwebapp_T_ContactTypes;
    },
  },
});
