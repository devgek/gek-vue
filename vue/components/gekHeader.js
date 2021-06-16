Vue.component("gek-header", {
  props: {
    mainHeader: {
      type: String,
      required: true,
    },
  },
  template:
    /*html*/
    `
    <v-app-bar app >
      <v-app-bar-nav-icon @click.stop="switchDrawer"></v-app-bar-nav-icon>

      <v-toolbar-title>{{ mainHeader }}</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-menu open-on-hover bottom left offset-y>
        <template v-slot:activator="{ on, attrs, value }">
          <v-btn text color="primary" v-bind="attrs" v-on="on" value="value">
            <v-icon>mdi-account-outline</v-icon>
            <span v-if="user">{{ user }}</span>
          </v-btn>
        </template>
        <v-list-item >
          <v-list-item-content>
              <v-list-item-title class="title">
              {{$t("app.user.menuHeader")}} 
              </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list nav dense>
          <v-list-item link>
            <v-list-item-title @click="logout">{{$t("nav.logout")}}</v-list-item-title>
            <v-icon>mdi-logout</v-icon>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
`,
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
    switchDrawer() {
      this.$store.state.navDrawer = !this.$store.state.navDrawer;
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
  },
});
