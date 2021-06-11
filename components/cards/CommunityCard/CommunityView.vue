<template>
  <ThemeWrapper :colors="community.colors">
    <nuxt-link :to="{ path: path }">
      <div
        class="w-full bg-gray-200 lg:flex min-w-full mx-0 rounded-3xl relative"
      >
        <CommunityVisual :community="community" :show-submissions="true" />
        <div class="flex-col justify-between flex p-3 md:p-7 text-gray-700">
          <div class="w-full">
            <div class="xl:pr-52 w-full text-lg pb-10">
              In the challenge of this community you need to envision a problem
              that Blockchain technology could solve.
            </div>
          </div>
          <div class="divide-y divide-dotted divide-gray-500 space-y-5">
            <div class="text-base text-right flex-end">
              <span class="font-light"> Estimated Time </span>
              <span class="font-medium"> {{ duration }} min </span>
            </div>
            <div class="flex space-x-3">
              <div v-for="(reward, i) in community.rewards" :key="i">
                <Reward :reward="reward" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nuxt-link>
  </ThemeWrapper>
</template>
<script>
import Reward from '@/components/ui/Reward'

import CommunityVisual from '@/components/cards/CommunityCard/CommunityVisual'
import ThemeWrapper from '@/components/wrappers/ThemeWrapper'
import moment from 'moment'

export default {
  name: 'CommunityCardView',
  components: { Reward, CommunityVisual, ThemeWrapper },
  props: {
    community: {
      default: () => {},
      type: Object,
    },
  },
  computed: {
    path() {
      return `/communities/${this.community.slug}`
    },
    rewards() {
      return this.community.rewards.reduce(
        (accumulator, reward) => accumulator.amount + reward.amount
      )
    },
    duration() {
      return moment.duration(this.community.duration).asMinutes()
    },
  },
}
</script>
