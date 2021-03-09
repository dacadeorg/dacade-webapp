<template>
  <div class="py-4 flex flex-col divide-y divide-solid divide-gray-200 space-y-8">
    <RewardsSection />
    <ObjectivesSection />
  </div>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import RewardsSection from './partials/overview/Rewards'
import ObjectivesSection from './partials/overview/Objectives'

export default {
  name: 'OverviewSection',
  components: {
    ObjectivesSection,
    RewardsSection
  },
  computed: {
    ...mapGetters({
      community: 'communities/current',
      communityData: 'communities/content'
    })
  }
}
</script>
