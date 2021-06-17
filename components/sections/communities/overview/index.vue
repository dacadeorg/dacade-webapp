<template>
  <div class="flex flex-col">
    <DescriptionSection />
    <div
      class="
        divide-y divide-solid divide-gray-200
        lg:py-5
        space-y-8
        text-gray-700
      "
    >
      <RewardsSection />
      <ObjectivesSection />
      <DisclaimerSection />
      <PrerequisiteSection />
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
import PrerequisiteSection from './Prerequisite'
import DisclaimerSection from './Disclaimer'

export default {
  name: 'OverviewSection',
  components: {
    ObjectivesSection,
    RewardsSection,
    TrailerSection,
    ChaptersSection,
    ChallengeSection,
    DescriptionSection,
    DisclaimerSection,
    PageNavigation,
    PrerequisiteSection,
  },
  computed: {
    ...mapGetters({
      community: 'communities/current',
      communityData: 'communities/content',
    }),
  },
}
</script>
