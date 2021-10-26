<template>
  <div class="relative">
    <div class="flex justify-between items-center mb-3 text-gray-500">
      <div class="uppercase text-xs font-semibold">
        {{ $t('modal.referral.list.bounty_title') }}
      </div>
      <div class="text-sm font-normal">
        {{ $t('modal.referral.list.reward') }}
      </div>
    </div>
    <div class="flex flex-col space-y-2">
      <ListItem
        v-for="referral in referrals"
        :key="referral.name"
        :referral="referral"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ListItem from './ListItem.vue'

export default {
  name: 'ReferralList',
  components: {
    ListItem,
  },
  computed: {
    ...mapGetters({
      referrals: 'referrals/list',
    }),
  },
}
</script>
