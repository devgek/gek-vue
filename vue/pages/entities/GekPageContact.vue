<template>
  <!-- Page Content -->
  <div class="content content-full">
    <GekEntityEditList
      entity="contact"
      entityName="Contact"
      :tableHeaders="tableHeaders"
      :showExpand="true"
    >
      <template v-slot:item.OrgType="{ item }">
        {{ orgDesc(item.OrgType) }}
      </template>
      <template v-slot:item.ContactType="{ item }">
        {{ contactDesc(item.ContactType) }}
      </template>
      <template v-slot:item.data-table-expand="{ item, isExpanded, expand }">
        <v-icon
          :color="colorExpandIcon(hasEmbeddedEntities(item.ContactAddresses))"
          @click="expand(true)"
          v-if="!isExpanded"
          >mdi-chevron-down</v-icon
        >
        <v-icon
          @click="expand(false)"
          v-if="hasEmbeddedEntities(item.ContactAddresses) && isExpanded"
          >mdi-chevron-up</v-icon
        >
      </template>
      <!-- embedded entity ContactAddress -->
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <v-row align="start" dense>
            <v-col cols="6" align="start">
              <div class="mt-2">Kontaktadressen zu Kontakt: {{ item.ID }}, {{ item.Name }}</div>
            </v-col>
            <v-col cols="6" align="end">
              <div class="float-right mb-2 mt-2">
                <v-btn
                  gek-btn
                  outlined
                  color="primary"
                  @click="
                    SET_ENTITY_NEW_EMBEDDED({
                      entityName: 'Contact',
                      entityObjectEmbedder: item,
                      entityNameEmbedded: 'ContactAddress',
                      entityDescEmbedded: 'Kontaktadresse',
                    })
                  "
                  >{{ $t("form.contactaddress.list.buttonnew") }}</v-btn
                >
              </div>
              <div class="pb-3">&nbsp;</div>
            </v-col>
          </v-row>

          <v-data-table
            :items="item.ContactAddresses"
            :headers="tableHeadersEmbedded"
            :items-per-page="15"
            v-if="hasEmbeddedEntities(item.ContactAddresses)"
          >
            <template v-slot:item.actions="{ item: itemEmbedded }" v-if="isAdminUser">
              <v-btn
                gek-btn
                small
                color="primary"
                outlined
                @click="
                  SET_ENTITY_EDIT_EMBEDDED({
                    entityName: 'ContactAddress',
                    entityObject: itemEmbedded,
                    entityObjectEmbedder: item,
                  })
                "
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn
                gek-btn
                small
                color="primary"
                outlined
                @click="
                  SET_ENTITY_DELETE_EMBEDDED({
                    entityName: 'ContactAddress',
                    entityObject: itemEmbedded,
                    entityObjectEmbedder: item,
                  })
                "
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-data-table>
          <v-row align="start" dense>
            <v-col cols="12" align="start">
              <div class="mb-2">&nbsp;</div>
            </v-col>
          </v-row>
        </td>
      </template>
    </GekEntityEditList>
    <GekEntityEditDialog entity="contact" entityName="Contact" entityDesc="Kontakt" entityNameReload="Contact">
      <template v-slot:entityEdit.fields>
        <v-select
          v-model="getEditEntityObjectByEntityName('Contact').OrgType"
          :label="$t('form.contact.edit.label.orgtype')"
          required
          :items="getOrgTypes()"
          outlined
          dense
        ></v-select>
        <v-text-field
          v-model="getEditEntityObjectByEntityName('Contact').Name"
          :label="$t('form.contact.edit.label.name')"
          required
          :readonly="!getEditNewByEntityName('Contact')"
          outlined
          dense
        ></v-text-field>
        <v-text-field
          v-model="getEditEntityObjectByEntityName('Contact').NameExt"
          :label="$t('form.contact.edit.label.nameext')"
          outlined
          dense
        ></v-text-field>
        <v-select
          v-model="getEditEntityObjectByEntityName('Contact').ContactType"
          :label="$t('form.contact.edit.label.contacttype')"
          required
          :items="getContactTypes()"
          outlined
          dense
        ></v-select>
      </template>
    </GekEntityEditDialog>
    <GekEntityEditDialog
      entity="contactaddress"
      entityName="ContactAddress"
      entityDesc="Kontaktadresse"
      entityNameReload="Contact"
      embedded
    >
      <template v-slot:entityEdit.embedder="{embedderObject}">
        <div class="mb-2">zu Kontakt mit ID: {{ embedderObject.ID }} Name: {{ embedderObject.Name }} {{ setEmbedder(embedderObject.ID) }}</div>
      </template>

      <template v-slot:entityEdit.fields>
        <v-text-field
            v-model="getEditEntityObjectByEntityName('ContactAddress').Street"
            :label="$t('form.contactaddress.edit.label.street')"
            required
            outlined
            dense
        ></v-text-field>
        <v-text-field
            v-model="getEditEntityObjectByEntityName('ContactAddress').StreetNr"
            :label="$t('form.contactaddress.edit.label.streetnr')"
            required
            outlined
            dense
        ></v-text-field>
        <v-text-field
            v-model="getEditEntityObjectByEntityName('ContactAddress').StreetExt"
            :label="$t('form.contactaddress.edit.label.streetext')"
            required
            outlined
            dense
        ></v-text-field>
        <v-text-field
            v-model="getEditEntityObjectByEntityName('ContactAddress').Zip"
            :label="$t('form.contactaddress.edit.label.zip')"
            required
            outlined
            dense
        ></v-text-field>
        <v-text-field
            v-model="getEditEntityObjectByEntityName('ContactAddress').City"
            :label="$t('form.contactaddress.edit.label.city')"
            required
            outlined
            dense
        ></v-text-field>
      </template>

    </GekEntityEditDialog>
    <!-- confirmDelete Dialog-->
    <GekEntityConfirmDelete entity="contact" entityName="Contact" entityDesc="Kontakt" entityNameReload="Contact"/>
    <GekEntityConfirmDelete entity="contactaddress" entityName="ContactAddress" entityDesc="Kontaktadresse" entityNameReload="Contact"/>
  </div>
  <!-- END Page Content -->
