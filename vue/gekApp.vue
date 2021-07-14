<template>
  <div id="GekApp">
    <div>before app router-view</div>
    <router-view></router-view>
    <div>after app router-view</div>
  </div>
</template>
<script>
export default {
  methods: {},
  created() {
    console.log("gekApp created");
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === "LOGOUT") {
        console.log("logout catched in gek-app");
        this.$router.push({ name: "Login" });
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
