<template>
  <div class="py-4 flex flex-col divide-y divide-solid divide-gray-200 space-y-8">
    <RewardsSection />
    <ObjectivesSection />
    <TrailerSection />
  </div>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import RewardsSection from './partials/overview/Rewards'
import ObjectivesSection from './partials/overview/Objectives'
import TrailerSection from './partials/overview/Trailer'

export default {
  name: 'OverviewSection',
  components: {
    ObjectivesSection,
    RewardsSection,
    TrailerSection
  },
  computed: {
    ...mapGetters({
      community: 'communities/current',
      communityData: 'communities/content'
    })
  }
}
</script>
