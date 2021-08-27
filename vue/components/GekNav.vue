<template>
  <v-navigation-drawer app :value="theDrawer">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title"> {{ $t("app.title") }} </v-list-item-title>
        <v-list-item-subtitle> {{ $t("app.subtitle") }} </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-group :value="false" prepend-icon="mdi-gauge">
        <template v-slot:activator>
          <v-list-item-title dense>{{ $t("nav.pages.header") }}</v-list-item-title>
        </template>

        <v-list-item link dense to="/page1">
          <v-list-item-title>{{ $t("nav.pages.page1") }}</v-list-item-title>
        </v-list-item>
      </v-list-group>

      <v-list-group :value="false" prepend-icon="mdi-account-cog-outline">
        <template v-slot:activator>
          <v-list-item-title dense>{{ $t("nav.admin.header") }}</v-list-item-title>
        </template>

        <v-list-item link dense to="/admin/user">
          <v-list-item-title>{{ $t("nav.admin.user") }}</v-list-item-title>
        </v-list-item>
        <v-list-item link dense to="/admin/contact">
          <v-list-item-title>{{ $t("nav.admin.contact") }}</v-list-item-title>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {},
  computed: {
    theDrawer() {
      return this.$store.state.navDrawer;
    },
  },
};
</script>

