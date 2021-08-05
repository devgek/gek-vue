export default {
    // called by Vue.use(FirstPlugin)
    install(Vue, options) {
        Vue.myPlugin = "gekentities-vue";
        console.log("gekentities-vue.js called with options:", "plugin options", options);

        Vue.mixin({
            beforeCreate() {
              console.log("beforeCreateMixin:", this);
              this.$options.gekEntityPlugin = "loaded";
            }
          });
    }
 }