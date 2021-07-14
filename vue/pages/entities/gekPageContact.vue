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
          @click="expand(true)"
          v-if="hasEmbeddedEntities(item.ContactAddresses) && !isExpanded"
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
        <td
          :colspan="headers.length"
          v-if="hasEmbeddedEntities(item.ContactAddresses)"
        >
          <v-row align="start" dense>
            <v-col cols="12" align="end">
              <div class="float-right mb-2">
                <v-btn
                  outlined
                  color="primary"
                  @click="
                    SET_ENTITY_NEW({
                      entityName: 'ContactAddress',
                      entityDesc: 'Kontaktadresse',
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
          >
            <template v-slot:item.actions="{ itemEmbedded }" v-if="isAdminUser">
              <v-btn
                small
                color="primary"
                outlined
                @click="
                  SET_ENTITY_EDIT({
                    entityName: 'ContactAddress',
                    entityObject: itemEmbedded,
                  })
                "
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn
                small
                color="primary"
                outlined
                @click="
                  SET_ENTITY_DELETE({
                    entityName: 'ContactAddress',
                    entityObject: itemEmbedded,
                  })
                "
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </td>
      </template>
    </GekEntityEditList>
   <GekEntityEditDialog
      entity="contact"
      entityName="Contact"
      entityDesc="Kontakt"
      @entity-edit-save-contact="
        saveEntity({ entityName: 'Contact', entityDesc: 'Kontakt' })
      "
    >
      <template v-slot:entity.fields>
        <v-select
          v-model="entityStores['Contact'].entityObject.OrgType"
          :label="$t('form.contact.edit.label.orgtype')"
          required
          :items="getOrgTypes()"
          outlined
          dense
        ></v-select>
        <v-text-field
          v-model="entityStores['Contact'].entityObject.Name"
          :label="$t('form.contact.edit.label.name')"
          required
          :readonly="!entityStores['Contact'].editNew"
          outlined
          dense
        ></v-text-field>
        <v-text-field
          v-model="entityStores['Contact'].entityObject.NameExt"
          :label="$t('form.contact.edit.label.nameext')"
          outlined
          dense
        ></v-text-field>
        <v-select
          v-model="entityStores['Contact'].entityObject.ContactType"
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
      @entity-edit-save-contactaddress="
        saveEntity({
          entityName: 'ContactAddress',
          entityDesc: 'Kontaktadresse',
        })
      "
    />
    <!-- confirmDelete Dialog-->
    <GekEntityConfirmDelete
      entity="contact"
      entityName="Contact"
      entityDesc="Kontakt"
      @entity-delete-confirm-contact="
        deleteEntity({ entityName: 'Contact', entityDesc: 'Kontakt' })
      "
    />
  </div>
  <!-- END Page Content -->
</template>
<script>
import Vuex from "vuex";
import GekEntityEditDialog from "/vue/components/entities/gekEntityEditDialog.vue";
import GekEntityEditList from "/vue/components/entities/gekEntityEditList.vue";
import GekEntityConfirmDelete from "/vue/components/entities/gekEntityConfirmDelete.vue";
import {gkwebapp_T_ContactTypes, gkwebapp_T_OrgTypes} from "/src/assets/js/gekvue.js"

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
    this.$store.dispatch("loadEntities", { entityName: "Contact" });
  },
  methods: {
    ...Vuex.mapMutations([
      "SET_ENTITY_NEW",
      "SET_ENTITY_EDIT",
      "SET_ENTITY_DELETE",
    ]),
    ...Vuex.mapActions(["loadEntities", "deleteEntity", "saveEntity"]),
    orgDesc(org) {
      return gkwebapp_T_OrgTypes[org].text;
    },
    contactDesc(contact) {
      return gkwebapp_T_ContactTypes[contact].text;
    },
    embeddedEntities(embeddedEntities) {
      if (embeddedEntities) {
        return "Entities:" + Object.keys(embeddedEntities).length;
      } else {
        return "nix";
      }
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
    ...Vuex.mapGetters(["isAdminUser"]),
    ...Vuex.mapState(["entityStores"]),
    tableHeaders() {
      var h = [
        { text: "", sortable: false, value: "data-table-expand" },
        { text: "Typ", sortable: true, value: "OrgType" },
        { text: "Name", value: "Name", sortable: true },
        { text: "Namenszusatz", value: "NameExt", sortable: false },
        { text: "Kontakttyp", value: "ContactType", sortable: true },
        { text: "Aktionen", value: "actions", sortable: false, class: "w-8" },
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
        { text: "Aktionen", value: "actions", sortable: false, class: "w-8" },
      ];
      return h;
    },
  },
};
</script>
