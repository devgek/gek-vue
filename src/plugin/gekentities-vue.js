export default {
    // called by Vue.use(FirstPlugin)
    install(Vue, options) {
        Vue.$store.state.myPlugin = "gekentities-vue";
        console.log("gekentities-vue.js:", "vue options", options);
    }
 }