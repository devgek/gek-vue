<template>
  <v-app>
    <GekNav></GekNav>
    <GekAppBar mainHeader="Entity Frontend mit Vuetify"></GekAppBar>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-footer app inset>
      <v-spacer />
      <GekErrorMessage />
    </v-footer>
  </v-app>
</template>

<script>
import GekNav from '../components/GekNav.vue';
import GekAppBar from '../components/GekAppBar.vue'
import GekErrorMessage from '../components/GekErrorMessage.vue'

export default {
  components: {
    GekNav, GekAppBar, GekErrorMessage
  }
}
</script>
