const gekPageContact = Vue.component("gek-page-contact", {
  template:
    /*html*/
`
<!-- Page Content -->
<div class="content content-full">
  <!-- entityEditDialog -->
  <gek-entity-edit-list entity="contact" entityName="Contact" :tableHeaders="tableHeaders">
    <template v-slot:item.OrgType="{ item }">
      {{ orgDesc(item.OrgType) }}
    </template>
    <template v-slot:item.ContactType="{ item }">
      {{ contactDesc(item.ContactType) }}
    </template>
  </gek-entity-edit-list>
  <!-- entityEditDialog -->
  <gek-entity-edit-dialog entity="contact" entityName="Contact" entityDesc="Kontakt" @entity-edit-save-contact="saveEntity({entityName:'Contact', entityDesc:'Kontakt'})"/>
  <!-- confirmDelete Dialog-->
  <gek-confirm-delete entity="contact" entityName="Contact" entityDesc="Kontakt" @entity-delete-confirm-contact="deleteEntity({entityName:'Contact', entityDesc:'Kontakt'})"/>
</div>
<!-- END Page Content -->
`,
  data() {
    return {};
  },
  created() {
    this.startEntityStore({
      entityName: "Contact",
      newEntityObjectFn: this.newEntityObject,
    });
  },
  methods: {
    ...Vuex.mapActions(["startEntityStore", "deleteEntity", "saveEntity"]),
    newEntityObject() {
      console.log("newEntityObject contact called");
      return {
        ID: 0,
        OrgType: 0,
        Name: "",
        NameExt: "",
        ContactType: 0,
      };
    },
    orgDesc(org)  {
      return gkwebapp_T_OrgTypes[org].text;
    },
    contactDesc(contact)  {
      return gkwebapp_T_ContactTypes[contact].text;
    },

  },
  computed: {
    tableHeaders() {
      var h = [
        {
          text: "Typ",
          align: "start",
          sortable: true,
          value: "OrgType",
        },
        { text: "Name", value: "Name", sortable: true },
        { text: "Namenszusatz", value: "NameExt" , sortable: false},
        { text: "Kontakttyp", value: "ContactType", sortable: true},
        { text: "Aktionen", value: "actions", sortable: false, class: "w-8"},
      ];
      return h;
    },
  },
});
