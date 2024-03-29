<template>
  <ThemeWrapper :colors="community.colors" class="w-full">
    <nuxt-link :to="localePath({ path: path })">
      <div
        class="group w-full bg-gray-200 lg:flex min-w-full mx-0 rounded-3xl relative"
      >
        <ListIcon :community="community" />
        <div
          class="flex-col justify-between flex p-3 md:p-7 text-gray-700 flex-1 divide-y divide-dotted divide-gray-500"
        >
          <div class="w-full">
            <div class="xl:pr-52 w-full text-base md:text-lg pb-10">
              {{ community.summary }}
            </div>
          </div>
          <div class="space-y-5">
            <div class="md:flex flex-row justify-between">
              <div
                class="text-base pt-7 pb-3 md:pb-0 text-left flex-start flex flex-col"
              >
                <div class="flex space-x-3">
                  <div class="flex space-x-2">
                    <Coin :token="reward.token" size="normal" />
                    <div class="flex flex-col text-sm leading-tight pt-1">
                      <div class="font-normal leading-tight">
                        {{ $t('communities.list-card.earn') }}
                        <span class="font-bold">{{ reward.token }}</span>
                      </div>
                      <div class="font-light leading-tight">
                        {{
                          $t(
                            community.courses !== 1
                              ? 'communities.card.courses'
                              : 'communities.card.course',
                            {
                              count: community.courses,
                            }
                          )
                        }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-7 hidden md:block align-middle">
                <nuxt-link :to="localePath(path)">
                  <ArrowButton
                    class="group-hover:bg-primary bg-gray-200 border text-primary group-hover:text-white border-primary"
                    type="outline-primary"
                  >
                    {{ $t('page.index.main.button') }}
                  </ArrowButton>
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
import Coin from '@/components/ui/Coin'

import ListIcon from '@/components/cards/community/_partials/ListIcon'
import ThemeWrapper from '@/components/wrappers/ThemeWrapper'
import DateManager from '@/utilities/DateManager'
import ArrowButton from '@/components/ui/button/Arrow'

export default {
  name: 'CommunityListCard',
  components: { Coin, ListIcon, ThemeWrapper, ArrowButton },
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
    reward() {
      return this.community.rewards.find((r) => r.type === 'SUBMISSION')
    },
  },
}
</script>
