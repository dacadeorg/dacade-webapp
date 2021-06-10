<template>
  <ThemeWrapper :colors="community.colors">
    <div
      class="
        p-6
        bg-theme-primary
        text-theme-text
        space-y-5
        divide-y-2 divide-y divide-dotted divide-theme-accent
      "
    >
      <div class="mx-auto h-full">
        <div
          class="
            flex flex-col
            sm:flex-row
            lg:flex-col
            2xl:flex-row
            justify-between
            space-y-5
          "
        >
          <div
            class="
              text-.5xl
              md:text-2xl
              max-w-sm
              min-h-2xs
              md:min-h-3xs
              lg:min-h-2xs
              xl:min-h-2xs
              font-medium
              pb-5
            "
          >
            <h1 class="tracking-tight max-w-text-xs text-theme-text">
              {{ community.name }}
            </h1>
            <p class="tracking-tight md:max-w-text-md text-theme-accent pr-2">
              {{ community.description || '' }}
            </p>
          </div>
          <div class="self-end max-w-lg sm:h-full sm:-mb-0 md:mb-2 md:h-auto">
            <img :src="community.icon" class="relative h-42 w-full lg:mb-5" />
          </div>
        </div>
        <div
          class="
            flex
            md:flex-row
            lg:flex-col
            justify-start
            flex-col
            max-w-xs
            -mt-4
            md:-mt-7
            md:max-w-lg
            items-start
          "
        >
          <div v-if="community.rewards && showRewards" class="text-sm">
            <Reward
              :reward="
                community.rewards.filter((r) => r.type === 'SUBMISSION')[0]
              "
            />
            <div />
          </div>
        </div>
      </div>
      <div
        v-if="community.rewards && showRewards"
        class="mt-4 flex justify-between"
      >
        <div class="flex flex-col space-y-0">
          <div class="mt-4 font-light text-theme-accent">Estimated Time</div>
          <div class="mt-4 font-medium text-theme-accent">
            {{ duration }}
            min
          </div>
        </div>
        <div class="mt-4 align-middle">
          <nuxt-link :to="path">
            <Button
              class="
                bg-theme-secondary
                border
                text-theme-accent
                border-theme-accent
              "
            >
              <span class="py-2 inline-block align-middle">{{
                $t('page.index.main.button')
              }}</span>
              <span class="inline-block align-middle">
                <ArrowRightIcon class="ml-4" />
              </span>
            </Button>
          </nuxt-link>
          <!-- <Button>Get started</Button> -->
        </div>
      </div>
    </div>
  </ThemeWrapper>
</template>
<script>
import Moment from 'moment'
import ThemeWrapper from '@/components/wrappers/ThemeWrapper'
import Reward from '@/components/badges/Reward'
import Button from '@/components/ui/Button'
import ArrowRightIcon from '~/assets/icons/arrow-right.svg?inline'

export default {
  name: 'CommunityCard',
  components: { ThemeWrapper, Reward, Button, ArrowRightIcon },
  props: {
    showRewards: {
      default: () => true,
      type: Boolean,
    },
    submissions: {
      default: () => [1, 2, 3],
      type: Array,
    },
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
      return Moment.duration(
        this.community.duration,
        'milliseconds'
      ).asMinutes()
    },
  },
  mounted() {
    // eslint-disable-next-line no-console
    console.log(this.community)
    const rewards = this.community.rewards
    const submission = rewards.filter((r) => r.type === 'SUBMISSION')[0].value
    // eslint-disable-next-line no-console
    console.log(submission)
  },
}
</script>
