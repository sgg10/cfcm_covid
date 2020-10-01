import { mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations('error', ['SET_ERROR']),
    setErrors (params) {
      this.SET_ERROR(params)
    }
  }
}
