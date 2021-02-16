<template>
  <div class="relative">
    <div class="content-wrapper py-12 flex relative">
      <ul class="relative">
        <NavItem type="logo">
          <Logo />
        </NavItem>
        <NavItem type="brand">
          {{ $t("app.name") }}
        </NavItem>
      </ul>
      <ul v-if="loginStatus" class="relative">
        <NavItem to="/bounties">
          {{ $t("nav.bounties") }}
        </NavItem>
        <NavItem to="/communities">
          {{ $t("nav.communities") }}
        </NavItem>
      </ul>
      <ul v-if="!loginStatus" class="ml-auto text-right relative">
        <NavItem to="/login">
          {{ $t("nav.login") }}
        </NavItem>
        <NavItem to="/signup/">
          <DAButton :padding="false" type="secondary" class="py-2 px-5">
            {{ $t("nav.sign-up") }}
          </DAButton>
        </NavItem>
      </ul>
      <ul v-if="loginStatus" class="ml-auto text-right relative">
        <li class="inline-block align-middle mr-2">
          <DAButton :padding="false" type="secondary" class="p-2">
            <BellIcon />
            <Badge v-if="unreadNotification>0" :value="unreadNotification" />
          </DAButton>
        </li>
        <li class="inline-block align-middle">
          <DAButton :padding="false" type="secondary" class="p-0.5 pr-5">
            <Avatar :user="user" />
            <span
              class="align-middle ml-2.5 font-medium text-gray-500"
            >{{ getBalance() }} DAC</span>
          </DAButton>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import Logo from '@/components/Logo'
import NavItem from '@/components/ui/NavItem'
import Avatar from '@/components/ui/Avatar'
import DAButton from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import BellIcon from '~/assets/icons/notification-bell.svg?inline'

export default {
  components: {
    Logo,
    NavItem,
    DAButton,
    BellIcon,
    Badge,
    Avatar
  },
  computed: {
    color () {
      if (this.isCommunity) {
        return this.communityData.gradient
      }
      return null
    },
    isCommunity () {
      const array = [
        'slug-introduction',
        'slug-challenge',
        'slug-submissions',
        'slug-scoreboard',
        'slug-chapter-id',
        'slug-submission-id'
      ]
      if (array.includes(this.$route.name)) {
        return true
      }
      return false
    },
    userLoggedIn (params) {
      return this.$store.getters.loginStatus
    },
    unreadNotification () {
      let notifications = 0
      if (this.notifications) {
        for (
          let index = 0;
          index < Object.values(this.notifications).length;
          index++
        ) {
          if (!Object.values(this.notifications)[index].notificationRead) {
            notifications++
          }
        }
      }
      return parseFloat(notifications).toFixed(0)
    },
    ...mapGetters({
      user: 'user/get',
      userReputation: 'user/reputation',
      loginStatus: 'auth/loginStatus',
      communityData: 'content/communityData',
      notifications: 'notification/get',
      balance: 'user/balance'
    })
  },
  watch: {
    $route: {
      immediate: true,
      handler (to, from) {
        this.$forceUpdate()
      }
    }
  },
  methods: {
    logOut () {
      this.$store.dispatch('auth/logout')
      this.$router.push('/communities')
    },
    getBalance () {
      let balance = 0
      if (this.user && this.balance) {
        for (const key in this.balance) {
          if (key !== 'DCN') {
            balance = balance + this.balance[key]
          }
        }
      }
      return parseFloat(balance).toFixed(0)
    },
    getDCNBalance () {
      let balance = 0
      if (this.user && this.balance && this.balance.DCN) {
        balance = this.balance.DCN
      }
      return parseFloat(balance).toFixed(0)
    },
    getSectionName (route) {
      switch (route.name) {
        case 'notifications':
          return 'Notifications'
        case 'communities':
          return 'Communities'
        case 'bounties':
          return 'Bounties'
        case 'profile':
          return 'Profile'
        default:
          return null
      }
    },
    closeModal () {
      this.$bvModal.hide('modal-1')
    },
    getReputation () {
      let reputation = 0
      console.log(this.userReputation)
      if (this.userReputation && this.userReputation[this.communityData.id]) {
        reputation = this.userReputation[this.communityData.id]
      }
      return parseFloat(reputation).toFixed(0)
    }
  }
}
</script>
