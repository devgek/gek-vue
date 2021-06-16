const gekPageHeader = Vue.component("gek-page-header", {
  props: {
    headerText: {
      type: String,
      default: "",
    },
    headerKey: {
      type: String,
      default: null,
    }
  },
  template:
    /*html*/
    `
 <v-card>
  <v-card-title class="gek-bg-page-header primary--text">{{ header() }}</v-card-title>
 </v-card>
`,
  data() {
    return {
    };
  },
  methods: {
    header() {
      if (this.headerKey === null) {
        return this.headerText;
      }
      else {
        return this.$t(this.headerKey);
      }
    },
  },
  computed: {
  },
});
