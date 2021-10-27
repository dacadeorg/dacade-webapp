<template>
  <Modal v-if="user" :show="showReferral" @close="close">
    <div class="w-full p-7 relative">
      <button
        class="bg-gray-100 self-start px-2.5 py-2.5 absolute top-2 right-2"
        @click="close"
      >
        <Crossmark class="text-xl text-gray-600 w-6" />
      </button>
      <h1 class="text-xl md:text-3xl mr-3 mb-3 text-left">
        {{ $t('modal.referral.title') }}
        {{ $t('app.name') }}
      </h1>
      <div
        class="text-base md:text-lg text-left font-normal text-gray-700 mb-8"
      >
        <p class="mb-3 leading-normal">
          {{
            $t('modal.referral.text-1', {
              username: user.displayName,
            })
          }}
        </p>
        <p class="leading-normal">{{ $t('modal.referral.text-2') }}</p>
      </div>

      <div class="flex flex-col space-y-5">
        <Box :value="referralLink" :label="$t('modal.referral.link.label')" />
        <Box :value="referralCode" :label="$t('modal.referral.code.label')" />
      </div>
      <div class="my-8">
        <List />
      </div>
      <div class="w-full block border-t border-t-solid border-gray-200" />
      <p class="text-left pt-4 pb-8 text-gray-500 text-sm font-normal">
        {{ $t('modal.referral.message') }}
      </p>
    </div>
  </Modal>
</template>

<script>
import { mapGetters } from 'vuex'
import vClickOutside from 'v-click-outside'
import List from './List.vue'
import Box from './Box.vue'
import Crossmark from '~/assets/icons/crossmark-2.svg?inline'
import Modal from '@/components/ui/Modal'

export default {
  name: 'UserPopup',
  directives: {
    clickOutside: vClickOutside.directive,
  },
  components: {
    Crossmark,
    Modal,
    List,
    Box,
  },
  computed: {
    ...mapGetters({
      user: 'user/get',
      showReferral: 'ui/showReferralPopup',
      referrals: 'referrals/list',
    }),
    referralLink() {
      return `${window.location.origin}/signup?invite=${this.user.displayName}`
    },
    referralCode() {
      return this.user.displayName
    },
  },
  methods: {
    close() {
      if (this.showReferral) {
        this.$store.dispatch('ui/toggleShowReferralPopup', false)
      }
    },
  },
}
</script>
