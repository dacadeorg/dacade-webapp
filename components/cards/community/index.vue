<template>
  <ThemeWrapper class="h-full" :colors="community.colors">
    <nuxt-link class="block h-full" :to="path">
      <div
        class="
          group
          p-6
          pb-3
          bg-theme-primary
          text-theme-text
          space-y-5
          divide-y-2 divide-y divide-dotted divide-theme-accent
          h-full
          flex flex-col
        "
      >
        <div class="flex-grow">
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
              md:-mt-7 md:max-w-lg
              items-start
            "
          >
            <div v-if="reward" class="text-sm">
              <Reward :reward="reward" />
              <div />
            </div>
          </div>
        </div>
        <div v-if="duration" class="mt-4 flex-none flex justify-between">
          <div class="flex flex-col space-y-0">
            <div class="mt-4 font-light text-theme-accent">
              {{ $t('communities.card.estimated') }}
            </div>
            <div class="mt-4 font-medium text-theme-accent">
              {{ duration }}
              {{ $t('communities.card.minutes') }}
            </div>
          </div>
          <div class="mt-4 align-middle">
            <nuxt-link :to="path">
              <Button
                class="
                  group-hover:bg-theme-accent
                  bg-theme-primary
                  border
                  text-theme-accent
                  group-hover:text-theme-primary
                  border-theme-accent
                "
              >
                <span
                  class="
                    group-hover:text-theme-primary
                    py-0
                    inline-block
                    align-middle
                  "
                  >{{ $t('page.index.main.button') }}</span
                >
                <span class="inline-block align-middle">
                  <ArrowRightIcon class="ml-4" />
                </span>
              </Button>
            </nuxt-link>
          </div>
        </div>
      </div>
    </nuxt-link>
  </ThemeWrapper>
</template>
<script>
import DateManager from '@/utilities/DateManager'
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
    reward() {
      return this.community.rewards.filter((r) => r.type === 'SUBMISSION')[0]
    },
    duration() {
      return DateManager.millisecondsToMinutes(this.community.duration)
    },
  },
}
</script>
