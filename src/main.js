import Vue from 'vue'

// Plugins
import './plugins/BootstrapVue'
import './plugins/fontAwesome'

import App from './App.vue'
import router from './router'
import store from './store'

// Services
import './backend/Services/Init'

import { auth } from 'firebase'

Vue.config.productionTip = false

let app = null

auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
