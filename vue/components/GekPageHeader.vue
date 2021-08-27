<template>
 <v-card>
  <v-card-title class="gek-bg-page-header primary--text">{{ header() }}</v-card-title>
 </v-card>
</template>
<script>
export default {
  props: {
    headerText: {
      type: String,
      default: "",
    },
    headerKey: {
      type: String,
      default: null,
    }
  },
  data() {
    return {
    };
  },
  methods: {
    header() {
      if (this.headerKey === null) {
        return this.headerText;
      }
      else {
        return this.$t(this.headerKey);
      }
    },
  },
  computed: {
  },
}
</script>
<style scoped>
.gek-bg-page-header {
  /* background-color: #F0F4C3; */
  background-color: #F0F4C3;/*#ECEFF1; blue-grey-lighten-5*/
}
</style>