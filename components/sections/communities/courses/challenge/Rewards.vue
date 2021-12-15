<template>
  <Section :title="$t('communities.overview.reward.title')">
    <div class="grid grid-cols-1 md:grid-cols-2">
      <div v-for="(reward, i) in rewards" :key="i">
        <Reward :reward="reward" />
      </div>
      <div class="mt-5 flex items-end pb-2">
        <p class="text-sm w-full">
          {{
            $t('communities.challenge.rewards.description', {
              maxPoints: challenge.maxPoints,
              minPoints: challenge.minPoints,
              reward: rewards.length
                ? `${rewards[0].amount} ${rewards[0].token}`
                : '',
            })
          }}
        </p>
      </div>
    </div>
  </Section>
</template>
<script>
import { mapGetters } from 'vuex'
import Section from '@/components/sections/communities/_partials/Section.vue'
import Reward from '@/components/ui/Reward'

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
      return this.challenge.rewards.filter(
        (reward) => reward.type === 'SUBMISSION'
      )
    },
  },
}
</script>
