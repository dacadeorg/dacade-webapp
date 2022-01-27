<template>
  <Section
    v-if="course && course.challenge"
    :title="$t('communities.overview.reward.title')"
    :subtitle="$t('communities.overview.reward.subtitle')"
  >
    <div class="grid grid-cols-2 lg:grid-cols-3 pt-4">
      <div v-for="(reward, i) in course.challenge.rewards" :key="i">
        <Reward :reward="reward" />
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
      course: 'communities/courses/current',
    }),
  },
}
</script>
