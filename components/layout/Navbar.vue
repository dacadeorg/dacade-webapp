<template>
  <div class="text-gray-900" :style="containerStyle">
    <div class="content-wrapper lg:py-12 py-6 flex relative">
      <ul class="relative">
        <NavItem type="logo" class="w-8 h-8 md:w-11 md:h-11">
          <Logo />
        </NavItem>
        <NavItem type="brand mx-0.5">
          {{ $t('app.name') }}
        </NavItem>
      </ul>
      <ul v-if="isAuthenticatedAndVerified" class="hidden lg:block relative self-center">
        <NavItem to="/bounties">
          {{ $t('nav.bounties') }}
        </NavItem>
        <NavItem :to="localePath({ path: '/communities' })">
          {{ $t('nav.communities') }}
        </NavItem>
      </ul>
      <ul class="ml-auto text-right relative flex lg:hidden items-center">
        <Sidebar :burger-color="sidebarBurgerColor" />
      </ul>
      <ul v-if="!isAuthenticated" class="ml-auto text-right relative hidden lg:block">
        <div v-if="$router.history.current.path !== '/login'" class="inline-block">
          <span v-if="$router.history.current.path === '/signup'" class="text-sm">{{ $t('nav.signup.already-exist')
          }}</span>
          <NavItem to="/login">
            <span class="py-2 text-sm" :class="$router.history.current.path === '/signup'
                ? 'text-primary'
                : 'inherit'
              ">
              {{ $t('nav.login') }}</span>
          </NavItem>
        </div>
        <div v-if="$router.history.current.path !== '/signup'" class="inline-block">
          <span v-if="$router.history.current.path === '/login'" class="text-sm">{{ $t('nav.signin.new-accout') }}</span>
          <NavItem to="/signup">
            <span v-if="$router.history.current.path === '/login'" class="py-2 text-sm text-primary">{{ $t('nav.sign-up')
            }}</span>
            <Button v-else type="secondary" :padding="false" class="text-sm py-2" :class="$router.history.current.path === '/login'
              ? 'text-primary'
              : 'text-gray-900'
              ">
              {{ $t('nav.sign-up') }}
            </Button>
          </NavItem>
        </div>
        <div class="inline-block">
          <LanguageSwitcherPopup />
        </div>
      </ul>
      <ul v-if="isAuthenticated" class="hidden lg:flex ml-auto text-right relative">
        <NotificationPopup :button-styles="buttonStyle" :badge-styles="badgeStyle" />
        <UserPopup :button-styles="buttonStyle" />
      </ul>
    </div>
  </div>
</template>
<script>
import hexToRgba from 'hex-to-rgba'
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import Logo from '@/components/layout/Logo'
import Sidebar from '@/components/popups/Sidebar'

import NavItem from '@/components/ui/NavItem'
import NotificationPopup from '@/components/popups/Notification'
import UserPopup from '@/components/popups/user'
import Button from '@/components/ui/button'
import LanguageSwitcherPopup from '@/components/popups/LanguageSwitcher.vue'
export default {
  name: 'Navbar',

  components: {
    Logo,
    NavItem,
    Button,
    Sidebar,
    NotificationPopup,
    UserPopup,
    LanguageSwitcherPopup,
  },

  props: {
    settings: {
      default: () => {
        return {}
      },
      type: Object,
    },

    sidebarBurgerColor: {
      default: "",
      type: String,
    },
  },

  computed: {
    colors() {
      if (!this.settings || !this.settings.colors) return null
      return {
        primary: this.settings.colors.cover?.background || this.settings.colors.primary,
        text: this.settings.colors?.cover?.text || this.settings.colors.text,
        accent: this.settings.colors.accent,
      }
    },
    containerStyle() {
      if (!this.colors) return {}
      return {
        backgroundColor: this.colors.primary,
        color: this.colors.text,
      }
    },
    buttonStyle() {
      if (!this.colors) return {}
      return {
        backgroundColor: hexToRgba(this.colors.text, 0.3),
        color: this.colors.text,
      }
    },
    badgeStyle() {
      if (!this.colors) return {}
      return {
        backgroundColor: this.colors.accent,
        color: this.colors.primary,
      }
    },
    ...mapGetters({
      user: 'user/get',
      isAuthenticatedAndVerified: 'auth/isVerified',
      isAuthenticated: 'auth/check',
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
  },
}
</script>
