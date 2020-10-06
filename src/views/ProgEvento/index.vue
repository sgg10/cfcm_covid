<template>
  <div class="mt-5">
    <h1>Programar Evento</h1>
    <b-container fluid>
      <b-form @submit.prevent="crear">
        <b-row>
          <b-col>
            <b-form-group label="Nombre del evento:">
              <b-form-input type="text" placeholder="Nombre" class="input" required v-model="name"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group label="Fecha del evento">
              <b-form-datepicker v-model="date" class="mb-2" ></b-form-datepicker>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label="Hora">
              <b-form-input type="text" placeholder="Nombre" class="input" required v-model="hour"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group label="Cupos Adultos">
             <b-form-input type="number" placeholder="Cupos" class="input" required v-model="cupoAdultos"></b-form-input>
            </b-form-group>
            <b-form-group label="Cupos Niños">
             <b-form-input type="number" placeholder="Cupos" class="input" required v-model="cupoNinos"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-button type="submit" variant="success">Crear evento</b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-container>
  </div>
</template>

<script>
import { showToast } from '../../utils'
import { create } from '../../backend/Controllers/FirestoreController'
export default {
  name: 'ProgramarEvento',
  data () {
    return {
      name: '',
      date: '',
      hour: '',
      cupoAdultos: 0,
      cupoNinos: 0
    }
  },
  methods: {
    async crear () {
      try {
        await create('Cultos', { name: this.name, date: this.date, hour: this.hour, cupoAdultos: parseInt(this.cupoAdultos), cupoNinos: parseInt(this.cupoNinos) })
        showToast(this.$bvToast, 'Tarea finalizada', 'El culto se ha creado', 'success')
        this.$router.push({ name: 'Admin' })
      } catch (error) {
        showToast(this.$bvToast, 'Tarea abortada', error.message, 'danger')
      }
    }
  }
}
</script>
