<template>
  <div class="relative text-gray-900" :style="containerStyle">
    <div class="content-wrapper lg:py-12 py-5 flex relative">
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
        <NavItem :to="localePath({ path: '/', hash: '#communities' })">
          {{ $t('nav.communities') }}
        </NavItem>
      </ul>
      <ul
        v-if="!loginStatus"
        class="ml-auto text-right relative lg:hidden md:hidden"
      >
        <NavItem>
          <MobileMenuLogo />
        </NavItem>
      </ul>

      <ul
        v-if="!loginStatus"
        class="ml-auto text-right relative hidden lg:block md:block"
      >
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
        <NotificationPopup
          :button-styles="buttonStyle"
          :badge-styles="badgeStyle"
        />
        <UserPopup :button-styles="buttonStyle" />
      </ul>
    </div>
  </div>
</template>
<script>
import hexToRgba from 'hex-to-rgba'
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import Logo from '@/components/Logo'
import MobileMenuLogo from '@/components/MobileMenuLogo'
import NavItem from '@/components/ui/NavItem'
import DAButton from '@/components/ui/Button'
import NotificationPopup from '@/components/popups/Notification'
import UserPopup from '@/components/popups/User'

export default {
  components: {
    Logo,
    NavItem,
    DAButton,
    MobileMenuLogo,
    NotificationPopup,
    UserPopup,
  },
  props: {
    settings: {
      default: () => {
        return {}
      },
      type: Object,
    },
  },
  computed: {
    containerStyle() {
      if (!this.settings || !this.settings.colors) {
        return {}
      }
      return {
        backgroundColor: this.settings.colors.primary,
        color: this.settings.colors.text,
      }
    },
    buttonStyle() {
      if (!this.settings || !this.settings.colors) {
        return {}
      }
      return {
        backgroundColor: hexToRgba(this.settings.colors.text, 0.3),
        color: this.settings.colors.text,
      }
    },
    badgeStyle() {
      if (!this.settings || !this.settings.colors) {
        return {}
      }
      return {
        backgroundColor: this.settings.colors.accent,
        color: this.settings.colors.primary,
      }
    },
    userLoggedIn(params) {
      return this.$store.getters.loginStatus
    },
    ...mapGetters({
      user: 'user/get',
      loginStatus: 'auth/loginStatus',
      communityData: 'content/communityData',
    }),
  },
  watch: {
    $route: {
      immediate: true,
      handler(to, from) {
        this.$forceUpdate()
      },
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout')
      this.$router.push('/communities')
    },
    getSectionName(route) {
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
    closeModal() {
      this.$bvModal.hide('modal-1')
    },
  },
}
</script>
