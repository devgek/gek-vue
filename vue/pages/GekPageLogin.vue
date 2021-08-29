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

import {GekEntityService} from "@/services/GekEntityService";

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

      GekEntityService.login({user: this.user, pass: this.pass})
        .then(() => {
          this.$router.push({ name: this.startPage });
        })
        .catch((err) => {
          this.errorMessage = err.response.data;
        });
    },
  },
  computed: {},
};
</script>
