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
      <PrerequisiteSection />
      <!-- <div class="border-none!"> -->
      <DisclaimerSection />
      <!-- </div> -->
      <TrailerSection />
      <LearningModulesSection />
      <ChallengeSection />
      <PageNavigation />
    </div>
  </div>
</template>
<script>
/* eslint-disable no-console */
import PageNavigation from '../PageNavigation.vue'
import RewardsSection from './Rewards'
import ObjectivesSection from './Objectives'
import TrailerSection from './Trailer'
import LearningModulesSection from './LearningModules'
import ChallengeSection from './Challenge'
import DisclaimerSection from './Disclaimer'
import DescriptionSection from './Description'
import PrerequisiteSection from './Prerequisite'

export default {
  name: 'OverviewSection',
  components: {
    ObjectivesSection,
    RewardsSection,
    TrailerSection,
    LearningModulesSection,
    ChallengeSection,
    DescriptionSection,
    PageNavigation,
    PrerequisiteSection,
    DisclaimerSection,
  },
}
</script>
