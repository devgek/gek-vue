import Vue from 'vue';
import VueI18n from 'vue-i18n'
import myMessages from './messages-de.js'

Vue.use(VueI18n)

// Create VueI18n instance with options
export default new VueI18n({
  locale: "de", // set locale
  messages: myMessages, // set locale messages
});
