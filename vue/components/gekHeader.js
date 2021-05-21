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
    <v-toolbar dense>
    <v-app-bar-nav-icon></v-app-bar-nav-icon>

    <v-toolbar-title>{{ mainHeader }}</v-toolbar-title>

    <v-spacer></v-spacer>
    <v-menu open-on-hover bottom left offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn text outlined color="primary" v-bind="attrs" v-on="on">
          <v-icon>mdi-account-outline</v-icon>
          {{ user.name }}
        </v-btn>
      </template>

      <v-list>
        <v-list-item link>
          <v-list-item-title @click="logout">Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    </v-toolbar>
`,
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
  },
});
