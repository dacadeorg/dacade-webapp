<template>
  <div class="relative">
    <div class="flex justify-between items-center mb-3 text-gray-500">
      <div class="uppercase text-xs font-semibold">
        {{ $t('modal.referral.list.bounty_title') }}
      </div>
      <div class="text-sm font-normal">
        {{
          bounty
            ? $t('modal.referral.list.challenge')
            : $t('modal.referral.list.reward')
        }}
      </div>
    </div>
    <div class="flex flex-col space-y-2">
      <ListItem
        v-for="referral in referrals"
        :key="referral.name"
        :referral="referral"
        :bounty="bounty"
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
  props: {
    bounty: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters({
      referrals: 'referrals/list',
    }),
  },
}
</script>
