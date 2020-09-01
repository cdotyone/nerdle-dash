import Vue from 'vue'
import App from './App.vue'
import router from './router'

import youTube from 'vue-youtube-embed';
Vue.use(youTube, { global: true, componentId: "youtube-media" });

Vue.config.productionTip = false;

(function () {
  let script = document.createElement("script");
  script.setAttribute("src", "https://www.youtube.com/iframe_api")
  document.head.appendChild(script);
})();

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');

