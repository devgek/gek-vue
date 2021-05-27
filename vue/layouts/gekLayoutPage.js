const gekLayoutPage = Vue.component("gek-layout-page", {
  template:
    /*html*/
 `
 <v-app>
    <gek-nav></gek-nav>
    <gek-header mainHeader="Entity Frontend mit Vuetify"></gek-header>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-footer app inset>
      <v-spacer/>
      <gek-error-message/>
    </v-footer>
</v-app>
`,
    methods: {
    }
});
