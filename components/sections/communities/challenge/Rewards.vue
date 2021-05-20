<template>
  <Section :title="$t('communities.overview.reward.title')">
    <div class="grid grid-cols-1 xl:grid-cols-2">
      <div
        v-for="(reward, i) in rewards"
        :key="i"
        class="flex mt-6 items-center"
      >
        <div class="sm:flex space-x-3 items-center">
          <div class="flex sm:flex-none space-x-5 pb-3 md:w-1/2">
            <div class="flex-none">
              <Coin :denom="reward.denom" size="medium" />
            </div>
            <div class="text-base flex-none pr-3">
              <span
                class="block font-medium"
              >{{ reward.amount }} {{ reward.denom }}</span>
              <div
                class="block text-sm"
              >
                Per
                <span class="capitalize">{{
                  reward.type.toLowerCase()
                }}</span>
              </div>
            </div>
          </div>
          <div class="text-base pl-16 md:pl-0 md:-mt-4 max-w-1/2 md:flex-grow">
            <span class="block font-normal">{{ reward.description }}</span>
          </div>
        </div>
      </div>
    </div>
  </Section>
</template>
<script>
import { mapGetters } from 'vuex'
import Coin from '@/components/ui/Coin'
import Section from '../partials/Section.vue'

export default {
  name: 'OverviewRewards',
  components: {
    Section,
    Coin
  },
  computed: {
    ...mapGetters({
      community: 'communities/current'
    }),
    rewards () {
      return this.community.rewards.filter(
        reward => reward.type === 'SUBMISSION'
      )
    }
  }
}
</script>
