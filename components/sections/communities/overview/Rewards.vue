<template>
  <Section
    :title="$t('communities.overview.reward.title')"
    :subtitle="$t('communities.overview.reward.subtitle')"
  >
    <div class="grid grid-cols-2 lg:grid-cols-3">
      <div v-for="(reward, i) in community.rewards" :key="i">
        <Reward :reward="reward" />
      </div>
    </div>
  </Section>
</template>
<script>
import { mapGetters } from 'vuex'
import Section from '../partials/Section.vue'
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
    }),
  },
}
</script>
