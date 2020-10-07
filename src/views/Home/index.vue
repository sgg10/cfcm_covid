<template>
  <div class="home">
    <Informacion />
    <FirstFrom/>
  </div>
</template>

<script>
import FirstFrom from './FirstForm'
import Informacion from './Informacion'
export default {
  name: 'Home',
  components: { FirstFrom, Informacion }
}
</script>
