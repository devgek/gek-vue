<template>
  <v-snackbar
    dense
    :timeout="3000"
    v-model="showMessage"
    :color="messageColor"
    outlined
    right
  >
    {{ messageText }}
  </v-snackbar>
</template>
<script>

import Vuex from "vuex";

export default {
  data() {
    return {
      showMessage: false,
    };
  },
  created() {
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === "SET_MESSAGE") {
        // console.log(`catching SET_MESSAGE mutation: ${state.message.type}, ${state.message.i18n},`);
        console.log(`catching SET_MESSAGE mutation: ${state.es.message.type}, ${state.es.message.i18n},`);
        this.showMessage = true;
      }
    });
  },
  beforeDestroy() {
    this.unsubscribe();
  },
  methods: {
  },
  computed: {
    ...Vuex.mapGetters(["getMessage"]),
    messageText() {
      var msg = this.getMessage;
      if (msg && msg.i18n) {
        return this.$t(msg.i18n, msg.i18nArgs);
      }

      return "";
    },
    messageColor() {
      if (this.getMessage) {
        return this.getMessage.type;
      }

      return "";
    }
  },
};
</script>

