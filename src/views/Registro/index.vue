<template>
  <div>
    <Personalform :idCulto="$route.params.idCulto" />
  </div>
</template>

<script>
import Personalform from './PersonalForm'
export default {
  name: 'Registro',
  components: { Personalform }
}
</script>
