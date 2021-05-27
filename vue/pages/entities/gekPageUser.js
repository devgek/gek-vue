const gekPageUser = Vue.component("gek-page-user", {
  template:
    /*html*/
    `
 <!-- Page Content -->
<div>
  <!-- entityEditDialog -->
  <gek-entity-edit-list entity="user" entityName="User" :tableHeaders="tableHeaders"/>
  <!-- entityEditDialog -->
  <gek-entity-edit-dialog entity="user" entityName="User" entityDesc="Benutzer" @entity-edit-save-user="saveEntity({entityName:'User', entityDesc:'Benutzer'})"/>
  <!-- confirmDelete Dialog-->
  <gek-confirm-delete entity="user" entityName="User" entityDesc="Benutzer" @entity-delete-confirm-user="deleteEntity({entityName:'User', entityDesc:'Benutzer'})"/>
</div>
<!-- END Page Content -->
`,
  data() {
    return {};
  },
  created() {
    this.startEntityStore({
      entityName: "User",
      newEntityObjectFn: this.newEntityObject,
    });
  },
  methods: {
    ...Vuex.mapActions(["startEntityStore", "deleteEntity", "saveEntity"]),
    newEntityObject() {
      console.log("newEntityObject user called");
      return {
        ID: 0,
        Name: "",
        Pass: "",
        Email: "",
        Role: 0,
      };
    },
  },
  computed: {
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
        { text: "Aktionen", value: "actions", sortable: false, class: "w-5"},
      ];
      return h;
    },
  },
});