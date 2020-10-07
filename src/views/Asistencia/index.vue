<template>
  <div>
    <h2>Asistencia</h2>
    <div v-if="!encontrado" class="text-left">
      <b-row>
        <b-col>
          <b-form-group id="input-group-3" label="Culto:">
            <b-form-select
              v-model="cultoSeleccionado"
              :options="cultos"
              required
            ></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group label="Numero de documento">
            <b-form-input type="number" placeholder="documento"
            class="input" required v-model="documento"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-button @click="buscar" variant="success" size="lg" class="mt-4">Buscar</b-button>
        </b-col>
      </b-row>
    </div>
    <div v-else class="text-left">
      <b-container>
        <b-form @submit.prevent="ingresar">
          <b-form-group label="Temperatura: ">
            <b-form-input type="number" placeholder="Temperatura"
            class="input" required v-model="temperatura"></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="success" size="lg" class="mt-4">Ingresar</b-button>
        </b-form>
      </b-container>
    </div>
  </div>
</template>

<script>
import { getAll, update } from '../../backend/Controllers/FirestoreController'
import { mapGetters, mapMutations } from 'vuex'
import { showToast } from '../../utils'
export default {
  name: 'Asistencia',
  data () {
    return {
      cultos: [],
      cultoSeleccionado: '',
      documento: '',
      encontrado: false,
      reserva: {},
      temperatura: 0
    }
  },
  methods: {
    ...mapMutations('loading', ['SET_LOADING']),
    async buscar () {
      try {
        const result = await getAll('Reservas').where('documento', '==', this.documento).where('culto', '==', this.cultoSeleccionado.id).get()
        if (!result.empty) {
          if (!result.docs[0].data().asistio) {
            this.encontrado = true
            this.reserva = { ...result.docs[0].data(), id: result.docs[0].id }
          } else {
            showToast(this.$bvToast, 'Error', 'Esta persona ya ingreso al culto', 'warning')
          }
        } else {
          showToast(this.$bvToast, 'Error', 'La persona no tiene reserva para este culto', 'warning')
        }
      } catch (error) {
        showToast(this.$bvToast, 'Error', error.message, 'danger')
      }
    },
    async ingresar () {
      try {
        await update('Reservas', this.reserva.id, { asistio: true, temperatura: parseInt(this.temperatura) })
        this.cultoSeleccionado = ''
        this.documento = ''
        this.encontrado = false
        this.reserva = {}
        this.temperatura = 0
        showToast(this.$bvToast, 'Tarea finalizada', 'Se ha registardo el ingreso de la persona correctamente', 'success')
      } catch (error) {
        showToast(this.$bvToast, 'Error', error.message, 'danger')
      }
    }
  },
  async created () {
    try {
      // this.SET_LOADING(true)
      const result = await getAll('Cultos').get()
      this.cultos = result.docs.map(c => ({
        value: { ...c.data(), id: c.id },
        text: `${c.data().date} || ${c.data().hour}`
      }))
    } catch (error) {
      showToast(this.$bvToast, 'Error', 'No se han podido realizar las consultas, intenta de nuevo', 'danger')
    }
  },
  computed: {
    ...mapGetters('loading', ['isLoading'])
  }
}
</script>
