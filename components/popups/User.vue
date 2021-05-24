<template>
  <div>
    <span v-click-outside="externalClick">
      <li
        class="inline-block align-middle relative"
        :class="[show === true ? 'z-50' : 'z-10']"
        @click="toggle"
      >
        <Button
          :custom-style="buttonStyles"
          :padding="false"
          type="secondary"
          class="p-0.5 pr-5"
        >
          <Avatar :user="user" />
          <span
            :style="{
              color: buttonStyles.color ? buttonStyles.color : null,
            }"
            class="align-middle ml-2.5 font-medium text-gray-500"
            >{{ getDCNBalance() }} DAC</span
          >
        </Button>
      </li>
      <div
        v-show="show"
        :style="{
          width: 'calc(100vw - 40px)',
          maxWidth: '340px',
          maxHeight: 'calc(100vh - 100px)',
          overflow: 'hidden scroll',
        }"
        class="
          absolute
          top-14
          right-0
          z-40
          bg-secondary
          rounded-3.5xl
          text-gray-900
        "
      >
        <div class="divide-y divide-gray-200">
          <div class="flex justify-between">
            <div class="w-full p-4 text-left flex">
              <div class="pr-3.5"><Avatar :user="user" size="medium" /></div>
              <div class="pt-2">
                <span
                  class="font-medium text-base block leading-normal capitalize"
                  >{{ user.displayName }}</span
                >
                <nuxt-link
                  class="self-end text-sm block leading-normal"
                  to="/profile"
                >
                  {{ $t('nav.view-profile') }}
                </nuxt-link>
              </div>
            </div>
            <div
              class="
                mr-4
                mb-6
                text-gray-500
                self-end
                text-right
                whitespace-nowrap
                align-text-bottom
                font-normal
                cursor-pointer
                text-sm
              "
              @click="logout"
            >
              <span>{{ $t('nav.sign-out') }}</span>
            </div>
          </div>
          <div class="p-4">
            <BalanceList />
          </div>
          <div class="p-4">
            <ReputationList />
          </div>
        </div>
      </div>
    </span>
    <div v-if="show" class="opacity-25 fixed inset-0 z-30 bg-black" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import vClickOutside from 'v-click-outside'

import BalanceList from '@/components/list/Balance'
import ReputationList from '@/components/list/Reputation'
import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'

export default {
  name: 'UserPopup',
  directives: {
    clickOutside: vClickOutside.directive,
  },
  components: {
    Avatar,
    Button,
    BalanceList,
    ReputationList,
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
  computed: {
    ...mapGetters({
      mainWallet: 'user/wallets/main',
      wallets: 'user/wallets/list',
      reputations: 'user/reputations/list',
      user: 'user/get',
    }),
  },
  created() {
    this.$store.dispatch('user/wallets/all')
    this.$store.dispatch('user/reputations/all')
  },
  methods: {
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
