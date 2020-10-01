import Vue from 'vue'
import Vuex from 'vuex'
import loading from './modules/loading'
import error from './modules/error'
import auth from './modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    loading,
    error,
    auth
  }
})
