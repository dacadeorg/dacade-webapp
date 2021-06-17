<template>
  <Section :title="$t('communities.overview.reward.title')">
    <div class="grid grid-cols-1 xl:grid-cols-2">
      <div v-for="(reward, i) in rewards" :key="i">
        <Reward :reward="reward" />
      </div>
    </div>
  </Section>
</template>
<script>
import { mapGetters } from 'vuex'
import Reward from '@/components/ui/Reward'
import Section from '../partials/Section.vue'

export default {
  name: 'OverviewRewards',
  components: {
    Section,
    Reward,
  },
  computed: {
    ...mapGetters({
      community: 'communities/current',
      challenge: 'communities/challenges/current',
    }),
    rewards() {
      return this.challenge.rewards
    },
  },
}
</script>
