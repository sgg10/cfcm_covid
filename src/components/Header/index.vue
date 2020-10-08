<template>
  <div class="header-bar">
    <div class="navigation-bar">
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand :to="{ name: 'Home' }">
          <img src="@/assets/img/logo.png" alt="Logo CFC" width="150">
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav v-if="user">

          <b-navbar-nav>
            <b-nav-item @click="$router.push({name: 'Admin'})">Escritorio</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
              <b-nav-item-dropdown right>
                  <!-- Using 'button-content' slot -->
                  <template v-slot:button-content>
                      <b-avatar></b-avatar>
                  </template>
                  <b-dropdown-item @click="logOut">Cerrar sesión</b-dropdown-item>
              </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </div>
</template>

<script>
import { auth } from 'firebase'
import { signOut } from '../../backend/Controllers/AuthController'

export default {
  name: 'Header',
  data () {
    return {
      user: null
    }
  },
  created () {
    // eslint-disable-next-line
    auth().onAuthStateChanged(async user => this.user = user || null)
  },
  computed: {
  },
  methods: {
    logOut () {
      signOut()
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>
