<template>
  <div>
    <b-navbar class="navbar-main" toggleable="lg" type="dark">
      <b-navbar-brand href="#">
        <nuxt-link to="/">
          <img class="logoImg" src="/img/logo-white.png" height="20" alt="">
        </nuxt-link>
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse" />
      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-text v-if="loginStatus">
            <span>{{ user.learningPoints }} LP</span>
            <span>{{ user.teachingPoints }} TP</span>
            <span>{{ user.balance }} $</span>
          </b-nav-text>
          <b-nav-item-dropdown v-if="loginStatus" right>
            <!-- Using 'button-content' slot -->
            <template slot="button-content">
              <i class="fa fa-bars" />
              <span v-if="getUnreadNotification()>0">
                <b-badge variant="light">{{ getUnreadNotification() }}
                  <span class="sr-only">unread messages</span>
                </b-badge>
              </span>
            </template>
            <nuxt-link class="dropdown-item" to="/notifications/">
              Notifications
              <span v-if="getUnreadNotification()>0">
                <b-badge variant="light">{{ getUnreadNotification() }}
                  <span class="sr-only">unread messages</span>
                </b-badge>
              </span>
            </nuxt-link>
            <nuxt-link class="dropdown-item" to="/community-selection/">
              Community Selection
            </nuxt-link>
            <b-dropdown-item @click="logOut">
              Sign Out
            </b-dropdown-item>
          </b-nav-item-dropdown>

          <p v-if="!loginStatus" class="control">
            <nuxt-link class="btn btn-primary" to="/login">
              <span class="icon is-small">
                <i class="fa fa-unlock-alt" />
              </span>
              <span>
                Login
              </span>
            </nuxt-link>
          </p>

          <p v-if="!loginStatus" class="control">
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
      user: 'user',
      loginStatus: 'loginStatus',
      lcData: 'content/lcData',
      userNotifications: 'userNotifications'
    })
  },
  // created() {
  //   if (!this.userLoggedIn) {
  //     this.$store.dispatch('setAuthStatus')
  //   }
  // },
  methods: {
    logOut() {
      this.$store.dispatch('logOut')
      this.$router.push('/community-selection')
    },
    getUnreadNotification() {
      let notifications = 0
      if (this.userNotifications) {
        console.log(Object.values(this.userNotifications).length)
        for (let index = 0; index < Object.values(this.userNotifications).length; index++) {
          if (!Object.values(this.userNotifications)[index].notificationRead) {
            notifications++
          }
        }
      }
      return notifications
    }
  }
}
</script>
<style scoped>
/* .navbar-main{
  background:#53d1af;
} */
.community-title{
  text-align: center;
}
.logoImg{
  vertical-align: unset;
}
</style>
