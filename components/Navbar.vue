<template>
  <div class="relative">
    <div class="content-wrapper py-12 flex relative">
      <ul class="relative">
        <NavItem type="logo">
          <Logo />
        </NavItem>
        <NavItem type="brand">
          {{ $t('app.name') }}
        </NavItem>
      </ul>
      <ul v-if="loginStatus" class="relative">
        <NavItem to="/bounties">
          {{ $t('nav.bounties') }}
        </NavItem>
        <NavItem to="/communities">
          {{ $t('nav.communities') }}
        </NavItem>
      </ul>
      <ul v-if="!loginStatus" class="ml-auto text-right relative">
        <NavItem to="/login">
          {{ $t('nav.login') }}
        </NavItem>
        <NavItem to="/signup/">
          <DAButton :padding="false" type="secondary" class="py-2 px-5">
            {{ $t('nav.sign-up') }}
          </DAButton>
        </NavItem>
      </ul>
      <ul v-if="loginStatus" class="ml-auto text-right relative">
        <NotificationPopup />
        <li class="inline-block align-middle  z-0 relative">
          <DAButton :padding="false" type="secondary" class="p-0.5 pr-5">
            <Avatar :user="user" />
            <span
              class="align-middle ml-2.5 font-medium text-gray-500"
            >{{ getDCNBalance() }} DAC</span>
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
import NotificationPopup from '@/components/popups/Notification'

export default {
  components: {
    Logo,
    NavItem,
    DAButton,
    Avatar,
    NotificationPopup
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
    ...mapGetters({
      user: 'user/get',
      userReputation: 'user/reputation',
      loginStatus: 'auth/loginStatus',
      communityData: 'content/communityData',
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
