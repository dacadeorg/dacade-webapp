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
        <UserPopup />
      </ul>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import Logo from '@/components/Logo'
import NavItem from '@/components/ui/NavItem'
import DAButton from '@/components/ui/Button'
import NotificationPopup from '@/components/popups/Notification'
import UserPopup from '@/components/popups/User'

export default {
  components: {
    Logo,
    NavItem,
    DAButton,
    NotificationPopup,
    UserPopup
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
      loginStatus: 'auth/loginStatus',
      communityData: 'content/communityData'
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
    }
  }
}
</script>
