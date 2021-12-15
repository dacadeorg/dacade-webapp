<template>
  <div
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
      bg-white
      rounded-3.5xl
      no-scrollbar
      text-gray-900
    "
  >
    <div class="divide-y divide-gray-200">
      <div class="flex justify-between hover:bg-gray-50">
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
      <div v-show="reputations.length > 1" class="p-4">
        <ReputationList />
      </div>
      <div class="p-4 flex justify-center bg-indigo-50">
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
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BalanceList from '@/components/list/Balance'
import ReputationList from '@/components/list/Reputation'
import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'

export default {
  name: 'UserProfileDropdown',
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
  computed: {
    ...mapGetters({
      wallets: 'user/wallets/list',
      reputations: 'user/reputations/list',
      user: 'user/get',
    }),
  },
  methods: {
    logout() {
      this.$emit('close')
      this.$store.dispatch('auth/logout')
      this.$router.push('/communities')
    },
    toggleInvite() {
      this.$emit('close')
      this.$store.dispatch('ui/toggleShowReferralPopup', true)
    },
  },
}
</script>
