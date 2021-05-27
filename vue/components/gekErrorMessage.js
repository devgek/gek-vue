Vue.component("gek-error-message", {
  props: {},
  template:
    /*html*/
 `
 <v-snackbar v-if="message" 
      dense 
      :timeout="3000"
      :value="true"
      :color="message.type"
      outlined 
      right
    >
    {{message.msg}}
    </v-snackbar>
 
`,
  data() {
    return {};
  },
  created() {
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === "SET_MESSAGE") {
        console.log(`catching message from store: ${state.message}`);
      }
    });

    if (this.$store.state.message) {
      this.showMessage();
    }
  },
  beforeDestroy() {
    this.unsubscribe();
  },
  methods: {
    showMessage() {
      const $toast = $(".toast[data-toastid='errorMessageToast']");
      $toast.toast("show");
    },
  },
  computed: {
    message() {
      var msg = this.$store.state.message;
      if (msg && msg.i18n) {
        msg.msg = this.$t(msg.i18n, msg.i18nArgs);
      }

      return msg;
    },
  },
});
