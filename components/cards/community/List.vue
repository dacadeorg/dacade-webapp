<template>
  <ThemeWrapper :colors="community.colors">
    <nuxt-link :to="{ path: path }">
      <div
        class="
          group
          w-full
          bg-gray-200
          lg:flex
          min-w-full
          mx-0
          rounded-3xl
          relative
        "
      >
        <ListIcon :community="community" />
        <div class="flex-col justify-between flex p-3 md:p-7 text-gray-700">
          <div class="w-full">
            <div class="xl:pr-52 w-full text-lg pb-10">
              {{ community.summary }}
            </div>
          </div>
          <div class="divide-y divide-dotted divide-gray-500 space-y-5">
            <div class="flex space-x-3">
              <div v-for="(reward, i) in community.rewards" :key="i">
                <Reward :reward="reward" />
              </div>
            </div>
            <div class="hidden md:flex flex-row justify-between">
              <div class="text-base pt-7 text-left flex-start flex flex-col">
                <span class="font-light">
                  {{ $t('communities.card.estimated') }}
                </span>
                <span class="font-medium">
                  {{ duration }} {{ $t('communities.card.minutes') }}
                </span>
              </div>
              <div class="mt-7 align-middle">
                <nuxt-link :to="path">
                  <Button
                    class="
                      group-hover:bg-primary
                      bg-gray-200
                      border
                      text-primary
                      group-hover:text-white
                      border-primary
                    "
                  >
                    <span
                      class="
                        text-primary
                        group-gover:bg-text-primary
                        group-hover:text-white
                        py-0
                        inline-block
                        align-middle
                      "
                      >{{ $t('page.index.main.button') }}</span
                    >
                    <span class="inline-block align-middle">
                      <ArrowRightIcon
                        class="ml-7 text-primary group-hover:text-white"
                      />
                    </span>
                  </Button>
                </nuxt-link>
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

import ListIcon from '@/components/cards/community/_partials/ListIcon'
import ThemeWrapper from '@/components/wrappers/ThemeWrapper'
import DateManager from '@/utilities/DateManager'
import Button from '@/components/ui/Button'
import ArrowRightIcon from '~/assets/icons/arrow-right.svg?inline'

export default {
  name: 'CommunityListCard',
  components: { Reward, ListIcon, ThemeWrapper, Button, ArrowRightIcon },
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
      return DateManager.millisecondsToMinutes(this.community.duration)
    },
  },
}
</script>