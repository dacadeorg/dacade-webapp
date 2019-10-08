<template>
  <div>
    <b-navbar
      :class="{'navbar-green': $route.name === 'index' }"
      class="navbar-main"
      toggleable="lg"
      type="dark"
    >
      <b-navbar-brand href="#" class="desktop-only">
        <nuxt-link to="/">
          <img class="logoImg" src="/img/logo-white.png" height="20" alt="">
        </nuxt-link>
      </b-navbar-brand>
      <b-nav-text class="community-title">
        <span v-if="$route.name === 'index'" />
        <span v-else class="nav-divider desktop-only" />
        {{ getSectionName($route) }}
      </b-nav-text>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto userPoints">
        <b-nav-item v-if="loginStatus">
          <b-nav-text v-if="$route.name != 'index'" class="mr-2 muted-dark">
            <b class="earning-color">{{ getBalance() }}$</b>
          </b-nav-text>
          <i v-b-modal.modal-1 class="fa fa-bars fa-lg" />
          <b-modal
            id="modal-1"
            title="Menu"
            header-text-variant="light"
            hide-footer
          >
            <nuxt-link class="dropdown-item" to="/bounties/">
              Bounties
            </nuxt-link>
            <nuxt-link class="dropdown-item" to="/communities/">
              Communities
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
          <nuxt-link class="btn btn-white-outline signup-link" to="/signup">
            <span>Sign up</span>
          </nuxt-link>
        </div>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'

export default {
  computed: {
    userLoggedIn(params) {
      return this.$store.getters.loginStatus
    },
    ...mapGetters({
      user: 'user',
      loginStatus: 'loginStatus',
      communityData: 'content/communityData',
      userNotifications: 'userNotifications',
      userBalance: 'userBalance'
    })
  },
  methods: {
    logOut() {
      this.$store.dispatch('logOut')
      this.$router.push('/communities')
    },
    getUnreadNotification() {
      let notifications = 0
      if (this.userNotifications) {
        for (let index = 0; index < Object.values(this.userNotifications).length; index++) {
          if (!Object.values(this.userNotifications)[index].notificationRead) {
            notifications++
          }
        }
      }
      return notifications
    },
    getBalance() {
      let balance = 0
      if (this.user && this.userBalance) {
        for (const key in this.userBalance) {
          balance = balance + this.userBalance[key]
        }
      }
      return balance
    },
    getSectionName(route) {
      if (route.name === 'notifications') {
        return 'Notifications'
      }
      if (route.name === 'communities') {
        return 'Communities'
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

a:not([href]):not([tabindex]){
  color: rgba(217,217,217,1.00);
  cursor: pointer;
}

a:not([href]):not([tabindex]):hover{
  color: #53d1af;
}

.community-title{
  color: white;
  font-size: 21px;
  font-weight: 700;
}
.dropdown-item {
  font-size: 19px;
  font-weight: 700;
  color: rgba(217,217,217,1.00);
}

.dropdown-item a:hover{
  color: #53d1af;
}

.dropdown-item:hover{
  color: #53d1af;
  background: none;
  border-radius: 25px;
  font-size: 1.3em;
  margin-left: 0.3em;
}

a.nuxt-link-active{
  color: #53d1af;
  background: none;
  border-radius: 25px;
  font-size: 1.3em;
  margin-left: 0.3em;
}

a.nuxt-link-active:hover{
  color: #53d1af;
  background: none;
  border-radius: 25px;
  font-size: 1.3em;
  margin-left: 0.3em;
  cursor: default;
}

.login-link {
  color: white;
  font-weight: 700;
  font-size: 1rem!important;
  padding: 10px 30px;
}

.login-link:hover{
  color: rgba(255, 255, 255, 0.8);
}

.logoImg{
  vertical-align: unset;
}

.nav-divider{
  padding-left: 1em;
  margin-left: 10px;
  border-left: 2px solid rgba(255,255,255,0.5);
}

.navbar-green{
  background: #53d1af;
}

.signup-link {
  font-size: 1rem!important;
}

.userPoints{
  font-size: 19px;
}
</style>
