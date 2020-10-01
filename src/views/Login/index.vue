<template>
  <div>
    <b-form @submit.prevent="signInEmail" class="formAuth">
      <div class="formAuth_container">
        <b-row>
          <b-col>
            <b-form-group label="Email:">
              <b-form-input type="email" placeholder="sample@example.com" class="input" required v-model="email"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group label="Contraseña:">
              <b-form-input type="password" placeholder="*****" class="input" required v-model="pass"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-button type="submit" class="button">Iniciar sesión</b-button>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <div @click="recuperar" class="recuperar" style="cursor: pointer;">
              <strong>¿Olvidaste tu contraseña?</strong>
            </div>
          </b-col>
        </b-row>
      </div>
    </b-form>
  </div>
</template>

<script>
import { signInEmail, changePass } from '../../backend/Controllers/AuthController'
import { showToast } from '../../utils'
import { mapGetters } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      pass: ''
    }
  },
  computed: {
    ...mapGetters('auth', ['user'])
  },
  methods: {
    async signInEmail () {
      try {
        await signInEmail(this.email, this.pass)
        this.$router.push({ name: 'Home' })
      } catch (error) {
        showToast(this.$bvToast, 'Error', error.message, 'danger')
      }
    },
    recuperar () {
      this.email
        ? changePass(this.email).then(() => showToast(this.$bvToast, 'Tarea completa', 'Hemos enviado un correo para cambiar la contraseña', 'success'))
        : showToast(this.$bvToast, 'Advertencia', 'Ingresa tu email en el campo correspondiente', 'warning')
    }
  },
  created () {
    // eslint-disable-next-line no-unused-expressions
    this.user ? this.$router.push({ name: 'Home' }) : null
  }
}
</script>

<style lang="scss" scoped>
  .formAuth{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0px 30px;
    .formAuth_container{
      background: rgba($color: #ffffff, $alpha: 0.3);
      border: 2px solid #707070;
      border-radius: 40px;
      padding: 60px 68px 40px;
      min-height: 700px;
      //width: 500px;
      display: flex;
      margin-top: 50px;
      justify-content: space-around;
      flex-direction: column;
      @media only screen and (max-width: 700px), only screen and (max-device-width: 700px){
        width: 100%;
      }

      .input{
        border-radius: 40px;
      }

      .button{
        height: 50px;
        border-radius: 30px;
        border: none;
        margin: 20px 0px;
        font-size: 16px;
        font-weight: bold;
        color: white;
        letter-spacing: 1px;
        width: 300px;
        background: #0f8f40;
        @media only screen and (max-width: 700px), only screen and (max-device-width: 700px){
          width: 100%;
        }
      }
      .button:hover{
        background: #0c7a37;
      }
    }
  }
</style>
