const gekLayoutView = Vue.component("gek-layout-view", {
  template:
    /*html*/
 `
 <v-app>
 <v-navigation-drawer app>
   <v-sheet color="lime"><h3>Vue Scaffold</h3></v-sheet>
   <gek-nav></gek-nav>
 </v-navigation-drawer>
 <v-app-bar app color="lime">
  <gek-header mainHeader="Entity Frontend mit Vuetify"></gek-header>
 </v-app-bar>
 <v-main>
   <v-container fluid>
    <router-view></router-view>
   </v-container>
 </v-main>
 <v-footer app inset>The v-footer</v-footer>
</v-app>
`,
    methods: {
    }
});
