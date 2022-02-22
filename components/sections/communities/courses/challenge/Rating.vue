<template>
  <ThemeWrapper :colors="colors">
    <Section
      :title="hideTitle ? '' : $t('communities.challenge.criteria.title')"
    >
      <div
        v-for="(criteria, i) in community.challenge.ratingCriteria"
        :key="i"
        class="mt-8"
      >
        <span class="block text-sm capitalize font-medium">{{
          criteria.name
        }}</span>
        <div
          class="
            grid grid-cols-1
            space-y-4
            md:space-y-0 md:grid-cols-2
            lg:grid-cols-4
            mt-3
            gap-y-5 gap-x-5
          "
        >
          <div v-for="(rubric, k) in criteria.rubric" :key="k" class="text-sm">
            <span
              :class="
                rubricRating[criteria.name] === rubric.points
                  ? 'text-theme-accent flex'
                  : 'text-gray-300'
              "
              class="font-bold leading-normal"
            >
              <div
                v-if="rubricRating[criteria.name] === rubric.points"
                class="p-1 -ml-6"
              >
                <Checkmark />
              </div>

              {{ rubric.points }}
              {{ $t('communities.challenge.criteria.points') }}</span
            >
            <span
              :class="
                rubricRating[criteria.name] === rubric.points
                  ? 'text-gray-700'
                  : 'text-gray-300'
              "
              class="block leading-normal"
              >{{ rubric.text }}</span
            >
          </div>
        </div>
      </div>
      <div
        class="md:flex space-y-3 md:space-y-0 md:space-x-10 mt-7 font-medium"
      >
        <div>
          <div class="text-sm leading-loose text-gray-900">
            {{ $t('communities.challenge.rating.total') }}
          </div>
          <div class="text-theme-accent">
            <span class="text-xl">{{
              $t('communities.challenge.rating.points')
            }}</span>
            <span class="text-sm">{{
              $t('communities.challenge.rating.total.points')
            }}</span>
          </div>
        </div>
        <div class="md:w-1/4 w-full">
          <div class="text-sm leading-loose text-gray-900">
            {{ $t('communities.challenge.rating.reward') }}
          </div>
          <div class="text-theme-accent">
            <Coin token="CGLD" size="small" class="-ml-5" />
            <span class="text-xl">{{
              $t('communities.challenge.rating.number')
            }}</span>
            {{ $t('communities.challenge.rating.symbol') }}
          </div>
          <div class="text-sm font-normal leading-loose">
            {{ $t('communities.challenge.rating.message') }}
          </div>
        </div>
      </div>
    </Section>
  </ThemeWrapper>
</template>
<script>
// :style="{
//   color: colors.textAccent
// }"
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import Section from '@/components/sections/communities/_partials/Section.vue'
import ThemeWrapper from '@/components/wrappers/ThemeWrapper.vue'
import Coin from '@/components/ui/Coin'
import Checkmark from '~/assets/icons/checkmark.svg?inline'

export default {
  name: 'RubricRating',
  components: {
    Section,
    Checkmark,
    Coin,
    ThemeWrapper,
  },
  props: {
    rubricRating: {
      default: () => {
        return {
          relevance: 0,
          originality: 3,
          quality: 1,
          total: 4,
          available: 20,
          reward: 5,
          rewardCoin: 'CGLD',
        }
      },
      type: Object,
    },
    hideTitle: {
      default: false,
      type: Boolean,
    },
  },
  computed: {
    ...mapGetters({
      community: 'communities/current',
      colors: 'ui/colors',
    }),
  },
}
</script>
