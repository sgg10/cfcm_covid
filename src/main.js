import Vue from 'vue'

// Plugins
import './plugins/BootstrapVue'
import './plugins/fontAwesome'

import App from './App.vue'
import router from './router'
import store from './store'

// Services
import './backend/Services/Init'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
