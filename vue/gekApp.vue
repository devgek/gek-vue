<template>
  <div id="GekAppRoot">
    <div>before app router-view</div>
    <div>{{ player }}</div>
    <router-view></router-view>
    <div>after app router-view</div>
  </div>
</template>
<script>

import Vuex from 'vuex';

export default {
  methods: {},
  computed: {
    ...Vuex.mapGetters("player", ["getPlayer"]),
    player() {
      return this.getPlayer + " and " + this.$store.state.myXX;
    }
  },
  created() {
    console.log("gekApp created");
    // eslint-disable-next-line no-unused-vars
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === "LOGOUT") {
        console.log("logout catched in gek-app");
        this.$router.push({ name: "Login"})
        .then(() => console.log('Navigated to Login after Logout!'))
        .catch(() => console.log('Catched router push'))
      }
    });
  },
  mounted() {
    console.log("gekApp mounted");
  },
  beforeDestroy() {
    console.log("gek-app destroyed");
    this.unsubscribe();
  },
};
</script>
