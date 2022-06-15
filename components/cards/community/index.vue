<template>
  <ThemeWrapper class="h-full" :colors="community.colors">
    <nuxt-link class="block h-full" :to="localePath(path)">
      <div
        :class="{'bg-theme-primary' : !loading}"
        class="group p-6 pb-3  text-theme-text space-y-5 divide-y-2 divide-y divide-dotted divide-theme-accent h-full flex flex-col"
      >
        <div class="flex-grow">
          <div
            class="flex flex-col sm:flex-row lg:flex-col 2xl:flex-row justify-between space-y-5"
          >
            <div
              class="text-.5xl md:text-2xl max-w-sm min-h-2xs md:min-h-3xs lg:min-h-2xs xl:min-h-2xs font-medium pb-5"
            >
              <h1 class="tracking-tight max-w-text-xs text-theme-text">
                
                  {{ community.name }}
                
              </h1>
              <p class="tracking-tight md:max-w-text-md text-theme-accent pr-2">
                
                  {{ community.description || '' }}
                
              </p>
            </div>
            <div
              class="self-end max-w-lg sm:h-full sm:-mb-0 md:mb-2 md:h-auto pb-5"
            >
              
                <img :src="community.icon" class="relative h-44 w-44" />
              
            </div>
          </div>
          <div
            class="flex md:flex-row lg:flex-col justify-start flex-col max-w-xs -mt-4 md:-mt-7 md:max-w-lg items-start"
          >
            
              <div v-if="reward" class="text-sm">
                <Reward :reward="{ token: reward.token, amount: null }" />
                <!-- <div /> -->
              </div>
            
          </div>
        </div>
        <div class="mt-4 flex-none flex justify-between">
          <div class="flex flex-col space-y-0">
            <div class="mt-4 font-medium text-theme-accent">
              
                {{ $t('communities.card.earn') }}
              
            </div>
            <div class="mt-4 font-light text-theme-accent">
              
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
              >
            </div>
          </div>
          <div class="mt-4 align-middle">
            
              <nuxt-link :to="localePath(path)">
                <ArrowButton
                  class="group-hover:bg-theme-accent bg-theme-primary border text-theme-accent group-hover:text-theme-primary border-theme-accent"
                >
                  {{ $t('page.index.main.button') }}
                </ArrowButton>
              </nuxt-link>
            
          </div>
        </div>
      </div>
    </nuxt-link>
  </ThemeWrapper>
</template>
<script>
import Reward from './_partials/Reward.vue'
import ThemeWrapper from '@/components/wrappers/ThemeWrapper'
// import Reward from '@/components/badges/Reward'
import ArrowButton from '@/components/ui/button/Arrow'


export default {
  name: 'CommunityCard',
  components: { ThemeWrapper, Reward, ArrowButton },
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
  },
}
</script>
