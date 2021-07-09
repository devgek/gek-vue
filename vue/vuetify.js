import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

export default new Vuetify({
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
