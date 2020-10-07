<template>
  <div class="container">
    <Header class="my-3"/>

    <router-view/>

    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/Header/'
import Footer from '@/components/Footer/'
export default {
  name: 'MainLayout',
  components: { Header, Footer }
}
</script>
