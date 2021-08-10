import Vue from 'vue'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import Vuetify from 'vuetify/lib'
import I18n from './i18n.js'

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
    t: (key, ...params) => I18n.t(key, params),
  },
  icons: {
    iconfont: 'mdi', // default - only for display purposes
  },
});
