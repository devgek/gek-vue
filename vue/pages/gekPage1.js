const gekPage1 = Vue.component("gek-page1", {
  template:
    /*html*/
    `
<v-sheet>
 <v-card>
  <v-card-title class="gek-bg-page-header primary--text">{{$t("form.page1.header")}}</v-card-title>
  <v-card-text>
    <v-container fluid>
      <v-row align="start" dense>
        <v-col cols="1">
          <v-subheader>
          {{$t("form.page1.labelContacttype")}}
          </v-subheader>
        </v-col>

        <v-col cols="1">
          <v-select
            v-model="selectedContactType"
            :items="getContactTypes"
            outlined 
            dense
          ></v-select>
        </v-col>
      </v-row>
    </v-container>
  </v-card-text>
 </v-card>
 <v-card class="mt-5">
  <v-card-text>
    <div>{{$t("form.page1.content")}}</div>
    <div>{{ contactDesc }}</div>
  </v-card-text>
</v-card>
</v-sheet>
`,
  data() {
    return {
      selectedContactType: 3,
    };
  },
  methods: {
    onChangeContactType() {
      console.log("contacttype selected:" + this.selectedContactType);
    }
  },
  computed: {
    getContactTypes() {
      return gkwebapp_T_ContactTypes;
    },
    contactDesc() {
      return gkwebapp_T_ContactTypes[this.selectedContactType].text
    }
  },
});
