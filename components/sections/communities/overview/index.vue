<template>
  <div class="flex flex-col ">
    <DescriptionSection />
    <div class="divide-y divide-solid divide-gray-200 lg:py-5 space-y-8 text-gray-700">
      <RewardsSection />
      <ObjectivesSection />
      <TrailerSection />
      <ChaptersSection />
      <ChallengeSection />
      <PageNavigation />
    </div>
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
import DescriptionSection from './Description'

export default {
  name: 'OverviewSection',
  components: {
    ObjectivesSection,
    RewardsSection,
    TrailerSection,
    ChaptersSection,
    ChallengeSection,
    DescriptionSection,
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
