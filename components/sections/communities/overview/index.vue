<template>
  <div class="py-4 flex flex-col divide-y divide-solid divide-gray-200 space-y-8 text-gray-700">
    <RewardsSection />
    <ObjectivesSection />
    <TrailerSection />
    <ChaptersSection />
    <ChallengeSection />
    <PageNavigation />
  </div>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import PageNavigation from '../PageNavigation.vue'
import RewardsSection from './Rewards'
import ObjectivesSection from './Objectives'
import TrailerSection from './Trailer'
import ChaptersSection from './Chapters'
import ChallengeSection from './Challenge'

export default {
  name: 'OverviewSection',
  components: {
    ObjectivesSection,
    RewardsSection,
    TrailerSection,
    ChaptersSection,
    ChallengeSection,
    PageNavigation
  },
  computed: {
    ...mapGetters({
      community: 'communities/current',
      communityData: 'communities/content'
    })
  }
}
</script>
