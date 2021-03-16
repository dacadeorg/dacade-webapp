<template>
  <div v-if="duration">
    <span
      class="text-sm text-gray-500"
    ><span
       :style="{
         color: colors.textAccent
       }"
     >{{ duration }}</span>
      {{ text }}</span>
  </div>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import Moment from 'moment'
// import RewardsSection from './partials/overview/Rewards'

export default {
  name: 'Duration',
  props: {
    text: {
      default: null,
      type: String
    },
    value: {
      default: 0,
      type: [String, Number]
    }
  },
  computed: {
    ...mapGetters({
      community: 'communities/current',
      communityData: 'communities/content',
      colors: 'ui/colors'
    }),
    duration () {
      if (!this.value) {
        return 0
      }
      return Moment.duration(this.value).humanize()
    }
  }
}
</script>
