<template>
  <div>
    <b-navbar :style="{ background: lcData.gradient }" toggleable="lg" type="dark">
      <b-navbar-brand href="#">
        <nuxt-link to="/">
          <img class="logoImg" src="/img/logo-white.png" height="20" alt="">
        </nuxt-link>
      </b-navbar-brand>
      <b-nav-text class="community-title">
        <span class="nav-divider" />
        {{ lcData.name }}
      </b-nav-text>
      <b-navbar-toggle target="nav-collapse" />
      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto userPoints">
          <b-nav-item v-if="loginStatus">
            <i v-b-modal.modal-1 class="fa fa-bars fa-lg" />
            <b-modal
              id="modal-1"
              title="MENU"
              header-text-variant="light"
              hide-footer
            >

              <nuxt-link class="dropdown-item" to="/bounties/">
                Bounties
              </nuxt-link>
              <nuxt-link class="dropdown-item" to="/community-selection/">
                Community Selection
              </nuxt-link>
              <nuxt-link class="dropdown-item" to="/notifications/">
                Notifications
                <b-badge v-if="getUnreadNotification()>0" class="badge-notification-menu">
                  {{ getUnreadNotification() }}
                  <span class="sr-only">unread messages</span>
                </b-badge>
              </nuxt-link>
              <nuxt-link class="dropdown-item" to="/profile/">
                Profile
              </nuxt-link>
              <a class="dropdown-item" @click="logOut">
                Sign Out
              </a>
            </b-modal>
            <b-badge v-if="getUnreadNotification()>0" class="badge-notification-nav">
              {{ getUnreadNotification() }}
              <span class="sr-only">unread messages</span>
            </b-badge>
          </b-nav-item>

          <div v-if="!loginStatus">
            <nuxt-link class="login-link btn" to="/login">
              <span>
                Login
              </span>
            </nuxt-link>
          </div>

          <div v-if="!loginStatus">
            <nuxt-link class="btn btn-white-outline" to="/signup">
              <span>Sign up</span>
            </nuxt-link>
          </div>
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
    },
    getSectionName(route) {
      console.log(route)
      if (route.name === 'notifications') {
        return 'Notifications'
      }
      if (route.name === 'community-selection') {
        return 'Community Selection'
      }
      if (route.name === 'bounties') {
        return 'Bounties'
      }
      if (route.name === 'profile') {
        return 'Profile'
      }
    }
  }
}
</script>
<style scoped>
/* .navbar-main{
  background:#53d1af;
} */
.community-title{
  color: white;
  font-size: 21px;
  font-weight: 700;
}
.dropdown-item {
  font-size: 19px;
  font-weight: 700;
  color: rgba(217,217,217,1.00)!important;
}

.dropdown-item:hover{
  color: #53d1af!important;
  background: #53d1af09;
  border-radius: 25px;
}

.logoImg{
  vertical-align: unset;
}

.login-link {
  color: white;
  font-weight: 700;
  font-size: 1rem;
  padding: 10px 30px;
}

.login-link:hover{
  color: rgba(255, 255, 255, 0.8);
}

.nav-divider{
  padding-left: 1em;
  margin-left: 10px;
  border-left: 2px solid rgba(255,255,255,0.5);
}

.userPoints{
  font-size: 19px;
}
</style>
