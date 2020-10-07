<template>
  <div>
    <b-container>
      <b-form @submit.prevent="continuar">
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
        <b-row v-if="cultoSeleccionado">
          <b-col>
            <p><strong>Cupos Adultos Disponibles: </strong>{{ cultoSeleccionado.cupoAdultos }}</p>
            <p><strong>Cupos Niños Disponibles: </strong>{{ cultoSeleccionado.cupoNinos }}</p>
          </b-col>
        </b-row>
        <!-- <b-row>
          <b-col>
            <b-form-group label="Personas que desea registrar">
              <b-form-input type="number" placeholder="Cupos"
              :state="parseInt(cantPersonas) <= cultoSeleccionado.cupoAdultos + cultoSeleccionado.cupoNinos && parseInt(cantPersonas) <= 5 && parseInt(cantPersonas) > 0"
              class="input" required v-model="cantPersonas"></b-form-input>
              <b-form-invalid-feedback :state="parseInt(cantPersonas) <= cultoSeleccionado.cupoAdultos + cultoSeleccionado.cupoNinos && parseInt(cantPersonas) <= 5 && parseInt(cantPersonas) > 0">
                Maximo 5 personas y no puedes exceder el cupo disponible
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row> -->
        <b-row>
          <b-col>
            <b-button type="submit" variant="success">Continuar</b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-container>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { getAll } from '../../backend/Controllers/FirestoreController'
import { showToast } from '../../utils'
export default {
  name: 'FirstForm',
  data () {
    return {
      cultos: [],
      cultoSeleccionado: '',
      cantPersonas: 0
    }
  },
  computed: {
    ...mapGetters('loading', ['isLoading'])
  },
  methods: {
    ...mapMutations('loading', ['SET_LOADING']),
    continuar () {
      if ((this.cultoSeleccionado.cupoAdultos + this.cultoSeleccionado.cupoNinos) > 0) {
        this.$router.push({ name: 'Registro', params: { idCulto: this.cultoSeleccionado.id } })
      } else {
        showToast(this.$bvToast, 'Error', 'No hay cupos disponibles para este culto', 'danger')
      }
    }
  },
  created () {
    try {
      getAll('Cultos').where('abierto', '==', true).get().then(result => {
        if (!result.empty) {
          this.cultos = result.docs.map(c => ({
            value: { ...c.data(), id: c.id },
            text: `${c.data().date} || ${c.data().hour}`
          }))
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
