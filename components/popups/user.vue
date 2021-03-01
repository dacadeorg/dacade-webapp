<template>
  <span v-click-outside="externalClick">
    <li class="inline-block align-middle  z-0 relative" @click="show = true">
      <Button :padding="false" type="secondary" class="p-0.5 pr-5">
        <Avatar :user="user" />
        <span
          class="align-middle ml-2.5 font-medium text-gray-500"
        >{{ getDCNBalance() }} DAC</span>
      </Button>
    </li>
    <div
      v-show="show"
      class="w-80 absolute top-14 right-0 z-10 bg-secondary rounded-3.5xl "
    >
      <div class="divide-y divide-gray-200">
        <div class="w-full p-4 text-left flex">
          <div class="pr-3.5"><Avatar :user="user" size="medium" /></div>
          <div class="py-1">
            <span class="font-medium text-base block leading-normal capitalize">{{
              user.displayName
            }}</span>
            <nuxt-link class="text-sm block leading-normal" to="/profile">
              {{ $t('nav.view-profile') }}
            </nuxt-link>
          </div>
        </div>
        <div class="p-4">
          <BalanceList />
        </div>
        <div class="p-4">
          <ReputationList />
        </div>
        <div class="p-4 text-center font-normal cursor-pointer" @click="logout">
          <span>{{ $t('nav.sign-out') }}</span>
        </div>
      </div>
    </div>
  </span>
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
    clickOutside: vClickOutside.directive
  },
  components: {
    Avatar,
    Button,
    BalanceList,
    ReputationList
    // NotificationList
  },
  data () {
    return {
      show: false
    }
  },
  computed: {
    ...mapGetters({
      balance: 'user/balance',
      user: 'user/get'
    })
  },
  methods: {
    externalClick (event) {
      if (this.show) {
        this.show = false
      }
    },
    logout () {
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
    getReputation () {
      let reputation = 0
      if (this.userReputation && this.userReputation[this.communityData.id]) {
        reputation = this.userReputation[this.communityData.id]
      }
      return parseFloat(reputation).toFixed(0)
    }
  }
}
</script>
