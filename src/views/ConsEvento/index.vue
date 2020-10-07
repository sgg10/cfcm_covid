<template>
  <div class="text-left">
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
      <b-col cols="3" v-if="cultoSeleccionado">
        <b-button @click="consultar" class="mt-3" size="lg" variant="success">Ver asistencia</b-button>
      </b-col>
      <b-col cols="3" v-if="cultoSeleccionado.abierto">
        <b-button @click="cerrar" class="mt-3" size="lg" variant="danger">Cerrar Culto</b-button>
      </b-col>
    </b-row>
    <b-row class="justify-content-md-center mt-3">
      <b-col cols="12" md="auto">
        <div v-for="(item, index) in reservas" :key="index">
          <b-button @click="showReserva(item)" class="mb-3 mx-3" variant="info">{{ item.name }} | {{ item.documento }}</b-button>
        </div>
        <b-modal id="modalReserva" :title="`Reserva - ${reservaSeleccionada.id}`">
          <p><strong>Nombre: </strong> {{ reservaSeleccionada.name }}</p>
          <p><strong>N. Documento: </strong>{{ reservaSeleccionada.documento }}</p>
          <p><strong>Tipo Documento: </strong>{{ reservaSeleccionada.tipoDoc }}</p>
          <p v-if="reservaSeleccionada.esNino"><strong>¿Es niñ@?: </strong>Si</p>
          <p><strong>Temperatura: </strong>{{ reservaSeleccionada.temperatura }}</p>
        </b-modal>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { getAll, update } from '../../backend/Controllers/FirestoreController'
import { showToast } from '../../utils'
export default {
  name: 'ConsEvento',
  data () {
    return {
      cultos: [],
      cultoSeleccionado: '',
      reservas: [],
      reservaSeleccionada: {}
    }
  },
  methods: {
    async cerrar () {
      try {
        await update('Cultos', this.cultoSeleccionado.id, { abierto: false })
        showToast(this.$bvToast, 'Culto cerrado', 'Se ha cerrado el culto exitosamente', 'success')
        this.cultoSeleccionado = ''
        await this.getCultos()
      } catch (error) {
        showToast(this.$bvToast, 'Error', error.message, 'danger')
      }
    },
    async consultar () {
      try {
        const result = await getAll('Reservas').where('asistio', '==', true).where('culto', '==', this.cultoSeleccionado.id).get()
        this.reservas = result.docs.map(r => ({ ...r.data(), id: r.id }))
      } catch (error) {
        showToast(this.$bvToast, 'Error', error.message, 'danger')
      }
    },
    showReserva (item) {
      this.reservaSeleccionada = item
      this.$bvModal.show('modalReserva')
    },
    async getCultos () {
      try {
        const result = await getAll('Cultos').get()
        this.cultos = result.docs.map(c => ({
          value: { ...c.data(), id: c.id },
          text: `${c.data().date} || ${c.data().hour}`
        }))
      } catch (error) {
        showToast(this.$bvToast, 'Error', 'No se han podido realizar las consultas, intenta de nuevo', 'danger')
      }
    }
  },
  async created () {
    await this.getCultos()
  }
}
</script>
