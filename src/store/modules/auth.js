import { getUser } from '../../backend/Controllers/AuthController'

export default {
  namespaced: true,
  state: {
    user: null
  },
  mutation: {
    SET_USER (state) {
      state.user = getUser() || null
    }
  },
  getters: {
    user: state => state.user
  }
}
