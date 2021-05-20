<template>
  <div class="text-left">
    <span
      class="
        uppercase
        block
        text-xs
        font-semibold
        text-gray-500
        leading-relaxed
      "
      >{{ $t('nav.reputation') }}</span
    >
    <div class="space-y-4 mt-3">
      <ReputationCard
        v-for="reputation in reputations"
        :key="reputation.id"
        :details="reputation"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ReputationCard from '@/components/cards/Reputation'

export default {
  name: 'ReputationList',
  components: {
    ReputationCard,
  },
  props: {
    value: {
      default: 0,
      type: Number,
    },
  },
  computed: {
    ...mapGetters({
      reputations: 'user/reputations/list',
    }),
  },
}
</script>
