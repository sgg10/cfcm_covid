<template>
  <div>
    <div class="cards my-5">
      <b-container class="my-3">
        <b-row class="justify-content-md-center">
          <b-col cols="12" md="auto">
            <Card
              title="Programar Culto"
              msg="Genere una nueva reunion donde se podran las usuarios se podran registrar para asistir."
              img="https://firebasestorage.googleapis.com/v0/b/maquillaje-permanente.appspot.com/o/Imgs%2Fcejas-tatuadas_opt-1.png?alt=media&token=6093cbaf-658f-4e3c-8945-767e159523b0"
              @action="procedure = $event;go('ProgEvento')"
            />
          </b-col>
          <b-col cols="12" md="auto">
            <Card
              title="Tomar Asistencia"
              msg="Aquí podra tomar la asistencia de las personas que reservaron para algun culto."
              img="https://firebasestorage.googleapis.com/v0/b/maquillaje-permanente.appspot.com/o/Imgs%2Fcejas-tatuadas_opt-1.png?alt=media&token=6093cbaf-658f-4e3c-8945-767e159523b0"
              @action="procedure = $event;go('Asistencia')"
            />
          </b-col>
          <b-col cols="12" md="auto">
            <Card
              title="Consultar Culto"
              msg="Consulte todos los detalles de cada culto realizado y las personas que asistieron."
              img="https://firebasestorage.googleapis.com/v0/b/maquillaje-permanente.appspot.com/o/Imgs%2Fcejas-tatuadas_opt-1.png?alt=media&token=6093cbaf-658f-4e3c-8945-767e159523b0"
              @action="procedure = $event;go('ConsEvento')"
            />
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'
export default {
  name: 'Admin',
  components: { Card },
  data () {
    return {
      procedure: false
    }
  },
  methods: {
    go (name, params = {}) {
      // eslint-disable-next-line
      this.procedure ? this.$router.push({ name, params: params}) : null
    }
  }
}
</script>

<style lang="scss" scoped>
  .cards{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0px 30px;
    color: rgb(56, 53, 53);
  }
</style>