</template>
<script>
import Vuex from "vuex";
import GekEntityEditDialog from "/vue/components/entities/GekEntityEditDialog.vue";
import GekEntityEditList from "/vue/components/entities/GekEntityEditList.vue";
import GekEntityConfirmDelete from "/vue/components/entities/GekEntityConfirmDelete.vue";
import { gkwebapp_T_ContactTypes, gkwebapp_T_OrgTypes } from "/src/assets/js/gekvue.js";
import {GekEntityService} from "@/services/GekEntityService";

export default {
  components: {
    GekEntityEditDialog,
    GekEntityEditList,
    GekEntityConfirmDelete,
  },
  data() {
    return {};
  },
  created() {
    GekEntityService.loadEntities({entityName: "Contact"})
  },
  methods: {
    ...Vuex.mapMutations(["SET_ENTITY_NEW", "SET_ENTITY_NEW_EMBEDDED", "SET_ENTITY_EDIT", "SET_ENTITY_EDIT_EMBEDDED", "SET_ENTITY_DELETE", "SET_ENTITY_DELETE_EMBEDDED"]),
     colorExpandIcon(hasChildren) {
      if (hasChildren) {
        return "primary";
      }
      else {
        return "";
      }
    },
    setEmbedder(ID) {
      this.getEditEntityObjectByEntityName('ContactAddress').ContactID = ID;
    },
    orgDesc(org) {
      return gkwebapp_T_OrgTypes[org].text;
    },
    contactDesc(contact) {
      return gkwebapp_T_ContactTypes[contact].text;
    },
    hasEmbeddedEntities(embeddedEntities) {
      return embeddedEntities && Object.keys(embeddedEntities).length > 0;
    },
    getOrgTypes() {
      return gkwebapp_T_OrgTypes;
    },
    getContactTypes() {
      return gkwebapp_T_ContactTypes;
    },
  },
  computed: {
    ...Vuex.mapGetters([
      "isAdminUser",
      "getEditNewByEntityName",
      "getEditEntityObjectByEntityName",
    ]),
    ...Vuex.mapState(["gekEntityModels"]),
    tableHeaders() {
      var h = [
        { text: "", sortable: false, value: "data-table-expand" },
        { text: "Typ", sortable: true, value: "OrgType" },
        { text: "Name", value: "Name", sortable: true },
        { text: "Namenszusatz", value: "NameExt", sortable: false },
        { text: "Kontakttyp", value: "ContactType", sortable: true },
        { text: "Aktionen", value: "actions", sortable: false, class: "w-8", align: "end" },
      ];
      return h;
    },
    tableHeadersEmbedded() {
      var h = [
        { text: "Straße", value: "Street", sortable: false },
        { text: "Hausnummer", value: "StreetNr", sortable: false },
        { text: "Zusatz", value: "StreetExt", sortable: false },
        { text: "Plz", value: "Zip", sortable: false },
        { text: "Ort", value: "City", sortable: false },
        { text: "Aktionen", value: "actions", sortable: false, class: "w-8", align: "end" },
      ];
      return h;
    },
  },
};
</script>
