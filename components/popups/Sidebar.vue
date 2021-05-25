<template>
  <div>
    <span v-click-outside="externalClick">
      <li
        class="
          inline-block
          align-middle
          z-40
          relative
          ease-linear
          transition-all
          duration-150
        "
        @click="toggle"
      >
        <div v-if="!show">
          <MobileMenuLogo />
        </div>
        <div v-else>
          <CloseIcon />
        </div>
      </li>
      <div
        v-show="show"
        :style="{
          width: 'calc(100vw - 110px)',
          maxHeight: 'calc(100vh - 110px)',
          overflow: 'hidden scroll',
        }"
        class="
          no-scrollbar
          md:max-w-sidebar
          absolute
          top-10
          right-0
          z-40
          bg-secondary
          rounded-3.5xl
          text-gray-900
        "
      >
        <div
          class="
            w-full
            -mb-5
            bg-gradient-to-b
            from-secondary
            to-transparent
            h-5
            sticky
            inset-x-0
            top-0
            left-0
          "
        />
        <div class="divide-y divide-gray-200">
          <div class="flex flex-col text-left -space-y-3 justify-between">
            <div class="flex">
              <div class="w-10 h-10 ml-3 mr-2 my-3 rounded-full bg-green-500">
                <BountiesIcon class="m-2" />
              </div>
              <div class="py-5 font-medium text-gray-900" @click="toggle">
                <nuxt-link
                  class="font-medium text-lg text-gray-900"
                  to="/bounties"
                >
                  {{ $t('nav.bounties') }}
                </nuxt-link>
              </div>
            </div>
            <div class="flex">
              <div class="w-10 h-10 ml-3 mr-2 my-3 rounded-full bg-purple-500">
                <CommunitiesIcon class="m-2" />
              </div>
              <div class="py-5 font-medium text-gray-900" @click="toggle">
                <nuxt-link
                  class="font-medium text-lg text-gray-900"
                  to="/communities"
                >
                  {{ $t('nav.communities') }}
                </nuxt-link>
              </div>
            </div>
            <div v-if="loginStatus" class="flex">
              <div class="w-10 h-10 ml-3 mr-2 my-3 rounded-full bg-red-500">
                <WalletIcon class="m-2" />
              </div>
              <div class="py-5 font-medium text-gray-900" @click="toggle">
                <nuxt-link
                  class="font-medium text-lg text-gray-900"
                  to="/profile/wallet"
                >
                  {{ $t('nav.wallet') }}
                </nuxt-link>
              </div>
            </div>
            <div
              v-if="loginStatus"
              class="w-full px-3 py-3 text-left flex justify-between"
            >
              <div @click="toggle">
                <nuxt-link class="flex text-sm leading-normal" to="/profile">
                  <Avatar class="p-3 w-10 h-10" :user="user" />
                  <div class="py-2 px-2">
                    <span
                      class="
                        font-medium
                        text-lg
                        block
                        leading-normal
                        capitalize
                      "
                      >{{ user.displayName }}</span
                    >
                  </div>
                </nuxt-link>
              </div>
              <div
                class="
                  py-2
                  self-end
                  text-right
                  whitespace-nowrap
                  align-text-bottom
                  font-normal
                  text-sm text-gray-500
                  cursor-pointer
                "
                @click="logout"
              >
                <span>{{ $t('nav.sign-out') }}</span>
              </div>
            </div>
          </div>
          <div v-if="loginStatus" class="px-3 py-2 h-full">
            <NotificationList />
          </div>
          <div v-if="!loginStatus" class="w-full h-15 p-2 flex">
            <Button
              :padding="false"
              type="secondary"
              class="w-full p-3 text-sm font-medium"
              @click="toggle"
            >
              <nuxt-link class="w-full" to="/login"> Login </nuxt-link>
            </Button>
            <Button
              :padding="false"
              class="w-full p-3 text-sm font-medium"
              @click="toggle"
            >
              <nuxt-link lass="w-full" to="/signup"> Sign up </nuxt-link>
            </Button>

            <!-- <ReputationList /> -->
          </div>
        </div>
      </div>
    </span>
    <div
      v-if="show"
      class="opacity-25 overscroll-none fixed inset-0 z-30 bg-black"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import vClickOutside from 'v-click-outside'
// import BalanceList from '@/components/list/Balance'
// import ReputationList from '@/components/list/Reputation'
import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
// import NavItem from '@/components/ui/NavItem'
import NotificationList from '@/components/list/Notification'

import CloseIcon from '~/assets/icons/close-top-right.svg?inline'
import MobileMenuLogo from '~/assets/icons/menu.svg?inline'
import BountiesIcon from '~/assets/icons/bounties.svg?inline'
import CommunitiesIcon from '~/assets/icons/communities.svg?inline'
import WalletIcon from '~/assets/icons/wallet.svg?inline'

export default {
  name: 'UserPopup',
  directives: {
    clickOutside: vClickOutside.directive,
  },
  components: {
    Avatar,
    Button,
    WalletIcon,
    CommunitiesIcon,
    // BalanceList,
    CloseIcon,
    BountiesIcon,
    // NavItem,
    MobileMenuLogo,
    // ReputationList
    NotificationList,
  },
  props: {
    buttonStyles: {
      default: null,
      type: Object,
    },
  },
  data() {
    return {
      show: false,
    }
  },
  userLoggedIn(params) {
    return this.$store.getters.loginStatus
  },
  computed: {
    ...mapGetters({
      loginStatus: 'auth/loginStatus',
      communityData: 'content/communityData',
      balance: 'user/balance',
      user: 'user/get',
    }),
  },
  methods: {
    // I added watch property.
    // watch: {
    //   $route () {
    //     this.show = false
    //   }
    // },
    // beforeRouteLeave (to, from, next) {
    //   this.show = false
    // // called when the route that renders this component is about to
    // // be navigated away from.
    // // has access to `this` component instance.
    // },
    toggle() {
      this.show = !this.show
      if (this.show) {
        const scrollY =
          document.documentElement.style.getPropertyValue('--scroll-y')
        const body = document.body
        body.style.position = 'fixed'
        body.style.top = `-${scrollY}`
      } else {
        const body = document.body
        const scrollY = body.style.top
        body.style.position = 'relative'
        body.style.top = ''
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }
    },
    externalClick(event) {
      if (this.show) {
        this.show = false
        const body = document.body
        const scrollY = body.style.top
        body.style.position = 'relative'
        body.style.top = ''
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }
    },
    logout() {
      this.$store.dispatch('auth/logout')
      this.$router.push('/communities')
    },
  },
}
</script>
