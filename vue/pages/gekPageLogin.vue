<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex md3>
        <v-card class="elevation-12">
          <form @submit.prevent="onSubmit">
            <v-toolbar dark color="primary">
              <v-toolbar-title>{{ $t("app.title") }}</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-card-subtitle>{{ mainHeader }}</v-card-subtitle>
              <v-text-field
                prepend-icon="mdi-account"
                v-model="user"
                :label="$t('form.login.label.user')"
                type="text"
              ></v-text-field>
              <v-text-field
                id="password"
                prepend-icon="mdi-lock"
                v-model="pass"
                :label="$t('form.login.label.password')"
                type="password"
              ></v-text-field>
              <div v-if="errorMessage" class="error--text">
                {{ errorMessage }}
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" type="submit">
                <v-icon>mdi-login</v-icon>
                {{ $t("form.login.button.login") }}
              </v-btn>
            </v-card-actions>
          </form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  props: {
    mainHeader: {
      type: String,
      default: "",
    },
    startPage: {
      type: String,
      default: "/noStartPage",
    },
  },
  created() {
    console.log("GekPageLogin created");
  },
  mounted() {
    console.log("GekPageLogin mounted");
  },
  data() {
    return {
      user: "",
      pass: "",
      errorMessage: null,
    };
  },
  methods: {
    onSubmit() {
      if (this.user === "" || this.pass === "") {
        this.errorMessage = this.$t("form.login.msg.inputrequired");
        return;
      }

      this.errorMessage = "vor login senden";
      console.log("vor login senden");
      this.$store
        .dispatch("login", {
          user: this.user,
          pass: this.pass,
        })
        .then(() => {
          console.log("login senden vor router.push");
          this.$router.push({ name: this.startPage });
          console.log("login senden nach router.push");
        })
        .catch((err) => {
          console.log("login senden error", err);
          this.errorMessage = err.response.data;
        });
    },
  },
  computed: {},
};
</script>
