<template>
  <div class="">
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
            :class="[
              'p-0.5 bg-gray-100 bg-opacity-75 hover:bg-gray-50',
              { 'pr-5': mainWallet },
            ]"
          >
            <Avatar :user="user" />
            <span
              v-if="mainWallet"
              :style="{
                color: buttonStyles.color ? buttonStyles.color : null,
              }"
              class="align-middle ml-2.5 font-medium text-gray-500"
            >
              <Currency :value="mainWallet.balance" :token="mainWallet.token" />
            </span>
          </Button>
        </li>
        <Dropdown
          v-show="show"
          @toggle-invite="showReferral = true"
          @close="externalClick"
        />
      </span>
      <div v-if="show" class="opacity-25 fixed inset-0 z-30 bg-black" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import vClickOutside from 'v-click-outside'
import Dropdown from './Dropdown'
import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/button'
import Currency from '@/components/ui/Currency'

export default {
  name: 'UserPopup',
  directives: {
    clickOutside: vClickOutside.directive,
  },
  components: {
    Avatar,
    Button,
    Currency,
    Dropdown,
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
      showReferral: false,
      form: {
        referralCode: 'https://www.dacade.org/invite/paul-123',
      },
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
    this.$store.dispatch('referrals/all')
  },
  methods: {
    toggle() {
      this.show = !this.show
      this.$store.dispatch('ui/toggleBodyScrolling', this.show)
    },
    toggleInvite() {
      this.showReferral = !this.showReferral
      this.show = !this.show
      this.$store.dispatch('ui/toggleBodyScrolling', this.showReferral)
    },
    externalClick() {
      if (this.show) {
        this.show = false
        this.$store.dispatch('ui/toggleBodyScrolling', this.show)
      }
    },
  },
}
</script>
