<template>
  <div>
    <b-navbar class="navbar-main" toggleable="lg" type="dark">
      <b-navbar-brand href="#">
        <img src="/img/logo-white.png" height="30" alt="">
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse" />
      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-text v-if="userLoggedIn">
            <span>{{ user.learningPoints }} LP</span>
            <span>{{ user.teachingPoints }} TP</span>
            <span>{{ user.balance }} $</span>
          </b-nav-text>
          <b-nav-item-dropdown v-if="userLoggedIn" right>
            <!-- Using 'button-content' slot -->
            <template slot="button-content">
              <i class="fa fa-bars" />
            </template>
            <nuxt-link class="dropdown-item" to="/community-selection/">
              Community Selection
            </nuxt-link>
            <b-dropdown-item @click="logOut">
              Sign Out
            </b-dropdown-item>
          </b-nav-item-dropdown>

          <p v-if="!userLoggedIn" class="control">
            <nuxt-link class="btn btn-primary" to="/login">
              <span class="icon is-small">
                <i class="fa fa-unlock-alt" />
              </span>
              <span>
                Login
              </span>
            </nuxt-link>
          </p>

          <p v-if="!userLoggedIn" class="control">
            <nuxt-link class="btn btn-primary" to="/signup">
              <span class="icon is-small">
                <i class="fa fa-user-o" />
              </span>
              <span>Sign up</span>
            </nuxt-link>
          </p>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
    }
  },
  computed: {
    userLoggedIn() {
      return this.$store.getters.loginStatus
    },
    ...mapGetters({
      user: 'user'
    })
  },
  created() {
    if (!this.userLoggedIn) {
      this.$store.dispatch('setAuthStatus')
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('logOut')
      this.$router.push('/community-selection')
    }
  }
}
</script>
<style scoped>
.navbar-main{
  background:#53d1af;
}
</style>
