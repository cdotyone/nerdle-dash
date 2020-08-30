import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

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
  store,
  render: h => h(App)
}).$mount('#app');

