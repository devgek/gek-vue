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
export default {
  data() {
    return {
      showMessage: false,
    };
  },
  created() {
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === "SET_MESSAGE") {
        console.log(`catching SET_MESSAGE mutation: ${state.message.type}, ${state.message.i18n},`);
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
    messageText() {
      var msg = this.$store.state.message;
      if (msg && msg.i18n) {
        return this.$t(msg.i18n, msg.i18nArgs);
      }

      return "";
    },
    messageColor() {
      if (this.$store.state.message) {
        return this.$store.state.message.type;
      }

      return "";
    }
  },
};
</script>

