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
    <template v-slot:item.data-table-expand="{ item, isExpanded, expand }">
      <v-icon @click="expand(true)" v-if="hasEmbeddedEntities(item.ContactAddresses) && !isExpanded">mdi-chevron-down</v-icon>
      <v-icon @click="expand(false)" v-if="hasEmbeddedEntities(item.ContactAddresses) && isExpanded">mdi-chevron-up</v-icon>
    </template>
    <!-- embedded entity ContactAddress -->
    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length" v-if="hasEmbeddedEntities(item.ContactAddresses)">
        
      <v-row align="start" dense>
        <v-col cols="12" align="end">
          <div class="float-right mb-2">
            <v-btn outlined color="primary" @click="SET_ENTITY_NEW({entityName: 'ContactAddress', entityDesc: 'Kontaktadresse'})">{{$t("form.contactaddress.list.buttonnew")}}</v-btn>
          </div>
          <div class="pb-3">&nbsp;</div>
        </v-col>
        </v-row>

        <v-data-table :items="item.ContactAddresses" :headers="tableHeadersEmbedded" :items-per-page="15">

        <template v-slot:item.actions="{ itemEmbedded }" v-if="isAdminUser">
          <v-btn 
            small
            color="primary" 
            outlined 
            @click="SET_ENTITY_EDIT({entityName: 'ContactAddress', entityObject: itemEmbedded})"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn 
          small
          color="primary" 
          outlined 
          @click="SET_ENTITY_DELETE({entityName: 'ContactAddress', entityObject: itemEmbedded})"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
    </v-data-table>

  </td>
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
    this.$store.dispatch("loadEntities", {entityName: "Contact"});
  },
  methods: {
    ...Vuex.mapMutations(["SET_ENTITY_NEW", "SET_ENTITY_EDIT", "SET_ENTITY_DELETE"]),
    ...Vuex.mapActions(["loadEntities", "deleteEntity", "saveEntity"]),
    orgDesc(org)  {
      return gkwebapp_T_OrgTypes[org].text;
    },
    contactDesc(contact)  {
      return gkwebapp_T_ContactTypes[contact].text;
    },
    embeddedEntities(embeddedEntities) {
      if (embeddedEntities) {
        return "Entities:" + Object.keys(embeddedEntities).length;
      }
      else {
        return "nix";
      }
    },
    hasEmbeddedEntities(embeddedEntities) {
      return (embeddedEntities && Object.keys(embeddedEntities).length > 0)
    },
    expand(item) {
      alert(item.Name);
    }
  },
  computed: {
    ...Vuex.mapGetters(["isAdminUser"]),
    tableHeaders() {
      var h = [
        { text: "", sortable: false, value: "data-table-expand"},
        { text: "Typ", sortable: true, value: "OrgType"},
        { text: "Name", value: "Name", sortable: true },
        { text: "Namenszusatz", value: "NameExt" , sortable: false},
        { text: "Kontakttyp", value: "ContactType", sortable: true},
        { text: "Aktionen", value: "actions", sortable: false, class: "w-8"},
      ];
      return h;
    },
    tableHeadersEmbedded() {
      var h = [
        { text: "Straße", value: "Street", sortable: false },
        { text: "Hausnummer", value: "StreetNr" , sortable: false},
        { text: "Zusatz", value: "StreetExt", sortable: false},
        { text: "Plz", value: "Zip", sortable: false},
        { text: "Ort", value: "City", sortable: false},
        { text: "Aktionen", value: "actions", sortable: false, class: "w-8"},
      ];
      return h;
    },
  },
});
