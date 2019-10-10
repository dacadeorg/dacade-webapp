<template>
  <div>
    <b-navbar :style="{ background: communityData.gradient }" toggleable="lg" type="dark">
      <b-navbar-brand class="desktop-only">
        <nuxt-link to="/">
          <img class="logoImg pointer" src="/img/logo-white.png" height="20" alt="">
        </nuxt-link>
      </b-navbar-brand>
      <b-navbar-brand v-if="!loginStatus" class="mobile-only">
        <nuxt-link to="/">
          <img class="logoImg pointer" src="/img/logo-white.png" height="20" alt="">
        </nuxt-link>
      </b-navbar-brand>
      <b-nav-text v-if="loginStatus" class="community-title">
        <span class="nav-divider desktop-only" />
        {{ communityData.name }}
      </b-nav-text>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto userPoints">
        <b-nav-item>
          <b class="desktop-only mr-2">{{ getReputation() }} REP</b>
          <i v-b-modal.modal-1 class="fa fa-bars fa-lg" />
          <b-modal
            id="modal-1"
            title="Menu"
            header-text-variant="light"
            hide-footer
          >
            <nuxt-link v-if="!loginStatus" class="dropdown-item" to="/signup/">
              Signup
            </nuxt-link>
            <nuxt-link v-if="!loginStatus" class="dropdown-item" to="/login/">
              Login
            </nuxt-link>
            <nuxt-link v-if="loginStatus" class="dropdown-item" to="/bounties/">
              Bounties
            </nuxt-link>
            <nuxt-link class="dropdown-item" to="/communities/">
              Communities
            </nuxt-link>
            <span
              class="dropdown-item desktop-only activeCommunity"
              :style="{ color: communityData.gradient }"
            >
              {{ communityData.name }}
            </span>
            <CommunityNavigationMobile v-if="loginStatus" class="mobile-only" />
            <nuxt-link v-if="loginStatus" class="dropdown-item" to="/notifications/">
              Notifications
              <b-badge v-if="getUnreadNotification()>0" class="badge-notification-menu">
                {{ getUnreadNotification() }}
                <span class="sr-only">unread messages</span>
              </b-badge>
            </nuxt-link>
            <nuxt-link v-if="loginStatus" class="dropdown-item" to="/profile/">
              Profile
            </nuxt-link>
            <a v-if="loginStatus" class="dropdown-item" @click="logOut">
              Sign Out
            </a>
          </b-modal>
          <b-badge v-if="getUnreadNotification()>0" class="badge-notification-nav">
            {{ getUnreadNotification() }}
            <span class="sr-only">unread messages</span>
          </b-badge>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import CommunityNavigationMobile from '@/components/CommunityNavigationMobile'

export default {
  components: {
    CommunityNavigationMobile
  },
  computed: {
    userLoggedIn() {
      return this.$store.getters.loginStatus
    },
    ...mapGetters({
      user: 'user',
      loginStatus: 'loginStatus',
      communityData: 'content/communityData',
      userNotifications: 'userNotifications',
      userReputation: 'userReputation'
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
    },
    getReputation() {
      let reputation = 0
      if (this.userReputation && this.userReputation[this.communityData.id]) {
        reputation = this.userReputation[this.communityData.id]
      }
      return reputation
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

.navbar{
  z-index: 2;
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

.activeCommunity {
  color: #53d1af;
  background: none;
  border-radius: 25px;
  font-size: 1.3em;
  margin-left: 0.3em;
  cursor: default;
}

.dropdown-item:hover{
  color: #53d1af;
  background: none;
  border-radius: 25px;
  font-size: 1.3em;
  margin-left: 0.3em;
}

.logoImg{
  vertical-align: unset;
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
