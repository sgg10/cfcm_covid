<template>
  <div>
    <b-container>
      <b-form @submit.prevent="reservar">
        <b-row>
          <b-col>
            <b-form-group label="Niño/Niña" id="input-group-4">
              <b-form-checkbox v-model="esNino">¿Es Niñ@?</b-form-checkbox>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label="Nombre Completo:">
              <b-form-input type="text" placeholder="Nombre" class="input" required v-model="name"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label="Edad">
              <b-form-input type="number" placeholder="Cupos"
              :state="edades"
              class="input" required v-model="edad"></b-form-input>
              <b-form-invalid-feedback :state="edades">
                Esta edad no esta permitida
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group id="input-group-3" label="Tipo de documento:">
              <b-form-select
                v-model="tipoDoc"
                :options="docOptions"
                required
              ></b-form-select>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label="Numero de documento">
              <b-form-input type="number" placeholder="documento"
              class="input" required v-model="documento"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group label="Correo electronico (Opcional):">
              <b-form-input type="text" placeholder="Correo" class="input" v-model="email"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-button variant="success" type="submit">Reservar</b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-container>
  </div>
</template>

<script>
import { create, getAll, getById, update } from '../../backend/Controllers/FirestoreController'
import { showToast } from '../../utils'
export default {
  name: 'PersonalForm',
  props: ['idCulto'],
  data () {
    return {
      name: '',
      edad: 0,
      esNino: false,
      tipoDoc: '',
      docOptions: ['Cedula', 'Tarjeta de identidad', 'Pasaporte'],
      documento: 0,
      email: ''
    }
  },
  computed: {
    edades () {
      if (this.esNino && this.edad >= 3 && this.edad <= 10) {
        return true
      } else if (!this.esNino && this.edad > 10 && this.edad <= 59) {
        return true
      }
      return false
    }
  },
  methods: {
    async reservar () {
      try {
        const query = await getAll('Reservas').where('documento', '==', this.documento).where('culto', '==', this.idCulto).get()
        if (query.empty) {
          const culto = await getById('Cultos', this.idCulto).get()
          const dataCulto = { ...culto.data() }

          let permiso = true
          let msg = ''

          if ((dataCulto.cupoAdultos + dataCulto.cupoNinos) > 0) {
            if (this.esNino && dataCulto.cupoNinos === 0) {
              permiso = false
              msg = 'No hay cupo para niños'
            }
            if (!this.esNino && dataCulto.cupoAdultos === 0) {
              permiso = false
              msg = 'No hay cupo para adultos'
            }
          } else {
            permiso = false
            msg = 'No quedan cupos diponibles'
          }

          if (permiso) {
            if (this.esNino) {
              dataCulto.cupoNinos--
            } else {
              dataCulto.cupoAdultos--
            }
            await create('Reservas', {
              name: this.name,
              edad: parseInt(this.edad),
              esNino: this.esNino,
              tipoDoc: this.tipoDoc,
              documento: this.documento,
              email: this.email,
              culto: this.idCulto,
              asistio: false
            })
            await update('Cultos', this.idCulto, dataCulto)
            this.$router.push({ name: 'Home' })
          } else {
            showToast(this.$bvToast, 'Error', msg, 'danger')
          }
        } else {
          showToast(this.$bvToast, 'Error', 'Ya tienes una reserva para este culto', 'danger')
        }
      } catch (error) {
        showToast(this.$bvToast, 'Error', error.message, 'danger')
      }
    }
  }
}
</script>
