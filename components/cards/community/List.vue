<template>
  <ThemeWrapper :colors="community.colors" class="w-full">
  
    
      <nuxt-link :to="localePath({ path: path })">
        <div
          :class="{'bg-gray-200' : !loading}"
          class="group w-full lg:flex min-w-full mx-0 rounded-3xl relative"
        >
          <ListIcon :community="community" />
          <div
            class="flex-col justify-between flex p-3 md:p-7 text-gray-700 flex-1 divide-y divide-dotted divide-gray-500"
          >
            <div class="w-full">
              <div class="xl:pr-52 w-full text-lg pb-10">
                <Skeleton
                  :count="4"
                  as="div"
                  class-name="mt-2 w-full"
                  :width="'300px'"
                  :height="'20px'"
                  min-height="20px"
                  :loading="loading"
                >
                {{ community.summary }}
                </Skeleton>
              </div>
            </div>
            <div class="space-y-5">
              <div class="hidden md:flex flex-row justify-between">
                <div class="text-base pt-7 text-left flex-start flex flex-col">
                  <div class="flex space-x-3">
                    <div class="flex space-x-2">
                      <Skeleton as="div" circle :loading="loading">
                        <Coin :token="reward.token" size="normal" />
                      </Skeleton>
                      <div class="flex flex-col text-sm leading-tight pt-1">
                        <div class="font-normal leading-tight">
                          <Skeleton
                            as="div"
                            class-name=" w-full"
                            :height="'20px'"
                            min-height="20px"
                            :loading="loading"
                          >
                          {{ $t('communities.list-card.earn') }}
                          <span class="font-bold">{{ reward.token }}</span>
                          </Skeleton>
                        </div>
                        <div class="font-light leading-tight">
                          <Skeleton
                            as="div"
                            class-name="mt-2 w-full"
                            :height="'10px'"
                            min-height="10px"
                            :loading="loading"
                          >
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
                          </Skeleton>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mt-7 align-middle">
                  <Skeleton as="div" pill :loading="loading">
                  <nuxt-link :to="localePath(path)">
                    <ArrowButton
                      class="group-hover:bg-primary bg-gray-200 border text-primary group-hover:text-white border-primary"
                      type="outline-primary"
                    >
                      {{ $t('page.index.main.button') }}
                    </ArrowButton>
                  </nuxt-link>
                  </Skeleton>
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
import Skeleton from '~/components/ui/Skeleton.vue'

export default {
  name: 'CommunityListCard',
  components: { Coin, ListIcon, ThemeWrapper, ArrowButton, Skeleton },
  props: {
    community: {
      default: () => {},
      type: Object,
    },

    loading: {
      default: true,
      type: Boolean
    }
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
