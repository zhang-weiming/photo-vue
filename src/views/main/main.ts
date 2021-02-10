import Vue from "vue";
import Home from "./Home.vue";
import "@/registerServiceWorker";
import router from "@/router";
import store from "@/store";

// plugins
import "@/plugins/element";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(Home)
}).$mount("#app");
