<template>
  <v-app>
    <GekNav></GekNav>
    <GekHeader mainHeader="Entity Frontend mit Vuetify"></GekHeader>
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
import GekNav from '../components/gekNav.vue';
import GekHeader from '../components/gekHeader.vue'
import GekErrorMessage from '../components/gekErrorMessage.vue'

export default {
  components: {
    GekNav, GekHeader, GekErrorMessage
  }
}
</script>
