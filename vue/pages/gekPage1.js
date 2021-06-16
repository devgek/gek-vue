const gekPage1 = Vue.component("gek-page1", {
  template:
    /*html*/
    `
<v-sheet>
  <gek-page-header headerKey="form.page1.header"/>
 <v-card class="mt-5">
  <v-card-text class="">
      <v-row align="start" dense>
        <v-col class="d-flex flex-row">
          <v-subheader>
          {{$t("form.page1.labelContacttype")}}
          </v-subheader>
          <v-select
            v-model="selectedContactType"
            :items="getContactTypes"
            outlined 
            dense
          ></v-select>
        </v-col>
        <gek-entity-options-select entityName="User" labelKey="entity.desc.user" @entity-options-select-User="onChangeUser"/>
        <gek-entity-options-select entityName="Contact" labelKey="entity.desc.contact" @entity-options-select-Contact="onChangeContact"/>
      </v-row>
      <v-row>
        <v-col class="d-flex flex-row">
          <div>{{$t("form.page1.content")}}</div>
          <div>{{ contactDesc }}</div>
        </v-col>
        <v-col class="d-flex flex-row">
          <div>{{$t("entity.desc.user")}}</div>
          <div>{{ userSelected }}</div>
        </v-col>
        <v-col class="d-flex flex-row">
          <div>{{$t("entity.desc.contact")}}</div>
          <div>{{ contactSelected }}</div>
        </v-col>
      </v-row>
  </v-card-text>
 </v-card>
</v-sheet>
`,
  data() {
    return {
      selectedContactType: 1,
      selectedUserID: 0,
      selectedContactID: 0,
    };
  },
  created() {
    this.loadEntityOptions({entityName: "User"})
  },
  methods: {
    ...Vuex.mapActions(["loadEntityOptions"]),
    onChangeContactType() {
      console.log("contacttype selected:" + this.selectedContactType);
    },
    onChangeContact(entityID) {
      this.selectedContactID = entityID;
    },
    onChangeUser(entityID) {
      this.selectedUserID = entityID;
    }
  },
  computed: {
    ...Vuex.mapGetters(["getOptionListByEntityName"]),
    getContactTypes() {
      return gkwebapp_T_ContactTypes;
    },
    contactDesc() {
      return gkwebapp_T_ContactTypes[this.selectedContactType].text
    },
    userSelected() {
      return this.selectedUserID;
    },
    contactSelected() {
      return this.selectedContactID;
    }
  },
});
