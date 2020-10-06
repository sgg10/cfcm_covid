import { getAll } from '../../backend/Controllers/FirestoreController'

export default {
  namespaced: true,
  state: {
    cultos: [],
    personas: []
  },
  mutations: {
    SET_STATE (state, { name, payload }) {
      state[name] = payload
    }
  },
  actions: {
    FETCH_CULTOS: ({ commit }) => new Promise((resolve, reject) => {
      try {
        let result = null
        getAll('Cultos').get().then((res) => {
          if (!res.empty) {
            result = res.docs.map(c => ({
              value: c.id,
              text: `${c.data().name} | ${c.data().date}`,
              data: c.data()
            }))
          }
        }).catch(error => console.log(error))
        commit('SET_STATE', { payload: result, name: 'cultos' })
        resolve()
      } catch (error) {
        reject(new Error(error))
      }
    }),
    FETCH_PERSONAS: ({ commit }) => new Promise((resolve, reject) => {
      try {
        //
      } catch (error) {
        reject(new Error(error))
      }
    })
  },
  getters: {
    cultos: state => state.cultos
  }
}
