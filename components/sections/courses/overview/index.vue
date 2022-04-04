<template>
  <div
    class="flex flex-col divide-y divide-solid divide-gray-200 lg:py-5 space-y-8 text-gray-700"
  >
    <Header :title="course.name" :description="course.description" />
    <RewardsSection />
    <ObjectivesSection />
    <PrerequisiteSection />
    <DisclaimerSection />
    <TrailerSection />
    <LearningModulesSection />
    <ChallengeSection />
    <PageNavigation />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
/* eslint-disable no-console */
import PageNavigation from '../PageNavigation.vue'
import RewardsSection from './Rewards'
import ObjectivesSection from './Objectives'
import TrailerSection from './Trailer'
import LearningModulesSection from './LearningModules'
import ChallengeSection from './Challenge'
import DisclaimerSection from './Disclaimer'
// import DescriptionSection from './Description'
import PrerequisiteSection from './Prerequisite'
import Header from '@/components/sections/communities/_partials/Header.vue'

export default {
  name: 'OverviewSection',
  components: {
    ObjectivesSection,
    RewardsSection,
    Header,
    TrailerSection,
    LearningModulesSection,
    ChallengeSection,
    // DescriptionSection,
    PageNavigation,
    PrerequisiteSection,
    DisclaimerSection,
  },
  computed: {
    ...mapGetters({
      course: 'communities/courses/current',
    }),
  },
}
</script>
