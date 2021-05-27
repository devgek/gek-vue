const vuetify = new Vuetify({
  theme: {
    light: true,
    themes: {
      light: {
        // primary: "#CDDC39",
      },
    },
  },
  lang: {
    t: (key, ...params) => i18n.t(key, params),
  },
});

const app = new Vue({
  i18n: i18n,
  store: store,
  router: router,
  el: "#app",
  vuetify: vuetify,
  data: {
    user: "",
    token: "",
    isAdmin: false,
  },
  created() {
    // this.$vuetify.dataTable.itemsPerPageText = "maxi";
    const userString = localStorage.getItem("user");
    if (userString) {
      const userData = JSON.parse(userString);
      this.$store.commit("SET_USER_DATA", userData);
    }
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        console.log(
          "axios error: " + error.response.status + error.response.data
        );
        if (error.response.status === 401) {
          this.$store.dispatch("logout");
        }
        return Promise.reject(error);
      }
    );
  },
});
