<template>
  <div class="relative">
    <li
      class="inline-block align-middle z-40 relative ease-linear transition-all duration-150"
      @click="toggle"
    >
      <div v-if="!show">
        <MobileMenuLogo :class="burgerColor || 'text-black'" />
      </div>
      <div v-else>
        <CloseIcon />
      </div>
    </li>
    <Popup
      :center="false"
      :show="show"
      class="px-3 pt-16 pb-2"
      @close="externalClick"
    >
      <div
        class="max-h-full overflow-scroll md:max-w-sidebar relative ml-auto mt-0 md:mr-12 w-full z-40 bg-secondary rounded-3.5xl text-gray-900"
      >
        <div class="divide-y divide-gray-200">
          <div class="flex flex-col text-left justify-between">
            <div class="flex">
              <div class="w-10 h-10 ml-3 mr-2 my-3 rounded-full bg-green-500">
                <BountiesIcon class="m-2" />
              </div>
              <div class="py-5 font-medium text-gray-900" @click="toggle">
                <nuxt-link
                  class="font-medium text-lg text-gray-900"
                  :to="localePath('/bounties')"
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
                  :to="localePath('/communities')"
                >
                  {{ $t('nav.communities') }}
                </nuxt-link>
              </div>
            </div>
            <div v-if="isAuthenticated" class="flex">
              <div class="w-10 h-10 ml-3 mr-2 my-3 rounded-full bg-red-500">
                <WalletIcon class="m-2" />
              </div>
              <div class="py-5 font-medium text-gray-900" @click="toggle">
                <nuxt-link
                  class="font-medium text-lg text-gray-900"
                  :to="localePath('/profile/wallets')"
                >
                  {{ $t('nav.wallet') }}
                </nuxt-link>
              </div>
            </div>
            <div
              v-if="isAuthenticated"
              class="w-full px-3 py-3 text-left flex justify-between"
            >
              <div @click="toggle">
                <nuxt-link
                  class="flex text-sm leading-normal"
                  :to="localePath('/profile')"
                >
                  <Avatar :user="user" :use-link="false" size="medium" />
                  <div class="py-2 px-2">
                    <span
                      class="font-medium text-lg block leading-normal capitalize"
                      >{{ username }}</span
                    >
                  </div>
                </nuxt-link>
              </div>
              <div
                class="py-2 self-end text-right whitespace-nowrap align-text-bottom font-normal text-sm text-gray-500 cursor-pointer"
                @click="logout"
              >
                <span>{{ $t('nav.sign-out') }}</span>
              </div>
            </div>
          </div>
          <div
            v-if="isAuthenticated"
            class="p-4 flex justify-center bg-indigo-50"
          >
            <div class="z-10">
              <Button
                :padding="false"
                type="outline-primary"
                class="flex btn-primary btn-lg py-2 px-5 align-middle text-sm"
                @click="toggleInvite"
                >{{ $t('nav.view-profile-codes') }}
              </Button>
            </div>
          </div>
          <div v-if="isAuthenticated" class="px-5 py-2 relative">
            <NotificationList />
          </div>
          <div v-if="!isAuthenticated" class="w-full h-15 p-2 flex">
            <Button
              :padding="false"
              type="secondary"
              class="w-full p-3 text-sm font-medium"
              @click="toggle"
            >
              <nuxt-link class="w-full" :to="localePath('/login')">
                {{ $t('nav.login') }}
              </nuxt-link>
            </Button>
            <Button
              :padding="false"
              class="w-full p-3 text-sm font-medium"
              @click="toggle"
            >
              <nuxt-link lass="w-full" :to="localePath('/signup')">
                {{ $t('nav.sign-up') }}
              </nuxt-link>
            </Button>

            <!-- <ReputationList /> -->
          </div>
        </div>
      </div>
    </Popup>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import vClickOutside from 'v-click-outside'
// import BalanceList from '@/components/list/Balance'
// import ReputationList from '@/components/list/Reputation'
import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/button'
// import NavItem from '@/components/ui/NavItem'
import NotificationList from '@/components/list/Notification'

import CloseIcon from '~/assets/icons/close-top-right.svg?inline'
import MobileMenuLogo from '~/assets/icons/menu.svg?inline'
import BountiesIcon from '~/assets/icons/bounties.svg?inline'
import CommunitiesIcon from '~/assets/icons/communities.svg?inline'
import WalletIcon from '~/assets/icons/wallet.svg?inline'
import Popup from '@/components/ui/Popup'

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
    Popup,
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

    burgerColor: {
      default: "",
      type: String,
    },
  },
  data() {
    return {
      show: false,
    }
  },
  userLoggedIn(params) {
    return this.$store.getters.isAuthenticated
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/check',
      communityData: 'content/communityData',
      balance: 'user/balance',
      user: 'user/get',
      unread: 'user/notifications/unread',
    }),
    username() {
      return this.user?.displayName
    },
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

      if (this.isAuthenticated && this.show && this.unread) {
        this.$store.dispatch('user/notifications/read')
      }

      this.$store.dispatch('ui/toggleBodyScrolling', this.show)
      window.scrollTo(0, 0)
    },
    externalClick(event) {
      if (!this.show) return
      this.show = false
      this.$store.dispatch('ui/toggleBodyScrolling', this.show)
    },
    logout() {
      this.$store.dispatch('auth/logout')
    },
    toggleInvite() {
      this.show = false
      this.$store.dispatch('ui/toggleShowReferralPopup', true)
    },
  },
}
</script>
